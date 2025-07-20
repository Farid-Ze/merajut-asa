import { BoxProps } from '@chakra-ui/react';
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
export declare const Card: React.FC<CardProps>;
/**
 * Card content wrapper with proper padding
 */
export declare const CardContent: React.FC<BoxProps>;
/**
 * Card header section
 */
export declare const CardHeader: React.FC<BoxProps>;
/**
 * Card footer section
 */
export declare const CardFooter: React.FC<BoxProps>;
export default Card;
//# sourceMappingURL=Card.d.ts.map