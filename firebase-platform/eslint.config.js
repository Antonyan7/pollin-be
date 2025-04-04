const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const NestprojectPlugin = require('eslint-plugin-Nestproject')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  // Global settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {project: 'tsconfig.json', tsconfigRootDir: __dirname, sourceType: 'module'},
    },
    plugins: {'@typescript-eslint': tsPlugin, Nestproject: NestprojectPlugin, prettier: prettierPlugin},
    settings: {node: true, jest: true},
    ignores: ['eslint.config.js'],
    rules: {
      'Nestproject/no-other-emails': 'error',
      'Nestproject/no-firestore-now': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', ignoreRestSiblings: true},
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {selector: ['enum', 'enumMember'], format: ['PascalCase']},
      ],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {patterns: [{group: ['*../../*'], message: 'Please use import like: "@apps/emr/..."'}]},
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-process-env': 'error',
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
              message: 'Please use exception from: libs/common/src/exceptions.',
            },
          ],
          patterns: ['@nestjs/common/exceptions'],
        },
      ],
      curly: 'error',
      'max-lines-per-function': 'off',
    },
  },
]
