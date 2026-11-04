---
layout: doc
---
# Utiliser l’API Evergreen

::: warning **L’API Evergreen est gratuite : merci de ne pas en abuser**.
L’API est fournie avec l’offre gratuite de Cloudflare Workers, qui autorise jusqu’à 100 000 requêtes au total par jour. Utilisez l’API avec mesure afin que le quota ne soit pas épuisé et qu’elle reste disponible pour tout le monde.
:::

Ce qui distingue Evergreen des autres méthodes de recherche et d’installation d’applications, c’est que `Get-EvergreenApp` interroge uniquement les sources officielles des éditeurs. Les informations renvoyées sont donc fiables, puisqu’elles proviennent de l’éditeur et non de contributions participatives.

Evergreen propose [une API](https://evergreen-api.stealthpuppy.com/) qui renvoie les mêmes informations de version d’application que `Get-EvergreenApp`. L’API prend en charge les mêmes applications que le module Evergreen, car les données proviennent du module. Elle s’exécute sur Cloudflare Workers et ses données sont actualisées toutes les 24 heures.

Les données renvoyées par l’API Evergreen peuvent être consultées dans [Evergreen App Tracker](https://eucpilots.com/workbench/).

::: info **Remarques importantes sur l’API**
* Les données de l’API sont mises à jour une fois toutes les 24 heures. Les requêtes trop fréquentes vers les points de terminaison peuvent être limitées.
* L’API est destinée uniquement au développement et ne doit pas être utilisée sur des terminaux distribués (par exemple, des PC physiques qui recherchent localement des mises à jour d’applications).
* En cas de problème, ou si vous souhaitez garantir que les données proviennent exclusivement de l’éditeur, utilisez `Get-EvergreenApp`.
:::

La documentation complète de l’API est disponible ici : [evergreen-api](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/). Toutefois, si vous connaissez déjà `Get-EvergreenApp` dans le module Evergreen, l’API devrait être facile à utiliser.

## Get-EvergreenAppFromApi

Evergreen inclut la fonction `Get-EvergreenAppFromApi`, qui s’utilise à peu près comme `Get-EvergreenApp`. Plus simple que `Invoke-RestMethod`, elle filtre automatiquement les applications disponibles. Par exemple, pour interroger l’API sur Microsoft Edge, utilisez :

```powershell
PS C:\> Get-EvergreenAppFromApi -Name "MicrosoftEdge"

Version      : 89.0.774.76
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 12/4/2021
Hash         : 9E7A29B4BE6E1CD707F80B4B79008F19D2D5DD5C774D317A493EC6DE5BE0B7D7
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/4d12f620-174c-4259-85e6-8a80ea45ff10/MicrosoftEdgeEnterpriseX64.msi
```

Cette commande renvoie la version actuelle de Microsoft Edge et les URL de téléchargement à l’aide de l’API officielle de mise à jour de Microsoft Edge : [https://edgeupdates.microsoft.com/api/products](https://edgeupdates.microsoft.com/api/products).

Comme avec `Get-EvergreenApp`, vous pouvez filtrer la sortie avec `Where-Object` pour obtenir un programme d’installation précis. L’exemple ci-dessous renvoie la version actuelle et l’URL de téléchargement de Microsoft Edge, canal Stable et anneau Enterprise 64 bits.

```powershell
Get-EvergreenAppFromApi -Name "MicrosoftEdge" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

## Utilisation de l’API

Dans sa version actuelle, l’API ne comporte que quatre points de terminaison, qui prennent en charge les appels GET et renvoient des données au format JSON :

* `/apps` – renvoie la liste des applications prises en charge
* `/app/{appName}` – renvoie les détails d’une application donnée
* `endpoints/versions` – renvoie la liste des points de terminaison URL utilisés par Evergreen pour se connecter aux sources des éditeurs et récupérer les détails des applications (par exemple avec `Get-EvergreenApp`)
* `/endpoints/downloads` – renvoie la liste des points de terminaison URL utilisés par Evergreen pour télécharger les fichiers binaires des applications (par exemple avec `Save-EvergreenApp`)

Dans PowerShell, l’API peut être interrogée avec `Invoke-RestMethod`.

::: warning **Un agent utilisateur personnalisé est obligatoire**.
Les agents utilisateur par défaut de la plupart des outils seront bloqués afin de limiter les abus de l’API. Lorsque vous utilisez PowerShell, wget, curl ou d’autres outils, indiquez un agent utilisateur personnalisé. Choisissez-en un qui facilite le dépannage et identifie l’utilisateur de l’API (les données de journalisation ne sont pas publiques). Par exemple, utilisez le format « Application/Version (Entreprise/URL) », comme « App-Pipeline/1.0.0 (Contoso; https://contoso.com) ».
:::

Pour obtenir la liste des applications prises en charge depuis `/apps` (l’équivalent de `Find-EvergreenApp`) :

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/apps" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

Le point de terminaison `/app/{appName}` renvoie les détails d’une application spécifique ainsi que son nom.

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

Les données renvoyées par l’API peuvent être filtrées et transmises à `Save-EvergreenApp` pour télécharger les fichiers binaires :

```powershell
$Edge = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Edge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" } | Save-EvergreenApp -Path "C:\Apps"
```

Si une application inconnue est transmise au point de terminaison `/app`, une erreur est renvoyée :

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/UnsupportedApp" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
Invoke-RestMethod:                                                                                                      
{
  "message": "Application not found. Call /apps for a list of available applications.",
  "documentation": "https://eucpilots.com/evergreen/api/"
}
```
