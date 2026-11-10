#!/usr/bin/env bash
# Cài Playwright (Node) một lần cho check_pages.js, vào ~/.cache/codegym-sim-pw
set -e
D="$HOME/.cache/codegym-sim-pw"
mkdir -p "$D"
cd "$D"
[ -f package.json ] || npm init -y >/dev/null
if [ ! -d node_modules/playwright ]; then npm i playwright --silent; fi
# Nếu máy chưa có trình duyệt Chromium của Playwright thì tải về
if ! ls "$HOME/Library/Caches/ms-playwright"/chromium_headless_shell-* >/dev/null 2>&1 && \
   ! ls "$HOME/.cache/ms-playwright"/chromium_headless_shell-* >/dev/null 2>&1; then
  npx playwright install chromium
fi
echo "Playwright sẵn sàng tại $D"
