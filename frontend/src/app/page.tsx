"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChefHat, ShoppingCart, Calendar, Leaf } from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button } from '@/components/ui';
import { DynamicLayout } from '@/components/DynamicLayout';

export default function Home() {
  const features = [
    {
      icon: ChefHat,
      title: 'Smart Recipe Suggestions',
      description: 'Get personalized recipe recommendations based on ingredients you have in your kitchen.'
    },
    {
      icon: Calendar,
      title: 'Meal Planning',
      description: 'Plan your weekly and monthly meals with our intuitive meal planning tool.'
    },
    {
      icon: Leaf,
      title: 'Seasonal Ingredients',
      description: 'Discover fresh, seasonal ingredients available in your region throughout the year.'
    }
  ];

  const services = [
    {
      title: 'Recipe Suggestions',
      description: 'Find perfect recipes based on what you have in your kitchen right now.',
      link: '/recipes',
      image: '/recipe_suggestions.png',
      icon: ChefHat
    },
    {
      title: 'Shopping Lists',
      description: 'Keep track of your ingredients and never run out of essentials.',
      link: '/shopping',
      image: '/shopping_list.png',
      icon: ShoppingCart
    },
    {
      title: 'Meal Planning',
      description: 'Plan your meals ahead and create organized shopping lists.',
      link: '/meal-planner',
      image: '/meal_planning.png',
      icon: Calendar
    }
  ];

  return (
    <DynamicLayout>
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-green-500 animate-gradient-x">
                Recipe Finder
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Discover delicious recipes, manage your kitchen ingredients, plan your meals, and explore seasonal cooking.
              <span className="block mt-2 text-orange-600 font-medium">Your complete culinary companion for a healthier, more organized kitchen life.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Button
              size="xl"
              className="w-full sm:w-auto group relative overflow-hidden"
              rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            >
              <Link href="/dashboard" className="flex items-center">
                Start Cooking
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto group"
              leftIcon={<ChefHat className="h-5 w-5 group-hover:rotate-12 transition-transform" />}
            >
              <Link href="/recipes">
                Browse Recipes
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                Recipe Finder?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your cooking experience with smart features designed to make meal planning and cooking easier than ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  variant="elevated"
                  hoverable
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardBody className="space-y-6 p-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Services Preview Section */}
        <section className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Everything You Need for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Perfect Cooking
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage your kitchen, discover recipes, and plan delicious meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  hoverable
                  clickable
                  className="group overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardBody className="space-y-6 p-0">
                    <div className="w-full h-48 relative overflow-hidden group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{service.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                      <Link
                        href={service.link}
                        className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium group-hover:translate-x-2 transition-transform"
                      >
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-orange-600 via-red-500 to-green-500 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-red-500/90 to-green-500/90"></div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Ready to Start Your{' '}
                  <span className="text-yellow-300">Culinary Adventure?</span>
                </h2>
                <p className="text-xl sm:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of home cooks who use Recipe Finder to discover amazing recipes and organize their kitchen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  variant="secondary"
                  size="xl"
                  className="group bg-white text-orange-600 hover:bg-orange-50"
                >
                  <Link href="/dashboard" className="flex items-center">
                    <ChefHat className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Cooking Now
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 group"
                >
                  <Link href="/recipes" className="flex items-center">
                    Browse Recipes
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DynamicLayout>
  );
}
