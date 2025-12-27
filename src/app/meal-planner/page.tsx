"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    Plus,
    Edit3,
    Trash2,
    ChefHat,
    Clock,
    Users,
    ArrowLeft,
    ArrowRight,
    Download,
    Share2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '@/components/ui';
import { getMealPlan, updateMealPlan } from '@/services/mealPlan.service';

export default function MealPlannerPage() {
    const router = useRouter();
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [meals, setMeals] = useState<any>({
        monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {}, saturday: {}, sunday: {}
    });
    const [loading, setLoading] = useState(true);
    const [showMealDialog, setShowMealDialog] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealType: string } | null>(null);
    const [mealForm, setMealForm] = useState({ name: '', time: '', servings: 1 });

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                setLoading(true);
                const data = await getMealPlan(currentWeek);
                if (data && data.days) {
                    setMeals(data.days);
                } else {
                    setMeals({
                        monday: {}, tuesday: {}, wednesday: {}, thursday: {}, friday: {}, saturday: {}, sunday: {}
                    });
                }
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlan();
    }, [currentWeek]);

    const daysOfWeek = [
        { key: 'monday', label: 'Monday', short: 'Mon' },
        { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
        { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
        { key: 'thursday', label: 'Thursday', short: 'Thu' },
        { key: 'friday', label: 'Friday', short: 'Fri' },
        { key: 'saturday', label: 'Saturday', short: 'Sat' },
        { key: 'sunday', label: 'Sunday', short: 'Sun' }
    ];

    const mealTypes = [
        { key: 'breakfast', label: 'Breakfast', icon: '🌅', color: 'from-yellow-500 to-orange-500' },
        { key: 'lunch', label: 'Lunch', icon: '☀️', color: 'from-orange-500 to-red-500' },
        { key: 'dinner', label: 'Dinner', icon: '🌙', color: 'from-purple-500 to-indigo-500' }
    ];

    const getWeekDates = (date: Date) => {
        const week = [];
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const weekDates = getWeekDates(currentWeek);

    const navigateWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentWeek);
        newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeek(newDate);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleAddMeal = (day: string, mealType: string) => {
        setSelectedSlot({ day, mealType });
        setMealForm({ name: '', time: '', servings: 1 });
        setShowMealDialog(true);
    };

    const handleEditMeal = (day: string, mealType: string, meal: any) => {
        setSelectedSlot({ day, mealType });
        setMealForm({ name: meal.name, time: meal.time, servings: meal.servings });
        setShowMealDialog(true);
    };

    const handleDeleteMeal = async (day: string, mealType: string) => {
        const updatedMeals = { ...meals };
        if (updatedMeals[day]) {
            delete updatedMeals[day][mealType];
        }
        setMeals({ ...updatedMeals });

        try {
            await updateMealPlan(currentWeek, updatedMeals);
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    const handleSaveMeal = async () => {
        if (!selectedSlot || !mealForm.name) return;

        const updatedMeals = { ...meals };
        if (!updatedMeals[selectedSlot.day]) {
            updatedMeals[selectedSlot.day] = {};
        }
        updatedMeals[selectedSlot.day][selectedSlot.mealType] = mealForm;
        setMeals({ ...updatedMeals });
        setShowMealDialog(false);

        try {
            await updateMealPlan(currentWeek, updatedMeals);
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    const getTotalMealsForWeek = () => {
        let total = 0;
        daysOfWeek.forEach(day => {
            const dayMeals = meals[day.key];
            if (dayMeals) {
                Object.values(dayMeals).forEach(meal => {
                    if (meal) total++;
                });
            }
        });
        return total;
    };

    const getPlannedDays = () => {
        return daysOfWeek.filter(day => {
            const dayMeals = meals[day.key];
            return dayMeals && Object.values(dayMeals).some(meal => meal !== null);
        }).length;
    };

    const handleShareMealPlan = async () => {
        let planText = `My Meal Plan\nWeek of ${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}\n\n`;

        daysOfWeek.forEach((day, index) => {
            const dayMeals = meals[day.key];
            planText += `${day.label} (${formatDate(weekDates[index])})\n`;

            mealTypes.forEach(mealType => {
                const meal = dayMeals?.[mealType.key];
                if (meal && meal.name) {
                    planText += `  ${mealType.icon} ${mealType.label}: ${meal.name}`;
                    if (meal.time) planText += ` at ${meal.time}`;
                    if (meal.servings) planText += ` (${meal.servings} servings)`;
                    planText += '\n';
                }
            });
            planText += '\n';
        });

        planText += `\nTotal Meals Planned: ${getTotalMealsForWeek()}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Meal Plan',
                    text: planText,
                });
            } catch (error) {
                console.log('Error sharing:', error);
                copyToClipboard(planText);
            }
        } else {
            copyToClipboard(planText);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Meal plan copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    const handleExportMealPlan = () => {
        const headers = ['Day', 'Date', 'Meal Type', 'Meal Name', 'Time', 'Servings'];
        const rows: string[][] = [];

        daysOfWeek.forEach((day, index) => {
            const dayMeals = meals[day.key];
            const dateStr = formatDate(weekDates[index]);

            mealTypes.forEach(mealType => {
                const meal = dayMeals?.[mealType.key];
                if (meal && meal.name) {
                    rows.push([
                        day.label,
                        dateStr,
                        mealType.label,
                        meal.name || '',
                        meal.time || '',
                        meal.servings?.toString() || ''
                    ]);
                }
            });
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        const weekStart = formatDate(weekDates[0]).replace(/\s/g, '-');
        link.setAttribute('href', url);
        link.setAttribute('download', `meal-plan-${weekStart}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-12">
            <section className="text-center space-y-8 animate-fade-in">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                        Meal{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                            Planner
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Plan your weekly meals in advance. Stay organized, save time, and never wonder "what's for dinner?" again.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" className="animate-fade-in-up">
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                            <Calendar className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{getPlannedDays()}</p>
                            <p className="text-slate-600">Days Planned</p>
                        </div>
                    </CardBody>
                </Card>

                <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                            <ChefHat className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{getTotalMealsForWeek()}</p>
                            <p className="text-slate-600">Meals Planned</p>
                        </div>
                    </CardBody>
                </Card>

                <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">4-6</p>
                            <p className="text-slate-600">Avg Servings</p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <Card variant="elevated" className="animate-fade-in-up">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl">
                                    Week of {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                                </CardTitle>
                                <CardDescription>
                                    Plan your meals for the week ahead
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                                    Next
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleExportMealPlan}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleShareMealPlan}>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </section>

            <section className="space-y-6">
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600">Loading meal plan...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="min-w-[1000px]">
                            <div className="grid grid-cols-8 gap-4 mb-6">
                                <div className="font-semibold text-slate-900 text-center py-4">
                                    Meal Type
                                </div>
                                {daysOfWeek.map((day, index) => (
                                    <div key={day.key} className="text-center">
                                        <div className="font-semibold text-slate-900">{day.short}</div>
                                        <div className="text-sm text-slate-600">{formatDate(weekDates[index])}</div>
                                    </div>
                                ))}
                            </div>

                            {mealTypes.map((mealType) => (
                                <div key={mealType.key} className="grid grid-cols-8 gap-4 mb-6">
                                    <div className="flex items-center justify-center">
                                        <div className={`w-full h-full p-4 rounded-xl bg-gradient-to-r ${mealType.color} text-white font-semibold text-center flex flex-col items-center justify-center`}>
                                            <div className="text-2xl mb-1">{mealType.icon}</div>
                                            <div className="text-sm">{mealType.label}</div>
                                        </div>
                                    </div>

                                    {daysOfWeek.map((day) => {
                                        const dayMeals = meals[day.key];
                                        const meal = dayMeals?.[mealType.key];

                                        return (
                                            <div key={`${day.key}-${mealType.key}`} className="min-h-[120px]">
                                                {meal ? (
                                                    <Card
                                                        variant="elevated"
                                                        hoverable
                                                        className="h-full group cursor-pointer"
                                                    >
                                                        <CardBody className="space-y-3 p-4">
                                                            <div className="flex items-start justify-between">
                                                                <h4 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-orange-600 transition-colors">
                                                                    {meal.name}
                                                                </h4>
                                                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => handleEditMeal(day.key, mealType.key, meal)}
                                                                        className="p-1 hover:bg-orange-100 rounded"
                                                                    >
                                                                        <Edit3 className="h-3 w-3 text-slate-600" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteMeal(day.key, mealType.key)}
                                                                        className="p-1 hover:bg-red-100 rounded"
                                                                    >
                                                                        <Trash2 className="h-3 w-3 text-red-600" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2 text-xs text-slate-600">
                                                                <div className="flex items-center space-x-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    <span>{meal.time}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Users className="h-3 w-3" />
                                                                    <span>{meal.servings} servings</span>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ) : (
                                                    <Card
                                                        variant="outlined"
                                                        className="h-full border-dashed border-2 border-slate-200 hover:border-orange-300 transition-colors cursor-pointer group"
                                                        onClick={() => handleAddMeal(day.key, mealType.key)}
                                                    >
                                                        <CardBody className="flex items-center justify-center h-full p-4">
                                                            <div className="text-center space-y-2">
                                                                <Plus className="h-6 w-6 text-slate-400 group-hover:text-orange-500 mx-auto transition-colors" />
                                                                <p className="text-xs text-slate-500 group-hover:text-orange-600 transition-colors">
                                                                    Add Meal
                                                                </p>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card variant="filled" className="animate-fade-in-up">
                    <CardBody className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto">
                            <ChefHat className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle>Browse Recipes</CardTitle>
                            <CardDescription>
                                Find new recipes to add to your meal plan
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push('/recipes')}
                        >
                            View Recipes
                        </Button>
                    </CardBody>
                </Card>

                <Card variant="filled" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle>Auto-Generate Plan</CardTitle>
                            <CardDescription>
                                Let us create a balanced meal plan for you
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => alert('Auto-generate feature coming soon!')}
                        >
                            Generate Plan
                        </Button>
                    </CardBody>
                </Card>

                <Card variant="filled" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto">
                            <Plus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle>Shopping List</CardTitle>
                            <CardDescription>
                                Generate shopping list from your meal plan
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push('/shopping')}
                        >
                            Create List
                        </Button>
                    </CardBody>
                </Card>
            </section>

            {showMealDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMealDialog(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">
                            {selectedSlot && mealForm.name ? 'Edit Meal' : 'Add Meal'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Meal Name
                                </label>
                                <input
                                    type="text"
                                    value={mealForm.name}
                                    onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., Chicken Biryani"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Time
                                </label>
                                <input
                                    type="text"
                                    value={mealForm.time}
                                    onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., 1:00 PM"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Servings
                                </label>
                                <input
                                    type="number"
                                    value={mealForm.servings}
                                    onChange={(e) => setMealForm({ ...mealForm, servings: parseInt(e.target.value) || 1 })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowMealDialog(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveMeal}
                                className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
