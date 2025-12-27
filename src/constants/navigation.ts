import {
  Home,
  LayoutDashboard,
  ChefHat,
  ShoppingCart,
  Calendar,
  Info,
  Mail,
  LogIn,
  UserPlus,
  Settings,
} from "lucide-react";
import type { NavigationItem } from "../types/navigation";

/**
 * Main navigation items configuration for Recipe Finder
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: Home,
    requiresAuth: false,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    requiresAuth: true,
  },
  {
    id: "recipes",
    label: "Recipes",
    path: "/recipes",
    icon: ChefHat,
    requiresAuth: true,
  },
  {
    id: "shopping",
    label: "Shopping",
    path: "/shopping",
    icon: ShoppingCart,
    requiresAuth: true,
  },
  {
    id: "meal-planner",
    label: "Meal Planner",
    path: "/meal-planner",
    icon: Calendar,
    requiresAuth: true,
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    icon: Info,
    requiresAuth: false,
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    icon: Mail,
    requiresAuth: false,
  },
];

/**
 * Authentication-related navigation items
 */
export const AUTH_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "login",
    label: "Login",
    path: "/login",
    icon: LogIn,
    requiresAuth: false,
  },
  {
    id: "register",
    label: "Register",
    path: "/register",
    icon: UserPlus,
    requiresAuth: false,
  },
];

/**
 * Footer navigation items for Recipe Finder
 */
export const FOOTER_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "footer-home",
    label: "Home",
    path: "/",
    requiresAuth: false,
  },
  {
    id: "footer-recipes",
    label: "Recipes",
    path: "/recipes",
    requiresAuth: false,
  },
  {
    id: "footer-about",
    label: "About",
    path: "/about",
    requiresAuth: false,
  },
  {
    id: "footer-contact",
    label: "Contact",
    path: "/contact",
    requiresAuth: false,
  },
];

/**
 * Social media links for footer
 */
export const SOCIAL_LINKS = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    id: "twitter",
    label: "Twitter",
    url: "https://twitter.com",
    icon: "twitter",
  },
];

/**
 * Navigation configuration constants
 */
export const NAVIGATION_CONFIG = {
  /** Maximum number of navigation items to show in mobile menu */
  MAX_MOBILE_ITEMS: 6,
  /** Animation duration for mobile menu transitions (in ms) */
  MOBILE_MENU_ANIMATION_DURATION: 300,
  /** Breakpoint for mobile navigation (in px) */
  MOBILE_BREAKPOINT: 768,
  /** Default navigation item icon size */
  DEFAULT_ICON_SIZE: 20,
  /** Mobile navigation item icon size */
  MOBILE_ICON_SIZE: 24,
} as const;

/**
 * Route paths constants for Recipe Finder
 */
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  RECIPES: "/recipes",
  KITCHEN: "/kitchen",
  SHOPPING: "/shopping",
  MEAL_PLANNER: "/meal-planner",
  TUTORIALS: "/tutorials",
  SEASONAL: "/seasonal",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  NOT_FOUND: "/404",
} as const;

/**
 * Navigation labels constants
 */
export const NAVIGATION_LABELS = {
  MENU: "Menu",
  CLOSE_MENU: "Close Menu",
  MAIN_NAVIGATION: "Recipe Finder Navigation",
  USER_MENU: "User Menu",
  FOOTER_NAVIGATION: "Footer Navigation",
  SOCIAL_LINKS: "Social Media Links",
} as const;
