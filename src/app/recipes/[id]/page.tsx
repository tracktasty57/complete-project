"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Clock,
    Users,
    ChefHat,
    ArrowLeft,
    Heart,
    Share2,
    Star,
    Edit,
    Trash2
} from 'lucide-react';
import { Button, Card, CardBody } from '@/components/ui';
import { getRecipeById, deleteRecipe } from '@/services/recipe.service';
import { getUserProfile } from '@/services/user.service';
import type { Recipe } from '@/types/recipe';

export default function RecipeDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const [recipeData, userProfile] = await Promise.all([
                    getRecipeById(id),
                    getUserProfile().catch(() => null)
                ]);
                setRecipe(recipeData);
                if (userProfile) setUserId(userProfile._id);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load recipe details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (!id || !confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) return;
        try {
            await deleteRecipe(id);
            router.push('/recipes');
        } catch (err) {
            console.error('Error deleting recipe:', err);
            alert('Failed to delete recipe.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{error || 'Recipe not found'}</h2>
                <Button onClick={() => router.push('/recipes')}>Back to Recipes</Button>
            </div>
        );
    }

    const isOwner = userId && recipe.createdBy && recipe.createdBy.toString() === userId.toString();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/recipes')}
                    className="group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Recipes
                </Button>

                {isOwner && (
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/edit-recipe/${recipe._id}`)}
                            className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                {recipe.image ? (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                        <ChefHat className="h-24 w-24 text-orange-400 opacity-50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                    <div className="flex items-center space-x-2 text-orange-300 font-medium">
                        <span className="uppercase tracking-wider text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
                            {recipe.category}
                        </span>
                        {recipe.rating && (
                            <span className="flex items-center text-yellow-400 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
                                <Star className="h-4 w-4 fill-current mr-1" />
                                {recipe.rating}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">{recipe.title}</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card variant="elevated">
                    <CardBody className="flex items-center space-x-3 p-4">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Prep Time</p>
                            <p className="font-semibold text-slate-900">{recipe.cookTime}</p>
                        </div>
                    </CardBody>
                </Card>
                <Card variant="elevated">
                    <CardBody className="flex items-center space-x-3 p-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Servings</p>
                            <p className="font-semibold text-slate-900">{recipe.servings} People</p>
                        </div>
                    </CardBody>
                </Card>
                <Card variant="elevated" clickable onClick={() => { }}>
                    <CardBody className="flex items-center space-x-3 p-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Save</p>
                            <p className="font-semibold text-slate-900">Favorite</p>
                        </div>
                    </CardBody>
                </Card>
                <Card variant="elevated" clickable onClick={() => window.print()}>
                    <CardBody className="flex items-center space-x-3 p-4">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <Share2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Share</p>
                            <p className="font-semibold text-slate-900">Recipe</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card variant="outlined" className="h-full bg-orange-50/50 border-orange-100">
                        <CardBody className="p-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                <ChefHat className="h-5 w-5 mr-2 text-orange-500" />
                                Ingredients
                            </h3>
                            <ul className="space-y-3">
                                {recipe.ingredients && recipe.ingredients.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-slate-700">
                                        <div className="h-2 w-2 min-w-[8px] rounded-full bg-orange-400 mt-2 mr-3"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="prose max-w-none text-slate-600 text-lg leading-relaxed">
                        <p>{recipe.description}</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Instructions</h3>
                        <div className="space-y-6 text-slate-700 leading-relaxed whitespace-pre-line">
                            {recipe.instructions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
