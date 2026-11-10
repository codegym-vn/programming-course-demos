// Vẽ hình minh họa cho bài đọc: chụp một file HTML thành PNG (nét gấp đôi, nền trắng).
// Dùng: node render_image.js <hinh.html> <hinh.png> [bề rộng px, mặc định 880]
// File HTML nên có một phần tử gốc id="art"; ảnh chỉ chụp phần tử đó (không có khoảng trắng thừa).
const path = require('path'), os = require('os'), fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require(path.join(os.homedir(), '.cache', 'codegym-sim-pw', 'node_modules', 'playwright')); }
function findExe() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const r of [path.join(os.homedir(), 'Library/Caches/ms-playwright'), path.join(os.homedir(), '.cache/ms-playwright')]) {
    if (!fs.existsSync(r)) continue;
    for (const d of fs.readdirSync(r).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse()) {
      const sub = fs.readdirSync(path.join(r, d)).find(x => x.startsWith('chrome-headless-shell'));
      const exe = sub && path.join(r, d, sub, 'chrome-headless-shell');
      if (exe && fs.existsSync(exe)) return exe;
    }
  }
}
(async () => {
  const [src, out, w] = process.argv.slice(2);
  if (!src || !out) { console.log('Dùng: node render_image.js <hinh.html> <hinh.png> [bề rộng]'); process.exit(2); }
  const exe = findExe();
  const b = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const p = await b.newPage({ viewport: { width: +w || 880, height: 600 }, deviceScaleFactor: 2, colorScheme: 'light' });
  await p.goto('file://' + path.resolve(src));
  await p.waitForTimeout(300);
  const el = await p.$('#art');
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  if (el) await el.screenshot({ path: out }); else await p.screenshot({ path: out, fullPage: true });
  await b.close();
  console.log('Đã tạo', out);
})();
