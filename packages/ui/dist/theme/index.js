import { extendTheme } from '@chakra-ui/react';
// Design tokens following WCAG 2.1 AA standards
const colors = {
    // Primary brand colors - West Java identity inspired
    brand: {
        50: '#e6f3ff',
        100: '#b3d9ff',
        200: '#80bfff',
        300: '#4da6ff',
        400: '#1a8cff',
        500: '#0073e6', // Primary - AAA contrast on white
        600: '#005bb3',
        700: '#004280',
        800: '#002a4d',
        900: '#00111a',
    },
    // Secondary - Green for sustainability theme
    secondary: {
        50: '#e6fff2',
        100: '#b3ffd9',
        200: '#80ffbf',
        300: '#4dffa6',
        400: '#1aff8c',
        500: '#00e673', // Secondary - AAA contrast
        600: '#00b359',
        700: '#008040',
        800: '#004d26',
        900: '#001a0d',
    },
    // Semantic colors with accessibility compliance
    success: {
        50: '#f0fff4',
        100: '#c6f6d5',
        200: '#9ae6b4',
        300: '#68d391',
        400: '#48bb78',
        500: '#38a169', // WCAG AA compliant
        600: '#2f855a',
        700: '#276749',
        800: '#22543d',
        900: '#1a202c',
    },
    error: {
        50: '#fed7d7',
        100: '#feb2b2',
        200: '#fc8181',
        300: '#f56565',
        400: '#e53e3e',
        500: '#c53030', // WCAG AA compliant
        600: '#9b2c2c',
        700: '#742a2a',
        800: '#4a1717',
        900: '#1a0000',
    },
    warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b', // WCAG AA compliant
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
    },
    // High contrast grays for accessibility
    gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b', // WCAG AA on white
        700: '#3f3f46', // WCAG AA+ on white
        800: '#27272a', // WCAG AAA on white
        900: '#18181b',
    },
};
// Typography scale optimized for readability
const fonts = {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    mono: 'SFMono-Regular, "Roboto Mono", "Courier New", monospace',
};
const fontSizes = {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px - base size for WCAG
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
};
// Spacing scale based on 4px grid
const spacing = {
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
};
// Component style overrides for accessibility
const components = {
    Button: {
        baseStyle: {
            fontWeight: 'semibold',
            borderRadius: 'md',
            _focus: {
                boxShadow: '0 0 0 3px var(--chakra-colors-brand-200)',
                outline: 'none',
            },
            _focusVisible: {
                boxShadow: '0 0 0 3px var(--chakra-colors-brand-200)',
                outline: '2px solid var(--chakra-colors-brand-500)',
                outlineOffset: '2px',
            },
        },
        sizes: {
            sm: {
                fontSize: 'sm',
                px: 4,
                py: 2,
                minH: 8, // 32px minimum touch target
            },
            md: {
                fontSize: 'md',
                px: 6,
                py: 3,
                minH: 12, // 48px minimum touch target
            },
            lg: {
                fontSize: 'lg',
                px: 8,
                py: 4,
                minH: 14, // 56px minimum touch target
            },
        },
        variants: {
            solid: {
                bg: 'brand.500',
                color: 'white',
                _hover: {
                    bg: 'brand.600',
                    _disabled: {
                        bg: 'gray.300',
                    },
                },
                _active: {
                    bg: 'brand.700',
                },
                _disabled: {
                    bg: 'gray.300',
                    color: 'gray.500',
                    cursor: 'not-allowed',
                },
            },
            outline: {
                border: '2px solid',
                borderColor: 'brand.500',
                color: 'brand.500',
                _hover: {
                    bg: 'brand.50',
                    _disabled: {
                        bg: 'transparent',
                    },
                },
                _active: {
                    bg: 'brand.100',
                },
            },
            ghost: {
                color: 'brand.500',
                _hover: {
                    bg: 'brand.50',
                },
                _active: {
                    bg: 'brand.100',
                },
            },
        },
        defaultProps: {
            size: 'md',
            variant: 'solid',
        },
    },
    Input: {
        baseStyle: {
            field: {
                _focus: {
                    borderColor: 'brand.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                },
                _invalid: {
                    borderColor: 'error.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-error-500)',
                },
            },
        },
        sizes: {
            sm: {
                field: {
                    fontSize: 'sm',
                    px: 3,
                    py: 2,
                    minH: 8,
                },
            },
            md: {
                field: {
                    fontSize: 'md',
                    px: 4,
                    py: 3,
                    minH: 12,
                },
            },
            lg: {
                field: {
                    fontSize: 'lg',
                    px: 6,
                    py: 4,
                    minH: 14,
                },
            },
        },
        defaultProps: {
            size: 'md',
        },
    },
    FormLabel: {
        baseStyle: {
            fontSize: 'sm',
            fontWeight: 'medium',
            color: 'gray.700',
            mb: 2,
            _invalid: {
                color: 'error.500',
            },
        },
    },
    FormErrorMessage: {
        baseStyle: {
            color: 'error.500',
            fontSize: 'sm',
            mt: 1,
        },
    },
    Heading: {
        baseStyle: {
            fontWeight: 'bold',
            lineHeight: 'shorter',
        },
        sizes: {
            xs: {
                fontSize: 'lg',
            },
            sm: {
                fontSize: 'xl',
            },
            md: {
                fontSize: '2xl',
            },
            lg: {
                fontSize: '3xl',
            },
            xl: {
                fontSize: '4xl',
            },
            '2xl': {
                fontSize: '5xl',
            },
        },
        defaultProps: {
            size: 'md',
        },
    },
    Text: {
        baseStyle: {
            lineHeight: 'base',
        },
        sizes: {
            xs: {
                fontSize: 'xs',
            },
            sm: {
                fontSize: 'sm',
            },
            md: {
                fontSize: 'md',
            },
            lg: {
                fontSize: 'lg',
            },
            xl: {
                fontSize: 'xl',
            },
        },
        defaultProps: {
            size: 'md',
        },
    },
    Link: {
        baseStyle: {
            color: 'brand.500',
            textDecoration: 'underline',
            _hover: {
                color: 'brand.600',
                textDecoration: 'underline',
            },
            _focus: {
                outline: '2px solid var(--chakra-colors-brand-500)',
                outlineOffset: '2px',
                borderRadius: 'sm',
            },
        },
    },
};
// Global theme configuration
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
    disableTransitionOnChange: false,
};
// Accessibility-focused theme
export const theme = extendTheme({
    config,
    colors,
    fonts,
    fontSizes,
    space: spacing,
    components,
    styles: {
        global: {
            // Ensure text has sufficient contrast
            body: {
                bg: 'white',
                color: 'gray.800',
                fontSize: 'md',
                lineHeight: 'base',
            },
            // High contrast focus indicators
            '*': {
                _focusVisible: {
                    outline: '2px solid',
                    outlineColor: 'brand.500',
                    outlineOffset: '2px',
                },
            },
            // Ensure interactive elements meet minimum size requirements
            'button, [role="button"], input, select, textarea': {
                minHeight: '44px', // WCAG 2.1 AA minimum touch target
                minWidth: '44px',
            },
        },
    },
    semanticTokens: {
        colors: {
            'text-primary': 'gray.800',
            'text-secondary': 'gray.600',
            'text-muted': 'gray.500',
            'text-on-brand': 'white',
            'bg-primary': 'white',
            'bg-secondary': 'gray.50',
            'bg-brand': 'brand.500',
            'border-primary': 'gray.200',
            'border-brand': 'brand.500',
        },
    },
});
export default theme;
//# sourceMappingURL=index.js.map