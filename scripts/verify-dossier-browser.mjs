import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
try {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
  await page.getByRole('heading',{level:1}).waitFor();
  assert.match(await page.getByRole('heading',{level:1}).innerText(),/CONSTRUYO/);
  assert.equal(await page.locator('article.d-project').count(),5);
  await page.locator('.d-project__details summary').first().click();
  assert.equal(await page.locator('.d-project__details').first().evaluate(el=>el.open),true);
  await page.locator('a.d-language').click();
  await page.waitForURL('**/en/');
  assert.match(await page.getByRole('heading',{level:1}).innerText(),/BUILD/);
  assert.equal(await page.locator('article.d-project').count(),5);
  assert.deepEqual(errors,[]);

  const mobile=await browser.newContext({viewport:{width:390,height:844}});
  const small=await mobile.newPage();
  await small.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
  const metrics=await small.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  assert.ok(metrics.scrollWidth <= metrics.innerWidth+2,'Horizontal overflow: '+JSON.stringify(metrics));
  assert.equal(await small.locator('article.d-project').count(),5);
  await small.getByText('Ver decisiones de ingeniería').first().click();
  assert.equal(await small.locator('.d-project__details').first().evaluate(el=>el.open),true);

  const disabled=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const noJs=await disabled.newPage();
  await noJs.goto('http://127.0.0.1:4321/',{waitUntil:'domcontentloaded'});
  assert.equal(await noJs.locator('article.d-project').count(),5);
  await noJs.locator('.d-project__details summary').first().click();
  assert.equal(await noJs.locator('.d-project__details').first().evaluate(el=>el.open),true);
  await context.close();await mobile.close();await disabled.close();
  console.log('Dossier E2E passed: ES/EN, work disclosure, no-JS, mobile overflow');
} finally { await browser.close(); }
