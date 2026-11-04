---
layout: doc
---
# Ejemplos de uso

A continuación se muestran algunos ejemplos del uso de las funciones de Evergreen para devolver versiones y descargas de aplicaciones.

## Microsoft Edge

`Get-EvergreenApp -Name MicrosoftEdge` devuelve las versiones y descargas más recientes de Microsoft Edge, incluidas las plantillas administrativas de directiva de grupo. Para obtener la versión más reciente de Microsoft Edge y el URI de descarga para Windows de 64 bits, use esta sintaxis:

```powershell
Get-EvergreenApp -Name MicrosoftEdge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

Se devolverá una salida similar a la siguiente:

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

`Get-EvergreenApp -Name MicrosoftFSLogixApps` devuelve la versión más reciente y el URI de descarga de Microsoft FSLogix Apps. Como la salida es sencilla, no se necesitan filtros adicionales:

```powershell
Get-EvergreenApp -Name MicrosoftFSLogixApps

Version : 2.9.7654.46150
Date    : 9/1/2021 12:54:48 am
URI     : https://download.microsoft.com/download/4/8/2/4828e1c7-176a-45bf-bc6b-cce0f54ce04c/FSLogix_Apps_2.9.7654.46150.zip
```

## Microsoft Teams

La mayoría de los entornos de escritorio Windows usan Windows de 64 bits. Para obtener la versión de 64 bits de Microsoft Teams, use esta sintaxis:

```powershell
Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
```

## Microsoft OneDrive

`Get-EvergreenApp -Name MicrosoftOneDrive` usa la fuente de actualización de OneDrive para devolver versiones de varios anillos: `Enterprise`, `Production` e `Insider`. A menudo, el anillo Production devuelve más de una versión:

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

Para asegurarnos de devolver solo la versión `Production` más reciente, hay que filtrar la salida:

```powershell
(Get-EvergreenApp -Name MicrosoftOneDrive | Where-Object { $_.Type -eq "Exe" -and $_.Ring -eq "Production" }) | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | Select-Object -First 1
```

## Adobe Acrobat Reader DC

Adobe Acrobat Reader DC devuelve muchos idiomas y también instaladores `x86` y `x64`. Por ello, es necesario filtrar la salida para obtener un único instalador que se pueda usar, por ejemplo, al crear una imagen de referencia:

```powershell
Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
```

La salida debería ser similar a esta:

```powershell
Version      : 21.011.20039
Language     : English
Architecture : x64
Name         : Reader DC 2021.011.20039 English Windows(64Bit)
URI          : http://ardownload.adobe.com/pub/adobe/acrobat/win/AcrobatDC/2101120039/AcroRdrDCx642101120039_en_US.exe
```

A continuación, se puede descargar el instalador con `Save-EvergreenApp`:

```powershell
$Reader = Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
$Reader | Save-EvergreenApp -Path "C:\Temp\Reader"
```

## Mozilla Firefox

`Get-EvergreenApp -Name MozillaFirefox` devuelve tanto la versión actual como la versión de soporte extendido, junto con instaladores en varios idiomas. Por ello, se necesita una consulta algo compleja para obtener una sola versión del instalador de Firefox. El siguiente ejemplo devuelve la versión actual de 64 bits en inglés de Estados Unidos y en un paquete de Windows Installer. Para asegurarnos de obtener un único instalador, también se usa `Sort-Object` para ordenar la propiedad `Version` y devolver la más reciente:

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
