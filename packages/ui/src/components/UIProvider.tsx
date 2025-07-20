import React from 'react';

/**
 * @deprecated Use ChakraAppProvider from the web app instead.
 * This component is kept for backward compatibility but will no longer wrap with ChakraProvider.
 */
export interface UIProviderProps {
    children: React.ReactNode;
    /**
     * Custom theme override (will be merged with default accessible theme)
     * @deprecated Theme customization should be done in the ChakraAppProvider
     */
    customTheme?: Record<string, any>;
}

/**
 * UI Provider that passes through children.
 * 
 * @deprecated For Next.js applications, use the ChakraAppProvider in apps/web/src/providers/ChakraProvider.tsx instead
 * 
 * This component is kept for backward compatibility but is now a simple passthrough.
 * The ChakraUI provider has been moved to the web app to avoid module resolution issues.
 */
export const UIProvider: React.FC<UIProviderProps> = ({
    children
}) => {
    console.warn(
        '[Deprecated] UIProvider from @merajut-asa/ui is now a passthrough component. ' +
        'Use ChakraAppProvider from apps/web/src/providers/ChakraProvider.tsx instead.'
    );

    return <>{children}</>;
};

export default UIProvider;
