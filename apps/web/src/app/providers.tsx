'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { theme as uiTheme } from '@merajut-asa/ui'
import React from 'react'
import localTheme from '../theme'

// Merge the UI package theme with local theme customizations
const chakraTheme = extendTheme({
  ...uiTheme,
  // Apply local theme overrides last to ensure they take precedence
  ...localTheme
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      {children}
    </ChakraProvider>
  )
}
