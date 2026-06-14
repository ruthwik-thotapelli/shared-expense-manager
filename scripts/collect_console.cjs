const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    const args = msg.args().map(a => a.toString());
    console.log('CONSOLE', msg.type(), ...args);
  });
  page.on('pageerror', err => console.log('PAGE_ERROR', err.toString()));
  page.on('requestfailed', req => console.log('REQUEST_FAILED', req.url(), req.failure()?.errorText));

  try {
    const resp = await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    console.log('STATUS', resp.status());
    const title = await page.title();
    console.log('TITLE', title);
    const html = await page.content();
    console.log('HTML_SNIPPET', html.slice(0, 800));
  } catch (e) {
    console.log('ERROR', e && e.stack ? e.stack : e.toString());
  }

  await browser.close();
  process.exit(0);
})();
