/**
 * Jest Accessibility Testing Setup
 * Configures jest-axe for automated accessibility testing
 */

import { configureAxe } from 'jest-axe';
import 'jest-axe/extend-expect';

// Configure axe for WCAG 2.1 AA testing
const axe = configureAxe({
    rules: {
        // Enable WCAG 2.1 AA rules
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-management': { enabled: true },
        'aria-usage': { enabled: true },
        'semantic-structure': { enabled: true },

        // Custom rules for Indonesian language support
        'language-declaration': {
            enabled: true,
            options: { allowedLangs: ['id', 'en'] }
        },
    },
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
});

// Global test helpers for accessibility
global.testA11y = axe;

// Mock Next.js components that aren't relevant for a11y testing
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || ''} />;
    },
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href, ...props }) => {
        return <a href={href} {...props}>{children}</a>;
    },
}));

// Setup for React Testing Library
import { configure } from '@testing-library/react';

configure({
    // Custom test ID attribute for accessibility testing
    testIdAttribute: 'data-testid',
    // Show full DOM on test failures for accessibility debugging
    getElementError: (message, container) => {
        const prettierMessage = `${message}

    ${container.innerHTML}`;
        return new Error(prettierMessage);
    },
});
