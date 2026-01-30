/** Jest config – tests unitaires (normalizeAnswer, validation, readJson, services). */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: { '^.+\\.ts$': ['ts-jest', { useESM: false, tsconfig: 'tsconfig.jest.json' }] },
  roots: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '^(\\.\\./)+lib/readJson\\.js$': '<rootDir>/lib/readJson.ts',
    '^(\\.\\./)+types/index\\.js$': '<rootDir>/types/index.ts',
  },
  collectCoverageFrom: ['lib/**/*.ts', 'src/lib/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
