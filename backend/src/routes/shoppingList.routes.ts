import express from 'express';
import { getShoppingList, addItem, updateItem, deleteItem } from '../controllers/shoppingList.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getShoppingList);
router.post('/items', addItem);
router.put('/items/:itemId', updateItem);
router.delete('/items/:itemId', deleteItem);

export default router;
