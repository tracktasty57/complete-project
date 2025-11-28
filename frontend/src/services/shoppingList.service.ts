import { fetchWithAuth } from './client';
import type { ShoppingList, ShoppingItem } from '../types/shoppingList';

export const getShoppingList = async (): Promise<ShoppingList> => {
    return fetchWithAuth('/shopping-list');
};

export const addItem = async (item: Partial<ShoppingItem>): Promise<ShoppingList> => {
    return fetchWithAuth('/shopping-list/items', {
        method: 'POST',
        body: JSON.stringify({ item }),
    });
};

export const updateItem = async (itemId: number, updates: Partial<ShoppingItem>): Promise<ShoppingList> => {
    return fetchWithAuth(`/shopping-list/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
};

export const deleteItem = async (itemId: number): Promise<ShoppingList> => {
    return fetchWithAuth(`/shopping-list/items/${itemId}`, {
        method: 'DELETE',
    });
};
