#!/bin/sh
# Strip Co-authored-by lines from commit message (run as prepare-commit-msg hook)
COMMIT_MSG_FILE="$1"
[ -z "$COMMIT_MSG_FILE" ] || [ ! -f "$COMMIT_MSG_FILE" ] && exit 0
if command -v sed >/dev/null 2>&1; then
  sed -i.bak '/^Co-authored-by:/d' "$COMMIT_MSG_FILE" 2>/dev/null || \
  sed -i '/^Co-authored-by:/d' "$COMMIT_MSG_FILE" 2>/dev/null || true
fi
exit 0
