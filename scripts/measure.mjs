import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args:['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4399/', { waitUntil: 'networkidle' });
const data = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('Not for everyone'));
  const section = h.closest('section');
  const card = section.querySelector(':scope > div');
  const eyebrow = [...section.querySelectorAll('p')].find(p => p.textContent.includes('How we think'));
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: b.top + scrollY, height: b.height, left: b.left, width: b.width }; };
  return {
    scrollY,
    section: r(section),
    card: r(card),
    eyebrow: r(eyebrow),
    h2: r(h),
    cardPadding: card ? getComputedStyle(card).padding : null,
    sectionPadding: getComputedStyle(section).padding,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
