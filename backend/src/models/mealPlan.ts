import mongoose, { Schema, Document } from 'mongoose';

export interface IMealSlot {
    name: string;
    time: string;
    servings: number;
}

export interface IDailyPlan {
    breakfast?: IMealSlot;
    lunch?: IMealSlot;
    dinner?: IMealSlot;
}

export interface IMealPlan extends Document {
    user: mongoose.Types.ObjectId;
    weekStartDate: Date;
    days: {
        monday: IDailyPlan;
        tuesday: IDailyPlan;
        wednesday: IDailyPlan;
        thursday: IDailyPlan;
        friday: IDailyPlan;
        saturday: IDailyPlan;
        sunday: IDailyPlan;
    };
    createdAt: Date;
    updatedAt: Date;
}

const MealSlotSchema = new Schema({
    name: { type: String, required: true },
    time: { type: String },
    servings: { type: Number }
}, { _id: false });

const DailyPlanSchema = new Schema({
    breakfast: MealSlotSchema,
    lunch: MealSlotSchema,
    dinner: MealSlotSchema
}, { _id: false });

const MealPlanSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    weekStartDate: { type: Date, required: true },
    days: {
        monday: { type: DailyPlanSchema, default: {} },
        tuesday: { type: DailyPlanSchema, default: {} },
        wednesday: { type: DailyPlanSchema, default: {} },
        thursday: { type: DailyPlanSchema, default: {} },
        friday: { type: DailyPlanSchema, default: {} },
        saturday: { type: DailyPlanSchema, default: {} },
        sunday: { type: DailyPlanSchema, default: {} }
    }
}, { timestamps: true });

// Ensure one plan per week per user
MealPlanSchema.index({ user: 1, weekStartDate: 1 }, { unique: true });

export default mongoose.model<IMealPlan>('MealPlan', MealPlanSchema);
