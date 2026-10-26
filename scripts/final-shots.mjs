import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });

async function shoot(name, url, width, height, dpr, mobile = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important} header{position:static !important}' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width, height: Math.min(h, 12000) });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/final-${name}.png` });
  console.log(name, width, h, await page.evaluate(() => ({ reveals: document.querySelectorAll('[data-reveal]').length, visible: document.querySelectorAll('[data-reveal].is-visible').length })));
  await page.close();
}

const pages = [['home','/'],['projects','/projects'],['project','/projects/field-notes'],['services','/services'],['about','/about'],['contact','/contact'],['404','/nope']];
for (const [n,p] of pages) await shoot(n, 'http://127.0.0.1:4399'+p, 1440, 1000, 1);
await shoot('home-mobile', 'http://127.0.0.1:4399/', 390, 844, 1, true);
await shoot('projects-mobile', 'http://127.0.0.1:4399/projects', 390, 844, 1, true);
await shoot('contact-mobile', 'http://127.0.0.1:4399/contact', 390, 844, 1, true);
await browser.close();
