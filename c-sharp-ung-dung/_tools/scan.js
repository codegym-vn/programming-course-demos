const { chromium } = require('playwright'); const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell';
(async()=>{ const b=await chromium.launch({executablePath:EXE}); let bad=0,steps=0;
 for(const f of process.argv.slice(2)){ const p=await b.newPage({viewport:{width:390,height:900}}); const name=f.split('/').slice(-2,-1)[0];
  await p.goto('file://'+path.resolve(f)); const tabs=await p.$$eval('.tab',x=>x.map(y=>y.dataset.ex));
  for(const t of tabs){ await p.click(`.tab[data-ex="${t}"]`); let n=0;
   const chk=async()=>{const m=await p.evaluate(()=>{const x=document.body.innerText.match(/\[object Object\]|undefined|NaN|null null|\bnull\b(?=\s*→)/);return x?x[0]:null;});if(m){bad++;console.log('!! '+name+' ['+t+'] step '+n+': '+m);}};
   await chk();
   while(!(await p.$eval('#next',x=>x.disabled))&&n<200){await p.click('#next');n++;steps++;await chk();}}
  await p.close();}
 await b.close(); console.log('steps scanned:',steps,'issues:',bad);})();
