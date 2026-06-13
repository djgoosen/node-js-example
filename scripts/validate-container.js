const { spawnSync } = require('node:child_process');

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('docker', ['build', '-t', 'hframe-validate', '.']);
run('docker', ['run', '--rm', 'hframe-validate', 'npm', 'test']);
