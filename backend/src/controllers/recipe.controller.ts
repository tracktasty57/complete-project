import { Request, Response } from 'express';
import Recipe from '../models/recipe';

interface AuthRequest extends Request {
    user?: any;
}

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const { category, search } = req.query;
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

        const recipes = await Recipe.find(query).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
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
        const newRecipe = new Recipe({
            ...req.body,
            createdBy: req.user.userId
        });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};
