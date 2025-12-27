"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    Loader2,
    Upload,
    X
} from 'lucide-react';
import { Button, Card, CardBody, Input } from '@/components/ui';
import { createRecipe, updateRecipe, getRecipeById } from '@/services/recipe.service';

interface AddRecipeForm {
    title: string;
    description: string;
    image?: string;
    imageFile?: FileList;
    cookTime: string;
    servings: number;
    category: string;
    ingredients: { value: string }[];
    instructions: string;
}

export default function AddRecipePage() {
    const params = useParams();
    const id = params?.id as string;
    const isEditing = !!id;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<AddRecipeForm>({
        defaultValues: {
            ingredients: [{ value: '' }, { value: '' }, { value: '' }],
            category: 'dinner',
            servings: 2
        }
    });

    const { fields, append, remove } = useFieldArray<AddRecipeForm>({
        control,
        name: "ingredients"
    });

    const imageFile = watch('imageFile');

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imageFile]);

    useEffect(() => {
        if (isEditing && id) {
            const fetchRecipe = async () => {
                try {
                    setFetching(true);
                    const recipe = await getRecipeById(id);
                    reset({
                        title: recipe.title,
                        description: recipe.description,
                        image: recipe.image,
                        cookTime: recipe.cookTime,
                        servings: recipe.servings,
                        category: recipe.category,
                        ingredients: recipe.ingredients.map(ing => ({ value: ing })),
                        instructions: recipe.instructions
                    });
                    if (recipe.image) {
                        setImagePreview(recipe.image);
                    }
                } catch (err) {
                    console.error('Error fetching recipe:', err);
                    setError('Failed to load recipe data.');
                } finally {
                    setFetching(false);
                }
            };
            fetchRecipe();
        }
    }, [isEditing, id, reset]);

    const onSubmit = async (data: AddRecipeForm) => {
        try {
            setLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('cookTime', data.cookTime);
            formData.append('servings', data.servings.toString());
            formData.append('category', data.category);
            formData.append('instructions', data.instructions);

            const validIngredients = data.ingredients.map(i => i.value).filter(i => i.trim() !== '');
            validIngredients.forEach((ing) => {
                formData.append('ingredients', ing);
            });

            if (data.imageFile && data.imageFile.length > 0) {
                formData.append('image', data.imageFile[0]);
            }

            if (isEditing && id) {
                await updateRecipe(id, formData);
            } else {
                await createRecipe(formData);
            }
            router.push(isEditing ? `/recipes/${id}` : '/recipes');
        } catch (err) {
            console.error('Error saving recipe:', err);
            setError(`Failed to ${isEditing ? 'update' : 'create'} recipe. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h1>
                    <p className="text-slate-600">
                        {isEditing ? 'Update your recipe details' : 'Share your culinary masterpiece with the community'}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => router.push(isEditing ? `/recipes/${id}` : '/dashboard')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Card variant="elevated">
                    <CardBody className="space-y-6 p-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Basic Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Recipe Title</label>
                                    <Input
                                        {...register('title', { required: 'Title is required' })}
                                        placeholder="e.g. Grandma's Apple Pie"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Category</label>
                                    <select
                                        {...register('category', { required: true })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
                                    >
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="snacks">Snacks</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
                                    placeholder="Write a short appetizing description..."
                                />
                                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Cook Time</label>
                                    <Input
                                        {...register('cookTime', { required: 'Cook time is required' })}
                                        placeholder="e.g. 45 mins"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Servings</label>
                                    <Input
                                        type="number"
                                        {...register('servings', { required: true, min: 1 })}
                                        placeholder="e.g. 4"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Recipe Image</label>

                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 bg-slate-50 hover:bg-slate-100 transition-colors relative">
                                    {imagePreview ? (
                                        <div className="relative w-full text-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mx-auto h-48 object-cover rounded-md shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setValue('imageFile', undefined);
                                                    setImagePreview(null);
                                                }}
                                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        {...register('imageFile')}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h2 className="text-xl font-semibold text-slate-800">Ingredients</h2>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => append({ value: '' })}
                                >
                                    <Plus className="h-4 w-4 mr-1" /> Add Ingredient
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input
                                            {...register(`ingredients.${index}.value` as const, { required: true })}
                                            placeholder={`Ingredient ${index + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => remove(index)}
                                            disabled={fields.length <= 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Instructions</h2>
                            <div className="space-y-2">
                                <textarea
                                    {...register('instructions', { required: 'Instructions are required' })}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
                                    placeholder="Step 1: Preheat the oven...&#10;Step 2: Mix ingredients..."
                                />
                                {errors.instructions && <p className="text-red-500 text-xs">{errors.instructions.message}</p>}
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {isEditing ? 'Updating Recipe...' : 'Creating Recipe...'}
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5" />
                                        {isEditing ? 'Update Recipe' : 'Save Recipe'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </form>
        </div>
    );
}
