import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { DynamicLayout } from './components/DynamicLayout'
import ProtectedRoute from './components/ProtectedRoute' // ✅ Added import
import {
  Home,
  Dashboard,
  Recipes,
  Shopping,
  MealPlanner,
  Services,
  About,
  Contact,
  Login,
  Register,
  RecipeDetail,
  AddRecipe
} from './pages'
import './App.css'

// 404 Not Found component
const NotFound = () => (
  <div className="text-center space-y-6 py-16">
    <div className="space-y-4">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Home
      </a>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
)

function App() {
  return (
    <Routes>
      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public home page */}
      <Route
        path="/"
        element={
          <DynamicLayout
            title="Recipe Finder - Your Culinary Companion"
            description="Discover amazing recipes, manage your kitchen, and plan delicious meals with Recipe Finder"
            footerProps={{
              projectName: "Recipe Finder",
              showSocialLinks: true,
              showNavigationLinks: true
            }}
          >
            <Home />
          </DynamicLayout>
        }
      />

      {/* ✅ Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout
              title="Dashboard - Recipe Finder"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes"
        element={
          <ProtectedRoute>
            <Layout
              title="Recipes - Recipe Finder"
              description="Discover delicious recipes from around the world"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <Recipes />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recipes/:id"
        element={
          <ProtectedRoute>
            <Layout
              title="Recipe Details - Recipe Finder"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <RecipeDetail />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-recipe"
        element={
          <ProtectedRoute>
            <Layout
              title="Add New Recipe - Recipe Finder"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <AddRecipe />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-recipe/:id"
        element={
          <ProtectedRoute>
            <Layout
              title="Edit Recipe - Recipe Finder"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <AddRecipe />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback for edit-recipe without ID */}
      <Route
        path="/edit-recipe"
        element={
          <ProtectedRoute>
            <Layout title="Recipe Finder"><NotFound /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/shopping"
        element={
          <ProtectedRoute>
            <Layout
              title="Shopping List - Recipe Finder"
              description="Organize your grocery shopping with smart lists"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <Shopping />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/meal-planner"
        element={
          <ProtectedRoute>
            <Layout
              title="Meal Planner - Recipe Finder"
              description="Plan your weekly meals in advance"
              headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                isAuthenticated: true
              }}
            >
              <MealPlanner />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Other public pages */}
      <Route
        path="/services"
        element={
          <DynamicLayout
            title="Our Services - Recipe Finder"
            description="Comprehensive culinary solutions for home cooks"
          >
            <Services />
          </DynamicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <DynamicLayout
            title="About Us - Recipe Finder"
            description="Learn about Recipe Finder and our mission to make cooking enjoyable"
          >
            <About />
          </DynamicLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <DynamicLayout
            title="Contact Us - Recipe Finder"
            description="Get in touch with the Recipe Finder team"
          >
            <Contact />
          </DynamicLayout>
        }
      />

      {/* 404 page */}
      <Route
        path="*"
        element={
          <Layout
            title="Page Not Found - Recipe Finder"
            showFooter={false}
          >
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
