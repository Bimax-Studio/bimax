import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
const info = await page.evaluate(() => {
  const el = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('Not for everyone'));
  const chain = [];
  let node = el;
  while (node && node !== document.documentElement) {
    const cs = getComputedStyle(node);
    chain.push({
      tag: node.tagName,
      cls: (node.className || '').toString().slice(0, 80),
      accent: cs.getPropertyValue('--accent').trim(),
      color: cs.color,
    });
    node = node.parentElement;
  }
  return {
    htmlAccent: document.documentElement.dataset.accent,
    storage: localStorage.getItem('bimax:accent'),
    heroAccent: getComputedStyle([...document.querySelectorAll('h1')][0].querySelector('span.text-accent')).color,
    chain,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
