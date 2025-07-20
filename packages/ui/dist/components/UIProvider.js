import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme } from '../theme';
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
export const UIProvider = ({ children, customTheme }) => {
    // Merge custom theme with our accessible base theme
    const finalTheme = customTheme
        ? { ...theme, ...customTheme }
        : theme;
    return (_jsxs(ChakraProvider, { theme: finalTheme, children: [_jsx(CSSReset, {}), children] }));
};
export default UIProvider;
//# sourceMappingURL=UIProvider.js.map