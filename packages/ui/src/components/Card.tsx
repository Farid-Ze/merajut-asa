import {
    Box,
    BoxProps,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export interface CardProps extends BoxProps {
    /**
     * Whether the card is interactive (clickable)
     */
    isInteractive?: boolean;
    /**
     * Click handler for interactive cards
     */
    onClick?: () => void;
    /**
     * Accessible label for interactive cards
     */
    'aria-label'?: string;
    /**
     * Description for screen readers
     */
    'aria-describedby'?: string;
    /**
     * Card elevation level (affects shadow depth)
     */
    elevation?: 'sm' | 'md' | 'lg' | 'xl';
}

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
export const Card: React.FC<CardProps> = ({
    children,
    isInteractive = false,
    onClick,
    elevation = 'md',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...props
}) => {
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

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (isInteractive && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <Box
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            shadow={shadowMap[elevation]}
            transition="all 0.2s"
            // Interactive states
            {...(isInteractive && {
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
            })}
            {...props}
        >
            {children}
        </Box>
    );
};

/**
 * Card content wrapper with proper padding
 */
export const CardContent: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box p={6} {...props}>
        {children}
    </Box>
);

/**
 * Card header section
 */
export const CardHeader: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box px={6} pt={6} pb={2} {...props}>
        {children}
    </Box>
);

/**
 * Card footer section
 */
export const CardFooter: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box px={6} pb={6} pt={2} {...props}>
        {children}
    </Box>
);

export default Card;
