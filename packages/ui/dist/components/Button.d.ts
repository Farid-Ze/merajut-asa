import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';
export interface ButtonProps extends ChakraButtonProps {
    /**
     * Accessible label for screen readers when button text is not descriptive
     */
    'aria-label'?: string;
    /**
     * Describes the action that will be performed when the user interacts with the button
     */
    'aria-describedby'?: string;
    /**
     * Loading state with accessible announcement
     */
    isLoading?: boolean;
    /**
     * Loading text announced to screen readers
     */
    loadingText?: string;
}
/**
 * Accessible Button component built on Chakra UI
 *
 * Features:
 * - WCAG 2.1 AA compliant focus indicators
 * - Minimum 44px touch target
 * - High contrast colors
 * - Proper ARIA attributes
 * - Loading state accessibility
 *
 * @example
 * ```tsx
 * <Button
 *   variant="solid"
 *   size="md"
 *   aria-label="Submit form"
 * >
 *   Submit
 * </Button>
 * ```
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map