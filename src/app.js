const http = require('http');
const { routeRequest } = require('./request-router');

function createApp() {
  return http.createServer((req, res) => {
    routeRequest(req, res);
  });
}

module.exports = { createApp };
