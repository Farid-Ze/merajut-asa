import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useColorModeValue, } from '@chakra-ui/react';
/**
 * Accessible Card component with proper focus management
 *
 * Features:
 * - Keyboard navigation support for interactive cards
 * - WCAG 2.1 AA compliant focus indicators
 * - Semantic role assignment
 * - Hover and focus states
 * - Elevation levels for visual hierarchy
 *
 * @example
 * ```tsx
 * <Card
 *   isInteractive
 *   onClick={() => navigate('/campaign/123')}
 *   aria-label="View campaign details"
 *   elevation="md"
 * >
 *   <CardContent>
 *     Campaign information here
 *   </CardContent>
 * </Card>
 * ```
 */
export const Card = ({ children, isInteractive = false, onClick, elevation = 'md', 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedBy, ...props }) => {
    const shadowMap = {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
    };
    const hoverShadowMap = {
        sm: 'md',
        md: 'lg',
        lg: 'xl',
        xl: '2xl',
    };
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const handleKeyDown = (event) => {
        if (isInteractive && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick();
        }
    };
    return (_jsx(Box, { bg: bgColor, borderRadius: "lg", borderWidth: "1px", borderColor: borderColor, shadow: shadowMap[elevation], transition: "all 0.2s", ...(isInteractive && {
            role: onClick ? 'button' : 'article',
            tabIndex: 0,
            cursor: 'pointer',
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedBy,
            onClick,
            onKeyDown: handleKeyDown,
            _hover: {
                shadow: hoverShadowMap[elevation],
                transform: 'translateY(-2px)',
            },
            _focus: {
                outline: '2px solid',
                outlineColor: 'brand.500',
                outlineOffset: '2px',
            },
            _active: {
                transform: 'translateY(0)',
            },
        }), ...props, children: children }));
};
/**
 * Card content wrapper with proper padding
 */
export const CardContent = ({ children, ...props }) => (_jsx(Box, { p: 6, ...props, children: children }));
/**
 * Card header section
 */
export const CardHeader = ({ children, ...props }) => (_jsx(Box, { px: 6, pt: 6, pb: 2, ...props, children: children }));
/**
 * Card footer section
 */
export const CardFooter = ({ children, ...props }) => (_jsx(Box, { px: 6, pb: 6, pt: 2, ...props, children: children }));
export default Card;
//# sourceMappingURL=Card.js.map