const http = require('http');

const DEFAULT_PORT = 3000;

function getPort() {
  const rawPort = process.env.PORT;
  if (!rawPort) {
    return DEFAULT_PORT;
  }

  const parsed = Number.parseInt(rawPort, 10);
  if (Number.isNaN(parsed)) {
    return DEFAULT_PORT;
  }

  return parsed;
}

function createRequestListener() {
  return (_req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
  };
}

function createServer() {
  return http.createServer(createRequestListener());
}

function startServer(port = getPort()) {
  const server = createServer();
  server.listen(port);
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = {
  DEFAULT_PORT,
  createRequestListener,
  createServer,
  getPort,
  startServer,
};
