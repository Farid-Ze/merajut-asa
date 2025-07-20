module.exports = {
  extends: ['@merajut-asa/eslint-config', 'next/core-web-vitals'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Next.js specific optimizations
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // Additional Next.js specific rules for performance
    '@next/next/no-img-element': 'error',
    '@next/next/no-page-custom-font': 'error',
    '@next/next/no-sync-scripts': 'error',
    '@next/next/no-css-tags': 'error',

    // Performance optimization rules
    'react/jsx-no-bind': ['error', { allowArrowFunctions: false }],
    'react/no-array-index-key': 'error',

    // Accessibility enforcement for >95% WCAG compliance
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
  },
};
