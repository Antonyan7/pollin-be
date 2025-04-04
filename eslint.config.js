const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const datePlugin = require('eslint-plugin-date');
const NestprojectPlugin = require('eslint-plugin-Nestproject');
const prettierPlugin = require('eslint-plugin-prettier');
const yamlPlugin = require('eslint-plugin-yaml');

// Get the recommended TypeScript rules
const typescriptRules = {
  ...tsPlugin.configs['recommended'].rules
};

// Get the recommended Prettier rules
const prettierRules = {
  ...prettierPlugin.configs.recommended.rules,
};

// Get the recommended date rules
const dateRules = {
  ...datePlugin.configs.recommended.rules,
};

module.exports = [
  // Global settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
        sourceType: 'module',
      },
      ecmaVersion: 2022,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'date': datePlugin,
      'Nestproject': NestprojectPlugin,
      'prettier': prettierPlugin,
    },
    settings: {
      node: true,
      jest: true,
    },
    ignores: [
      '.eslintrc.js',
      'functional-tests/**/*',
      'nodejs-compute-instances/**/*',
    ],
    rules: {
      // Spread the recommended configs
      ...typescriptRules,
      ...prettierRules,
      ...dateRules,
      
      // Custom rules
      'Nestproject/no-other-emails': 'error',
      'Nestproject/no-firestore-now': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['enum', 'enumMember'],
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
      ],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [{ group: ['*../../*'], message: 'Please use import like: "@apps/emr/..."' }],
        },
      ],
      'date/no-new-date-without-args': 'error',
      'date/no-new-date-with-args': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-process-env': 'error',
      'max-lines': ['error', 600],
      'max-params': ['error', { max: 3 }],
      'max-lines-per-function': [
        'error',
        {
          max: 75,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@nestjs/common',
              importNames: [
                'BadRequestException',
                'HttpException',
                'NotFoundException',
                'InternalServerErrorException',
                'UnprocessableEntityException',
                'UnauthorizedException',
                'ValidationException',
              ],
              message: 'Please use exception from: libs/services-common/src/exceptions for nest.js controlles, service...',
            },
            {
              name: '@nestjs/config',
              importNames: ['ConfigService'],
              message: 'Please use NestprojectConfigService from: @libs/common/services/config/config-service',
            },
            {
              name: '@config/config.util',
              importNames: ['Config'],
              message: 'Please use NestprojectConfigService from: @libs/common/services/config/config-service',
            },
          ],
          patterns: [
            {
              group: ['@nestjs/common/exceptions'],
              message: 'Importing NestJS Exception is not allowed',
            },
            {
              group: ['@functional-tests/*', '@nodejs-compute-instances/*'],
              message: 'Importing module from Functional Tests is not allowed',
            },
          ],
        },
      ],
      'curly': 'error',
    },
  },
  // YAML files configuration
  {
    files: ['**/*.yaml', '**/*.yml'],
    plugins: {
      yaml: yamlPlugin,
    },
    rules: {
      ...yamlPlugin.configs.legacy.rules,
    },
  },
  // Test files configuration
  {
    files: ['**/test/**/*', '**/__test__/**/*'],
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'max-lines-per-function': [
        'error',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
    },
  },
  // Source files configuration
  {
    files: ['**/src/**/*'],
    rules: {
      'max-lines': ['error', 600],
      'max-lines-per-function': [
        'error',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
    },
  },
  // Special files configuration
  {
    files: ['functional-tests/**/*', 'env-config/**/*', 'nodejs-compute-instances/**/*'],
    rules: {
      'no-process-env': 'off',
    },
  },
  // Test fixtures configuration
  {
    files: ['libs/common/test/fixtures/*.ts'],
    rules: {
      '@typescript-eslint/typedef': [
        'error',
        {
          memberVariableDeclaration: true,
          variableDeclaration: true,
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },
  // Special directories configuration
  {
    files: ['**/test/**/*', '**/__test__/**/*', 'seeds/**/*', 'firebase-platform/**/*', 'tools/**/*', 'env-config/**/*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['firebase-platform/**/*',],
    rules: {
      'max-lines-per-function': 'off', // Disabled because of Cloud Functions
    },
  },
]; 