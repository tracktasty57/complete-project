export interface MealSlot {
    name: string;
    time: string;
    servings: number;
}

export interface DailyPlan {
    breakfast?: MealSlot;
    lunch?: MealSlot;
    dinner?: MealSlot;
}

export interface MealPlan {
    _id: string;
    user: string;
    weekStartDate: string;
    days: {
        monday: DailyPlan;
        tuesday: DailyPlan;
        wednesday: DailyPlan;
        thursday: DailyPlan;
        friday: DailyPlan;
        saturday: DailyPlan;
        sunday: DailyPlan;
    };
}
