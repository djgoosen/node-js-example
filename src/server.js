const { createApp, normalizePort } = require('./app');
const requestHandler = require('./index');

function startServer(options = {}) {
  const port = options.port ?? normalizePort(process.env.PORT);

  if (port === null) {
    throw new Error('Invalid PORT environment variable');
  }

  const server = createApp(requestHandler);

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = {
  startServer,
};
