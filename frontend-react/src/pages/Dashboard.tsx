import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChefHat,
  ShoppingCart,
  Calendar,

  Plus,
  Utensils,
  Clock,

  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '../components/ui';
import { getUserProfile } from '../services/user.service';
import { getRecipes } from '../services/recipe.service';
import { getShoppingList } from '../services/shoppingList.service';
import { getMealPlan } from '../services/mealPlan.service';
import { getRecentActivities } from '../utils/activityTracker';

/**
 * Recipe Finder Dashboard page component
 */
export const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [statsData, setStatsData] = useState({
    savedRecipes: 0,
    kitchenItems: 0,
    plannedMeals: 0,
    totalCookTime: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('username');
    if (!token) {
      navigate('/login');
    } else {
      setUsername(storedName);
      fetchStats();
      loadActivities();
    }
  }, [navigate]);

  const loadActivities = () => {
    const activities = getRecentActivities();
    setRecentActivities(activities.length > 0 ? activities : [
      {
        action: 'No recent activities yet',
        user: 'System',
        time: '',
        type: 'info'
      }
    ]);
  };

  const parseCookTime = (timeStr: string): number => {
    if (!timeStr) return 0;
    const str = timeStr.toLowerCase();
    let totalMinutes = 0;

    // Extract hours
    const hoursMatch = str.match(/(\d+)\s*(?:h|hr|hour)/);
    if (hoursMatch) {
      totalMinutes += parseInt(hoursMatch[1]) * 60;
    }

    // Extract minutes
    const minsMatch = str.match(/(\d+)\s*(?:m|min)/);
    if (minsMatch) {
      totalMinutes += parseInt(minsMatch[1]);
    }

    // If just a number without units, assume minutes
    if (!hoursMatch && !minsMatch) {
      const numberMatch = str.match(/(\d+)/);
      if (numberMatch) {
        totalMinutes += parseInt(numberMatch[1]);
      }
    }

    return totalMinutes;
  };

  const formatCookTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const fetchStats = async () => {
    try {
      const [userProfile, shoppingList, mealPlan] = await Promise.all([
        getUserProfile(),
        getShoppingList(),
        getMealPlan(new Date())
      ]);

      let plannedMealsCount = 0;
      if (mealPlan && mealPlan.days) {
        Object.values(mealPlan.days).forEach((day: any) => {
          if (day.breakfast) plannedMealsCount++;
          if (day.lunch) plannedMealsCount++;
          if (day.dinner) plannedMealsCount++;
        });
      }

      let totalMinutes = 0;
      if (userProfile.favorites && userProfile.favorites.length > 0) {
        try {
          // Fetch details of favorite recipes to calculate/sum cook time
          const favoriteRecipes = await getRecipes(undefined, undefined, userProfile.favorites);
          totalMinutes = favoriteRecipes.reduce((acc, recipe) => {
            return acc + parseCookTime(recipe.cookTime);
          }, 0);
        } catch (e) {
          console.error("Error fetching favorite recipes details", e);
        }
      }

      setStatsData({
        savedRecipes: userProfile.favorites?.length || 0,
        kitchenItems: shoppingList.items ? shoppingList.items.length : 0,
        plannedMeals: plannedMealsCount,
        totalCookTime: totalMinutes
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const stats = [
    {
      title: 'Saved Recipes',
      value: statsData.savedRecipes.toString(),
      change: '+5 this week',
      trend: 'up',
      icon: ChefHat,
      color: 'text-orange-600'
    },
    {
      title: 'Shopping Items',
      value: statsData.kitchenItems.toString(),
      change: '+3 new items',
      trend: 'up',
      icon: Utensils,
      color: 'text-green-600'
    },
    {
      title: 'Planned Meals',
      value: statsData.plannedMeals.toString(),
      change: 'This week',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Total Cooking Time',
      value: formatCookTime(statsData.totalCookTime),
      change: 'For saved recipes',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Find Recipes',
      description: 'Get recipe suggestions based on your ingredients',
      icon: ChefHat,
      link: '/recipes',
      color: 'bg-orange-500'
    },

    {
      title: 'Shopping List',
      description: 'Create and manage your shopping lists',
      icon: ShoppingCart,
      link: '/shopping',
      color: 'bg-blue-500'
    },
    {
      title: 'Plan Meals',
      description: 'Organize your weekly meal schedule',
      icon: Calendar,
      link: '/meal-planner',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Welcome{username ? `, ${username} ` : ''}! 
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Here’s your cooking overview and quick access to all features.
          </p>
        </div>
        <div className="flex justify-end">
          <Button size="lg" className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Link to="/add-recipe" className="flex items-center">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Add Recipe
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              variant="elevated"
              hoverable
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100} ms` }}
            >
              <CardBody className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div className={`p - 3 rounded - 2xl bg - gradient - to - br from - white to - slate - 50 shadow - lg group - hover: shadow - xl group - hover: scale - 110 transition - all duration - 300`}>
                    <Icon className={`h - 6 w - 6 ${stat.color} `} />
                  </div>
                  <span className={`text - sm font - semibold px - 3 py - 1 rounded - full ${stat.trend === 'up'
                    ? 'text-emerald-700 bg-emerald-100'
                    : 'text-red-700 bg-red-100'
                    } `}>
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{stat.value}</p>
                  <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Quick Actions</h2>
            <p className="text-slate-600">Jump into your favorite cooking activities</p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                hoverable
                clickable
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100} ms` }}
              >
                <CardBody className="space-y-6 p-6">
                  <div className={`w - 16 h - 16 ${action.color} rounded - 2xl flex items - center justify - center shadow - lg group - hover: shadow - xl group - hover: scale - 110 transition - all duration - 300 relative overflow - hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <Icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{action.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{action.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group-hover:border-orange-400 group-hover:text-orange-600">
                    <Link to={action.link} className="w-full flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="max-w-2xl">
        <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <p className="text-sm text-slate-600">Your latest cooking activities</p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-orange-50/50 transition-all duration-300 group cursor-pointer">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-600">
                      by {activity.user}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;