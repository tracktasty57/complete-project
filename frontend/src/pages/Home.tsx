import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, ShoppingCart, Calendar, Leaf, Zap } from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button } from '../components/ui';

/**
 * Home page component for Recipe Finder application
 */
export const Home: React.FC = () => {
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
      color: 'bg-orange-500',
      icon: ChefHat
    },
    {
      title: 'Shopping Lists',
      description: 'Keep track of your ingredients and never run out of essentials.',
      link: '/shopping',
      color: 'bg-green-500',
      icon: ShoppingCart
    },
    {
      title: 'Meal Planning',
      description: 'Plan your meals ahead and create organized shopping lists.',
      link: '/meal-planner',
      color: 'bg-blue-500',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-orange-800 text-sm font-medium mb-4 animate-bounce">
              🍳 Your Culinary Journey Starts Here
            </div>
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
              <Link to="/dashboard" className="flex items-center">
                Start Cooking
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="w-full sm:w-auto group"
              leftIcon={<ChefHat className="h-5 w-5 group-hover:rotate-12 transition-transform" />}
            >
              <Link to="/recipes">
                Browse Recipes
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-800 text-sm font-medium">
              ✨ Powerful Features
            </div>
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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 text-sm font-medium">
              🚀 Main Features
            </div>
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
                    <div className={`w-full h-40 ${service.color} relative flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <Icon className="h-12 w-12 text-white relative z-10 group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{service.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                      <Link 
                        to={service.link}
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
          
          <div className="text-center">
            <Button variant="outline" size="xl" className="group">
              <Link to="/dashboard" className="flex items-center">
                Explore All Features
                <Zap className="ml-2 h-5 w-5 group-hover:text-yellow-500 transition-colors" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-orange-600 via-red-500 to-green-500 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-red-500/90 to-green-500/90"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  🎉 Join Our Community
                </div>
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
                  <Link to="/dashboard" className="flex items-center">
                    <ChefHat className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Cooking Now
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 group"
                >
                  <Link to="/recipes" className="flex items-center">
                    Browse Recipes
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;