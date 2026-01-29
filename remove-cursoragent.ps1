# Script pour retirer cursoragent des commits
$commits = @(
    "b09f57862dfefbe872aadaf5eb793b76c50de5d3",
    "3ba2292c999e373a1c10eb1d7c9f1542b3c738c8",
    "cce1be2f3705d2f54bce4d6ef80fc84bf0219792"
)

# Pour chaque commit, on va le modifier
foreach ($commit in $commits) {
    Write-Host "Modification du commit $commit..."
    
    # Récupérer le message de commit actuel
    $message = git log -1 --format="%B" $commit
    
    # Retirer la ligne Co-authored-by
    $newMessage = $message -replace "Co-authored-by: Cursor <cursoragent@cursor\.com>\r?\n?", ""
    
    # Créer un fichier temporaire avec le nouveau message
    $tempFile = [System.IO.Path]::GetTempFileName()
    $newMessage.Trim() | Out-File -FilePath $tempFile -Encoding utf8 -NoNewline
    
    # Utiliser git commit --amend avec le nouveau message
    # Mais d'abord, on doit être sur le bon commit
    git checkout $commit
    git commit --amend -F $tempFile --no-edit
    
    # Nettoyer
    Remove-Item $tempFile
}

Write-Host "Terminé !"
