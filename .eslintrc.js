module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', 'import'],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'type',
          'index',
          'sibling',
          'parent',
          'object',
        ],
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            pattern: 'components/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: 'contexts/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: 'hooks/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: 'views/**',
            group: 'index',
            position: 'before',
          },
        ],
      },
    ],
  },
};
