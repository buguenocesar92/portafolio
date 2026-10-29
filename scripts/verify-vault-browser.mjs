import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const origin='http://127.0.0.1:4321';
const browser=await chromium.launch({headless:true});
try {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(origin+'/',{waitUntil:'networkidle'});
  const buttons=page.locator('button[aria-controls="vault-detail"]');
  await buttons.first().waitFor();
  assert.equal(await buttons.count(),4,'There should be four accessible node controls');
  await page.getByRole('button',{name:/Calify & Fit/i}).click();
  await page.waitForFunction(() => document.querySelector('#vault-detail h3')?.textContent==='Calify & Fit');
  assert.match(await page.locator('#vault-detail').innerText(),/No se muestra información de salud/);
  assert.equal(await page.getByRole('button',{name:/Calify & Fit/i}).getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:/KraftDo/i}).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#vault-detail h3')?.textContent==='KraftDo');
  assert.equal(errors.length,0,'Browser page errors: '+errors.join('; '));

  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  await page.locator('button[aria-controls="vault-detail"]').first().waitFor();
  assert.equal(await page.locator('.vault__fallback').isVisible(),true,'SVG fallback must remain visible');
  assert.equal(await page.locator('.vault__canvas').evaluate(e=>getComputedStyle(e).opacity),'0','3D canvas must remain hidden when motion is reduced');

  const en=await context.newPage();
  await en.goto(origin+'/en/',{waitUntil:'networkidle'});
  assert.equal(await en.locator('button[aria-controls="vault-detail"]').count(),4);
  await en.getByRole('button',{name:/Calify & Fit/i}).click();
  await en.waitForFunction(() => document.querySelector('#vault-detail h3')?.textContent==='Calify & Fit');
  assert.match(await en.locator('#vault-detail').innerText(),/No personal health data/);
  await en.close();

  const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage=await noJs.newPage();
  await staticPage.goto(origin+'/',{waitUntil:'domcontentloaded'});
  assert.equal(await staticPage.locator('.vault__noscript article').count(),4,'No-JS page must provide all project descriptions');
  assert.equal(await staticPage.locator('.vault-fallback').count(),1,'SVG schematic must be SSR');
  await noJs.close();
  await context.close();
  console.log('Vault Chromium E2E: ES/EN selection, keyboard, reduced motion and no-JS passed.');
} finally {
  await browser.close();
}
