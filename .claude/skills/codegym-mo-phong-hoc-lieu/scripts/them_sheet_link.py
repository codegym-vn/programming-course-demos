"""Thêm 2 sheet vào Excel kết quả: "Danh sach link" (link mô phỏng + link ảnh từng bài) và "Huong dan chen"
(giải thích khung [CHÈN ẢNH n] / [CHÈN MÔ PHỎNG] cho AI chèn sau này).

Dùng: python3 them_sheet_link.py --config <khóa>/_tools/course.json [--xlsx <file Excel cần thêm sheet>]
Mặc định --xlsx: bản *-DA-CAP-NHAT.xlsx nếu có (do ghi_excel_ngoai.py tạo khi Excel gốc đang mở), ngược lại file gốc.
Ảnh lấy từ các dòng "Link ảnh: ..." trong <khóa>/_tools/content/out/<stt>.md.
"""
import argparse, json, os, re
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

ap = argparse.ArgumentParser()
ap.add_argument('--config', required=True)
ap.add_argument('--xlsx')
a = ap.parse_args()
T = os.path.dirname(os.path.abspath(a.config))
cfg = json.load(open(a.config, encoding='utf-8'))
src = os.path.expanduser(cfg['excel_source'])
X = os.path.expanduser(a.xlsx) if a.xlsx else (src.replace('.xlsx', '-DA-CAP-NHAT.xlsx') if os.path.exists(src.replace('.xlsx', '-DA-CAP-NHAT.xlsx')) else src)
if os.path.exists(os.path.join(os.path.dirname(X), '~$' + os.path.basename(X))):
    raise SystemExit('File đang mở trong Excel: ' + X + ' — đóng lại rồi chạy lại.')
course_dir = os.path.basename(os.path.dirname(T))
rows = json.load(open(os.path.join(T, 'all_rows.json'), encoding='utf-8'))
wb = load_workbook(X)
for n in ('Danh sach link', 'Huong dan chen'):
    if n in wb.sheetnames:
        del wb[n]
thin = Side(style='thin', color='BFBFBF')
ws = wb.create_sheet('Danh sach link')
ws.append(['STT', 'Module', 'Bài', 'Hoạt động', 'Link mô phỏng (GitHub Pages)', 'Số ảnh', 'Link ảnh (mỗi link một dòng)'])
for c in ws[1]:
    c.font = Font(name='Arial', bold=True, color='FFFFFF', size=10)
    c.fill = PatternFill('solid', fgColor='1F4E78')
    c.alignment = Alignment(wrap_text=True, vertical='center')
total = 0
for r in rows:
    md = os.path.join(T, 'content', 'out', '%d.md' % r['stt'])
    t = open(md, encoding='utf-8').read() if os.path.exists(md) else ''
    used = re.findall(r'^Link ảnh: (\S+)', t, re.M)
    total += len(used)
    ws.append([r['stt'], r.get('chapter', ''), r.get('lesson', ''), r.get('activity', ''), r['iframe_url'], len(used), '\n'.join(used)])
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.font = Font(name='Arial', size=10)
        c.alignment = Alignment(wrap_text=True, vertical='top')
        c.border = Border(top=thin, bottom=thin, left=thin, right=thin)
    row[4].hyperlink = row[4].value
    row[4].font = Font(name='Arial', size=10, color='0563C1', underline='single')
for col, w in zip('ABCDEFG', [6, 30, 30, 38, 70, 8, 110]):
    ws.column_dimensions[col].width = w
ws.freeze_panes = 'A2'
g = wb.create_sheet('Huong dan chen')
L = [('Hướng dẫn cho AI khi chèn "Nội dung mới" vào bài đọc', ''), ('', ''),
     ('Vị trí', 'Đã đánh dấu sẵn đúng chỗ trong cột "Nội dung mới" (sheet Phan tich) bằng các khung dưới đây. Thay cả khung (từ dòng tiêu đề tới dòng kẻ đóng) bằng ảnh/mô phỏng thật.'),
     ('Khung ảnh', '==================== [CHÈN ẢNH n] ====================\nMô tả ảnh: ...  (dùng làm chú thích/alt)\nLink ảnh: https://.../hinh/ten-hinh.png\n======================================================'),
     ('Khung mô phỏng', '#################### [CHÈN MÔ PHỎNG] ####################\nTên mô phỏng: ...\nLink mô phỏng: https://.../\nMã nhúng (iframe): <iframe ...></iframe>  (dán nguyên dòng này nếu hệ thống cho nhúng; không thì chèn Link mô phỏng)\n########################################################'),
     ('Số lượng', 'Mỗi bài có đúng 1 khung mô phỏng và 0-2 khung ảnh (xem sheet "Danh sach link").'),
     ('Khối code', '```cpp ... ``` là code C++; ``` không ngôn ngữ là output hoặc thông báo lỗi.'),
     ('Lưu ý', 'Link chỉ hoạt động sau khi thư mục %s đã được đẩy lên GitHub Pages.' % course_dir)]
for x, y in L:
    g.append([x, y])
g['A1'].font = Font(name='Arial', bold=True, size=13)
for r in g.iter_rows(min_row=3):
    r[0].font = Font(name='Arial', bold=True, size=10)
    r[1].font = Font(name='Courier New', size=10)
    for c in r:
        c.alignment = Alignment(wrap_text=True, vertical='top')
g.column_dimensions['A'].width = 18
g.column_dimensions['B'].width = 110
wb.save(X)
print('Đã thêm 2 sheet vào', X, '| số bài:', len(rows), '| số ảnh:', total)
