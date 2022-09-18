import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'tsx'],
  verbose: true,
  testEnvironment: 'jsdom',
};

export default config;
