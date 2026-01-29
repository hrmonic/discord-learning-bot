/** Jest config – tests unitaires (normalizeAnswer, validation). */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: { '^.+\\.ts$': ['ts-jest', { useESM: false, tsconfig: 'tsconfig.jest.json' }] },
  roots: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
  collectCoverageFrom: ['lib/**/*.ts', 'src/lib/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
