import { fetchWithAuth } from './client';
import { addActivity } from '../utils/activityTracker';

export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    favorites: string[];
    likedRecipes: string[];
}

export const getUserProfile = async (): Promise<UserProfile> => {
    return fetchWithAuth('/users/profile');
};

export const toggleFavorite = async (recipeId: string): Promise<{ favorites: string[] }> => {
    const result = await fetchWithAuth('/users/favorites', {
        method: 'POST',
        body: JSON.stringify({ recipeId }),
    });

    // Track activity
    addActivity('Added a recipe to favorites', 'favorite');

    return result;
};

export const toggleLike = async (recipeId: string): Promise<{ likedRecipes: string[] }> => {
    const result = await fetchWithAuth('/users/likes', {
        method: 'POST',
        body: JSON.stringify({ recipeId }),
    });

    // Track activity
    addActivity('Liked a recipe', 'like');

    return result;
};
