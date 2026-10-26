import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
const data = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.height > 1200 || r.width > 500) {
      out.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0,90), top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width) });
    }
  }
  const sections = [...document.querySelectorAll('main > section, body > footer, header')].map(s => {
    const r = s.getBoundingClientRect();
    return { tag: s.tagName, id: s.id, top: Math.round(r.top + scrollY), h: Math.round(r.height) };
  });
  return { body: document.body.scrollHeight, html: document.documentElement.scrollHeight, sections, huge: out.slice(0, 30) };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
