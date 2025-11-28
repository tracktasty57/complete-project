# Recipe Finder 🍳 + React + TypeScript + Vite

This project provides a complete setup for a *Recipe Finder* built using *React, **TypeScript, and **Vite*.  
It offers a dashboard where users can explore recipes, plan meals, calculate nutritional values, and manage shopping lists — all integrated with MongoDB and the Nutrition API.

---

## Project Overview

This application includes a full set of pages and features:

- *Home / Landing Page:* Overview of the app and navigation links.
- *Login & Registration Pages:* Forms for secure authentication.
- *Dashboard:* Central page displaying meal plans, recipes, and saved data.
- *Meal Planner:* Create, edit, and view daily or weekly meal plans.
- *Recipes:* Fetch and display calories, protein, fat, and carbs dynamically using *Nutrition API* and *MongoDB aggregation*.
- *Shopping List:* Save kitchen or grocery items.
- *Services, About, Contact Pages:* App info, service details, and contact form.
- *Footer Section:* Basic navigation and credits.

---

## Project Pages

| Page | File |
|------|------|
| Home | Home.tsx |
| About | About.tsx |
| Contact | Contact.tsx |
| Dashboard | Dashboard.tsx |
| Login | Login.tsx |
| Register | Register.tsx |
| Meal Planner | MealPlanner.tsx |
| Recipes | Recipes.tsx |
| Services | Services.tsx |
| Shopping List | Shopping.tsx |
| App Entry | index.ts |

---

## Technologies Used

- *Frontend:* React + TypeScript + Vite  
- *Styling:* Tailwind CSS / CSS Modules  
- *Backend:* Node.js + Express  
- *Database:* MongoDB  
- *API:* Nutrition API for calculating nutrition values  

---

## Installation and Setup

```bash
# Clone this repository
git clone https://github.com/yourusername/recipe-finder.git

# Navigate to the project directory
cd recipe-finder

# Install dependencies
npm install

# Run the development server
npm run dev
