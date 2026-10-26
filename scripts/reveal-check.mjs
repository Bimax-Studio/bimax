import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
console.log('before', await page.locator('[data-reveal]').count(), await page.locator('[data-reveal].is-visible').count(), 'scrollHeight', await page.evaluate(()=>document.body.scrollHeight));
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  const els = [...document.querySelectorAll('[data-reveal]')];
  for (const el of els) {
    el.scrollIntoView({ block: 'center' });
    await new Promise(r => setTimeout(r, 120));
  }
  window.scrollTo(0,0);
});
await page.waitForTimeout(800);
console.log('after', await page.locator('[data-reveal].is-visible').count(), 'visibleText', (await page.locator('body').innerText()).length);
await page.screenshot({ path: '/tmp/shot-home2.png', fullPage: true });
await browser.close();
