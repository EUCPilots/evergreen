---
layout: doc
---
# Anwendungsbeispiele

Hier finden Sie einige Beispiele für die Verwendung von Evergreen-Funktionen zum Abrufen von Anwendungsversionen und Downloads.

## Microsoft Edge

`Get-EvergreenApp -Name MicrosoftEdge` gibt die neuesten Versionen und Downloads für Microsoft Edge zurück, einschließlich administrativer Gruppenrichtlinienvorlagen. Verwenden Sie die folgende Syntax, um die neueste Version von Microsoft Edge und die Download-URI für 64-Bit-Windows abzurufen:

```powershell
Get-EvergreenApp -Name MicrosoftEdge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

Damit wird eine ähnliche Ausgabe wie die folgende zurückgegeben:

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

`Get-EvergreenApp -Name MicrosoftFSLogixApps` gibt die neueste Version und Download-URI für Microsoft FSLogix Apps zurück. Da die Ausgabe einfach ist, ist keine zusätzliche Filterung erforderlich:

```powershell
Get-EvergreenApp -Name MicrosoftFSLogixApps

Version : 2.9.7654.46150
Date    : 9/1/2021 12:54:48 am
URI     : https://download.microsoft.com/download/4/8/2/4828e1c7-176a-45bf-bc6b-cce0f54ce04c/FSLogix_Apps_2.9.7654.46150.zip
```

## Microsoft Teams

Die meisten Windows-Desktopumgebungen verwenden 64-Bit-Windows. Verwenden Sie daher die folgende Syntax, um die 64-Bit-Version von Microsoft Teams abzurufen:

```powershell
Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
```

## Microsoft OneDrive

`Get-EvergreenApp -Name MicrosoftOneDrive` verwendet den OneDrive-Updatefeed, um Versionen aus mehreren Release-Rings zurückzugeben: `Enterprise`, `Production` und `Insider`. Häufig gibt der Production-Ring mehrere Releases zurück:

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

Damit nur die neueste `Production`-Version zurückgegeben wird, müssen wir die Ausgabe filtern:

```powershell
(Get-EvergreenApp -Name MicrosoftOneDrive | Where-Object { $_.Type -eq "Exe" -and $_.Ring -eq "Production" }) | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | Select-Object -First 1
```

## Adobe Acrobat Reader DC

Adobe Acrobat Reader DC gibt zahlreiche Sprachen sowie `x86`- und `x64`-Installer zurück. Daher muss die Ausgabe gefiltert werden, um einen einzelnen Installer zu erhalten, der beispielsweise zum Erstellen eines Gold-Images verwendet werden kann:

```powershell
Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
```

Die Ausgabe sollte dann etwa wie folgt aussehen:

```powershell
Version      : 21.011.20039
Language     : English
Architecture : x64
Name         : Reader DC 2021.011.20039 English Windows(64Bit)
URI          : http://ardownload.adobe.com/pub/adobe/acrobat/win/AcrobatDC/2101120039/AcroRdrDCx642101120039_en_US.exe
```

Anschließend kann der Installer mit `Save-EvergreenApp` heruntergeladen werden:

```powershell
$Reader = Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
$Reader | Save-EvergreenApp -Path "C:\Temp\Reader"
```

## Mozilla Firefox

`Get-EvergreenApp -Name MozillaFirefox` gibt sowohl die aktuelle Version als auch das Extended-Support-Release sowie Installer in mehreren Sprachen zurück. Um eine einzelne Version des Firefox-Installers abzurufen, ist daher eine recht komplexe Abfrage erforderlich. Das folgende Beispiel gibt das aktuelle 64-Bit-Release von Firefox in US-Englisch als Windows-Installer-Paket zurück. Um sicherzustellen, dass nur ein Installer ausgegeben wird, sortiert `Sort-Object` außerdem die Eigenschaft `Version` und gibt die neueste Version zurück:

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
