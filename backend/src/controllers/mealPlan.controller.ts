import { Request, Response } from 'express';
import MealPlan from '../models/mealPlan';

interface AuthRequest extends Request {
    user?: any;
}

export const getMealPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { weekStartDate } = req.query;
        if (!weekStartDate) {
            return res.status(400).json({ message: 'Week start date is required' });
        }

        // Create date range for the week to handle time differences
        const startDate = new Date(weekStartDate as string);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);

        const mealPlan = await MealPlan.findOne({
            user: req.user.userId,
            weekStartDate: { $gte: startDate, $lt: endDate }
        });

        if (!mealPlan) {
            // Return empty plan structure if not found
            return res.json({
                user: req.user.userId,
                weekStartDate: weekStartDate,
                days: {
                    monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {}, saturday: {}, sunday: {}
                }
            });
        }

        res.json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meal plan', error });
    }
};

export const updateMealPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { weekStartDate, days } = req.body;

        // Normalize the date to midnight to ensure consistency
        const normalizedDate = new Date(weekStartDate);
        normalizedDate.setHours(0, 0, 0, 0);

        const mealPlan = await MealPlan.findOneAndUpdate(
            {
                user: req.user.userId,
                weekStartDate: {
                    $gte: normalizedDate,
                    $lt: new Date(normalizedDate.getTime() + 7 * 24 * 60 * 60 * 1000)
                }
            },
            {
                user: req.user.userId,
                weekStartDate: normalizedDate,
                days
            },
            { new: true, upsert: true }
        );

        res.json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: 'Error updating meal plan', error });
    }
};
