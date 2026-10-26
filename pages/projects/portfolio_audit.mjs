#!/usr/bin/env node
// Production Next.js build, SEO smoke test and Lighthouse audit.
// Usage: node portfolio_audit.mjs "C:\\path\\to\\Ramim_Portfolio_Original_Design_SEO_Optimized"
// Requires Node 20+ and access to the npm registry. Chrome/Chromium must be installed.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
const outputDir = path.join(root, 'audit-results');
const siteOrigin = 'https://ramim.tech';
const port = 43871;
const serverURL = `http://127.0.0.1:${port}`;
const routes = [
  '/', '/about', '/projects', '/experience', '/skills', '/education',
  '/research', '/research/thesis', '/achievements', '/leadership', '/contact',
  '/projects/1', '/experience/software-developer-trainee',
  '/achievements/icpc-dhaka-2024', '/leadership/competitive-programming-trainer'
];
if (!fs.existsSync(path.join(root, 'package.json'))) {
  console.error(`Missing package.json in ${root}. Pass the extracted project folder as an argument.`);
  process.exit(1);
}
fs.mkdirSync(outputDir, { recursive: true });

function resolveNpmCLI(cmd) {
  const cliName = cmd === 'npm' ? 'npm-cli.js' : cmd === 'npx' ? 'npx-cli.js' : null;
  if (!cliName) return null;
  const nodeDir = path.dirname(process.execPath);
  const candidates = [
    path.join(nodeDir, 'node_modules', 'npm', 'bin', cliName),
    path.join(nodeDir, '..', 'lib', 'node_modules', 'npm', 'bin', cliName),
    path.join(nodeDir, '..', 'node_modules', 'npm', 'bin', cliName),
  ];
  return candidates.find(fs.existsSync) || null;
}

function spawnAndWait(cmd, args, logFile, extra = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n> ${cmd} ${args.join(' ')}`);
    const out = fs.createWriteStream(path.join(outputDir, logFile));
    const cli = resolveNpmCLI(cmd);
    const actualCommand = cli ? process.execPath : cmd;
    const actualArgs = cli ? [cli, ...args] : args;
    const child = spawn(actualCommand, actualArgs, {
      cwd: root,
      env: process.env,
      shell: !cli && process.platform === 'win32',
      ...extra,
    });
    child.stdout?.on('data', d => { process.stdout.write(d); out.write(d); });
    child.stderr?.on('data', d => { process.stderr.write(d); out.write(d); });
    child.on('error', err => { out.end(); reject(err); });
    child.on('close', code => { out.end(); code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}; see ${logFile}`)); });
  });
}
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
async function waitForServer(server, ms = 60000) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    if (server.exitCode !== null) throw new Error(`Server exited with code ${server.exitCode}`);
    try {
      const res = await fetch(serverURL, { signal: AbortSignal.timeout(2000) });
      if (res.status >= 200 && res.status < 500) return;
    } catch { /* not started yet */ }
    await delay(750);
  }
  throw new Error('Production server did not become available');
}
function expectedCanonical(route) { return siteOrigin + route; }
async function routeAudit() {
  const checks = [];
  for (const route of routes) {
    const response = await fetch(serverURL + route, { signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    const canon = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] || '';
    const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '';
    const description = /<meta\b[^>]*name=["']description["']/i.test(html);
    const passing = response.status === 200 && canon === expectedCanonical(route) && !!title && description;
    checks.push({ route, status: response.status, canonical: canon, title, description, passing });
    console.log(`${passing ? 'PASS' : 'FAIL'} ${route} HTTP ${response.status}, canonical=${canon || '[none]'}`);
  }
  const robotRes = await fetch(serverURL + '/robots.txt');
  const robots = await robotRes.text();
  const sitemapRes = await fetch(serverURL + '/sitemap.xml');
  const sitemap = await sitemapRes.text();
  const technical = {
    robots: robotRes.status === 200 && robots.includes(siteOrigin + '/sitemap.xml'),
    sitemap: sitemapRes.status === 200 && sitemap.includes('<urlset') && sitemap.includes(siteOrigin + '/projects'),
  };
  const report = { auditedAt: new Date().toISOString(), origin: serverURL, routes: checks, technical };
  fs.writeFileSync(path.join(outputDir, 'seo-route-check.json'), JSON.stringify(report, null, 2));
  return report;
}

async function runLighthouse(route, label, desktop) {
  const outputName = path.join(outputDir, label);
  const argumentsList = [
    '--yes', 'lighthouse@12', serverURL + route,
    '--output=html', '--output=json', `--output-path=${outputName}`,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless=new --no-sandbox',
    '--quiet', ...(desktop ? ['--preset=desktop'] : []),
  ];
  await spawnAndWait('npx', argumentsList, `${label}-lighthouse.log`);
  const jsonName = [outputName + '.report.json', outputName + '.json'].find(fs.existsSync);
  if (!jsonName) return { route, label, message: 'Lighthouse report created; see audit-results' };
  const data = JSON.parse(fs.readFileSync(jsonName, 'utf8'));
  const cat = data.categories || {};
  return {
    route, label,
    scores: Object.fromEntries(Object.entries(cat).map(([k, v]) => [k, Math.round((v.score || 0) * 100)])),
    metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift'].map(k => [k, {displayValue: data.audits?.[k]?.displayValue, numericValue: data.audits?.[k]?.numericValue }])),
    htmlReport: path.basename(outputName + '.report.html'),
  };
}

let server;
try {
  console.log(`Project: ${root}`);
  console.log('Build & Lighthouse tests use production mode, not next dev.');
  const hasLock = fs.existsSync(path.join(root, 'package-lock.json'));
  await spawnAndWait('npm', hasLock ? ['ci', '--no-audit'] : ['install', '--no-audit'], 'install.log');
  await spawnAndWait('npm', ['run', 'build'], 'production-build.log');
  const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
  console.log('\nStarting production Next.js server...');
  server = spawn(process.execPath, [nextBin, 'start', '-p', String(port), '--hostname', '127.0.0.1'], {
    cwd: root, env: { ...process.env, NODE_ENV: 'production' }, stdio: ['ignore','pipe','pipe']
  });
  const serverLog = fs.createWriteStream(path.join(outputDir, 'production-server.log'));
  server.stdout?.on('data', d => { process.stdout.write(d); serverLog.write(d); });
  server.stderr?.on('data', d => { process.stderr.write(d); serverLog.write(d); });
  await waitForServer(server);
  const routeReport = await routeAudit();
  const lighthouse = [];
  for (const [route,label,desktop] of [
    ['/','home-mobile',false], ['/','home-desktop',true],
    ['/projects','projects-mobile',false], ['/contact','contact-mobile',false]
  ]) {
    lighthouse.push(await runLighthouse(route,label,desktop));
  }
  const summary = {
    generatedAt: new Date().toISOString(),
    productionBuild: 'PASS',
    seoRoutesPassing: routeReport.routes.filter(x=>x.passing).length,
    seoRoutesTotal: routeReport.routes.length,
    technicalSEO: routeReport.technical,
    lighthouse,
  };
  fs.writeFileSync(path.join(outputDir,'summary.json'), JSON.stringify(summary, null, 2));
  console.log('\nTests completed. See audit-results/summary.json and *.report.html');
} catch (e) {
  console.error('\nAUDIT FAILED:', e?.stack || e);
  fs.writeFileSync(path.join(outputDir, 'failure.txt'), `${new Date().toISOString()}\n${e?.stack || e}\n`);
  process.exitCode = 1;
} finally {
  if (server && !server.killed) {
    server.kill('SIGTERM');
  }
}
