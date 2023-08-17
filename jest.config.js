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
      statements: 90,
      branches: 90,
      functions: 90
    }
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  globals: {
    EXTENSION_NAME: 'test',
    EXTENSION_VERSION: '0.0.0'
  }
};
