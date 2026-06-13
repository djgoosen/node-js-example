function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function routeRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  return sendJson(res, 404, { error: 'Not Found' });
}

module.exports = { routeRequest, sendJson };
