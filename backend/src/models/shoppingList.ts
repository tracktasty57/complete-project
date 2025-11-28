import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem {
    id: number; // Keeping number ID for frontend compatibility, or could use _id
    name: string;
    category: string;
    quantity: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface IShoppingList extends Document {
    user: mongoose.Types.ObjectId;
    items: IShoppingItem[];
    createdAt: Date;
    updatedAt: Date;
}

const ShoppingItemSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { _id: false });

const ShoppingListSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [ShoppingItemSchema]
}, { timestamps: true });

export default mongoose.model<IShoppingList>('ShoppingList', ShoppingListSchema);
