const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizePort } = require('../src/app');
const { startServer } = require('../src/server');

test('normalizePort returns default port when unset', () => {
  assert.equal(normalizePort(undefined), 3000);
  assert.equal(normalizePort(''), 3000);
});

test('normalizePort parses valid numeric values', () => {
  assert.equal(normalizePort('8080'), 8080);
  assert.equal(normalizePort(5000), 5000);
});

test('normalizePort rejects invalid values', () => {
  assert.equal(normalizePort('abc'), null);
  assert.equal(normalizePort('-1'), null);
});

test('startServer listens on supplied port and can be closed', async () => {
  const server = startServer({ port: 0 });

  await new Promise((resolve) => server.once('listening', resolve));

  const address = server.address();
  assert.ok(address);
  assert.equal(typeof address.port, 'number');

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
});
