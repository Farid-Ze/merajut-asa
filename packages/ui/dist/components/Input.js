import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input as ChakraInput, FormControl, FormErrorMessage, FormHelperText, FormLabel, } from '@chakra-ui/react';
import React from 'react';
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
export const Input = ({ label, id, error, helperText, required = false, 'aria-describedby': ariaDescribedBy, ...props }) => {
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
    return (_jsxs(FormControl, { isInvalid: !!error, isRequired: required, children: [_jsxs(FormLabel, { htmlFor: inputId, children: [label, required && (_jsx("span", { "aria-label": " (required)", style: { color: 'var(--chakra-colors-error-500)' }, children: ' *' }))] }), _jsx(ChakraInput, { id: inputId, "aria-describedby": describedByIds, "aria-invalid": !!error, "aria-required": required, ...props }), error && (_jsx(FormErrorMessage, { id: errorId, role: "alert", children: error })), helperText && !error && (_jsx(FormHelperText, { id: helperTextId, children: helperText }))] }));
};
export default Input;
//# sourceMappingURL=Input.js.map