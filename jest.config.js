module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/content-script.ts', // We intentionally keep the main entrypoints slim, so coverage is not as important here
    '!src/popup/main.ts', // We intentionally keep the main entrypoints slim, so coverage is not as important here
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85
    }
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    EXTENSION_NAME: 'test',
    EXTENSION_VERSION: '0.0.0'
  }
};
