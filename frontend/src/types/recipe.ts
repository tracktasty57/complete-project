export interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    cookTime: string;
    servings: number;
    category: string;
    image: string;
    rating?: number; // Optional as it wasn't in backend model yet, but used in UI
    createdAt: string;
    updatedAt: string;
}
