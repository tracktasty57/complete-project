export interface ShoppingItem {
    id: number;
    name: string;
    category: string;
    quantity: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface ShoppingList {
    _id: string;
    user: string;
    items: ShoppingItem[];
}
