---
layout: doc
---
# Dans les coulisses

Evergreen est un module PowerShell autonome qui, une fois installé, n’a besoin d’accéder qu’aux sources officielles des éditeurs pour récupérer les détails d’une application donnée.

La méthode qu’utilise Evergreen pour trouver la dernière version et l’URL de téléchargement d’une application nécessite du code personnalisé pour la plupart des applications. Certaines utilisent une source commune comme GitHub (qui fournit une API pour les versions publiées), mais la plupart nécessitent l’interrogation d’une API ou d’un site propre à l’application.

## Structure du module

Evergreen comprend l’arborescence de répertoires suivante :

* `<ModuleBase>/Public` – fonctions publiques, dont `Get-EvergreenApp`, `Find-EvergreenApp` et `Save-EvergreenApp`
* `<ModuleBase>/Apps` – fonctions internes propres à chaque application, qui contiennent la logique de récupération des détails ; elles sont souvent spécifiques à chaque application
* `<ModuleBase>/Shared` – fonctions internes utilisées par certaines applications pour éviter les répétitions de code
* `<ModuleBase>/Manifests` – manifeste JSON de chaque application contenant les détails spécifiques utilisés par les fonctions correspondantes, notamment les URL servant à déterminer la dernière version
* `<ModuleBase>/Private` – fonctions internes contenant du code réutilisable

### Public

Le dossier `Public` contient toutes les fonctions exportées par Evergreen :

* `ConvertTo-DotNetVersionClass.ps1`
* `Export-EvergreenApp.ps1`
* `Export-EvergreenManifest.ps1`
* `Find-EvergreenApp.ps1`
* `Get-EvergreenApp.ps1`
* `Get-EvergreenAppFromApi.ps1`
* `Get-EvergreenAppFromLibrary.ps1`
* `Get-EvergreenEndpointFromApi.ps1`
* `Get-EvergreenLibrary.ps1`
* `New-EvergreenLibrary.ps1`
* `Save-EvergreenApp.ps1`
* `Start-EvergreenLibraryUpdate.ps1`
* `Test-EvergreenApp.ps1`

### Apps

Le dossier `Apps` contient les fonctions propres aux applications, chargées de déterminer les détails de l’application cible.

Par exemple, `Get-MicrosoftEdge` interroge la liste officielle des versions d’Edge hébergée à l’adresse `https://edgeupdates.microsoft.com/api/products`. La fonction utilise ainsi le même mécanisme qu’Edge pour déterminer la dernière version et l’URL de téléchargement du programme d’installation. Lorsque vous exécutez `Get-EvergreenApp -Name MicrosoftEdge`, `Get-EvergreenApp` appelle `Get-MicrosoftEdge` et transmet le résultat au pipeline.

La plupart des fonctions contiennent du code propre à l’application. Plusieurs applications utilisent toutefois GitHub ou SourceForge pour déterminer leurs versions et leurs mises à jour ; leurs fonctions peuvent donc réutiliser davantage de code commun.

### Manifestes

Chaque application possède un manifeste JSON contenant des informations utilisées par sa fonction interne pour récupérer la version et l’URI de téléchargement. Le manifeste comporte trois propriétés principales : `Name` (nom de l’éditeur et de l’application), `Source` (lien vers un site officiel) et `Get`, qui définit notamment l’URL utilisée pour rechercher les mises à jour. La structure de base ressemble à ceci :

```json
{
    "Name": "Vendor Application name",
    "Source": "https://www.vendorwebsite.com/product",
    "Get": {
        "Update": {
            "Uri": "https://update.vendorwebsite.com/api/product"
        }
    },
    "Download": {
            "Uri": "https://download.vendorwebsite.com/files"
    },
}
```

En outre, chaque manifeste définit la propriété `Install`, qui contient des informations sur l’installation de l’application. Elle figure dans de nombreux manifestes, mais n’a pas vocation à fournir une méthode d’installation exhaustive.

### Private

Le dossier `Private` contient du code réutilisable par de nombreuses fonctions d’application. Parmi les principales fonctions :

* `Get-GitHubRepoRelease` – renvoie les versions publiées dans un dépôt GitHub cible
* `Get-SourceForgeRepoRelease` – renvoie les versions publiées dans un dépôt SourceForge cible
* `Invoke-EvergreenRestMethod` – ajoute une logique à `Invoke-RestMethod` pour renvoyer le contenu d’une API de mise à jour
* `Invoke-EvergreenWebRequest` – ajoute une logique à `Invoke-WebRequest` pour renvoyer le contenu d’un URI cible
