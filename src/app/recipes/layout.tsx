"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function RecipesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
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
                {children}
            </Layout>
        </ProtectedRoute>
    );
}
