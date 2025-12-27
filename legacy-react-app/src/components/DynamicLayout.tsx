import { useState, useEffect } from 'react';
import { Layout } from './layout';
import type { LayoutComponentProps } from './layout/Layout';

interface DynamicLayoutProps extends Omit<LayoutComponentProps, 'headerProps'> {
    headerProps?: Omit<LayoutComponentProps['headerProps'], 'isAuthenticated'>;
}

/**
 * Layout wrapper that dynamically checks authentication status
 */
export const DynamicLayout: React.FC<DynamicLayoutProps> = ({
    children,
    headerProps = {},
    ...layoutProps
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on mount and when storage changes
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        checkAuth();

        // Listen for storage changes (e.g., login/logout in another tab)
        window.addEventListener('storage', checkAuth);

        // Custom event for same-tab auth changes
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
