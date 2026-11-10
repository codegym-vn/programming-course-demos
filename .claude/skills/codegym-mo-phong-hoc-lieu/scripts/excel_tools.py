"""Công cụ Excel cho quy trình học liệu.

Lệnh con:
  create   --config C --rows analysis.json [--include-skipped] [--force]
           Tạo file Excel phân tích (sheet Tong quan, Phan tich, Thu vien hinh) từ JSON phân tích.
           Mặc định CHỈ ghi học liệu "Nên làm" / "Làm thêm nếu muốn" (người dùng muốn bỏ hẳn bài "Không cần").
           Không ghi đè file đã có trừ khi --force (file có thể đã chứa ý kiến/nội dung của người dùng).
  status   --config C
           Cập nhật cột Trạng thái = Done / Chưa done theo việc index.html đã tồn tại. Giữ nguyên mọi cột khác.
  specs    --config C [--groups 8] [--pending]
           Xuất các dòng cần làm mô phỏng ra _tools/specs/groupN.json cho tác nhân viết mô phỏng.
  content  --config C [--groups 8] [--overwrite]
           Xuất các dòng có "Nội dung cũ" (và chưa có "Nội dung mới", trừ khi --overwrite) kèm thông tin mô phỏng
           ra _tools/content/in/groupN.json cho tác nhân viết bài đọc.
  insert   --config C [--overwrite]
           Chèn _tools/content/out/<stt>.md vào cột "Nội dung mới" (sao lưu Excel trước). Mặc định chỉ điền ô trống.

Định dạng analysis.json: mảng các đối tượng
  {"module": 1, "lesson": "...", "activity": "...", "type": "Bài đọc", "level": "Nên làm",
   "goal": "...", "layout": "1 cột, 3 tab", "visual": "...", "components": "H01, H03", "tabs": "A | B | C",
   "steps": ["bước 1", "bước 2"], "data": "...", "key": "...", "notes": "...", "remark": "..."}
"""
import argparse, json, os, sys
from collections import Counter
from common import (COL, LEVELS, backup_excel, col_index, excel_locked, header_map, lesson_index, load_config,
                    page_url, rel_path)

try:
    from openpyxl import Workbook, load_workbook
    from openpyxl.formatting.rule import FormulaRule
    from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.datavalidation import DataValidation
except ImportError:
    sys.exit("Thiếu openpyxl: python3 -m pip install --user openpyxl")

FONT = "Arial"
HEAD = Font(name=FONT, bold=True, color="FFFFFF")
HFILL = PatternFill("solid", fgColor="1F5E78")
thin = Side(style="thin", color="C8CCD0")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")
PRI_FILL = {"Nên làm": "D9F2E3", "Làm thêm nếu muốn": "FFF1CC", "Không cần": "EEEEEE"}

COMPS = json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                                    "references", "thu-vien-hinh.json"), encoding="utf-8"))

ORDER = ["stt", "chapter", "lesson", "activity", "type", "level", "status", "goal", "layout", "visual", "components",
         "tabs", "steps", "data", "key", "notes", "path", "url", "remark", "review", "opinion", "old", "new"]
WIDTH = {"stt": 5, "chapter": 24, "lesson": 26, "activity": 32, "type": 13, "level": 13, "status": 11, "goal": 34,
         "layout": 20, "visual": 42, "components": 12, "tabs": 26, "steps": 70, "data": 26, "key": 34, "notes": 40,
         "path": 36, "url": 36, "remark": 30, "review": 13, "opinion": 24, "old": 40, "new": 40}


def status_style(cell):
    done = cell.value == "Done"
    cell.fill = PatternFill("solid", fgColor="C6EFCE" if done else "FFC7CE")
    cell.font = Font(name=FONT, size=10, bold=True, color="006100" if done else "9C0006")


def cmd_create(cfg, a):
    if os.path.exists(cfg["excel_abs"]) and not a.force:
        sys.exit("Đã có %s. Dùng lệnh 'status' để cập nhật, hoặc --force nếu chắc chắn muốn tạo lại." % cfg["excel_abs"])
    rows = json.load(open(a.rows, encoding="utf-8"))
    if not a.include_skipped:
        rows = [r for r in rows if r.get("level") != "Không cần"]
    wb = Workbook()
    ws = wb.active
    ws.title = "Phan tich"
    ws.append([COL[k] if k != "notes" else "Lưu ý kiến thức (%s)" % cfg.get("language", "C#") for k in ORDER])
    for c in ws[1]:
        c.font, c.fill, c.border, c.alignment = HEAD, HFILL, BORDER, Alignment(wrap_text=True, vertical="center")
    ws.row_dimensions[1].height = 32
    for i, r in enumerate(rows, 1):
        lvl = r.get("level", "Nên làm")
        rel = url = st = ""
        if lvl != "Không cần":
            rel = rel_path(cfg, r["module"], r["lesson"], r["activity"])
            url = page_url(cfg, rel)
            st = "Done" if os.path.exists(os.path.join(cfg["repo_root"], rel)) else "Chưa done"
        steps = r.get("steps", "")
        if isinstance(steps, list):
            steps = "\n".join("%d. %s" % (k, x) for k, x in enumerate(steps, 1))
        val = dict(stt=i, chapter="%d. %s" % (r["module"], cfg["modules"][r["module"] - 1]), lesson=r["lesson"],
                   activity=r["activity"], type=r.get("type", "Bài đọc"), level=lvl, status=st, goal=r.get("goal", ""),
                   layout=r.get("layout", ""), visual=r.get("visual", ""), components=r.get("components", ""),
                   tabs=r.get("tabs", ""), steps=steps, data=r.get("data", ""), key=r.get("key", ""),
                   notes=r.get("notes", ""), path=rel, url=url, remark=r.get("remark", ""), review="", opinion="",
                   old="", new="")
        ws.append([val[k] for k in ORDER])
    last = ws.max_row
    for j, k in enumerate(ORDER, 1):
        ws.column_dimensions[get_column_letter(j)].width = WIDTH[k]
    ilevel, istatus, irev, iop = ORDER.index("level"), ORDER.index("status"), ORDER.index("review"), ORDER.index("opinion")
    for row in ws.iter_rows(min_row=2, max_row=last):
        for c in row:
            c.font, c.alignment, c.border = Font(name=FONT, size=10), WRAP, BORDER
        row[ilevel].fill = PatternFill("solid", fgColor=PRI_FILL.get(row[ilevel].value, "FFFFFF"))
        row[ilevel].font = Font(name=FONT, size=10, bold=row[ilevel].value == "Nên làm")
        if row[istatus].value:
            status_style(row[istatus])
        for k in (irev, iop):
            row[k].fill = PatternFill("solid", fgColor="FFFFE0")
    ws.freeze_panes = "E2"
    ws.auto_filter.ref = "A1:%s%d" % (get_column_letter(len(ORDER)), last)
    L = lambda k: get_column_letter(ORDER.index(k) + 1)
    dv = DataValidation(type="list", formula1='"OK,Sửa,Bỏ"', allow_blank=True)
    ws.add_data_validation(dv); dv.add("%s2:%s%d" % (L("review"), L("review"), last))
    dv2 = DataValidation(type="list", formula1='"%s"' % ",".join(LEVELS), allow_blank=False)
    ws.add_data_validation(dv2); dv2.add("%s2:%s%d" % (L("level"), L("level"), last))
    for pri, col in PRI_FILL.items():
        ws.conditional_formatting.add("%s2:%s%d" % (L("level"), L("level"), last),
                                      FormulaRule(formula=['$%s2="%s"' % (L("level"), pri)], fill=PatternFill("solid", fgColor=col)))

    hs = wb.create_sheet("Thu vien hinh")
    hs.append(["Mã", "Thành phần hình minh họa", "Hàm", "Mô tả hình và chuyển động", "Dùng ở STT"])
    for c in hs[1]:
        c.font, c.fill, c.border = HEAD, HFILL, BORDER
    for comp in COMPS:
        used = [str(i) for i, r in enumerate(rows, 1) if comp["code"] in [x.strip() for x in str(r.get("components", "")).split(",")]]
        hs.append([comp["code"], comp["name"], comp["fn"], comp["desc"], ", ".join(used)])
    for row in hs.iter_rows(min_row=2):
        for c in row:
            c.font, c.alignment, c.border = Font(name=FONT, size=10), WRAP, BORDER
    for Lc, w in zip("ABCDE", [7, 28, 14, 90, 28]):
        hs.column_dimensions[Lc].width = w

    s = wb.create_sheet("Tong quan", 0)
    s["A1"] = "Phân tích hoạt động mô phỏng – Khóa %s" % cfg.get("course_name", "")
    s["A1"].font = Font(name=FONT, size=14, bold=True)
    s["A2"] = "Danh sách %d học liệu cần có hoạt động mô phỏng." % len(rows)
    s["A2"].font = Font(name=FONT, size=10, italic=True)
    hdr = ["Chương", "Nên làm", "Làm thêm nếu muốn", "Tổng học liệu", "Đã duyệt OK", "Done", "Chưa done"]
    for j, h in enumerate(hdr, 1):
        c = s.cell(row=4, column=j, value=h)
        c.font, c.fill, c.border, c.alignment = HEAD, HFILL, BORDER, Alignment(wrap_text=True, vertical="center")
    rng = lambda k: "'Phan tich'!$%s$2:$%s$%d" % (L(k), L(k), last)
    for k, name in enumerate(cfg["modules"], 1):
        r_ = 4 + k
        s.cell(row=r_, column=1, value="%d. %s" % (k, name))
        s.cell(row=r_, column=2, value='=COUNTIFS(%s,$A%d,%s,"Nên làm")' % (rng("chapter"), r_, rng("level")))
        s.cell(row=r_, column=3, value='=COUNTIFS(%s,$A%d,%s,"Làm thêm nếu muốn")' % (rng("chapter"), r_, rng("level")))
        s.cell(row=r_, column=4, value='=COUNTIF(%s,$A%d)' % (rng("chapter"), r_))
        s.cell(row=r_, column=5, value='=COUNTIFS(%s,$A%d,%s,"OK")' % (rng("chapter"), r_, rng("review")))
        s.cell(row=r_, column=6, value='=COUNTIFS(%s,$A%d,%s,"Done")' % (rng("chapter"), r_, rng("status")))
        s.cell(row=r_, column=7, value='=COUNTIFS(%s,$A%d,%s,"Chưa done")' % (rng("chapter"), r_, rng("status")))
    tr = 5 + len(cfg["modules"])
    s.cell(row=tr, column=1, value="Tổng")
    for j in range(2, 8):
        Lc = get_column_letter(j)
        s.cell(row=tr, column=j, value="=SUM(%s5:%s%d)" % (Lc, Lc, tr - 1))
    for row in s.iter_rows(min_row=5, max_row=tr, max_col=7):
        for c in row:
            c.font, c.border = Font(name=FONT, size=10, bold=c.row == tr), BORDER
            if c.column > 1:
                c.alignment = Alignment(horizontal="center")
    s.column_dimensions["A"].width = 56
    for Lc in "BCDEFG":
        s.column_dimensions[Lc].width = 15
    notes = [("Nên làm", "Bài có quá trình chạy hoặc hiện tượng khó hình dung bằng chữ."),
             ("Làm thêm nếu muốn", "Có ích nhưng ý chính đã được bài khác truyền tải khá tốt."),
             ("Cột vàng", "Chọn OK / Sửa / Bỏ ở cột Duyệt và ghi ý kiến; bảng trên tự đếm."),
             ("Nội dung cũ / mới", "Dán bài đọc hiện có vào cột 'Nội dung cũ'; bài viết lại sẽ được điền vào 'Nội dung mới'.")]
    for k, (x, y) in enumerate(notes):
        a_ = s.cell(row=tr + 2 + k, column=1, value=x); b_ = s.cell(row=tr + 2 + k, column=2, value=y)
        a_.font, b_.font = Font(name=FONT, size=10, bold=True), Font(name=FONT, size=10)
        s.merge_cells(start_row=tr + 2 + k, start_column=2, end_row=tr + 2 + k, end_column=7)
        if x in PRI_FILL:
            a_.fill = PatternFill("solid", fgColor=PRI_FILL[x])
    wb.save(cfg["excel_abs"])
    print("Đã tạo %s: %d dòng %s" % (cfg["excel_abs"], len(rows), dict(Counter(r.get("level") for r in rows))))


def open_sheet(cfg):
    if not os.path.exists(cfg["excel_abs"]):
        sys.exit("Chưa có file Excel: %s" % cfg["excel_abs"])
    wb = load_workbook(cfg["excel_abs"])
    ws = wb["Phan tich"]
    return wb, ws, header_map(ws)


def guard_write(cfg):
    if excel_locked(cfg):
        print("CẢNH BÁO: file Excel đang mở trong Excel (có tệp ~$). Hãy nhắc người dùng đóng file rồi mở lại sau khi ghi.")


def cmd_status(cfg, a):
    guard_write(cfg)
    backup_excel(cfg, "truoc-status")
    wb, ws, hm = open_sheet(cfg)
    ip, ist = col_index(hm, "path"), col_index(hm, "status")
    c = Counter()
    for row in ws.iter_rows(min_row=2):
        if not row[ip].value:
            continue
        row[ist].value = "Done" if os.path.exists(os.path.join(cfg["repo_root"], row[ip].value)) else "Chưa done"
        status_style(row[ist]); c[row[ist].value] += 1
    wb.save(cfg["excel_abs"])
    print("Trạng thái:", dict(c))


def split_groups(items, n):
    n = max(1, min(n, len(items)))
    base, extra = divmod(len(items), n)
    out, i = [], 0
    for k in range(n):
        sz = base + (1 if k < extra else 0)
        out.append(items[i:i + sz]); i += sz
    return out


def cmd_specs(cfg, a):
    wb, ws, hm = open_sheet(cfg)
    g = lambda row, k: row[col_index(hm, k, required=False)].value if col_index(hm, k, required=False) is not None else None
    items = []
    for row in ws.iter_rows(min_row=2):
        if not g(row, "path") or g(row, "level") == "Không cần":
            continue
        if a.pending and g(row, "status") == "Done":
            continue
        items.append(dict(stt=g(row, "stt"), module=int(str(g(row, "chapter")).split(".")[0]), chapter=g(row, "chapter"),
                          lesson=g(row, "lesson"), activity=g(row, "activity"), level=g(row, "level"), goal=g(row, "goal"),
                          layout=g(row, "layout"), visual=g(row, "visual"), components=g(row, "components"),
                          tabs=g(row, "tabs"), steps=g(row, "steps"), sample_data=g(row, "data"),
                          key_takeaway=g(row, "key"), notes=g(row, "notes"), remark=g(row, "remark"),
                          opinion=g(row, "opinion"), output_path=g(row, "path")))
    d = os.path.join(cfg["tools"], "specs")
    if not items:
        print("Không có bài nào cần làm mô phỏng (mọi dòng đã Done hoặc bị loại).")
        return
    for f in os.listdir(d):
        if f.startswith("group") and f.endswith(".json"):
            os.remove(os.path.join(d, f))
    for k, grp in enumerate(split_groups(items, a.groups), 1):
        json.dump(grp, open(os.path.join(d, "group%d.json" % k), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("group%d: STT %s" % (k, [x["stt"] for x in grp]))


def cmd_content(cfg, a):
    wb, ws, hm = open_sheet(cfg)
    iold, inew = col_index(hm, "old"), col_index(hm, "new")
    idx = lesson_index(cfg)
    items, miss, empty = [], [], []
    for row in ws.iter_rows(min_row=2):
        stt = row[col_index(hm, "stt")].value
        if stt is None:
            continue
        key = (row[col_index(hm, "lesson")].value, row[col_index(hm, "activity")].value)
        if row[inew].value and not a.overwrite:
            continue
        if not row[iold].value:
            empty.append(stt)
        if key not in idx:
            miss.append(stt); continue
        js, meta = idx[key]
        items.append(dict(stt=stt, chapter=row[col_index(hm, "chapter")].value, lesson=key[0], activity=key[1],
                          sim_goal=row[col_index(hm, "goal")].value, sim_js=js, sim_tabs=meta["tabs"], sim_title=meta["title"],
                          iframe_url=row[col_index(hm, "url")].value, old_content=row[iold].value or ""))
    d = os.path.join(cfg["tools"], "content", "in")
    if not items:
        print("Không có bài nào cần viết (mọi dòng đã có 'Nội dung mới'; dùng --overwrite để viết lại).")
        return
    for f in os.listdir(d):
        os.remove(os.path.join(d, f))
    for k, grp in enumerate(split_groups(items, a.groups), 1):
        json.dump(grp, open(os.path.join(d, "group%d.json" % k), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("group%d: STT %s" % (k, [x["stt"] for x in grp]))
    if miss:
        print("Chưa có mô phỏng (bỏ qua):", miss)
    if empty:
        print("Nội dung cũ rỗng (sẽ viết mới từ mô phỏng):", empty)


def cmd_insert(cfg, a):
    guard_write(cfg)
    print("Sao lưu:", backup_excel(cfg, "truoc-chen-noi-dung"))
    wb, ws, hm = open_sheet(cfg)
    inew = col_index(hm, "new")
    n, kept, missing = 0, [], []
    for row in ws.iter_rows(min_row=2):
        stt = row[col_index(hm, "stt")].value
        if stt is None:
            continue
        p = os.path.join(cfg["tools"], "content", "out", "%s.md" % stt)
        if not os.path.exists(p):
            missing.append(stt); continue
        if row[inew].value and not a.overwrite:
            kept.append(stt); continue
        t = open(p, encoding="utf-8").read().rstrip("\n")
        if len(t) > 32000:
            print("BỎ QUA STT %s: dài quá giới hạn ô Excel" % stt); continue
        row[inew].value = t
        row[inew].alignment = WRAP
        n += 1
    wb.save(cfg["excel_abs"])
    print("Đã chèn %d bài. Giữ nguyên (đã có nội dung): %s. Chưa có file: %s" % (n, kept, missing))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["create", "status", "specs", "content", "insert"])
    ap.add_argument("--config", required=True)
    ap.add_argument("--rows")
    ap.add_argument("--include-skipped", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--groups", type=int, default=8)
    ap.add_argument("--pending", action="store_true")
    ap.add_argument("--overwrite", action="store_true")
    a = ap.parse_args()
    cfg = load_config(a.config)
    {"create": cmd_create, "status": cmd_status, "specs": cmd_specs, "content": cmd_content, "insert": cmd_insert}[a.cmd](cfg, a)


if __name__ == "__main__":
    main()
