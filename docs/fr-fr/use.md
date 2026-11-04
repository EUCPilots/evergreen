---
layout: doc
---
# Récupérer les détails d’une application

## Utiliser Get-EvergreenApp

`Get-EvergreenApp` renvoie les détails d’une application spécifiée à l’aide du paramètre `-Name`.

Par exemple, recherchons la dernière version de l’agent Microsoft FSLogix Apps :

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

La commande renvoie une sortie semblable à celle-ci, qui indique le numéro de version et l’URL de téléchargement de l’application. Elle comprend également la date de publication :

```powershell
Version : 2.9.7979.62170
Date    : 9/11/2021
Channel : Production
URI     : https://download.microsoft.com/download/3/f/7/3f755dbd-debe-46d4-811c-3e7c87bc4408/FSLogix_Apps_2.9.7979.62170.zip
```

Toutes les propriétés de sortie sont des chaînes que d’autres fonctions et applets de commande peuvent traiter ; vous pouvez notamment filtrer la sortie avec `Where-Object`.

## Sortie

Chaque application Evergreen renvoie au moins deux propriétés dans l’objet qu’elle transmet au pipeline :

* `Version` – propriété de type chaîne qui contient le numéro de version de l’application. Pour obtenir un objet version, convertissez-la avec `[System.Version]`
* `URI` – propriété de type chaîne contenant l’emplacement de téléchargement de la dernière version de l’application. Il s’agit d’emplacements accessibles publiquement, qui fournissent généralement des programmes d’installation Windows (`exe`, `msi`). Certains téléchargements peuvent être dans d’autres formats, comme `zip`, qu’il faudra extraire avant l’installation

::: tip Comprendre la sortie
Comme les éditeurs n’utilisent pas de format de sortie standard (et que certaines applications d’un même éditeur diffèrent aussi), Evergreen ne peut pas renvoyer les mêmes données pour toutes les applications. Les données obtenues peuvent donc varier.
:::

La sortie de certaines applications peut inclure des propriétés supplémentaires qu’il faudra souvent filtrer, notamment :

* `Architecture` – architecture du processeur ciblé par le programme d’installation
* `Type` – format du programme d’installation renvoyé (`exe`, `msi`, `zip`, etc.). Dans certains cas, `Type` peut contenir des valeurs légèrement différentes
* `Ring`, `Channel` et/ou `Release` – certaines applications proposent différents anneaux ou canaux de publication pour les entreprises. La valeur de cette propriété est souvent propre à l’application
* `Language` – certains programmes d’installation peuvent être disponibles dans des langues précises
* `Date` – dans certains cas, Evergreen peut renvoyer la date de publication de la version obtenue

## Utiliser la sortie

Avec cette sortie, vous pouvez télécharger la dernière version de Microsoft Teams avant de la copier vers un emplacement cible ou de l’installer directement sur le système actuel. Les commandes suivantes filtrent `Get-EvergreenApp -Name MicrosoftTeams` pour obtenir la dernière version et le téléchargement, puis récupèrent le programme d’installation avec `Save-EvergreenApp` et utilisent enfin `msiexec` pour installer Teams dans une configuration compatible VDI :

```powershell
$Teams = Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
$TeamsInstaller = $Teams | Save-EvergreenApp -Path "C:\Temp\Teams"
& "$env:SystemRoot\System32\msiexec.exe" "/package $($TeamsInstaller.FullName) ALLUSER=1 ALLUSERS=1 /quiet"
```

## Paramètres

### Name

Le paramètre `-Name` indique l’application dont vous souhaitez obtenir les détails. Il est obligatoire. La liste des applications prises en charge est disponible avec `Find-EvergreenApp`.

### Verbose

Le paramètre `-Verbose` permet de voir où les détails de l’application sont récupérés (par exemple l’URL de mise à jour de l’application) et facilite le dépannage lorsque les détails attendus ne sont pas renvoyés.

## Alias

`Get-EvergreenApp` possède l’alias `gea`, qui simplifie la récupération des détails d’une application. Exemple :

```powershell
PS /Users/aaron> gea Slack

Version      : 4.14.0
Platform     : PerMachine
Architecture : x64
URI          : https://downloads.slack-edge.com/releases/windows/4.14.0/prod/x64/slack-standalone-4.14.0.0.msi
```
