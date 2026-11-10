"""Biên dịch thử các khối ```csharp trong bài đọc mới bằng Roslyn của .NET SDK (nếu máy có `dotnet`).

Dùng:
  python3 compile_check.py --config <course.json> [--dir <thư mục .md>]
Mặc định quét _tools/content/out/*.md.
- Chương trình đầy đủ (có Main): mọi lỗi đều tính là lỗi thật; nếu thiếu lớp thì thử ghép với các khối khai báo phía trước trong cùng bài.
- Khối không có Main: chỉ báo lỗi về kiểu/ngữ nghĩa; lỗi do "đoạn trích" (thiếu lớp, câu lệnh rời...) được bỏ qua.
- Khối có chú thích "lỗi biên dịch"/"CSxxxx" được coi là minh họa lỗi có chủ ý.
Đọc kỹ từng lỗi in ra: có thể là đoạn trích hợp lý, hoặc lỗi thật cần sửa trong bài.
"""
import argparse, glob, os, re, subprocess, sys, tempfile
from common import load_config

FRAG = {'CS0246', 'CS8805', 'CS0106', 'CS9348', 'CS8803', 'CS0103', 'CS7014', 'CS0234', 'CS0116', 'CS1519', 'CS1022',
        'CS1513', 'CS1002', 'CS1001', 'CS1003', 'CS1031', 'CS8641', 'CS1525', 'CS1597', 'CS0841', 'CS0119'}
DUP = {'CS0101', 'CS0111', 'CS0121', 'CS0102', 'CS0128', 'CS0100', 'CS0260', 'CS0542', 'CS0115'}
NOWARN = '-nowarn:CS0169,CS0414,CS0219,CS0649,CS0168,CS8981,CS0108,CS0067,CS0105,CS0162,CS8632,CS0472'
USINGS = 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.IO;\nusing System.Text;\n'


def find_roslyn():
    try:
        out = subprocess.run(['dotnet', '--list-sdks'], capture_output=True, text=True).stdout.strip().split('\n')
    except FileNotFoundError:
        return None, None
    if not out or not out[-1]:
        return None, None
    ver, root = re.match(r'(\S+) \[(.+)\]', out[-1]).groups()
    csc = os.path.join(root, ver, 'Roslyn', 'bincore', 'csc.dll')
    packs = os.path.join(os.path.dirname(root), 'packs', 'Microsoft.NETCore.App.Ref')
    refs = sorted(glob.glob(os.path.join(packs, '*', 'ref', 'net*')))
    return (csc if os.path.exists(csc) else None), (refs[-1] if refs else None)


def hoist(parts):
    us, body = [], []
    for p in parts:
        for l in p.split('\n'):
            (us if re.match(r'^using [\w\.]+;\s*$', l) else body).append(l)
    return '\n'.join(dict.fromkeys(us)) + '\n' + '\n'.join(body)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--config', required=True)
    ap.add_argument('--dir')
    a = ap.parse_args()
    cfg = load_config(a.config)
    d = a.dir or os.path.join(cfg['tools'], 'content', 'out')
    csc, ref = find_roslyn()
    if not csc or not ref:
        sys.exit('Không tìm thấy .NET SDK (dotnet) để biên dịch thử. Bỏ qua bước này và rà code bằng mắt.')
    refs = ['-r:' + f for f in glob.glob(os.path.join(ref, '*.dll'))]
    work = tempfile.mkdtemp(prefix='cc-')

    def comp(src, exe):
        open(os.path.join(work, 'a.cs'), 'w', encoding='utf-8').write(src)
        r = subprocess.run(['dotnet', csc, '-nologo', NOWARN, '-langversion:latest', '-nullable:disable',
                            '-target:' + ('exe' if exe else 'library'), '-out:' + os.path.join(work, 'a.dll'),
                            os.path.join(work, 'a.cs')] + refs, capture_output=True, text=True)
        return [l for l in (r.stdout + r.stderr).split('\n') if 'error CS' in l]

    codes = lambda e: {re.search(r'error (CS\d+)', x).group(1) for x in e}
    tot = ok = skip = 0; real = []
    files = sorted(glob.glob(os.path.join(d, '*.md')), key=lambda x: (len(os.path.basename(x)), os.path.basename(x)))
    for p in files:
        name = os.path.basename(p)[:-3]
        blocks = re.findall(r'```csharp\n(.*?)```', open(p, encoding='utf-8').read(), flags=re.S)
        decls = []
        for i, b in enumerate(blocks):
            tot += 1
            exe = bool(re.search(r'static\s+(async\s+)?(void|int|Task)\s+Main', b))
            intended = bool(re.search(r'(//|/\*).*(lỗi biên dịch|CS\d{4}|error CS|không biên dịch)', b, re.I))
            isdecl = (not exe) and re.search(r'\b(class|interface|enum|struct|record)\b', b)
            e = comp(hoist([USINGS, b]), exe)
            if not e:
                ok += 1; decls += [b] if isdecl else []; continue
            if intended:
                skip += 1; continue
            if codes(e) <= FRAG:
                e2 = comp(hoist([USINGS] + decls + [b]), exe)
                if not e2:
                    ok += 1; decls += [b] if isdecl else []; continue
                if not exe and codes(e2) <= FRAG | DUP:
                    skip += 1; continue
                if exe and codes(e2) <= DUP:
                    skip += 1; continue
                e = e2
            real.append((name, i, [x.split('a.cs')[-1][:180] for x in e[:2]]))
    print('Khối code: %d | biên dịch được: %d | đoạn trích/minh họa lỗi bỏ qua: %d | cần xem: %d' % (tot, ok, skip, len(real)))
    for r in real:
        print('  bài %s, khối %d: %s' % r)


if __name__ == '__main__':
    main()
