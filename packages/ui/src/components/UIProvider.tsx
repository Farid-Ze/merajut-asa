import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../theme';

export interface UIProviderProps {
    children: React.ReactNode;
    /**
     * Custom theme override (will be merged with default accessible theme)
     */
    customTheme?: Record<string, any>;
}

/**
 * UI Provider that wraps the application with Chakra UI and accessibility-focused theme
 * 
 * Features:
 * - Pre-configured WCAG 2.1 AA compliant theme
 * - High contrast colors and focus indicators
 * - Minimum touch targets (44px)
 * - Semantic color tokens
 * - CSS reset for consistent cross-browser rendering
 * 
 * @example
 * ```tsx
 * // In your app root (layout.tsx or _app.tsx)
 * <UIProvider>
 *   <App />
 * </UIProvider>
 * ```
 */
export const UIProvider: React.FC<UIProviderProps> = ({
    children,
    customTheme
}) => {
    // Merge custom theme with our accessible base theme
    const finalTheme = customTheme
        ? { ...theme, ...customTheme }
        : theme;

    return (
        <ChakraProvider theme={finalTheme}>
            <CSSReset />
            {children}
        </ChakraProvider>
    );
};

export default UIProvider;
