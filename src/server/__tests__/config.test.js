let config = require('../config.js');

describe('env test', () => {
  afterAll(() => {
    process.env.NODE_ENV = 'test'
  });

  it('works for development environment', () => {
    process.env.NODE_ENV = 'development';
  });
  
  it('works for production environment', () => {
    process.env.NODE_ENV = 'production';
  });
})

describe('configuration module', () => {
  it('should return a proper config', () => {
    config = config;
    const testConfig = config();
    expect(testConfig).toHaveProperty('database');
    expect(testConfig).toHaveProperty('email');
  });
});
