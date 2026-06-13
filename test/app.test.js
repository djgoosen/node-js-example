const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { createApp } = require('../src/app');

function request(server, path, method = 'GET') {
  const address = server.address();
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: address.port,
        path,
        method
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : null
          });
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

test('GET / returns ok payload through modular app entrypoint', async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const response = await request(server, '/');
    assert.equal(response.statusCode, 200);
    assert.equal(response.headers['content-type'], 'application/json');
    assert.deepEqual(response.body, { ok: true });
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});

test('GET /health returns health payload through routed handler', async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const response = await request(server, '/health');
    assert.equal(response.statusCode, 200);
    assert.equal(response.headers['content-type'], 'application/json');
    assert.deepEqual(response.body, { status: 'ok' });
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});

test('unknown request paths return 404 json response', async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  try {
    const response = await request(server, '/missing');
    assert.equal(response.statusCode, 404);
    assert.equal(response.headers['content-type'], 'application/json');
    assert.deepEqual(response.body, { error: 'Not Found' });
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});
