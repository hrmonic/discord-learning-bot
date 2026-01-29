$content = $input
if ($content -match "Co-authored-by: Cursor <cursoragent@cursor\.com>") {
    $content -replace "(?m)^Co-authored-by: Cursor <cursoragent@cursor\.com>\r?\n?", ""
} else {
    $content
}
