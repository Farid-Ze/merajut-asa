'use client';

import { ChakraProvider as ChakraProviderOriginal, extendTheme } from '@chakra-ui/react';
import { theme } from '@merajut-asa/ui';
import React from 'react';

// Create the extended theme using ChakraUI's extendTheme
// This is now done here in the web app, not in the UI package
const finalTheme = extendTheme(theme);

/**
 * ChakraProvider wrapper for the web application
 * Uses the theme object from @merajut-asa/ui but processes it with Chakra UI directly in the web app
 */
function ChakraAppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProviderOriginal theme={finalTheme}>
            {children}
        </ChakraProviderOriginal>
    );
}

export default ChakraAppProvider;
