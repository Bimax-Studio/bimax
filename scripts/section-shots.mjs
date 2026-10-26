import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  for (const el of document.querySelectorAll('[data-reveal]')) {
    el.scrollIntoView({ block: 'center' });
    await new Promise(r => setTimeout(r, 70));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(500);

const sections = await page.evaluate(() => {
  const map = (heading) => {
    const el = [...document.querySelectorAll('h1,h2')].find(h => h.textContent.includes(heading));
    return el?.closest('section') ? true : false;
  };
  return {
    hero: !!document.querySelector('main > section'),
    bento: map('Small by design'),
    work: map('Things we made'),
    services: map('Five ways in'),
    manifesto: map('Not for everyone'),
  };
});
console.log(sections);

const specs = [
  ['hero', 'main > section:first-of-type'],
  ['bento', 'main > section:nth-of-type(2)'],
  ['work', '#work'],
  ['manifesto', 'main > section:nth-of-type(5)'],
];
for (const [name, selector] of specs) {
  const loc = page.locator(selector).first();
  try {
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await loc.screenshot({ path: `/tmp/sec-${name}.png` });
    console.log(name, await loc.boundingBox());
  } catch (e) { console.log(name, 'FAILED', e.message.slice(0,80)); }
}
await page.locator('.dithered-gradient').first().screenshot({ path: '/tmp/sec-herocard.png' });
await page.locator('footer').screenshot({ path: '/tmp/sec-footer.png' });
await browser.close();
