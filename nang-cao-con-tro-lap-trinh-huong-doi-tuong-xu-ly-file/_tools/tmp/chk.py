# Dùng: python3 chk.py <C> <thư mục tạm> <stt>
import re,subprocess,os,json,sys
C=sys.argv[1]; W=sys.argv[2]; STT=int(sys.argv[3]); REPO=os.path.dirname(C); os.makedirs(W,exist_ok=True)
t=open(C+'/_tools/content/out/%d.md'%STT,encoding='utf-8').read()
HEAD='#include <iostream>\n#include <string>\n#include <fstream>\nusing namespace std;\n'
FENCE='`'*3
for i,b in enumerate(re.findall(FENCE+r'cpp\n(.*?)'+FENCE,t,flags=re.S)):
    src=b if 'int main' in b else HEAD+'int main(){\n'+b+'\nreturn 0;}\n'
    f='%s/b%d.cpp'%(W,i); open(f,'w').write(src)
    r=subprocess.run(['clang++','-std=c++17','-fsyntax-only','-Wall',f],capture_output=True,text=True)
    errs=[l.split('error:')[-1].strip() for l in r.stderr.split('\n') if ' error:' in l]
    warns=[l.split('warning:')[-1].strip()[:70] for l in r.stderr.split('\n') if ' warning:' in l]
    print('khối',i,'|',b.strip().split('\n')[0][:40],'|',('LỖI:'+errs[0][:80]) if errs else 'OK','|',warns[:1], '| có main' if 'int main' in b else '| đoạn trích')
rows={r['stt']:r for r in json.load(open(C+'/_tools/all_rows.json',encoding='utf-8'))}; r=rows[STT]
m=re.search(FENCE+r'\n<iframe src="([^"]+)" title="[^"]+" style="border:0;" allowfullscreen></iframe>\n'+FENCE,t)
print('iframe đúng:',bool(m) and m.group(1)==r['iframe_url'],'| số iframe:',t.count('<iframe'))
BASE='https://codegym-vn.github.io/programming-course-demos/'
for u in re.findall(r'!\[[^\]]*\]\((https?://[^)\s]+)\)',t): print('hình tồn tại:',os.path.exists(os.path.join(REPO,u[len(BASE):])),u.split('/')[-1])
print('fence chẵn:',t.count(FENCE)%2==0,'| độ dài',len(t))
