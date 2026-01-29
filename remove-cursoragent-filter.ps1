# Script pour retirer cursoragent de tous les commits
$env:FILTER_BRANCH_SQUELCH_WARNING = "1"

# Créer un script temporaire pour filter-branch
$filterScript = @'
$content = $input
if ($content -match "Co-authored-by: Cursor <cursoragent@cursor\.com>") {
    $content -replace "(?m)^Co-authored-by: Cursor <cursoragent@cursor\.com>\r?\n?", ""
} else {
    $content
}
'@

$tempScript = Join-Path $PSScriptRoot "temp-filter.ps1"
$filterScript | Out-File -FilePath $tempScript -Encoding utf8

try {
    # Utiliser git filter-branch
    git filter-branch -f --msg-filter "powershell -File `"$tempScript`"" -- --all
} finally {
    # Nettoyer
    if (Test-Path $tempScript) {
        Remove-Item $tempScript
    }
}

Write-Host "Terminé ! Les commits ont été modifiés."
