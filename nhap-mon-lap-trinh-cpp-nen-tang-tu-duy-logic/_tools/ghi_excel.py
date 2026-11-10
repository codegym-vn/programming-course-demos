"""Ghi kết quả khóa C++ vào Excel của người dùng (~/Downloads/phan-tich-mo-phong-nhap-mon-cpp.xlsx).

Việc làm (sao lưu trước khi ghi, chỉ đụng các cột nêu dưới):
- Đường dẫn file / Link GitHub Pages: đổi theo thư mục thật nhap-mon-lap-trinh-cpp-nen-tang-tu-duy-logic.
- Trạng thái: Done nếu index.html đã có, ngược lại Chưa done.
- Nội dung mới: lấy từ _tools/content/out/<stt>.md (ghi đè nếu --overwrite, mặc định chỉ điền ô trống).
- Thêm cột "Hình trong bài đọc (link)" (nếu chưa có): danh sách link hình ![...](...) trong nội dung mới, mỗi link một dòng.
Dùng: python3 ghi_excel.py [--overwrite] [--out <file xlsx mới>]
"""
import json, os, re, shutil, sys, time
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Font, PatternFill, Border, Side

T = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(T))
X = os.path.expanduser('~/Downloads/phan-tich-mo-phong-nhap-mon-cpp.xlsx')
over = '--overwrite' in sys.argv
OUT = X
if '--out' in sys.argv:
    OUT = os.path.expanduser(sys.argv[sys.argv.index('--out') + 1])
if OUT == X and os.path.exists(os.path.join(os.path.dirname(X), '~$' + os.path.basename(X))):
    sys.exit('File Excel đang mở. Hãy đóng Excel rồi chạy lại, hoặc chạy với --out <file mới> để ghi ra một bản sao.')
os.makedirs(os.path.join(T, 'backup'), exist_ok=True)
bk = os.path.join(T, 'backup', time.strftime('%Y%m%d-%H%M%S') + '-truoc-ghi.xlsx')
shutil.copy(X, bk)
rows = {r['stt']: r for r in json.load(open(os.path.join(T, 'all_rows.json'), encoding='utf-8'))}
wb = load_workbook(X)
p = wb['Phan tich']
h = {c.value: i for i, c in enumerate(p[1])}
IMG = 'Hình trong bài đọc (link)'
if IMG not in h:
    col = p.max_column + 1
    c = p.cell(row=1, column=col, value=IMG)
    ref = p.cell(row=1, column=col - 1)
    c.font, c.fill, c.border, c.alignment = ref.font.copy(), ref.fill.copy(), ref.border.copy(), ref.alignment.copy()
    p.column_dimensions[c.column_letter].width = 60
    h[IMG] = col - 1
W = Alignment(wrap_text=True, vertical='top')
done = filled = 0
for r in p.iter_rows(min_row=2):
    try:
        stt = int(r[h['STT']].value)
    except (TypeError, ValueError):
        continue
    info = rows.get(stt)
    if not info:
        continue
    r[h['Đường dẫn file (đề xuất)']].value = info['output_path']
    r[h['Link GitHub Pages (sau khi đẩy)']].value = info['iframe_url']
    ok = os.path.exists(os.path.join(REPO, info['output_path']))
    st = r[h['Trạng thái']]
    st.value = 'Done' if ok else 'Chưa done'
    st.fill = PatternFill('solid', fgColor='C6EFCE' if ok else 'FFC7CE')
    st.font = Font(name='Arial', size=10, bold=True, color='006100' if ok else '9C0006')
    done += ok
    md = os.path.join(T, 'content', 'out', '%d.md' % stt)
    if os.path.exists(md):
        t = open(md, encoding='utf-8').read().rstrip('\n')
        cell = r[h['Nội dung mới']]
        if over or not cell.value:
            cell.value = t; cell.alignment = W; filled += 1
        imgs = re.findall(r'!\[[^\]]*\]\((https?://[^)\s]+)\)', t)
        r[h[IMG]].value = '\n'.join(imgs) if imgs else ''
        r[h[IMG]].alignment = W
wb.save(OUT)
print('Đã ghi:', OUT)
print('Sao lưu:', bk)
print('Done: %d | đã điền Nội dung mới: %d' % (done, filled))
