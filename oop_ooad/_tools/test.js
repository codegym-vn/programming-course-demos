// node test.js <shotDir> file1.html file2.html ...
const { chromium } = require('playwright');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell';
(async () => {
  const [shotDir, ...files] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: EXE });
  let bad = 0;
  for (const f of files) {
    const name = f.split('/').slice(-2, -1)[0];
    for (const vw of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width: vw, height: 900 } });
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.goto('file://' + path.resolve(f));
      const tabs = await page.$$eval('.tab', b => b.map(x => x.dataset.ex));
      for (const t of tabs) {
        await page.click(`.tab[data-ex="${t}"]`);
        let n = 0, maxW = 0;
        const log = [];
        while (!(await page.$eval('#next', b => b.disabled)) && n < 200) {
          await page.click('#next'); n++;
          maxW = Math.max(maxW, await page.evaluate(() => document.documentElement.scrollWidth));
          if (vw === 390) log.push(await page.evaluate(() => {
            const m = !document.getElementById('multi').hidden;
            const st = document.getElementById('status').innerText.replace(/\n/g, ' | ');
            if (!m) return st + '  [con: ' + document.getElementById('console').innerText.replace(/\n/g, ' / ') + ']';
            return st + '  {L: ' + document.getElementById('msg0').innerText.replace(/\n/g, ' ') + '} {R: ' + document.getElementById('msg1').innerText.replace(/\n/g, ' ') + '}';
          }));
        }
        if (vw === 390) {
          console.log(`\n=== ${name} [${t}] steps=${n} maxScrollWidth=${maxW}`);
          log.forEach(l => console.log('  ' + l));
          await page.screenshot({ path: `${shotDir}/${name}-${t}-390.png`, fullPage: true });
        } else {
          await page.screenshot({ path: `${shotDir}/${name}-${t}-1280.png`, fullPage: true });
        }
        if (vw === 390) {
          const cut = await page.$$eval('.code', els => els.filter(e => e.scrollWidth > e.clientWidth + 1).length);
          if (cut) console.log(`  ~ CODE CUT (${cut} khung code bị cắt ngang) ${name} [${t}]`);
        }
        if (maxW > vw) { bad++; console.log(`!! OVERFLOW ${name} [${t}] ${maxW} > ${vw}`); }
        if (n === 0) { bad++; console.log(`!! NO STEPS ${name} [${t}]`); }
      }
      // nhập sai (nếu có ô nhập)
      if (vw === 390 && await page.$('#fields input')) {
        await page.fill('#fields input', '9999');
        await page.dispatchEvent('#fields input', 'input');
        console.log('  invalid input -> err:', await page.$eval('#err', e => e.textContent), 'next disabled:', await page.$eval('#next', b => b.disabled));
      }
      if (errs.length) { bad++; console.log('!! PAGEERROR', name, errs); }
      await page.close();
    }
  }
  await browser.close();
  console.log(bad ? `\nFAIL: ${bad} issue(s)` : '\nALL OK');
})();
