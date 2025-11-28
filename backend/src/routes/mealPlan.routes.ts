import express from 'express';
import { getMealPlan, updateMealPlan } from '../controllers/mealPlan.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getMealPlan);
router.post('/', updateMealPlan);

export default router;
