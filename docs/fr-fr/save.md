---
layout: doc
---
# Télécharger des programmes d’installation

Evergreen inclut la fonction `Save-EvergreenApp`, qui simplifie le téléchargement des programmes d’installation renvoyés par `Get-EvergreenApp`.

Toutes les applications renvoient au moins les propriétés `Version` et `URI`, et nombre d’entre elles renvoient aussi des propriétés telles que `Architecture`, `Language`, `Type`, `Ring`, `Channel` et `Release`. Le nom du fichier d’installation est généralement déterminé dynamiquement à partir de la propriété `URI`.

Pour récupérer et télécharger un programme d’installation sans `Save-EvergreenApp`, filtrez la sortie pour sélectionner le téléchargement voulu, déterminez le nom du fichier et utilisez `Invoke-WebRequest` :

```powershell
$Teams = Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
$TeamsInstaller = Split-Path -Path $Teams.Uri -Leaf
Invoke-WebRequest -Uri $Teams.Uri -OutFile ".\$TeamsInstaller" -UseBasicParsing
```

Il s’agit d’un exemple simple, mais les applications qui renvoient davantage de propriétés peuvent nécessiter un filtrage plus complexe. Par exemple, Microsoft Edge inclut plusieurs propriétés dans l’objet renvoyé :

```powershell
Version      : 89.0.774.68
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 1/4/2021 7:29:00 pm
Hash         : 6E1856B2972688D109F550B0A62C264E9829FF1F392E3BE0FC308900AEFD3455
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/a67b9c83-1671-45ab-982f-e02318eeffc9/MicrosoftEdgeEnterpriseX64.msi
```

`Save-EvergreenApp` accepte la sortie de chaque application et simplifie le téléchargement des programmes d’installation contenus dans un objet d’application : elle détermine le nom du fichier cible et construit un chemin de répertoire à partir des propriétés de la sortie.

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive | Save-EvergreenApp -Path "C:\Apps\OneDrive"
```

Avec `-Path`, `Save-EvergreenApp` crée une arborescence sous le chemin spécifié à partir des propriétés présentes dans chaque objet d’application, dans cet ordre : `Product`, `Track`, `Channel`, `Release`, `Ring`, `Version`, `Language` et `Architecture`.

`Save-EvergreenApp` renvoie le chemin de chaque fichier téléchargé ; celui-ci peut être transmis à d’autres fonctions d’un script.

Dans l’exemple précédent utilisant `MicrosoftOneDrive`, `Save-EvergreenApp` renvoie une sortie semblable à celle-ci :

```powershell
Path
----
C:\Apps\OneDrive\Enterprise\20.169.0823.0008\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.030.0211.0002\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.052.0314.0001\OneDriveSetup.exe
C:\Apps\OneDrive\Insider\21.056.0318.0001\OneDriveSetup.exe
```

Pour télécharger les programmes d’installation dans un seul répertoire, utilisez le paramètre `-CustomPath`. Notez qu’un objet d’application peut renvoyer plusieurs versions ou canaux ayant le même nom de programme d’installation. Avec `-CustomPath`, le premier programme d’installation est enregistré et les suivants portant le même nom sont ignorés.

::: tip
Si l’objet contient plusieurs programmes d’installation portant le même nom, Save-EvergreenApp ne télécharge que le premier transmis à la fonction.
:::

Par conséquent, lorsque vous utilisez `-CustomPath`, il est préférable de filtrer la sortie de `Get-EvergreenApp` avant de la transmettre à `Save-EvergreenApp`. Exemple :

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive |
    Where-Object { $_.Ring -eq "Enterprise" -and $_.Architecture -eq "AMD64" -and $_.Type -eq "exe" } |
    Save-EvergreenApp -CustomPath "C:\Apps\OneDrive"
```

## Paramètres

### InputObject

Objet d’application doté d’une propriété `URI`. Avec `-Path`, l’objet doit également inclure une propriété `Version`.

### Path

Répertoire parent sous lequel une arborescence sera créée et les programmes d’installation enregistrés. Utilisez `-Path` ou `-CustomPath`, mais pas les deux.

### CustomPath

Répertoire dans lequel les programmes d’installation seront directement enregistrés, sans sous-répertoires. Utilisez `-CustomPath` ou `-Path`, mais pas les deux.

### NoProgress

`Save-EvergreenApp` utilise `Invoke-WebRequest` pour télécharger les programmes d’installation ciblés. Par défaut, la progression est masquée afin d’accélérer les téléchargements ; toutefois, elle s’affiche avec `-Verbose`. Utilisez `-NoProgress` avec `-Verbose` pour masquer la progression tout en affichant la sortie détaillée.

### -Force

Force le téléchargement des programmes d’installation ciblés depuis la propriété URI, même s’ils existent déjà dans le répertoire cible.

### -VerifyChecksum

Compare les sommes de contrôle `SHA1`, `SHA256` et `SHA512` éventuelles de l’objet d’entrée avec le fichier téléchargé ou existant. Les fichiers dont la somme ne correspond pas ne sont pas renvoyés.

### Options de nouvelle tentative

Les téléchargements sont retentés en cas de panne réseau temporaire ou de réponse HTTP pouvant donner lieu à une nouvelle tentative. Par défaut, trois nouvelles tentatives sont effectuées après la tentative initiale (`-RetryCount 3`), avec un délai initial de deux secondes (`-RetryDelaySeconds 2`) et un délai maximal de 300 secondes (`-MaximumRetryDelaySeconds 300`). Les délais augmentent de façon exponentielle et l’en-tête `Retry-After` du serveur est respecté jusqu’au délai maximal.

### Options de délai d’expiration

`-ConnectionTimeoutSeconds` définit le délai d’expiration de la connexion (30 secondes par défaut). `-OperationTimeoutSeconds` définit le délai entre les lectures de données (300 secondes par défaut) ; cette option est prise en charge par `Invoke-WebRequest` dans PowerShell 7.4 et versions ultérieures.

## Alias

`Save-EvergreenApp` possède l’alias `sea`, qui simplifie le téléchargement d’applications. Exemple :

```powershell
PS /Users/aaron> gea Slack | sea -Path /Users/aaron/Temp/Slack
```
