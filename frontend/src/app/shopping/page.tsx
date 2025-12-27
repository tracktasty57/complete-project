"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Trash2,
    Check,
    ShoppingCart,
    Edit3,
    Download,
    Share2,
    Search,
    Carrot,
    Beef,
    Milk,
    Wheat,
    Flame,
    Package
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button, Input } from '@/components/ui';
import { getShoppingList, addItem as apiAddItem, updateItem, deleteItem as apiDeleteItem } from '@/services/shoppingList.service';
import type { ShoppingItem } from '@/types/shoppingList';

export default function ShoppingPage() {
    const router = useRouter();
    const [newItem, setNewItem] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [editForm, setEditForm] = useState({ name: '', quantity: '', category: 'pantry', priority: 'medium' as 'low' | 'medium' | 'high' });

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const fetchShoppingList = async () => {
        try {
            setLoading(true);
            const data = await getShoppingList();
            if (data && data.items) {
                setShoppingItems(data.items);
            }
        } catch (error) {
            console.error('Error fetching shopping list:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: 'all', label: 'All Items', icon: ShoppingCart },
        { id: 'vegetables', label: 'Vegetables', icon: Carrot },
        { id: 'meat', label: 'Meat & Fish', icon: Beef },
        { id: 'dairy', label: 'Dairy', icon: Milk },
        { id: 'grains', label: 'Grains & Rice', icon: Wheat },
        { id: 'spices', label: 'Spices', icon: Flame },
        { id: 'pantry', label: 'Pantry', icon: Package }
    ];

    const addItem = async () => {
        if (newItem.trim()) {
            try {
                const item: Partial<ShoppingItem> = {
                    id: Date.now(),
                    name: newItem.trim(),
                    category: 'pantry',
                    quantity: '1 unit',
                    completed: false,
                    priority: 'medium'
                };
                await apiAddItem(item);
                setNewItem('');
                fetchShoppingList();
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const toggleItem = async (id: number) => {
        const item = shoppingItems.find(i => i.id === id);
        if (item) {
            try {
                await updateItem(id, { completed: !item.completed });
                fetchShoppingList();
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await apiDeleteItem(id);
            fetchShoppingList();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEditItem = (item: ShoppingItem) => {
        setEditingItem(item);
        setEditForm({
            name: item.name,
            quantity: item.quantity,
            category: item.category,
            priority: item.priority
        });
        setShowEditDialog(true);
    };

    const handleSaveEdit = async () => {
        if (!editingItem || !editForm.name) return;

        try {
            await updateItem(editingItem.id, editForm);
            setShowEditDialog(false);
            fetchShoppingList();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleShareList = async () => {
        const listText = filteredItems
            .map((item, index) => `${index + 1}. ${item.completed ? '✓' : '☐'} ${item.name} - ${item.quantity}`)
            .join('\n');

        const shareText = `My Shopping List:\n\n${listText}\n\nTotal Items: ${filteredItems.length}\nCompleted: ${completedCount}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Shopping List',
                    text: shareText,
                });
            } catch (error) {
                console.log('Error sharing:', error);
                copyToClipboard(shareText);
            }
        } else {
            copyToClipboard(shareText);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Shopping list copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    const handleExport = () => {
        const headers = ['Item Name', 'Quantity', 'Category', 'Priority', 'Completed'];
        const rows = filteredItems.map(item => [
            item.name,
            item.quantity,
            item.category,
            item.priority,
            item.completed ? 'Yes' : 'No'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `shopping-list-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredItems = shoppingItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const completedCount = shoppingItems.filter(item => item.completed).length;
    const totalCount = shoppingItems.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="space-y-12">
            <section className="text-center space-y-8 animate-fade-in">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                        Shopping{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                            Lists
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Organize your grocery shopping with smart lists. Never forget an ingredient again!
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" className="animate-fade-in-up">
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                            <ShoppingCart className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{totalCount}</p>
                            <p className="text-slate-600">Total Items</p>
                        </div>
                    </CardBody>
                </Card>

                <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                            <Check className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
                            <p className="text-slate-600">Completed</p>
                        </div>
                    </CardBody>
                </Card>

                <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <CardBody className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
                            <div className="text-white font-bold text-lg">
                                {Math.round(progressPercentage)}%
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{Math.round(progressPercentage)}%</p>
                            <p className="text-slate-600">Progress</p>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <Card variant="elevated" className="animate-fade-in-up">
                    <CardHeader>
                        <CardTitle className="text-xl">Add New Item</CardTitle>
                        <CardDescription>
                            Add ingredients and items to your shopping list
                        </CardDescription>
                    </CardHeader>
                    <CardBody>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Enter item name (e.g., Basmati Rice, Chicken, Tomatoes...)"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                                    className="text-lg"
                                />
                            </div>
                            <Button
                                onClick={addItem}
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Item
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 group ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-400 hover:bg-orange-50/30'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 ${selectedCategory === category.id ? 'text-white' : 'text-orange-500'} group-hover:scale-110 transition-transform`} />
                                    <span>{category.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Button variant="outline" size="sm" onClick={handleShareList}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share List
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Your Shopping List
                    </h2>
                    <p className="text-slate-600">
                        {filteredItems.length} items
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600">Loading shopping list...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <Card variant="elevated">
                        <CardBody className="text-center py-12">
                            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-600 mb-2">No items found</h3>
                            <p className="text-slate-500">
                                {searchQuery || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Add some items to get started with your shopping list'
                                }
                            </p>
                        </CardBody>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredItems.map((item, index) => (
                            <Card
                                key={item.id}
                                variant="elevated"
                                className={`animate-fade-in-up transition-all duration-300 ${item.completed ? 'opacity-75 bg-green-50/50' : ''
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <CardBody>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${item.completed
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-slate-300 hover:border-orange-500'
                                                    }`}
                                            >
                                                {item.completed && <Check className="h-4 w-4" />}
                                            </button>

                                            <div className="flex-1">
                                                <h3 className={`font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'
                                                    }`}>
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-slate-600">
                                                    <span>Quantity: {item.quantity}</span>
                                                    <span className="capitalize">Category: {item.category}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                        {item.priority} priority
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditItem(item)}
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteItem(item.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            <section className="max-w-2xl mx-auto">
                <Card variant="filled" className="animate-fade-in-up">
                    <CardBody className="text-center space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto">
                            <Plus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle>Quick Add from Recipes</CardTitle>
                            <CardDescription>
                                Automatically add ingredients from your saved recipes
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push('/recipes')}
                        >
                            Browse Recipes
                        </Button>
                    </CardBody>
                </Card>
            </section>

            {showEditDialog && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEditDialog(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., Tomatoes"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="text"
                                    value={editForm.quantity}
                                    onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., 2 kg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={editForm.category}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    {categories.filter(c => c.id !== 'all').map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    value={editForm.priority}
                                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowEditDialog(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveEdit}
                                className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
