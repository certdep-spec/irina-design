# Script to rename Cyrillic files to ASCII names
$archivesPath = "C:\Site\interior-designer-portfolio\public\archives"

# Get all files and rename them
Get-ChildItem -Path $archivesPath -File | ForEach-Object {
    $oldName = $_.Name
    $newName = $oldName

    # Map Cyrillic names to ASCII
    $mapping = @{
        'Житловий інтерєр.jpg' = 'residential-interior.jpg'
        'Комерційний інтерєр.jpg' = 'commercial-interior.jpg'
        'Кухні.jpg' = 'kitchen.jpg'
        'Шафи.jpg' = 'wardrobe.jpg'
        'Інша.jpg' = 'kids.jpg'
    }

    if ($mapping.ContainsKey($oldName)) {
        $newName = $mapping[$oldName]
        $newPath = Join-Path $archivesPath $newName
        $oldPath = Join-Path $archivesPath $oldName

        if (Test-Path $oldPath) {
            # If destination exists, skip
            if (-not (Test-Path $newPath)) {
                Rename-Item -Path $oldPath -NewName $newName -Force
                Write-Output "Renamed: $oldName -> $newName"
            } else {
                Write-Output "Skipped (already exists): $newName"
            }
        }
    }
}

Write-Output "Done!"
