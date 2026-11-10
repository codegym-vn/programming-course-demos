"""Ghép khung trang + dữ liệu bài (.js) thành index.html độc lập.

Dùng:
  python3 build.py --config <course.json> [file1.js file2.js ...]
Không truyền file thì build toàn bộ <course_dir>/_tools/lessons/*.js.
Đầu ra: <repo_root>/<course_dir>/<chương>/<bài học>/<học liệu>/index.html
"""
import argparse, glob, os, sys
from common import ASSETS, load_config, read_meta, rel_path


def build_one(cfg, tpl, css, js_path):
    src = open(js_path, encoding="utf-8").read()
    meta = read_meta(js_path)
    if not 1 <= meta["module"] <= len(cfg["modules"]):
        raise ValueError("%s: module %s ngoài phạm vi course.json" % (js_path, meta["module"]))
    tabs = "".join('<button class="tab" role="tab" data-ex="%s" aria-selected="%s">%s</button>'
                   % (k, "true" if i == 0 else "false", label) for i, (k, label) in enumerate(meta["tabs"]))
    html = (tpl.replace("{{CSS}}", css)
            .replace("{{CODETITLE}}", meta.get("codeTitle", cfg.get("code_title", "Mã nguồn C#")))
            .replace("{{TITLE}}", meta["title"]).replace("{{LEAD}}", meta["lead"])
            .replace("{{TABS}}", tabs).replace("{{DATA}}", src))
    # META "path" (tương đối so với thư mục khóa) dùng khi Excel đã đặt sẵn đường dẫn khác quy tắc slug mặc định
    rel = cfg["course_dir"] + "/" + meta["path"].lstrip("/") if meta.get("path") else rel_path(cfg, meta["module"], meta["lesson"], meta["activity"])
    out = os.path.join(cfg["repo_root"], rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        fh.write(html)
    if os.path.getsize(tmp) < 1000:  # chống ghi đè file rỗng
        os.remove(tmp)
        raise RuntimeError("Kết quả build quá nhỏ: %s" % js_path)
    os.replace(tmp, out)
    return rel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", required=True)
    ap.add_argument("files", nargs="*")
    a = ap.parse_args()
    cfg = load_config(a.config)
    files = a.files or sorted(glob.glob(os.path.join(cfg["tools"], "lessons", "*.js")))
    tpl = open(os.path.join(ASSETS, "template.html"), encoding="utf-8").read()
    css = open(os.path.join(ASSETS, "base.css"), encoding="utf-8").read()
    bad = 0
    for f in files:
        try:
            print(os.path.basename(f), "->", build_one(cfg, tpl, css, f))
        except Exception as e:  # báo lỗi từng file, không dừng cả lô
            bad += 1
            print("LỖI", os.path.basename(f), ":", e)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
