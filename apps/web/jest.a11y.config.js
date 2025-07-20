/**
 * Accessibility Testing Configuration for Merajut ASA
 * 
 * Jest + jest-axe configuration for automated accessibility testing
 * Target: >95% WCAG 2.1 AA compliance
 */

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.a11y.setup.js'],
    testMatch: [
        '**/__tests__/**/*.(a11y|accessibility).(js|jsx|ts|tsx)',
        '**/*.(a11y|accessibility).(test|spec).(js|jsx|ts|tsx)'
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@merajut-asa/(.*)$': '<rootDir>/../../packages/$1/src',
    },
};
