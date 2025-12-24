import { fetchWithAuth } from './client';
import type { Recipe } from '../types/recipe';
import { addActivity } from '../utils/activityTracker';

export const getRecipes = async (category?: string, search?: string, ids?: string[]): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (ids && ids.length > 0) params.append('ids', ids.join(','));
    else {
        if (category && category !== 'all') params.append('category', category);
        if (search) params.append('search', search);
    }

    return fetchWithAuth(`/recipes?${params.toString()}`);
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
    return fetchWithAuth(`/recipes/${id}`);
};


export const createRecipe = async (recipeData: Partial<Recipe> | FormData): Promise<Recipe> => {
    const isFormData = recipeData instanceof FormData;
    const result = await fetchWithAuth('/recipes', {
        method: 'POST',
        body: isFormData ? recipeData : JSON.stringify(recipeData),
        ...(isFormData ? {} : { headers: { 'Content-Type': 'application/json' } })
    });

    // Track activity
    addActivity('Created a new recipe', 'recipe');

    return result;
};

export const updateRecipe = async (id: string, recipeData: Partial<Recipe> | FormData): Promise<Recipe> => {
    const isFormData = recipeData instanceof FormData;
    const result = await fetchWithAuth(`/recipes/${id}`, {
        method: 'PUT',
        body: isFormData ? recipeData : JSON.stringify(recipeData),
        ...(isFormData ? {} : { headers: { 'Content-Type': 'application/json' } })
    });

    // Track activity
    addActivity('Updated a recipe', 'recipe');

    return result;
};

export const deleteRecipe = async (id: string): Promise<void> => {
    const result = await fetchWithAuth(`/recipes/${id}`, {
        method: 'DELETE',
    });

    // Track activity
    addActivity('Deleted a recipe', 'recipe');

    return result;
};
