import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cookTime: string;
  servings: number;
  category: string;
  image: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  cookTime: { type: String, required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
