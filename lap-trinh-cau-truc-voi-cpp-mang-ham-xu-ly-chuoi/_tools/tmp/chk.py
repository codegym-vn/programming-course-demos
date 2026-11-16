# Dùng: python3 chk.py <C (thư mục khóa)> <thư mục tạm> <stt>
import re,subprocess,os,json,sys
C=sys.argv[1]; W=sys.argv[2]; STT=int(sys.argv[3]); REPO=os.path.dirname(C); os.makedirs(W,exist_ok=True)
t=open(C+'/_tools/content/out/%d.md'%STT,encoding='utf-8').read()
HEAD='#include <iostream>\n#include <string>\n#include <cstring>\n#include <cmath>\nusing namespace std;\n'
F='`'*3
for i,b in enumerate(re.findall(F+r'cpp\n(.*?)'+F,t,flags=re.S)):
    src=b if 'int main' in b else HEAD+'int main(){\n'+b+'\nreturn 0;}\n'
    f='%s/b%d.cpp'%(W,i); open(f,'w').write(src)
    r=subprocess.run(['clang++','-std=c++17','-fsyntax-only','-Wall',f],capture_output=True,text=True)
    errs=[l.split('error:')[-1].strip() for l in r.stderr.split('\n') if ' error:' in l]
    print('khối',i,'|',b.strip().split('\n')[0][:40],'|',('LỖI:'+errs[0][:80]) if errs else 'OK','|','có main' if 'int main' in b else 'đoạn trích')
r=[x for x in json.load(open(C+'/_tools/all_rows.json',encoding='utf-8')) if x['stt']==STT][0]
sims=re.findall(r'^#{20} \[CHÈN MÔ PHỎNG\] #{20}\nTên mô phỏng: .+\nLink mô phỏng: (\S+)\nMã nhúng \(iframe\): <iframe src="(\S+)" title="[^"]+" style="border:0;" allowfullscreen></iframe>\n#{56}$',t,re.M)
print('khung mô phỏng:',len(sims),'| link đúng:',all(a==r['iframe_url']==b for a,b in sims), '| sót iframe/![]:', t.count('<iframe')-len(sims), t.count('!['))
imgs=re.findall(r'^={20} \[CHÈN ẢNH (\d+)\] ={20}\nMô tả ảnh: .+\nLink ảnh: (\S+)\n={54}$',t,re.M)
BASE='https://codegym-vn.github.io/programming-course-demos/'
for n,u in imgs: print('ảnh',n,'tồn tại:',os.path.exists(os.path.join(REPO,u[len(BASE):])),'| đúng thư mục:',u.startswith(r['image_base_url']),u.split('/')[-1])
print('số tiêu đề [CHÈN ẢNH:',t.count('[CHÈN ẢNH'),'| khớp mẫu:',len(imgs),'| fence chẵn:',t.count(F)%2==0)
