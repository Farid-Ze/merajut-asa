import { HeadingProps as ChakraHeadingProps } from '@chakra-ui/react';
import React from 'react';
export interface HeadingProps extends Omit<ChakraHeadingProps, 'srOnlyText'> {
    /**
     * Semantic heading level (h1-h6)
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Screen reader only text for additional context
     */
    srOnlyText?: string;
}
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
export declare const Heading: React.FC<HeadingProps>;
export default Heading;
//# sourceMappingURL=Heading.d.ts.map