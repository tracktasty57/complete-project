import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  ChefHat,
  Users,
  Utensils,
  Heart,
  Target,
  Lightbulb,
  Shield,
  BookOpen,
  Clock,
  Star
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '../components/ui';

/**
 * About page component for Recipe Finder application
 */
export const About: React.FC = () => {
  const features = [
    {
      name: 'Recipe Discovery',
      role: 'Smart Recipe Suggestions',
      avatar: '/api/placeholder/150/150',
      bio: 'Find perfect recipes based on ingredients you have at home. Our intelligent system suggests meals that match your pantry.',
      skills: ['Smart Search', 'Ingredient Matching', 'Dietary Filters', 'Cuisine Types'],
      icon: ChefHat
    },
    {
      name: 'Kitchen Management',
      role: 'Inventory Tracking',
      avatar: '/api/placeholder/150/150',
      bio: 'Keep track of your kitchen ingredients, expiry dates, and shopping needs all in one convenient place.',
      skills: ['Inventory Tracking', 'Expiry Alerts', 'Shopping Lists', 'Meal Planning'],
      icon: Utensils
    },
    {
      name: 'Meal Planning',
      role: 'Weekly Organization',
      avatar: '/api/placeholder/150/150',
      bio: 'Plan your meals for the week, generate shopping lists automatically, and never wonder "what\'s for dinner?" again.',
      skills: ['Weekly Planning', 'Auto Shopping Lists', 'Nutrition Tracking', 'Calendar Integration'],
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
    { number: '1000+', label: 'Delicious Recipes' },
    { number: '500+', label: 'Happy Cooks' },
    { number: '50+', label: 'Cuisine Types' },
    { number: '24/7', label: 'Recipe Access' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
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

      {/* App Stats */}
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

      {/* Our Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Recipe Finder was born from a simple idea: cooking should be enjoyable, not stressful. 
              We noticed that many people struggle with meal planning, ingredient management, and finding 
              recipes that match what they have at home.
            </p>
            <p>
              Our application combines smart technology with culinary expertise to help you discover 
              amazing recipes based on your available ingredients, manage your kitchen inventory, 
              and plan meals that fit your lifestyle and dietary preferences.
            </p>
            <p>
              Whether you're a beginner cook or a seasoned chef, Recipe Finder adapts to your needs, 
              helping you reduce food waste, save time, and explore new flavors from around the world.
            </p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Link to="/recipes">
              Start Cooking
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <ChefHat className="h-16 w-16 mx-auto" />
              <p className="text-xl font-semibold">Cooking Made Simple</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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

      {/* Key Features */}
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
                  {/* Feature Icon */}
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Feature Info */}
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                    <p className="text-orange-600 font-medium">{feature.role}</p>
                    <CardDescription>{feature.bio}</CardDescription>
                  </div>
                  
                  {/* Feature Capabilities */}
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

      {/* Location & Contact Info */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
          <p className="text-lg text-slate-600">
            Have questions about Recipe Finder? We'd love to hear from you and help with your culinary journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
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
          
          {/* Recipe Showcase */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg h-64 lg:h-full flex items-center justify-center">
            <div className="text-center text-orange-700 space-y-4">
              <ChefHat className="h-16 w-16 mx-auto" />
              <p className="font-bold text-xl">1000+ Recipes</p>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl p-8 lg:p-12 text-center text-white">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of home cooks who have transformed their kitchen experience with Recipe Finder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Link to="/recipes">
                Discover Recipes
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/dashboard">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;