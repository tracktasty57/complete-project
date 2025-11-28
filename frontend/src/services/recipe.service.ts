import { fetchWithAuth } from './client';
import type { Recipe } from '../types/recipe';

export const getRecipes = async (category?: string, search?: string): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    return fetchWithAuth(`/recipes?${params.toString()}`);
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
    return fetchWithAuth(`/recipes/${id}`);
};

export const createRecipe = async (recipeData: Partial<Recipe>): Promise<Recipe> => {
    return fetchWithAuth('/recipes', {
        method: 'POST',
        body: JSON.stringify(recipeData),
    });
};
