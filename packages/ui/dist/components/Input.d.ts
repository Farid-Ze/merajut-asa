import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import React from 'react';
export interface InputProps extends Omit<ChakraInputProps, 'id'> {
    /**
     * Form field label (required for accessibility)
     */
    label: string;
    /**
     * Unique identifier for the input
     */
    id?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Helper text to provide additional context
     */
    helperText?: string;
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * Description for screen readers
     */
    'aria-describedby'?: string;
}
/**
 * Accessible Input component with built-in label and error handling
 *
 * Features:
 * - Always includes label for screen reader accessibility
 * - Proper error state styling and announcements
 * - Required field indication
 * - Helper text support
 * - WCAG 2.1 AA compliant focus indicators
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   required
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 * ```
 */
export declare const Input: React.FC<InputProps>;
export default Input;
//# sourceMappingURL=Input.d.ts.map