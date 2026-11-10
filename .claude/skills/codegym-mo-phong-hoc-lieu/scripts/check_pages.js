// Kiểm thử trang mô phỏng bằng Playwright (Chromium headless).
// Dùng: node check_pages.js [--shots <thư mục ảnh>] [--quiet] <index.html ...>
// Với mỗi trang, mỗi tab, ở 390px và 1280px: bấm "Bước tiếp" tới hết, rồi kiểm:
//   - tràn ngang (scrollWidth > bề rộng), lỗi JS (pageerror), tab không có bước nào
//   - chữ hỏng ở MỌI bước: [object Object], undefined, NaN
//   - dòng code bị cắt trong khung code (ở 390px)
//   - ô nhập (nếu có): nhập sai phải hiện #err và khóa nút Bước tiếp
// In tiêu đề + giải thích từng bước (390px) để đối chiếu nội dung, chụp ảnh từng tab vào thư mục ảnh.
// Cuối cùng in "ALL OK" hoặc "FAIL: n issue(s)".
// Cài đặt một lần: bash setup_playwright.sh
const path = require('path'), os = require('os'), fs = require('fs');
let pw;
try { pw = require('playwright'); }
catch (e) { pw = require(path.join(os.homedir(), '.cache', 'codegym-sim-pw', 'node_modules', 'playwright')); }

function findExe() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const roots = [path.join(os.homedir(), 'Library/Caches/ms-playwright'), path.join(os.homedir(), '.cache/ms-playwright')];
  for (const r of roots) {
    if (!fs.existsSync(r)) continue;
    const dirs = fs.readdirSync(r).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse();
    for (const d of dirs) {
      const sub = fs.readdirSync(path.join(r, d)).find(x => x.startsWith('chrome-headless-shell'));
      if (!sub) continue;
      const exe = path.join(r, d, sub, 'chrome-headless-shell');
      if (fs.existsSync(exe)) return exe;
    }
  }
  return undefined; // để Playwright tự tìm
}

(async () => {
  const args = process.argv.slice(2);
  let shots = null, quiet = false; const files = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--shots') shots = args[++i];
    else if (args[i] === '--quiet') quiet = true;
    else files.push(args[i]);
  }
  if (!files.length) { console.log('Dùng: node check_pages.js [--shots dir] [--quiet] <index.html ...>'); process.exit(2); }
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const exe = findExe();
  const browser = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  let bad = 0, steps = 0;
  const problem = m => { bad++; console.log('!! ' + m); };
  for (const f of files) {
    const name = path.basename(path.dirname(f));
    for (const vw of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width: vw, height: 900 } });
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.goto('file://' + path.resolve(f));
      const tabs = await page.$$eval('.tab', b => b.map(x => x.dataset.ex));
      for (const t of tabs) {
        await page.click(`.tab[data-ex="${t}"]`);
        let n = 0, maxW = 0; const log = [];
        const scan = async () => {
          const m = await page.evaluate(() => { const x = document.body.innerText.match(/\[object Object\]|\bundefined\b|\bNaN\b/); return x ? x[0] : null; });
          if (m) problem(`${name} [${t}] ${vw}px bước ${n}: chữ hỏng "${m}"`);
        };
        await scan();
        while (!(await page.$eval('#next', b => b.disabled)) && n < 300) {
          await page.click('#next'); n++; steps++;
          maxW = Math.max(maxW, await page.evaluate(() => document.documentElement.scrollWidth));
          await scan();
          if (vw === 390 && !quiet) log.push(await page.evaluate(() => {
            const multi = !document.getElementById('multi').hidden;
            const st = document.getElementById('status').innerText.replace(/\n/g, ' | ');
            if (!multi) return st + '  [console: ' + document.getElementById('console').innerText.replace(/\n/g, ' / ') + ']';
            return st + '  {Trái: ' + document.getElementById('msg0').innerText.replace(/\n/g, ' ') + '} {Phải: ' + document.getElementById('msg1').innerText.replace(/\n/g, ' ') + '}';
          }));
        }
        if (vw === 390) {
          if (!quiet) { console.log(`\n=== ${name} [${t}] ${n} bước`); log.forEach(l => console.log('  ' + l)); }
          const cut = await page.$$eval('.code', els => { const o = []; els.forEach(c => { if (!c.offsetParent) return; const right = c.getBoundingClientRect().right - 12; c.querySelectorAll('.ln').forEach(l => { const s = l.lastElementChild; if (s && s.getBoundingClientRect().right > right) o.push(l.innerText.replace(/\n/g, ' ').trim()); }); }); return o; });
          cut.forEach(x => problem(`${name} [${t}] dòng code bị cắt ở 390px: ${x}`));
        }
        if (shots) { await page.waitForTimeout(400); await page.screenshot({ path: path.join(shots, `${name}-${t}-${vw}.png`), fullPage: true }); }
        if (maxW > vw) problem(`${name} [${t}] tràn ngang ${maxW} > ${vw}`);
        if (n === 0) problem(`${name} [${t}] không có bước nào`);
      }
      if (vw === 390 && await page.$('#fields input')) {
        await page.fill('#fields input', '9999999999999999');
        await page.dispatchEvent('#fields input', 'input');
        const e = await page.$eval('#err', x => x.textContent), dis = await page.$eval('#next', b => b.disabled);
        if (!quiet) console.log(`  [nhập sai] err="${e}" khóa nút=${dis}`);
      }
      if (errs.length) problem(`${name} lỗi JS: ${errs.join(' | ')}`);
      await page.close();
    }
  }
  await browser.close();
  console.log(`\nĐã chạy ${files.length} trang, ${steps} bước.`);
  console.log(bad ? `FAIL: ${bad} issue(s)` : 'ALL OK');
  process.exit(bad ? 1 : 0);
})();
