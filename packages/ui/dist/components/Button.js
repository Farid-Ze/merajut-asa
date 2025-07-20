import { jsx as _jsx } from "react/jsx-runtime";
import { Button as ChakraButton } from '@chakra-ui/react';
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
export const Button = ({ children, isLoading, loadingText, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedBy, ...props }) => {
    return (_jsx(ChakraButton, { isLoading: isLoading, loadingText: loadingText || 'Loading...', "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, "aria-busy": isLoading, 
        // Prevent double-click during loading
        disabled: isLoading || props.disabled, ...props, children: children }));
};
export default Button;
//# sourceMappingURL=Button.js.map