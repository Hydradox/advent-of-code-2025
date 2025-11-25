import pluginJs from '@eslint/js'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  eslintPluginUnicorn.configs['flat/recommended'],
  stylistic.configs['recommended-flat'],

  {
    languageOptions: { globals: globals.node },
    files: [`src/**/*.ts`],
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'no-console': 'off',
      'prefer-template': 'warn',
      'unicorn/no-empty-file': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unicorn/no-abusive-eslint-disable': 'warn',
      '@stylistic/padded-blocks': ['warn', {
        classes: 'always',
      }],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/semi': ['warn', 'always'],
    },
  },

  {
    files: [`src/driving/**/*.ts`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@driven/*'],
              message:
                                'You cannot import secondary adapters from the driving layer, you must go through the application layer.',
            },
          ],
        },
      ],
    },
  },

  {
    files: [`src/driven/**/*.ts`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@driving/*'],
              message:
                                'You cannot import primary adapters from the driven layer, you must go through the application layer.',
            },
          ],
        },
      ],
    },
  },

  { ignores: ['dist/**', 'node_modules', 'src/**./*.spec.ts'] },
]
