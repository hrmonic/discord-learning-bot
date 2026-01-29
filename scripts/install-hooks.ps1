# Install prepare-commit-msg hook (copies script to .git/hooks)
$hookDir = Join-Path (Get-Location) ".git\hooks"
$scriptDir = Join-Path (Get-Location) "scripts"
$hookPath = Join-Path $hookDir "prepare-commit-msg"
$scriptPath = Join-Path $scriptDir "prepare-commit-msg.sh"
if (Test-Path $scriptPath) {
  $content = Get-Content $scriptPath -Raw
  Set-Content -Path $hookPath -Value $content -NoNewline
  Write-Host "Hook installed: $hookPath"
} else {
  Write-Host "Script not found: $scriptPath"
}
