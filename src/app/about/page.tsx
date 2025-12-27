"use client";

import React from 'react';
import Link from 'next/link';
import {
    MapPin,
    Mail,
    Phone,
    Calendar,
    ChefHat,
    Users,
    Utensils,
    Target,
    Lightbulb,
    Shield,
    Clock,
    Star
} from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button } from '@/components/ui';
import DynamicLayout from '@/components/DynamicLayout';

export default function AboutPage() {
    const features = [
        {
            name: 'Recipe Discovery',
            role: 'Smart Recipe Suggestions',
            avatar: '/api/placeholder/150/150',
            bio: 'Browse and discover amazing recipes from around the world. Create your own recipes and save your favorites for quick access.',
            skills: ['Recipe Browsing', 'Create Recipes', 'Save Favorites', 'Search & Filter'],
            icon: ChefHat
        },
        {
            name: 'Shopping Lists',
            role: 'Smart Grocery Management',
            avatar: '/api/placeholder/150/150',
            bio: 'Create and manage shopping lists with ease. Share lists with family, export to CSV, and never forget an ingredient again.',
            skills: ['List Management', 'Share Lists', 'Export to CSV', 'Item Tracking'],
            icon: Utensils
        },
        {
            name: 'Meal Planning',
            role: 'Weekly Organization',
            avatar: '/api/placeholder/150/150',
            bio: 'Plan your meals for the week ahead. Organize breakfast, lunch, and dinner, and share your meal plans with others.',
            skills: ['Weekly Planning', 'Meal Scheduling', 'Share Plans', 'Export Plans'],
            icon: Calendar
        }
    ];

    const values = [
        {
            icon: Target,
            title: 'Simplicity',
            description: 'Making cooking and meal planning simple and enjoyable for everyone, regardless of cooking experience.'
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'Using modern technology to solve everyday cooking challenges and inspire culinary creativity.'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a community of food lovers who share recipes, tips, and cooking experiences.'
        },
        {
            icon: Shield,
            title: 'Quality',
            description: 'Providing reliable, tested recipes and accurate nutritional information you can trust.'
        }
    ];

    const stats = [
        { number: '100+', label: 'Delicious Recipes' },
        { number: '50+', label: 'Active Users' },
        { number: '20+', label: 'Cuisine Types' },
        { number: '24/7', label: 'Recipe Access' }
    ];

    return (
        <DynamicLayout>
            <div className="space-y-16">
                <section className="text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                            About{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                                Recipe Finder
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Your ultimate culinary companion that transforms the way you discover, plan, and prepare delicious meals.
                            Making cooking accessible, enjoyable, and stress-free for everyone.
                        </p>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center space-y-2">
                                <p className="text-3xl lg:text-4xl font-bold text-orange-600">{stat.number}</p>
                                <p className="text-slate-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Recipe Finder was born from a simple idea: cooking should be enjoyable, not stressful.
                                We created this platform to help home cooks discover new recipes, organize their meal planning,
                                and manage their shopping lists all in one convenient place.
                            </p>
                            <p>
                                Our application combines modern web technology with intuitive design to help you browse
                                amazing recipes from around the world, create and save your own recipes, plan your weekly
                                meals, and generate shopping lists that you can share with family and friends.
                            </p>
                            <p>
                                Whether you're a beginner cook or a seasoned chef, Recipe Finder adapts to your needs,
                                helping you stay organized, save time, and explore new flavors. Built as a university
                                project at the University of Gujrat, Pakistan, with passion for both technology and food.
                            </p>
                        </div>
                        <Link href="/recipes">
                            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                Start Cooking
                            </Button>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/recipe_finder_hero.png"
                                alt="Recipe Finder Application"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">What We Believe</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            These core principles guide our approach to making cooking accessible and enjoyable for everyone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} variant="elevated" className="text-center">
                                    <CardBody className="space-y-4">
                                        <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Icon className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <CardTitle>{value.title}</CardTitle>
                                        <CardDescription>{value.description}</CardDescription>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">Key Features</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Discover the powerful features that make Recipe Finder your perfect kitchen companion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} variant="elevated" className="text-center">
                                    <CardBody className="space-y-6">
                                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                            <Icon className="h-10 w-10 text-white" />
                                        </div>

                                        <div className="space-y-2">
                                            <CardTitle className="text-xl">{feature.name}</CardTitle>
                                            <p className="text-orange-600 font-medium">{feature.role}</p>
                                            <CardDescription>{feature.bio}</CardDescription>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-slate-900">Capabilities:</h4>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {feature.skills.map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12 space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
                        <p className="text-lg text-slate-600">
                            Have questions about Recipe Finder? We'd love to hear from you and help with your culinary journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-slate-900">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Location</p>
                                        <p className="text-slate-600">University of Gujrat</p>
                                        <p className="text-slate-600">Gujrat, Punjab, Pakistan</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Phone</p>
                                        <p className="text-slate-600">+92 300 1234567</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Email</p>
                                        <p className="text-slate-600">tracktasty57@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="font-medium text-slate-900">Support Hours</p>
                                        <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM PKT</p>
                                        <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM PKT</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg h-64 lg:h-full flex items-center justify-center">
                            <div className="text-center text-orange-700 space-y-4">
                                <ChefHat className="h-16 w-16 mx-auto" />
                                <p className="font-bold text-xl">100+ Recipes</p>
                                <p className="text-sm">From around the world</p>
                                <div className="flex justify-center space-x-2 mt-4">
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl p-8 lg:p-12 text-center text-white">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            Ready to Start Cooking?
                        </h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            Join thousands of home cooks who have transformed their kitchen experience with Recipe Finder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/recipes">
                                <Button variant="secondary" size="lg">
                                    Discover Recipes
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </DynamicLayout>
    );
}
