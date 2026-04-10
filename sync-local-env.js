const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const ROOT_DIR = process.cwd();
const ENV_PATH = path.join(ROOT_DIR, '.env');

if (!fs.existsSync(ENV_PATH)) {
  console.error('⚠️  Arquivo .env não encontrado na raiz — copie .env.example para .env');
  process.exit(1);
}

const raw = fs.readFileSync(ENV_PATH, 'utf8');
raw.split(/\r?\n/).forEach(line => {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
  if (!m) return;
  let val = m[2].trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  process.env[m[1]] = val;
});

if (!process.env.INFISICAL_TOKEN) {
  console.error('❌ Erro: INFISICAL_TOKEN não está configurado no .env');
  process.exit(1);
}

const ENV = process.env.ENV || 'dev';
console.log('');
console.log('==============================================');
console.log(`🔐 Sincronizando secrets com Infisical (env: ${ENV})`);
console.log('==============================================');

const PROJECTS = [
  { path: 'api', id: 'af91243f-019c-4392-a435-c696ab27a69f' },
];

function getEnvFile(projectPath) {
  if (projectPath.startsWith('api')) return '.dev.vars';
  return '.env';
}

for (const p of PROJECTS) {
  const fullPath = path.join(ROOT_DIR, p.path);
  if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isDirectory()) {
    console.warn(`⚠️  Pasta não encontrada: ${p.path} (pulando)`);
    continue;
  }
  const envFile = getEnvFile(p.path);
  const outFile = path.join(fullPath, envFile);
  console.log(`➡️  ${p.path} → ${envFile}`);

  const args = [
    "export",
    "--domain",
    "https://infisical-production-ac1b.up.railway.app",
    "--projectId",
    p.id,
    "--env",
    ENV,
    "--output-file",
    outFile,
  ];

  let res = spawnSync("infisical", args, {
    stdio: "inherit",
    env: process.env,
    shell: false,
  });
  if (res.error && res.error.code === "ENOENT") {
    console.warn(
      '⚠️  "infisical" não encontrado no PATH — tentando via npx...',
    );
    // no Windows usar shell:true com npx costuma funcionar melhor
    res = spawnSync("npx", ["infisical", ...args], {
      stdio: "inherit",
      env: process.env,
      shell: true,
    });
  }

  if (res.error || res.status !== 0) {
    console.error(`❌ Falha ao executar infisical para ${p.path}`);
    if (res.error) console.error("error:", res.error.message);
    process.exit(res.status || 1);
  }
}

console.log('==============================================');
console.log('✅ Secrets sincronizados com sucesso');
console.log('==============================================');