import React from 'react';
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
export declare const UIProvider: React.FC<UIProviderProps>;
export default UIProvider;
//# sourceMappingURL=UIProvider.d.ts.map