"""Hàm dùng chung cho các script của skill codegym-mo-phong-hoc-lieu.

Mọi script đọc một file cấu hình khóa học `course.json` (đặt trong <course_dir>/_tools/):
{
  "course_name": "C# Ứng dụng",
  "repo_root": "(tùy chọn) /đường/dẫn/programming-course-demos",  # bỏ trống = tự suy ra từ vị trí file
  "course_dir": "(tùy chọn) c-sharp-ung-dung",                     # bỏ trống = tên thư mục khóa
  "base_url": "(tùy chọn) https://codegym-vn.github.io/programming-course-demos/",
  "modules": ["Tên chương 1", "Tên chương 2", ...],  # đúng nguyên văn đề cương, theo thứ tự
  "excel": "phan-tich-mo-phong-c-sharp-ung-dung.xlsx" # đặt trong course_dir
}
"""
import json, os, re, shutil, sys, time, unicodedata

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(SKILL_DIR, "assets")

# Tên cột trong sheet "Phan tich" (script tìm cột theo tên, nên người dùng thêm/bớt cột khác vẫn chạy được)
COL = {
    "stt": "STT", "chapter": "Chương (Module)", "lesson": "Bài học (Lesson)", "activity": "Học liệu (Activity)",
    "type": "Loại học liệu", "level": "Mức đề xuất", "status": "Trạng thái", "goal": "Mục tiêu của mô phỏng",
    "layout": "Dạng giao diện", "visual": "Hình minh họa", "components": "Thành phần hình (mã)",
    "tabs": "Tab / tình huống", "steps": "Kịch bản từng bước", "data": "Dữ liệu mẫu",
    "key": "Điểm chốt (bước cuối)", "notes": "Lưu ý kiến thức", "path": "Đường dẫn file (đề xuất)",
    "url": "Link GitHub Pages (sau khi đẩy)", "remark": "Ghi chú / lý do", "review": "Duyệt (OK / Sửa / Bỏ)",
    "opinion": "Ý kiến của bạn", "old": "Nội dung cũ", "new": "Nội dung mới",
}
LEVELS = ("Nên làm", "Làm thêm nếu muốn", "Không cần")


def slug(s):
    s = s.replace("C#", "c-sharp").replace("C++", "c-plus-plus").replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def load_config(path):
    with open(path, encoding="utf-8") as f:
        c = json.load(f)
    # repo_root/course_dir có thể bỏ trống: suy ra từ vị trí file (<repo>/<khóa>/_tools/course.json),
    # nhờ vậy cùng một course.json chạy được trên máy của mọi người trong nhóm.
    tools_dir = os.path.dirname(os.path.abspath(path))
    if not c.get("course_dir"):
        c["course_dir"] = os.path.basename(os.path.dirname(tools_dir))
    if not c.get("repo_root") or not os.path.isdir(c["repo_root"]):
        c["repo_root"] = os.path.dirname(os.path.dirname(tools_dir))
    c.setdefault("base_url", "https://codegym-vn.github.io/programming-course-demos/")
    for k in ("modules", "excel"):
        if k not in c:
            sys.exit("course.json thiếu khóa '%s'" % k)
    c["course_abs"] = os.path.join(c["repo_root"], c["course_dir"])
    c["tools"] = os.path.join(c["course_abs"], "_tools")
    c["excel_abs"] = os.path.join(c["course_abs"], c["excel"])
    for sub in ("lessons", "specs", "content/in", "content/out", "shots", "backup"):
        os.makedirs(os.path.join(c["tools"], sub), exist_ok=True)
    return c


def rel_path(cfg, module_no, lesson, activity):
    """Đường dẫn index.html tương đối so với repo_root."""
    return "/".join([cfg["course_dir"], slug(cfg["modules"][module_no - 1]), slug(lesson), slug(activity), "index.html"])


def page_url(cfg, rel):
    return cfg["base_url"] + rel.replace("index.html", "")


def read_meta(js_path):
    with open(js_path, encoding="utf-8") as f:
        first = f.readline()
    if not first.startswith("// META"):
        raise ValueError("%s: dòng đầu phải là // META {...}" % js_path)
    return json.loads(first.replace("// META", "", 1))


def lesson_index(cfg):
    """(lesson, activity) -> (đường dẫn js, meta) cho mọi bài trong _tools/lessons."""
    idx = {}
    d = os.path.join(cfg["tools"], "lessons")
    for fn in sorted(os.listdir(d)):
        if fn.endswith(".js"):
            p = os.path.join(d, fn)
            m = read_meta(p)
            idx[(m["lesson"], m["activity"])] = (p, m)
    return idx


def header_map(ws):
    return {c.value: i for i, c in enumerate(ws[1]) if c.value}


def col_index(hm, key, required=True):
    name = COL[key]
    for h, i in hm.items():
        if h == name or (key == "notes" and str(h).startswith("Lưu ý kiến thức")):
            return i
    if required:
        sys.exit("Không thấy cột '%s' trong sheet Phan tich" % name)
    return None


def backup_excel(cfg, tag):
    if os.path.exists(cfg["excel_abs"]):
        dst = os.path.join(cfg["tools"], "backup", "%s-%s.xlsx" % (time.strftime("%Y%m%d-%H%M%S"), tag))
        shutil.copy(cfg["excel_abs"], dst)
        return dst
    return None


def excel_locked(cfg):
    d, fn = os.path.split(cfg["excel_abs"])
    return os.path.exists(os.path.join(d, "~$" + fn))
