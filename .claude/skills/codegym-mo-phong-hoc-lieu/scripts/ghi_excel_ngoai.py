"""Ghi kết quả vào file Excel nằm NGOÀI repo (ví dụ ~/Downloads/phan-tich-....xlsx).

Cấu hình trong <khóa>/_tools/course.json:  "excel_source": "~/Downloads/<file>.xlsx"
Dữ liệu: <khóa>/_tools/all_rows.json (stt, output_path, iframe_url ... đã sửa theo thư mục thật)
         <khóa>/_tools/content/out/<stt>.md (nội dung mới)

Việc làm (luôn sao lưu trước; chỉ đụng các cột nêu dưới; không đụng Nội dung cũ, Duyệt, Ý kiến):
- Đường dẫn file / Link GitHub Pages: ghi theo thư mục thật của khóa (cho MỌI dòng).
- Trạng thái: Done nếu index.html đã có, ngược lại Chưa done.
- Nội dung mới: điền từ file .md (mặc định chỉ ô trống; --overwrite để ghi đè).
- Hình trong bài đọc (link): thêm cột nếu chưa có; mỗi link hình trong bài một dòng.
Dùng: python3 ghi_excel_ngoai.py --config <course.json> [--overwrite] [--out <file mới>]
Nếu file Excel đang mở (có ~$...) thì tự ghi ra bản sao *-DA-CAP-NHAT.xlsx cạnh file gốc.
"""
import argparse, json, os, re, shutil, sys, time
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Font, PatternFill
from copy import copy

ap = argparse.ArgumentParser()
ap.add_argument('--config', required=True)
ap.add_argument('--overwrite', action='store_true')
ap.add_argument('--out')
a = ap.parse_args()
cfg = json.load(open(a.config, encoding='utf-8'))
T = os.path.dirname(os.path.abspath(a.config))
REPO = os.path.dirname(os.path.dirname(T))
X = os.path.expanduser(cfg['excel_source'])
locked = os.path.exists(os.path.join(os.path.dirname(X), '~$' + os.path.basename(X)))
OUT = os.path.expanduser(a.out) if a.out else (X.replace('.xlsx', '-DA-CAP-NHAT.xlsx') if locked else X)
if locked and OUT == X:
    sys.exit('Excel đang mở: dùng --out hoặc đóng file rồi chạy lại.')
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
    c.font, c.fill, c.border, c.alignment = copy(ref.font), copy(ref.fill), copy(ref.border), copy(ref.alignment)
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
        if a.overwrite or not cell.value:
            cell.value = t; cell.alignment = W; filled += 1
        imgs = re.findall(r'!\[[^\]]*\]\((https?://[^)\s]+)\)', t) + re.findall(r'^Link ảnh: (https?://\S+)', t, re.M)
        r[h[IMG]].value = '\n'.join(imgs); r[h[IMG]].alignment = W
wb.save(OUT)
print('Đã ghi:', OUT)
print('Sao lưu:', bk)
print('Done: %d | điền Nội dung mới: %d' % (done, filled))
