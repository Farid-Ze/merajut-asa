import {
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
} from '@chakra-ui/react';
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
export const Input: React.FC<InputProps> = ({
    label,
    id,
    error,
    helperText,
    required = false,
    'aria-describedby': ariaDescribedBy,
    ...props
}) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    // Combine aria-describedby values
    const describedByIds = [
        ariaDescribedBy,
        errorId,
        helperTextId,
    ].filter(Boolean).join(' ') || undefined;

    return (
        <FormControl isInvalid={!!error} isRequired={required}>
            <FormLabel htmlFor={inputId}>
                {label}
                {required && (
                    <span aria-label=" (required)" style={{ color: 'var(--chakra-colors-error-500)' }}>
                        {' *'}
                    </span>
                )}
            </FormLabel>

            <ChakraInput
                id={inputId}
                aria-describedby={describedByIds}
                aria-invalid={!!error}
                aria-required={required}
                {...props}
            />

            {error && (
                <FormErrorMessage id={errorId} role="alert">
                    {error}
                </FormErrorMessage>
            )}

            {helperText && !error && (
                <FormHelperText id={helperTextId}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default Input;
