const { chromium } = require('playwright'); const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell';
(async()=>{ const b=await chromium.launch({executablePath:EXE}); const seen=new Set();
 for(const f of process.argv.slice(2)){ const p=await b.newPage({viewport:{width:390,height:900}}); await p.goto('file://'+path.resolve(f));
  const tabs=await p.$$eval('.tab',x=>x.map(y=>y.dataset.ex));
  for(const t of tabs){ await p.click(`.tab[data-ex="${t}"]`);
   const r=await p.$$eval('.code',els=>{const o=[];els.forEach(c=>{c.querySelectorAll('.ln').forEach(l=>{if(l.lastElementChild.getBoundingClientRect().right>c.getBoundingClientRect().right-12)o.push(l.innerText.replace(/\n/g,' ').trim())})});return o;});
   r.forEach(x=>{const k=f.split('/').slice(-2,-1)[0]+' | '+x; if(!seen.has(k)){seen.add(k);console.log(k+'  ('+x.replace(/^\d+\s*/,'').length+')');}});}
  await p.close();}
 await b.close();})();
