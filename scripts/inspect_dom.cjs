const playwright = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR', err.toString()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
  console.log('ROOT_HTML_SNIPPET', rootHtml.slice(0, 2000));
  const screenshotPath = 'scripts/screenshot.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('SCREENSHOT_SAVED', screenshotPath);

  await browser.close();
})();
