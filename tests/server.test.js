const { parsePort, requireEnv, config } = require('../server');

describe('configuration helpers', () => {
  test('parsePort returns fallback for missing or invalid values', () => {
    expect(parsePort(undefined, 3000)).toBe(3000);
    expect(parsePort('', 3000)).toBe(3000);
    expect(parsePort('abc', 3000)).toBe(3000);
    expect(parsePort('-1', 3000)).toBe(3000);
    expect(parsePort('70000', 3000)).toBe(3000);
  });

  test('parsePort returns valid port values', () => {
    expect(parsePort('8080', 3000)).toBe(8080);
  });

  test('requireEnv returns default for missing values when provided', () => {
    delete process.env.TEST_REQUIRED_ENV;
    expect(requireEnv('TEST_REQUIRED_ENV', { defaultValue: 'fallback' })).toBe('fallback');
  });

  test('requireEnv throws for missing required values', () => {
    delete process.env.TEST_REQUIRED_ENV;
    expect(() => requireEnv('TEST_REQUIRED_ENV')).toThrow(/Missing required environment variable/);
  });

  test('requireEnv trims values and rejects empty strings by default', () => {
    process.env.TEST_REQUIRED_ENV = '  hello  ';
    expect(requireEnv('TEST_REQUIRED_ENV')).toBe('hello');

    process.env.TEST_REQUIRED_ENV = '   ';
    expect(() => requireEnv('TEST_REQUIRED_ENV')).toThrow(/must not be empty/);
  });

  test('default config uses safe host and port values', () => {
    expect(config.host).toBeTruthy();
    expect(config.port).toBeGreaterThan(0);
    expect(config.port).toBeLessThanOrEqual(65535);
  });
});
