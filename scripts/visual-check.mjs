import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

const errors = [];
const failed = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
});
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
page.on('response', (response) => {
  if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
});

async function settle() {
  await page.waitForTimeout(300);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 400));
  });
  await page.waitForTimeout(300);
}

const routes = [
  ['/', 'home'],
  ['/projects', 'projects'],
  ['/projects/field-notes', 'project'],
  ['/services', 'services'],
  ['/about', 'about'],
  ['/contact', 'contact'],
  ['/keystatic', 'keystatic'],
  ['/nope', '404'],
];

for (const [route, name] of routes) {
  await page.goto(`http://127.0.0.1:4399${route}`, { waitUntil: 'networkidle' });
  await settle();
  await page.screenshot({ path: `/tmp/shot-${name}.png`, fullPage: true });
  console.log(name, page.url(), (await page.locator('body').innerText()).slice(0, 90).replace(/\n/g, ' | '));
}

// Mobile
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
for (const [route, name] of [['/', 'home-mobile'], ['/projects', 'projects-mobile'], ['/contact', 'contact-mobile']]) {
  await mobile.goto(`http://127.0.0.1:4399${route}`, { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(400);
  await mobile.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await mobile.waitForTimeout(500);
  await mobile.screenshot({ path: `/tmp/shot-${name}.png`, fullPage: true });
}

console.log('--- failed ---');
console.log(failed.length ? [...new Set(failed)].join('\n') : 'none');
console.log('--- browser errors ---');
console.log(errors.length ? errors.join('\n') : 'none');

await browser.close();
