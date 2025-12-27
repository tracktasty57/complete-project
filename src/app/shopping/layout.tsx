"use client";

import React from 'react';
import { Layout } from '@/components/layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ShoppingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <Layout
                title="Shopping List - Recipe Finder"
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
