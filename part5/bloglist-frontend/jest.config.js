module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
