# Script pour éditer un message de commit et retirer cursoragent
param([string]$filePath)

$content = Get-Content $filePath -Raw
$content = $content -replace "(?m)^Co-authored-by: Cursor <cursoragent@cursor\.com>\r?\n?", ""
$content = $content.TrimEnd()
Set-Content -Path $filePath -Value $content -NoNewline
