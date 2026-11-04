---
layout: doc
---
# Exporter les informations de version

`Export-EvergreenApp` permet d’exporter au format JSON les informations de version d’application renvoyées par `Get-EvergreenApp`, puis de les enregistrer dans un fichier. Cette fonction peut être utile pour suivre les versions des applications dans une bibliothèque logicielle.

L’exemple suivant montre comment récupérer les informations de version de Microsoft OneDrive, enregistrer ses programmes d’installation dans un répertoire cible et stocker les informations de version dans un fichier JSON.

```powershell
$OneDrive = Get-EvergreenApp -Name "MicrosoftOneDrive"
Save-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive"
Export-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json"
```

Si le paramètre `-Path` de `Export-EvergreenApp` désigne un fichier JSON existant, les nouvelles informations de version y seront ajoutées et les doublons supprimés. Le fichier contiendra des données JSON semblables à celles-ci :

```json
[
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "jjiooBnk6w0tEt20O1IWzT63jvuFUxpZgJDoJdpkDgg=",
    "Ring": "Enterprise",
    "Architecture": "x86"
  },
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/amd64/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "JjoeTY78Krp49KXJEyjtE1O9WSuFmFoNKECtVwKGDW8=",
    "Ring": "Enterprise",
    "Architecture": "AMD64"
  },
  {
    "Version": "22.131.0619.0001",
    "URI": "https://oneclient.sfx.ms/Win/Prod/22.131.0619.0001/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "ObZEdqfd8gn9RhzR4SkuVS+Xu4R0vye5OnAaUgRl9E4=",
    "Ring": "Production",
    "Architecture": "x86"
  }
]
```

::: tip
`Export-EvergreenApp` ne tronque pas les dates dans le fichier exporté. À mesure que le fichier grossit, vous devrez gérer les données au moyen d’un processus distinct.
:::

Le fichier JSON peut être relu dans un objet avec `ConvertFrom-Json` :

```powershell
Get-Content -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json" | ConvertFrom-Json
```
