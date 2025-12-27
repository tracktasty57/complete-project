import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Users,
  ChefHat,
  Heart,
  Star,
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button, Input } from '../components/ui';
import { getRecipes } from '../services/recipe.service';
import { getUserProfile, toggleFavorite, toggleLike } from '../services/user.service';
import type { Recipe } from '../types/recipe';

/**
 * Recipes page component for discovering and browsing recipes
 */
export const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());

  // Fetch user profile on mount to get likes/favorites
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile();
        setFavorites(new Set(profile.favorites));
        setLikedRecipes(new Set(profile.likedRecipes));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleToggleLike = async (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    const isLiked = likedRecipes.has(recipeId);

    // Optimistic update
    const newLiked = new Set(likedRecipes);
    if (isLiked) newLiked.delete(recipeId);
    else newLiked.add(recipeId);
    setLikedRecipes(newLiked);

    try {
      await toggleLike(recipeId);
    } catch (error) {
      // Revert on error
      console.error('Error toggling like:', error);
      setLikedRecipes(likedRecipes);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    const isFav = favorites.has(recipeId);

    // Optimistic update
    const newFavs = new Set(favorites);
    if (isFav) newFavs.delete(recipeId);
    else newFavs.add(recipeId);
    setFavorites(newFavs);

    try {
      await toggleFavorite(recipeId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setFavorites(favorites);
    }
  };

  const categories = [
    { id: 'all', label: 'All Recipes', count: 1000 },
    { id: 'favorites', label: 'My Favorites', count: favorites.size },
    { id: 'liked_recipes', label: 'Liked Recipes', count: likedRecipes.size },
    { id: 'breakfast', label: 'Breakfast', count: 150 },
    { id: 'lunch', label: 'Lunch', count: 300 },
    { id: 'dinner', label: 'Dinner', count: 400 },
    { id: 'dessert', label: 'Desserts', count: 100 },
    { id: 'snacks', label: 'Snacks', count: 50 }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        let idsToFetch: string[] | undefined;

        if (selectedCategory === 'favorites') {
          idsToFetch = Array.from(favorites);
          if (idsToFetch.length === 0) {
            setRecipes([]);
            setLoading(false);
            return;
          }
        } else if (selectedCategory === 'liked_recipes') {
          idsToFetch = Array.from(likedRecipes);
          if (idsToFetch.length === 0) {
            setRecipes([]);
            setLoading(false);
            return;
          }
        }

        const data = await getRecipes(selectedCategory, searchQuery, idsToFetch);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery, favorites, likedRecipes]);

  const filteredRecipes = recipes;

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Discover Amazing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
              Recipes
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our collection of delicious Pakistani and international recipes.
            Find the perfect dish for any occasion.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search recipes, ingredients, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
          <Button variant="outline" size="sm" className="group">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${selectedCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-300 hover:text-orange-600'
                }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedCategory === 'all' ? 'Featured Recipes' : `${categories.find(c => c.id === selectedCategory)?.label} Recipes`}
          </h2>
          <p className="text-slate-600">
            Showing {filteredRecipes.length} recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">Loading recipes...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No recipes found.</p>
            </div>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <Card
                key={recipe._id}
                hoverable
                clickable
                className="group animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Recipe Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-200 to-red-200 overflow-hidden">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ChefHat className="h-16 w-16 text-orange-500 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      onClick={(e) => handleToggleLike(e, recipe._id)}
                    >
                      <Heart className={`h-4 w-4 transition-colors ${likedRecipes.has(recipe._id) ? 'text-red-500 fill-red-500' : 'text-slate-600 hover:text-red-500'}`} />
                    </button>
                    <button
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      onClick={(e) => handleToggleFavorite(e, recipe._id)}
                    >
                      <Bookmark className={`h-4 w-4 transition-colors ${favorites.has(recipe._id) ? 'text-orange-500 fill-orange-500' : 'text-slate-600 hover:text-orange-500'}`} />
                    </button>
                  </div>
                </div>

                <CardBody className="space-y-4">
                  {/* Recipe Info */}
                  <div className="space-y-2">
                    <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {recipe.description}
                    </CardDescription>
                  </div>

                  {/* Recipe Meta */}
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{recipe.rating || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          +{recipe.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-orange-400 group-hover:text-orange-600"
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                  >
                    View Recipe
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardBody>
              </Card>
            )))}
        </div>
      </section>

      {/* Load More */}
      <section className="text-center">
        <Button size="lg" variant="outline" className="group">
          Load More Recipes
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </section>
    </div>
  );
};

export default Recipes;