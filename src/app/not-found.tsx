"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';

export default function NotFound() {
    const router = useRouter();

    return (
        <Layout
            title="Page Not Found - Recipe Finder"
            showFooter={false}
        >
            <div className="text-center space-y-6 py-16">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-slate-900">404</h1>
                    <h2 className="text-2xl font-semibold text-slate-700">Page Not Found</h2>
                    <p className="text-slate-600 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </Layout>
    );
}
