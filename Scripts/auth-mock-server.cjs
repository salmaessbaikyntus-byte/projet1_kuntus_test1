/**
 * Serveur mock auth pour le mode démo (backend non démarré).
 * Évite les erreurs [vite] http proxy error: /api/auth/login (ECONNREFUSED).
 * À lancer avec: node scripts/auth-mock-server.cjs
 * Le proxy Angular doit cibler ce serveur (voir proxy.conf.json).
 */
const http = require('http');
const DEMO_EMAIL = 'admin@shiftmaster.com';
const DEMO_PASSWORD = 'ShiftMaster123!';
const BACKEND = 'http://localhost:5275';
const MOCK_PORT = 5276;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

function proxyToBackend(req, res, body) {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const opts = {
    hostname: 'localhost',
    port: 5275,
    path: url.pathname + url.search,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:5275' },
  };
  const proxy = http.request(opts, (upstream) => {
    res.writeHead(upstream.statusCode || 502, upstream.headers);
    upstream.pipe(res);
  });
  proxy.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Backend unreachable' }));
  });
  if (body) proxy.write(body);
  proxy.end();
}

function sendMockLogin(res) {
  const payload = {
    token: 'demo-token-' + Date.now(),
    userId: 'demo-admin',
    email: DEMO_EMAIL,
    name: 'Admin Demo',
    role: 'ADMIN',
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function sendMockMe(res) {
  const payload = {
    userId: 'demo-admin',
    email: DEMO_EMAIL,
    name: 'Admin Demo',
    role: 'ADMIN',
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname;

  if (req.method === 'POST' && path === '/api/auth/login') {
    const body = await parseBody(req);
    let data;
    try {
      data = JSON.parse(body);
    } catch (_) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
      return;
    }
    if (data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
      sendMockLogin(res);
      return;
    }
    proxyToBackend(req, res, body);
    return;
  }

  if (req.method === 'GET' && path === '/api/auth/me') {
    const auth = req.headers.authorization || '';
    if (auth.includes('demo-token-')) {
      sendMockMe(res);
      return;
    }
    proxyToBackend(req, res, null);
    return;
  }

  proxyToBackend(req, res, null);
});

server.listen(MOCK_PORT, 'localhost', () => {
  console.log(`[auth-mock] Listening on http://localhost:${MOCK_PORT} (proxy /api here when backend is down)`);
});
