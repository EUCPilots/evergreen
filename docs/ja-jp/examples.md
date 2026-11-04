---
layout: doc
---
# 使用例

ここでは、Evergreen 関数を使ってアプリケーションのバージョンとダウンロード情報を取得する例をいくつか紹介します。

## Microsoft Edge

`Get-EvergreenApp -Name MicrosoftEdge` は、グループ ポリシー管理用テンプレートを含む Microsoft Edge の最新バージョンとダウンロード情報を返します。Microsoft Edge の最新バージョンと 64 ビット Windows 用のダウンロード URI を取得するには、次の構文を使用します。

```powershell
Get-EvergreenApp -Name MicrosoftEdge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

次のような出力が返されます。

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

`Get-EvergreenApp -Name MicrosoftFSLogixApps` は、Microsoft FSLogix Apps の最新バージョンとダウンロード URI を返します。出力はシンプルなので、追加の絞り込みは不要です。

```powershell
Get-EvergreenApp -Name MicrosoftFSLogixApps

Version : 2.9.7654.46150
Date    : 9/1/2021 12:54:48 am
URI     : https://download.microsoft.com/download/4/8/2/4828e1c7-176a-45bf-bc6b-cce0f54ce04c/FSLogix_Apps_2.9.7654.46150.zip
```

## Microsoft Teams

多くの Windows デスクトップ環境では 64 ビット Windows が使用されているため、Microsoft Teams の 64 ビット版を取得するには、次の構文を使用します。

```powershell
Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
```

## Microsoft OneDrive

`Get-EvergreenApp -Name MicrosoftOneDrive` は OneDrive の更新フィードを使い、`Enterprise`、`Production`、`Insider` の各リリース リングからバージョンを返します。Production リングでは複数のリリースが返されることがあります。

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

最新の `Production` バージョンだけを返すには、出力を絞り込みます。

```powershell
(Get-EvergreenApp -Name MicrosoftOneDrive | Where-Object { $_.Type -eq "Exe" -and $_.Ring -eq "Production" }) | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | Select-Object -First 1
```

## Adobe Acrobat Reader DC

Adobe Acrobat Reader DC は多数の言語と `x86` および `x64` のインストーラーを返すため、ゴールド イメージの作成などに使うインストーラーを 1 つに絞り込む必要があります。

```powershell
Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
```

出力は次のようになります。

```powershell
Version      : 21.011.20039
Language     : English
Architecture : x64
Name         : Reader DC 2021.011.20039 English Windows(64Bit)
URI          : http://ardownload.adobe.com/pub/adobe/acrobat/win/AcrobatDC/2101120039/AcroRdrDCx642101120039_en_US.exe
```

次に `Save-EvergreenApp` を使ってインストーラーをダウンロードできます。

```powershell
$Reader = Get-EvergreenApp -Name AdobeAcrobatReaderDC | Where-Object { $_.Language -eq "English" -and $_.Architecture -eq "x64" }
$Reader | Save-EvergreenApp -Path "C:\Temp\Reader"
```

## Mozilla Firefox

`Get-EvergreenApp -Name MozillaFirefox` は、現行バージョンと延長サポート リリースの両方に加え、複数言語のインストーラーを返します。そのため Firefox インストーラーのバージョンを 1 つだけ取得するには、やや複雑なクエリが必要です。次の例は、米国言語の Firefox 現行リリースの 64 ビット版 Windows Installer パッケージを返します。確実に 1 つのインストーラーを取得するため、`Sort-Object` で `Version` プロパティを並べ替え、最新のものを返します。

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
