import { fetchWithAuth } from './client';
import type { MealPlan } from '../types/mealPlan';

export const getMealPlan = async (weekStartDate: Date): Promise<MealPlan> => {
    return fetchWithAuth(`/meal-plans?weekStartDate=${weekStartDate.toISOString()}`);
};

export const updateMealPlan = async (weekStartDate: Date, days: any): Promise<MealPlan> => {
    return fetchWithAuth('/meal-plans', {
        method: 'POST',
        body: JSON.stringify({ weekStartDate, days }),
    });
};
