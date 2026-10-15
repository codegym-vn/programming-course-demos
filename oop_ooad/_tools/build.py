"""Ghép template + dữ liệu bài -> oop_ooad/<chuong>/<bai-hoc>/<hoc-lieu>/index.html"""
import glob, json, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("OOP_ROOT", "/Users/tuananhcan/Downloads/programming-course-demos/oop_ooad")
MODULES = [
    "Giới thiệu Lập trình hướng đối tượng (OOP)",
    "Đối tượng, Lớp và Đóng gói (Encapsulation)",
    "Kế thừa (Inheritance) và Tái sử dụng Mã",
    "Đa hình (Polymorphism) và Thiết kế linh hoạt",
    "Trừu tượng (Abstraction) với Abstract Class và Interface",
    "Giới thiệu Phân tích & Thiết kế hướng đối tượng (OOAD)",
    "Mối quan hệ giữa các lớp và Sơ đồ lớp UML (Class Diagram)",
    "Nguyên tắc thiết kế hướng đối tượng cơ bản và Mã nguồn sạch",
    "Xây dựng dự án thực tế với OOP & OOAD",
]


def slug(s):
    s = s.replace("C#", "c-sharp").replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def rel_path(meta):
    return "/".join([slug(MODULES[meta["module"] - 1]), slug(meta["lesson"]), slug(meta["activity"])])


def build(files):
    tpl = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
    css = open(os.path.join(HERE, "base.css"), encoding="utf-8").read()
    out = []
    for f in files:
        src = open(f, encoding="utf-8").read()
        meta = json.loads(src.split("\n", 1)[0].replace("// META", "", 1))
        tabs = "".join('<button class="tab" role="tab" data-ex="%s" aria-selected="%s">%s</button>'
                       % (k, "true" if i == 0 else "false", label) for i, (k, label) in enumerate(meta["tabs"]))
        html = (tpl.replace("{{CSS}}", css).replace("{{CODETITLE}}", meta.get("codeTitle", "Mã nguồn C#")).replace("{{TITLE}}", meta["title"]).replace("{{LEAD}}", meta["lead"])
                .replace("{{TABS}}", tabs).replace("{{DATA}}", src))
        rp = rel_path(meta)
        d = os.path.join(ROOT, rp)
        os.makedirs(d, exist_ok=True)
        tmp = os.path.join(d, "index.html.tmp")
        with open(tmp, "w", encoding="utf-8") as fh:
            fh.write(html)
        assert os.path.getsize(tmp) > 1000
        os.replace(tmp, os.path.join(d, "index.html"))
        out.append((os.path.basename(f), "oop_ooad/" + rp + "/index.html", meta))
    return out


if __name__ == "__main__":
    files = sys.argv[1:] or sorted(glob.glob(os.path.join(HERE, "lessons", "*.js")))
    for name, p, _ in build(files):
        print(name, "->", p)
