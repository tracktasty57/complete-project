import { Request, Response } from 'express';
import axios from 'axios';
import Recipe from '../models/recipe';

interface AuthRequest extends Request {
    user?: any;
    file?: any;
}

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const { category, search, ids } = req.query;

        // ✅ Handle fetching specific recipes by IDs (for Favorites/Likes)
        if (ids) {
            const idList = (ids as string).split(',');
            const localIds = idList.filter(id => !id.startsWith('ext-'));
            const externalIds = idList.filter(id => id.startsWith('ext-'));

            // Fetch local
            const localRecipes = await Recipe.find({ _id: { $in: localIds } }).lean();

            // Fetch external
            const externalPromises = externalIds.map(id => {
                const extId = id.replace('ext-', '');
                return axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${extId}`)
                    .then(r => (r.data.meals ? transformMeal(r.data.meals[0]) : null))
                    .catch(() => null);
            });

            const externalRecipes = (await Promise.all(externalPromises)).filter(r => r !== null);

            return res.json([...localRecipes, ...externalRecipes]);
        }

        let query: any = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { ingredients: { $regex: search, $options: 'i' } }
            ];
        }

        // Fetch local recipes
        const localRecipes = await Recipe.find(query).sort({ createdAt: -1 }).lean();

        // Fetch external recipes from TheMealDB
        let externalRecipes: any[] = [];
        let usedSpecificCategory = false; // Flag to skip post-filtering if we already fetched specific category

        try {
            if (search) {
                // If search term exists, search by name directly
                const apiResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
                if (apiResponse.data.meals) {
                    externalRecipes = apiResponse.data.meals.map(transformMeal);
                }
            } else {
                // If browsing by category or showing all
                let apiCategory = '';
                const catStr = typeof category === 'string' ? category.toLowerCase() : '';

                if (catStr === 'breakfast') apiCategory = 'Breakfast';
                else if (catStr === 'dessert') apiCategory = 'Dessert';
                else if (catStr === 'snacks') apiCategory = 'Starter';

                if (apiCategory) {
                    usedSpecificCategory = true;
                    // Fetch by specific category (ID list -> details)
                    const listResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`);
                    const mealsList = listResponse.data.meals || [];

                    // Take top 12 to avoid too many requests but show variety
                    const topMeals = mealsList.slice(0, 12);

                    // Fetch details in parallel, handling individual failures
                    const detailPromises = topMeals.map((m: any) =>
                        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`)
                            .catch(() => null) // Return null on error so Promise.all doesn't fail
                    );

                    const detailResponses = await Promise.all(detailPromises);
                    const meals = detailResponses
                        .map(r => (r && r.data && r.data.meals) ? r.data.meals[0] : null)
                        .filter(m => m !== null);

                    externalRecipes = meals.map(transformMeal);
                } else {
                    // Fallback for lunch/dinner or 'all' (generic search)
                    // We default to Chicken as it covers a lot of Lunch/Dinner requests
                    const apiResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`);
                    if (apiResponse.data.meals) {
                        externalRecipes = apiResponse.data.meals.map(transformMeal);
                    }
                }
            }
        } catch (apiError) {
            console.error('Error fetching external recipes:', apiError);
        }

        // Filter external recipes by category if requested AND we didn't already fetch specific ones
        if (category && category !== 'all' && !usedSpecificCategory) {
            externalRecipes = externalRecipes.filter(r => {
                const rCat = r.category.toLowerCase();
                const qCat = (category as string).toLowerCase();

                if (qCat === 'dinner' || qCat === 'lunch') return true; // Accept all for generic meals
                if (qCat === 'snacks' && rCat === 'starter') return true; // Map snacks to starter

                return rCat.includes(qCat);
            });
        }

        res.json([...localRecipes, ...externalRecipes]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

// Helper to transform MealDB format to our Recipe schema
const transformMeal = (meal: any) => {
    // Extract ingredients
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
        }
    }

    return {
        _id: `ext-${meal.idMeal}`, // Virtual ID
        title: meal.strMeal,
        description: meal.strInstructions ? (meal.strInstructions.substring(0, 150) + '...') : 'No description available',
        instructions: meal.strInstructions || '',
        ingredients: ingredients,
        cookTime: `${Math.floor(Math.random() * 40) + 20} min`, // Mock
        servings: Math.floor(Math.random() * 3) + 2, // Mock 2-4
        category: meal.strCategory ? meal.strCategory.toLowerCase() : 'other',
        image: meal.strMealThumb,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Mock 3.5 - 5.0
        createdAt: new Date(), // Mock
        isExternal: true
    };
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Check if it's an external recipe
        if (id.startsWith('ext-')) {
            const externalId = id.replace('ext-', '');
            try {
                const apiResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${externalId}`);
                if (apiResponse.data.meals && apiResponse.data.meals[0]) {
                    const meal = apiResponse.data.meals[0];
                    // Extract ingredients
                    const ingredients: string[] = [];
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];
                        if (ingredient && ingredient.trim() !== '') {
                            ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
                        }
                    }

                    const recipe = {
                        _id: id,
                        title: meal.strMeal,
                        description: meal.strInstructions.substring(0, 150) + '...',
                        instructions: meal.strInstructions,
                        ingredients: ingredients,
                        cookTime: `${Math.floor(Math.random() * 40) + 20} min`,
                        servings: Math.floor(Math.random() * 3) + 2,
                        category: meal.strCategory.toLowerCase(),
                        image: meal.strMealThumb,
                        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                        createdAt: new Date(),
                        isExternal: true
                    };
                    return res.json(recipe);
                } else {
                    return res.status(404).json({ message: 'Recipe not found' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error fetching external recipe', error });
            }
        }

        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};

export const createRecipe = async (req: AuthRequest, res: Response) => {
    try {
        const recipeData = { ...req.body };
        if (req.file) {
            recipeData.image = `/uploads/${req.file.filename}`;
        }

        // Ensure ingredients is an array
        if (recipeData.ingredients && !Array.isArray(recipeData.ingredients)) {
            recipeData.ingredients = [recipeData.ingredients];
        }

        const newRecipe = new Recipe({
            ...recipeData,
            createdBy: req.user.userId
        });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error('Create Error', error);
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};

export const updateRecipe = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this recipe' });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        // Ensure ingredients is an array
        if (updateData.ingredients && !Array.isArray(updateData.ingredients)) {
            updateData.ingredients = [updateData.ingredients];
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        console.error('Update Error', error);
        res.status(500).json({ message: 'Error updating recipe', error });
    }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this recipe' });
        }

        await Recipe.findByIdAndDelete(id);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error });
    }
};
