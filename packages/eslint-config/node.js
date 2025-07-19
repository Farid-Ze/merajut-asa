module.exports = {
  extends: ['./index.js'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // Node.js specific performance rules
    'no-process-exit': 'error',
    'no-sync': 'warn',
    
    // Security rules for backend services
    'security/detect-child-process': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    
    // Backend API performance
    'no-process-env': 'off', // Allow process.env in backend
  },
};
