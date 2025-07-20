import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heading as ChakraHeading } from '@chakra-ui/react';
/**
 * Accessible Heading component with proper semantic structure
 *
 * Features:
 * - Semantic HTML heading levels (h1-h6)
 * - Proper heading hierarchy for screen readers
 * - Visual size independent of semantic level
 * - Screen reader only text support
 *
 * @example
 * ```tsx
 * <Heading level={1} size="2xl">
 *   Main Page Title
 * </Heading>
 *
 * <Heading level={2} size="lg" srOnlyText=" - Section about campaigns">
 *   Our Campaigns
 * </Heading>
 * ```
 */
export const Heading = ({ level = 2, srOnlyText, children, ...props }) => {
    return (_jsxs(ChakraHeading, { as: `h${level}`, ...props, children: [children, srOnlyText && (_jsx("span", { className: "sr-only", style: {
                    position: 'absolute',
                    left: '-10000px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                }, children: srOnlyText }))] }));
};
export default Heading;
//# sourceMappingURL=Heading.js.map