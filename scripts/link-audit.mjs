import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = 'http://127.0.0.1:4399';
const seen = new Map();
for (const route of ['/', '/projects', '/projects/field-notes', '/services', '/about', '/contact', '/nope']) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const links = await page.$$eval('a[href]', (as) => as.map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim().slice(0,40) })));
  for (const l of links) {
    if (!l.href || l.href.startsWith('#') || l.href.startsWith('mailto:') || l.href.startsWith('tel:')) continue;
    const u = new URL(l.href, base);
    if (u.origin !== base) continue;
    if (!seen.has(u.pathname)) seen.set(u.pathname, { from: route, text: l.text });
  }
}
for (const [path, info] of seen) {
  const res = await page.request.get(base + path);
  console.log(res.status(), path, '|', info.text, '| from', info.from);
}
await browser.close();
