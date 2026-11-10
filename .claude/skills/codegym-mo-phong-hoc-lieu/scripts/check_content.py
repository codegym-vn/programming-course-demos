"""Kiểm tra các bài đọc mới (_tools/content/out/<stt>.md) so với đầu vào (_tools/content/in/group*.json).

Dùng:
  python3 check_content.py --config <course.json> [--fix-iframe]
Kiểm: bắt đầu bằng "# ", có "Mục tiêu học tập" + "Sau bài học này, bạn có thể:", có "## Hoạt động..." trước "## Tóm tắt",
đúng 1 <iframe> nằm trong khối ``` với src đúng, số ``` chẵn, có "Điều rút ra:", nhắc đủ tab (**Nhãn**),
không có "trang này/trang trước", không emoji, độ dài 3.500-12.500 ký tự.
--fix-iframe: tự bọc thẻ <iframe> trần vào khối ``` (lỗi hay gặp nhất).
"""
import argparse, glob, json, os, re
from common import load_config

EMOJI = re.compile("[\U0001F300-\U0001FAFF✅❌⭐]")


def wrap_iframes(t):
    out = []
    for l in t.split("\n"):
        if l.startswith("<iframe") and not (out and out[-1] == "```"):
            out += ["```", l, "```"]
        else:
            out.append(l)
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", required=True)
    ap.add_argument("--fix-iframe", action="store_true")
    a = ap.parse_args()
    cfg = load_config(a.config)
    base = os.path.join(cfg["tools"], "content")
    rows = []
    for f in sorted(glob.glob(os.path.join(base, "in", "group*.json"))):
        rows += json.load(open(f, encoding="utf-8"))
    ok = bad = 0
    for r in rows:
        p = os.path.join(base, "out", "%s.md" % r["stt"])
        if not os.path.exists(p):
            print(r["stt"], "THIẾU FILE"); bad += 1; continue
        t = open(p, encoding="utf-8").read()
        if a.fix_iframe:
            t2 = wrap_iframes(t)
            if t2 != t:
                open(p, "w", encoding="utf-8").write(t2); t = t2
        errs = []
        if not t.startswith("# "):
            errs.append('không bắt đầu bằng "# "')
        names = [l[3:].strip() for l in t.split("\n") if l.startswith("## ")]
        hd = [n.startswith("Hoạt động") for n in names]
        if "Mục tiêu học tập" not in names: errs.append("thiếu ## Mục tiêu học tập")
        if not any(hd): errs.append("thiếu ## Hoạt động")
        if "Tóm tắt" not in names: errs.append("thiếu ## Tóm tắt")
        elif any(hd) and names.index("Tóm tắt") < hd.index(True): errs.append("Tóm tắt đứng trước Hoạt động")
        if "Sau bài học này, bạn có thể:" not in t: errs.append('thiếu "Sau bài học này, bạn có thể:"')
        if t.count("<iframe") != 1:
            errs.append("số iframe = %d" % t.count("<iframe"))
        else:
            m = re.search(r'```\n<iframe src="([^"]+)" title="[^"]+" style="border:0;" allowfullscreen></iframe>\n```', t)
            if not m: errs.append("iframe sai định dạng hoặc không nằm trong khối ``` (thử --fix-iframe)")
            elif m.group(1) != r["iframe_url"]: errs.append("iframe src sai")
        if t.count("```") % 2: errs.append("số ``` lẻ")
        if "Điều rút ra:" not in t: errs.append('thiếu "Điều rút ra:"')
        for w in ("trang này", "trang trước", "rồi Bấm"):
            if w in t: errs.append('có cụm "%s"' % w)
        if EMOJI.search(t): errs.append("có emoji")
        for tab in r.get("sim_tabs", []):
            lab = tab[1]
            if ("**%s**" % lab) not in t and ("**%s**" % lab.replace("*", "\\*")) not in t:
                errs.append("chưa nhắc tab **%s**" % lab)
        if not 3500 <= len(t) <= 12500: errs.append("độ dài %d" % len(t))
        if errs:
            bad += 1; print(r["stt"], r["activity"][:45], "->", "; ".join(errs))
        else:
            ok += 1
    print("OK: %d | có lỗi: %d | tổng: %d" % (ok, bad, len(rows)))


if __name__ == "__main__":
    main()
