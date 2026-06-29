import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' });

// Prvý dropdown button v hlavičke = Rádiokomunikácie
const btn = await page.$('header nav ul > li.dropdown button');
if (!btn) throw new Error('dropdown button not found');
await btn.hover();
await new Promise((r) => setTimeout(r, 600));

await page.screenshot({ path: '_megamenu_desktop.png' });
console.log('OK desktop screenshot');

// Mobile: otvor hamburger, screenshot rozbaleného menu
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle2' });
await page.evaluate(() => {
  document.querySelector('[data-aw-toggle-menu]')?.click();
});
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: '_megamenu_mobile.png', fullPage: true });
console.log('OK mobile screenshot');

await browser.close();
