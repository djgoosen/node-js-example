const express = require('express');

const app = express();

function parsePort(value, fallback = 3000) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    return fallback;
  }

  return parsed;
}

function requireEnv(name, options = {}) {
  const { defaultValue, allowEmpty = false } = options;
  const rawValue = process.env[name];

  if (rawValue === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${name}`);
  }

  const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
  if (!allowEmpty && value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} must not be empty`);
  }

  return value;
}

const config = {
  env: process.env.NODE_ENV || 'development',
  host: requireEnv('HOST', { defaultValue: '0.0.0.0' }),
  port: parsePort(process.env.PORT, 3000),
};

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    env: config.env,
  });
});

if (require.main === module) {
  app.listen(config.port, config.host, () => {
    console.log(`Server listening on http://${config.host}:${config.port}`);
  });
}

module.exports = {
  app,
  config,
  parsePort,
  requireEnv,
};
