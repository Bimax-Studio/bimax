import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
console.log('before', await page.evaluate(() => ({ total: document.querySelectorAll('[data-reveal]').length, visible: document.querySelectorAll('[data-reveal].is-visible').length })));
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 120));
  }
});
await page.waitForTimeout(600);
console.log('after', await page.evaluate(() => ({ total: document.querySelectorAll('[data-reveal]').length, visible: document.querySelectorAll('[data-reveal].is-visible').length, y: scrollY })));
for (const y of [0, 1200, 1600, 3000, 3900, 5600, 7300, 8300]) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/mob-${y}.png` });
}
await browser.close();
