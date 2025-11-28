import express from 'express';
import { getRecipes, getRecipeById, createRecipe } from '../controllers/recipe.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', authenticate, createRecipe);

export default router;
