import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'src/vendor/**',
      '_site/**',
      'node_modules/**',
      'vendor/**',
      '.cache/**',
      'assets/vendor/**',
      'assets/js/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['src/js/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.mjs', 'tests/**/*.mjs', '*.config.mjs'],
    languageOptions: { globals: globals.node },
  },
];
