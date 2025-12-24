import express from 'express';
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipe.controller';
import { authenticate } from '../middleware/auth.middleware';

import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', authenticate, upload.single('image'), createRecipe);
router.put('/:id', authenticate, upload.single('image'), updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
