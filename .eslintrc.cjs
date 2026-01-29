/** ESLint config – TypeScript, src only. */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es2022: true,
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'lib/**/*.ts', 'types/**/*.ts'],
    },
  ],
  ignorePatterns: ['dist', 'node_modules', 'coverage', '*.cjs', '*.mjs'],
};
