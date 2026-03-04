/**
 * Lance le serveur mock auth (port 5276) puis ng serve avec proxy vers 5276.
 * Plus d'erreur ECONNREFUSED sur /api/auth/login quand le backend .NET n'est pas démarré.
 */
const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
let ngServe = null;
const mockServer = spawn('node', ['scripts/auth-mock-server.cjs'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

setTimeout(() => {
  ngServe = spawn(
    'npx',
    ['ng', 'serve', '--port=3000', '--host=0.0.0.0', '--proxy-config=proxy.conf.demo.json'],
    { cwd: root, stdio: 'inherit', shell: true }
  );
  ngServe.on('exit', (code) => {
    mockServer.kill();
    process.exit(code ?? 0);
  });
}, 1500);

function killAll() {
  if (ngServe) ngServe.kill();
  mockServer.kill();
  process.exit(0);
}
process.on('SIGINT', killAll);
process.on('SIGTERM', killAll);

mockServer.on('error', (err) => {
  console.error('[dev-with-mock] Failed to start auth-mock-server:', err.message);
});
