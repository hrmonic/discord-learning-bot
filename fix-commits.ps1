# Script pour retirer cursoragent des commits Git
$ErrorActionPreference = "Stop"

# Liste des commits à modifier (du plus récent au plus ancien)
$commits = @(
    "b09f57862dfefbe872aadaf5eb793b76c50de5d3",
    "3ba2292c999e373a1c10eb1d7c9f1542b3c738c8",
    "cce1be2f3705d2f54bce4d6ef80fc84bf0219792"
)

# Sauvegarder la branche actuelle
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Branche actuelle: $currentBranch"

# Pour chaque commit (du plus ancien au plus récent pour éviter les conflits)
for ($i = $commits.Length - 1; $i -ge 0; $i--) {
    $commit = $commits[$i]
    Write-Host "Traitement du commit: $commit"
    
    # Récupérer le message de commit complet
    $fullMessage = git log -1 --format="%B" $commit
    
    # Retirer la ligne Co-authored-by
    $newMessage = $fullMessage -replace "(?m)^Co-authored-by: Cursor <cursoragent@cursor\.com>\r?\n?", ""
    $newMessage = $newMessage.Trim()
    
    # Créer un fichier temporaire avec le nouveau message
    $tempFile = New-TemporaryFile
    [System.IO.File]::WriteAllText($tempFile.FullName, $newMessage, [System.Text.Encoding]::UTF8)
    
    # Utiliser git filter-branch pour modifier ce commit spécifique
    $env:FILTER_BRANCH_SQUELCH_WARNING = "1"
    git filter-branch -f --msg-filter "if [ `$GIT_COMMIT = '$commit' ]; then cat '$($tempFile.FullName)'; else cat; fi" -- --all
    
    # Nettoyer
    Remove-Item $tempFile.FullName
}

Write-Host "Terminé ! Les commits ont été modifiés."
