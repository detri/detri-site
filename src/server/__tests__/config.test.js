let config = require('../config.js');

describe('configuration module', () => {
  it('should return a proper config', () => {
    config = jest.fn(config);
    const testConfig = config();
    expect(config).toHaveBeenCalledTimes(1);
    expect(testConfig).toHaveProperty('database');
    expect(testConfig).toHaveProperty('email');
  });
});