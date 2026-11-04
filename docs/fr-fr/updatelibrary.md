---
layout: doc
---
# Mettre à jour une bibliothèque Evergreen

Pour mettre à jour une bibliothèque, utilisez `Start-EvergreenLibraryUpdate`. Cette fonction lit `EvergreenLibrary.json`, puis utilise `Get-EvergreenApp` et `Save-EvergreenApp` pour y placer les programmes d’installation et tenir à jour un manifeste des versions des applications, pour consultation ultérieure.

Exemple : `EvergreenLibrary.json` contient l’entrée suivante pour Microsoft Teams :

```json
{
    "Name": "MicrosoftTeams",
    "EvergreenApp": "MicrosoftTeams",
    "Filter": "$_.Ring -eq \"General\" -and $_.Architecture -eq \"x64\" -and $_.Type -eq \"msi\""
}
```

* `Name` – définit le dossier de l’application dans la bibliothèque. Vous pouvez souhaiter télécharger les programmes d’installation Microsoft Teams 32 bits et 64 bits.
* `EvergreenApp` – définit le nom de l’application pris en charge par Evergreen. La liste des noms d’applications pris en charge est disponible avec `Find-EvergreenApp`.
* `Filter` – filtre généralement utilisé avec `Get-EvergreenApp | Where-Object` pour sélectionner les informations de version d’un programme d’installation précis.

Dans cet exemple, le programme d’installation Microsoft Teams sera téléchargé dans l’arborescence suivante : `\\server\EvergreenLibrary\MicrosoftTeams\General\1.5.00.17656\x64`. Une fois le téléchargement terminé, les informations de version de l’application sont enregistrées. Dans cet exemple, `\\server\EvergreenLibrary\MicrosoftTeams\MicrosoftTeams.json` contiendra les détails suivants :

```json
{
  "Version": "1.5.00.17656",
  "URI": "https://statics.teams.cdn.office.net/production-windows-x64/1.5.00.17656/Teams_windows_x64.msi",
  "Type": "msi",
  "Ring": "General",
  "Path": "/Users/aaron/Temp/Evergreen/MicrosoftTeams/General/1.5.00.17656/x64/Teams_windows_x64.msi",
  "Architecture": "x64"
}
```

Chaque fois qu’une nouvelle version du programme d’installation Teams est téléchargée, `MicrosoftTeams.json` est mis à jour avec cette version pour une utilisation ultérieure.

## Mettre à jour une bibliothèque

`Start-EvergreenLibraryUpdate` possède un seul paramètre, `-Path`, qui doit indiquer le chemin de la bibliothèque Evergreen :

```powershell
Start-EvergreenLibraryUpdate -Path "\\server\EvergreenLibrary"
```

Si le chemin indiqué ne contient pas `EvergreenLibrary.json`, une erreur est générée.

Pour télécharger les nouveaux programmes d’installation lorsqu’une version est détectée, vous pouvez exécuter `Start-EvergreenLibraryUpdate` via une tâche planifiée ou un autre outil d’automatisation. C’est un moyen simple de mettre à jour la bibliothèque et de rendre les nouvelles applications disponibles pour l’installation ou la création de packages.
