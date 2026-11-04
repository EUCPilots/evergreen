---
layout: doc
---
# Exemples d’utilisation

Voici quelques exemples d’utilisation des fonctions Evergreen pour récupérer des versions d’applications et leurs fichiers à télécharger.

## Microsoft Edge

`Get-EvergreenApp -Name MicrosoftEdge` renvoie les dernières versions et les téléchargements de Microsoft Edge, y compris les modèles d’administration de stratégie de groupe. Pour obtenir la dernière version de Microsoft Edge et l’URI de téléchargement pour Windows 64 bits, utilisez la syntaxe suivante :

```powershell
Get-EvergreenApp -Name MicrosoftEdge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

Cette commande renvoie une sortie semblable à celle-ci :

```powershell
Version      : 97.0.1072.69
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 20/1/2022
Hash         : AB27CC051E07ADF4EDD807699541A7516E18C32794272482B7F24ECE18917BE3
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/9f730c98-d191-4607-aa1e-e28bd4d9f67e/MicrosoftEdgeEnterpriseX64.msi
```

## Microsoft FSLogix Apps

`Get-EvergreenApp -Name MicrosoftFSLogixApps` renvoie la dernière version de Microsoft FSLogix Apps et son URI de téléchargement. La sortie étant simple, aucun filtrage supplémentaire n’est nécessaire :

```powershell
Get-EvergreenApp -Name MicrosoftFSLogixApps

Version : 2.9.7654.46150
Date    : 9/1/2021 12:54:48 am
URI     : https://download.microsoft.com/download/4/8/2/4828e1c7-176a-45bf-bc6b-cce0f54ce04c/FSLogix_Apps_2.9.7654.46150.zip
```

## Microsoft Teams

La plupart des environnements de bureau Windows sont en 64 bits. Pour obtenir la version 64 bits de Microsoft Teams, utilisez la syntaxe suivante :

```powershell
Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
```

## Microsoft OneDrive

`Get-EvergreenApp -Name MicrosoftOneDrive` utilise le flux de mise à jour OneDrive pour renvoyer les versions de plusieurs anneaux : `Enterprise`, `Production` et `Insider`. Il arrive souvent que l’anneau Production renvoie plusieurs versions :

```powershell
Version : 21.016.0124.0002
Ring    : Insider
Sha256  : BP/TxWlUFk0rbPVXRlbjYLhddSROtWOFTk7gCK8PWJc=
Type    : Exe
URI     : https://oneclient.sfx.ms/Win/Insiders/21.016.0124.0002/OneDriveSetup.exe

Version : 21.016.0124.0002
Ring    : Insider
Sha256  : N/A
Type    : Msix
URI     : https://oneclient.sfx.ms/Win/Insiders/21.016.0124.0002/Microsoft.OneDriveSyncClient_8wekyb3d8bbwe.msix

Version : 21.002.0104.0005
Ring    : Production
Sha256  : 8xzNz/Yt2ahAc/BZxN5j5gWc7aWypo0A46uUROq8vzg=
Type    : Exe
URI     : https://oneclient.sfx.ms/Win/Prod/21.002.0104.0005/OneDriveSetup.exe

Version : 21.002.0104.0005
Ring    : Production
Sha256  : N/A
Type    : Msix
URI     : https://oneclient.sfx.ms/Win/Prod/21.002.0104.0005/Microsoft.OneDriveSyncClient_8wekyb3d8bbwe.msix

Version : 20.169.0823.0008
Ring    : Enterprise
Sha256  : kDd6mfMp34H7gp4JRBoM//3WNnMZGpz7mba5Ns/OtBs=
Type    : Exe
URI     : https://oneclient.sfx.ms/Win/Enterprise/20.169.0823.0008/OneDriveSetup.exe

Version : 20.169.0823.0008
Ring    : Enterprise
Sha256  : N/A
Type    : Msix
URI     : https://oneclient.sfx.ms/Win/Enterprise/20.169.0823.0008/Microsoft.OneDriveSyncClient_8wekyb3d8bbwe.msix
```

Pour ne renvoyer que la toute dernière version de l’anneau `Production`, nous devons filtrer la sortie :

```powershell
(Get-EvergreenApp -Name MicrosoftOneDrive | Where-Object { $_.Type -eq "Exe" -and $_.Ring -eq "Production" }) | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | Select-Object -First 1
```

## Adobe Acrobat Reader DC

Adobe Acrobat Reader DC renvoie de nombreuses langues ainsi que des programmes d’installation `x86` et `x64`. Il faut donc filtrer la sortie pour obtenir un seul programme d’installation, qui pourra par exemple servir à créer une image de référence :

```powershell
Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
```

La sortie devrait alors ressembler à ceci :

```powershell
Version      : 21.011.20039
Language     : English
Architecture : x64
Name         : Reader DC 2021.011.20039 English Windows(64Bit)
URI          : http://ardownload.adobe.com/pub/adobe/acrobat/win/AcrobatDC/2101120039/AcroRdrDCx642101120039_en_US.exe
```

Le programme d’installation peut ensuite être téléchargé avec `Save-EvergreenApp` :

```powershell
$Reader = Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
$Reader | Save-EvergreenApp -Path "C:\Temp\Reader"
```

## Mozilla Firefox

`Get-EvergreenApp -Name MozillaFirefox` renvoie la version actuelle et la version de support étendu, ainsi que des programmes d’installation dans plusieurs langues. Pour obtenir une seule version du programme d’installation de Firefox, la requête est donc assez complexe. L’exemple ci-dessous renvoie la version actuelle 64 bits de Firefox en anglais des États-Unis, au format Windows Installer. Pour garantir l’obtention d’un seul programme d’installation, `Sort-Object` trie également la propriété `Version` et renvoie la plus récente :

```powershell
Get-EvergreenApp -Name "MozillaFirefox" -AppParams @{Language="en-GB"} | Where-Object { $_.Channel -eq "LATEST_FIREFOX_VERSION" -and $_.Architecture -eq "x64" -and $_.type -eq "msi" } | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | Select-Object -First 1

Version      : 96.0.2
Architecture : x64
Channel      : LATEST_FIREFOX_VERSION
Language     : en-GB
Type         : msi
Filename     : Firefox Setup 96.0.2.msi
URI          : https://download-installer.cdn.mozilla.net/pub/firefox/releases/96.0.2/win64/en-GB/Firefox%20Setup%2096.0.2.msi
```
