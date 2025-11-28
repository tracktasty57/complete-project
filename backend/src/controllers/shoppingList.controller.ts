import { Request, Response } from 'express';
import ShoppingList from '../models/shoppingList';

interface AuthRequest extends Request {
    user?: any;
}

export const getShoppingList = async (req: AuthRequest, res: Response) => {
    try {
        let shoppingList = await ShoppingList.findOne({ user: req.user.userId });

        if (!shoppingList) {
            shoppingList = await ShoppingList.create({ user: req.user.userId, items: [] });
        }

        res.json(shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shopping list', error });
    }
};

export const addItem = async (req: AuthRequest, res: Response) => {
    try {
        const { item } = req.body;
        const shoppingList = await ShoppingList.findOneAndUpdate(
            { user: req.user.userId },
            { $push: { items: item } },
            { new: true, upsert: true }
        );
        res.json(shoppingList);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding item',
            error: error instanceof Error ? error.message : error
        });
    }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
    try {
        const { itemId } = req.params;
        const updates = req.body;

        const shoppingList = await ShoppingList.findOne({ user: req.user.userId });
        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        const itemIndex = shoppingList.items.findIndex(item => item.id === Number(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update item fields individually
        if (updates.name !== undefined) shoppingList.items[itemIndex].name = updates.name;
        if (updates.quantity !== undefined) shoppingList.items[itemIndex].quantity = updates.quantity;
        if (updates.category !== undefined) shoppingList.items[itemIndex].category = updates.category;
        if (updates.priority !== undefined) shoppingList.items[itemIndex].priority = updates.priority;
        if (updates.completed !== undefined) shoppingList.items[itemIndex].completed = updates.completed;

        await shoppingList.save();

        res.json(shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
    try {
        const { itemId } = req.params;

        const shoppingList = await ShoppingList.findOneAndUpdate(
            { user: req.user.userId },
            { $pull: { items: { id: Number(itemId) } } },
            { new: true }
        );

        res.json(shoppingList);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
