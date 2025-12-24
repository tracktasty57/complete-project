import { Request, Response } from 'express';
import User from '../models/user';
import Recipe from '../models/recipe';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
    user?: any;
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const index = user.favorites.indexOf(recipeId);
        if (index === -1) {
            user.favorites.push(recipeId);
        } else {
            user.favorites.splice(index, 1);
        }

        await user.save();
        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling favorite', error });
    }
};

export const toggleLike = async (req: AuthRequest, res: Response) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const index = user.likedRecipes.indexOf(recipeId);
        let isLiked = false;

        if (index === -1) {
            user.likedRecipes.push(recipeId);
            isLiked = true;
        } else {
            user.likedRecipes.splice(index, 1);
            isLiked = false;
        }

        await user.save();

        // If it's a local recipe (valid ObjectId), update the like count
        if (mongoose.Types.ObjectId.isValid(recipeId)) {
            const recipe = await Recipe.findById(recipeId);
            if (recipe) {
                recipe.likes = (recipe.likes || 0) + (isLiked ? 1 : -1);
                if (recipe.likes < 0) recipe.likes = 0;
                await recipe.save();
            }
        }

        res.json({ likedRecipes: user.likedRecipes });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling like', error });
    }
};
