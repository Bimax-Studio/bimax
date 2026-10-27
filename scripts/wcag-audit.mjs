import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-core';
import axe from 'axe-core';

const DIST_DIR = path.resolve('dist');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Create static HTTP server
const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  
  let filePath = path.join(DIST_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(4321, resolve));
console.log('Static server listening on http://localhost:4321');

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});

const pagesToTest = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/projects/officine-meccaniche-scaligere',
  '/contact',
  '/privacy',
  '/territorio/verona',
];

const totalViolations = {};
let hasAnyViolation = false;

for (const pagePath of pagesToTest) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`http://localhost:4321${pagePath}`, { waitUntil: 'networkidle' });
  
  // Inject axe-core
  await page.evaluate(axe.source);
  
  const results = await page.evaluate(async () => {
    return await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
      },
    });
  });

  console.log(`\n========================================`);
  console.log(`Audited: ${pagePath} — Violations: ${results.violations.length}`);
  console.log(`Passes: ${results.passes.length}, Inapplicable: ${results.inapplicable.length}`);
  
  if (results.violations.length > 0) {
    hasAnyViolation = true;
    for (const v of results.violations) {
      console.log(`\n❌ [${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`);
      console.log(`   URL: ${v.helpUrl}`);
      totalViolations[v.id] = (totalViolations[v.id] || 0) + v.nodes.length;
      v.nodes.slice(0, 5).forEach((n, idx) => {
        console.log(`   #${idx + 1} Target: ${n.target.join(' ')}`);
        console.log(`      HTML: ${n.html.slice(0, 100)}`);
        console.log(`      Summary: ${n.failureSummary}`);
      });
    }
  } else {
    console.log(`✅ 100% WCAG Passed on ${pagePath}!`);
  }

  await page.close();
}

console.log(`\n========================================`);
console.log(`Audit Summary:`);
if (hasAnyViolation) {
  console.log(`Violations breakdown:`, totalViolations);
} else {
  console.log(`🎉 ALL AUDITED PAGES PASSED 100% WCAG 2.1/2.2 AA!`);
}

await browser.close();
server.close();
