// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

/** Everything that sits further out than `core` and `shared`. */
const OUTWARD_LAYERS = [
  '@features',
  '@features/*',
  '@layout',
  '@layout/*',
  '**/features/**',
  '**/layout/**',
];

module.exports = tseslint.config(
  {
    ignores: ['dist/**', '.angular/**', 'coverage/**', 'docs/**'],
  },

  /* ---------------------------------------------------------------------- */
  /* TypeScript                                                              */
  /* ---------------------------------------------------------------------- */
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],

      // Every component in this codebase is OnPush. Make that a rule, not a habit.
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/use-lifecycle-interface': 'error',

      // Type-only imports stay erasable, which keeps `isolatedModules` honest.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'object-shorthand': 'error',
    },
  },

  /* ---------------------------------------------------------------------- */
  /* Architecture boundaries — the rule the README states, enforced          */
  /* ---------------------------------------------------------------------- */
  // NOTE: flat config *replaces* a rule when a later block redefines it, rather
  // than merging. Each block below therefore lists every pattern that applies to
  // it — splitting them across blocks silently disables the earlier one.
  {
    files: ['src/app/shared/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: OUTWARD_LAYERS,
              message:
                'shared must not depend on features or layout. Dependencies point inwards only.',
            },
          ],
        },
      ],
    },
  },
  {
    // core is the innermost layer: nothing above it, and no shared *values*.
    files: ['src/app/core/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: OUTWARD_LAYERS,
              message:
                'core must not depend on features or layout. Dependencies point inwards only.',
            },
            {
              group: ['@shared', '@shared/*'],
              // A type-only import erases at compile time, so it creates no
              // runtime coupling — that is how the domain may name an icon.
              allowTypeImports: true,
              message:
                'core must not import shared values. If you only need the type, use `import type`.',
            },
          ],
        },
      ],
    },
  },

  /* ---------------------------------------------------------------------- */
  /* Templates                                                               */
  /* ---------------------------------------------------------------------- */
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },

  /* ---------------------------------------------------------------------- */
  /* Specs                                                                   */
  /* ---------------------------------------------------------------------- */
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
