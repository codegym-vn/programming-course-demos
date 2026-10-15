"""Chuyển nội dung bài (Markdown) sang HTML để dán vào web khóa học.
Dùng: python3 md2html.py <file.md>  ->  ghi <file>.html (đoạn HTML) và <file>-xem-truoc.html (trang xem thử)."""
import re, sys
import markdown

def convert(md):
    # Khối ``` không ngôn ngữ chứa <iframe ...> -> thẻ iframe thật (không bọc code)
    iframes = []
    def grab(m):
        iframes.append(m.group(1).strip())
        return "\n\nIFRAMEPLACEHOLDER%d\n\n" % (len(iframes) - 1)
    md = re.sub(r"```\n(<iframe.*?</iframe>)\n```", grab, md, flags=re.S)
    html = markdown.markdown(md, extensions=["fenced_code", "tables"], output_format="html")
    html = re.sub(r'<pre><code class="language-(\w+)">', r'<pre><code class="language-\1">', html)
    for i, tag in enumerate(iframes):
        html = html.replace("<p>IFRAMEPLACEHOLDER%d</p>" % i, tag)
    return html

PREVIEW = """<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Xem trước nội dung bài</title><style>
body{font:16px/1.7 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#1d2330;background:#f9fafb;margin:0}
main{max-width:860px;margin:0 auto;padding:24px 20px 60px}
h1{font-size:30px;margin:.4em 0 .6em}h2{font-size:24px;margin:1.6em 0 .6em}h3{font-size:19px;margin:1.4em 0 .5em}
code{background:#eef1f5;border-radius:5px;padding:1px 6px;font:14px ui-monospace,Menlo,Consolas,monospace}
pre{background:#0f172a;color:#e5e7eb;border-radius:10px;padding:14px 16px;overflow-x:auto}pre code{background:none;padding:0;color:inherit;font-size:13.5px;line-height:1.6}
table{border-collapse:collapse;width:100%;margin:14px 0}th,td{border:1px solid #d5dae1;padding:8px 12px;text-align:left}th{background:#eef1f5}
iframe{width:100%;height:640px;border:0}li{margin:.25em 0}
</style></head><body><main>
@@BODY@@
</main></body></html>"""

if __name__ == "__main__":
    src = sys.argv[1]
    html = convert(open(src, encoding="utf-8").read())
    base = src[:-3]
    open(base + ".html", "w", encoding="utf-8").write(html)
    open(base + "-xem-truoc.html", "w", encoding="utf-8").write(PREVIEW.replace("@@BODY@@", html))
    print(len(html), "ký tự HTML")
