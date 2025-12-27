"use client";

import { useState, useEffect } from 'react';
import { Layout } from './layout';
import type { LayoutComponentProps } from './layout/Layout';

interface DynamicLayoutProps extends Omit<LayoutComponentProps, 'headerProps'> {
    headerProps?: Omit<LayoutComponentProps['headerProps'], 'isAuthenticated'>;
}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({
    children,
    headerProps = {},
    ...layoutProps
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    return (
        <Layout
            {...layoutProps}
            headerProps={{
                brandText: "Recipe Finder",
                showAuthLinks: true,
                ...headerProps,
                isAuthenticated
            }}
        >
            {children}
        </Layout>
    );
};

export default DynamicLayout;
