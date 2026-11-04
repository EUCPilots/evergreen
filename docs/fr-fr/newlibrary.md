---
layout: doc
---
# Créer une bibliothèque Evergreen

## À propos des bibliothèques Evergreen

Une bibliothèque Evergreen est un répertoire qui stocke plusieurs versions de programmes d’installation téléchargés, définies dans `EvergreenLibrary.json` et récupérées par `Get-EvergreenApp` et `Save-EvergreenApp`.

En général, Evergreen renvoie uniquement la version la plus récente d’une application. Une bibliothèque Evergreen permet de télécharger et de stocker plusieurs versions d’un programme d’installation ainsi que leurs détails. Vous pouvez ainsi installer une version particulière d’une application selon vos besoins.

## Composition d’une bibliothèque Evergreen

Une bibliothèque Evergreen est un répertoire du système de fichiers qui contient `EvergreenLibrary.json`, lequel définit les applications à télécharger et à stocker. Dans l’exemple ci-dessous, `EvergreenLibrary.json` répertorie les applications et indique comment filtrer la sortie de `Get-EvergreenApp` pour enregistrer les programmes d’installation voulus.

```json
{
    "Name": "EvergreenLibrary",
    "Applications": [
        {
            "Name": "Microsoft.NET",
            "EvergreenApp": "Microsoft.NET",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Installer -eq \"windowsdesktop\" -and $_.Channel -eq \"LTS\""
        },
        {
            "Name": "MicrosoftOneDrive",
            "EvergreenApp": "MicrosoftOneDrive",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Ring -eq \"Production\" -and $_.Throttle -eq \"100\""
        },
        {
            "Name": "MicrosoftEdge",
            "EvergreenApp": "MicrosoftEdge",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        },
        {
            "Name": "MicrosoftEdgeWebView2Runtime",
            "EvergreenApp": "MicrosoftEdgeWebView2Runtime",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\""
        },
        {
            "Name": "MicrosoftTeams",
            "EvergreenApp": "MicrosoftTeams",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        }
    ]
}
```

Le filtre peut utiliser n’importe quelle propriété de l’objet de version d’une application, ce qui permet de ne télécharger que le type de programme d’installation requis pour la bibliothèque. Vous pouvez, par exemple, créer une bibliothèque pour les versions de production ou de publication et une autre pour les versions préliminaires.

## Créer une bibliothèque Evergreen

Pour créer une bibliothèque Evergreen, utilisez `New-EvergreenLibrary` et indiquez un chemin local ou UNC valide :

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary"
```

`New-EvergreenLibrary` crée le répertoire cible si nécessaire et y écrit le fichier `EvergreenLibrary.json` par défaut s’il n’existe pas déjà. Utilisez `-Name` pour définir le nom de la bibliothèque dans la configuration :

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary" -Name "ProductionApps"
```

La configuration par défaut inclut les versions de publication 64 bits suivantes :

* Microsoft .NET Desktop Runtime (LTS)
* Microsoft OneDrive (Production, throttle 100)
* Microsoft Edge (Stable Enterprise)
* Microsoft Edge WebView2 Runtime (Stable)
* Microsoft Teams (Enterprise)

Pour personnaliser la bibliothèque, modifiez `EvergreenLibrary.json` dans un éditeur JSON (par exemple Visual Studio Code) et ajoutez ou supprimez les applications nécessaires. Si le fichier existe déjà, `New-EvergreenLibrary` ne le modifie pas.
