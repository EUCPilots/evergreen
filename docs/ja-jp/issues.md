---
layout: doc
---
# 既知の問題

## 全般

アプリケーションのソースを利用できない場合、返される `URI` プロパティの値が `https://eucpilots.com/evergreen/issues/` になることがあります。この場合は[トラブルシューティングの手順](/ja-jp/troubleshoot)に従ってください。

## パブリック関数

### Get-EvergreenApp

`Get-EvergreenApp` はプロキシ サーバーを完全にはサポートしていない場合があります。この問題は今後のリリースで修正される予定です。

## プライベート関数

### Resolve-DnsNameWrapper

Windows プラットフォームのみをサポートします。この関数は、macOS または Linux の PowerShell 6 以降では利用できない `Resolve-DnsName` をラップしています。このプライベート関数を使用するアプリケーション関数は、Windows 以外のプラットフォームではエラーを返します。

### Get-GitHubRepoRelease

`Get-GitHubRepoRelease` は指定された GitHub リポジトリのリリース情報を照会し、バージョンとバイナリを返すか、一部のアプリケーションのバージョン番号のソースとして使用されます。既定では GitHub REST API へのリクエストは認証されず、1 時間あたり 60 件のレート制限が適用されます。GitHub をソースとして使うアプリケーションに対して `Get-EvergreenApp` の `-Verbose` パラメーターを使うと、API リクエストの残数が表示されます。

認証済みリクエストは `GITHUB_TOKEN` または `GH_TOKEN` 環境変数でサポートされ、レート制限は 1 時間あたり 5,000 件に引き上げられます。設定方法は[GitHub のレート制限への対応](/ja-jp/github)を参照してください。

## アプリケーション関数

### AdobeAcrobat

Adobe が Windows 版 Acrobat/Reader DC の更新を macOS より先にリリースした場合、現行のパッチ リリースが返されないことがあります。ほとんどの場合、Adobe は両プラットフォームを同期しているため、まれにしか発生しません。

`AdobeAcrobat` の現在の更新バージョンを判定するには、[macOS 更新用 URL](https://armmf.adobe.com/arm-manifests/win/AcrobatDC/acrobat/current_version.txt) を使用します。これにより、最新バージョン番号をプレーン テキストで簡単に取得できます。

::: info
Windows 版 Adobe Acrobat および Reader は、`https://armmf.adobe.com/arm-manifests/win/AcrobatDCManifest3.msi` のような更新 URL を使用します。この場合、MSI ファイルを展開して解析する必要があります。MSI データベースを照会するサンプル コードは、[AdobeReader のダウンロード リンクが無効](https://github.com/eucpilots/evergreen-module/issues/312#issuecomment-1103712904)に掲載されています。ただし、この方法は Windows ホストでのみ動作し、macOS や Linux はサポートしません。
:::

代替アプリケーションとして、`AdobeAcrobatDC` と `AdobeAcrobatReaderDC` は Web API を照会し、Adobe Acrobat Reader DC、Acrobat Standard DC、Acrobat Pro DC の現在のバージョンを判定します。これより前のバージョンの Acrobat では、引き続きこの問題が発生します。

### AdobeAcrobatReaderDC

`AdobeAcrobatReaderDC` は[最新の更新](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html)を含むインストーラーを返さない場合があります。このアプリケーションは[Adobe Acrobat Reader のダウンロード ページ](https://get.adobe.com/reader/)から利用可能なインストーラーを判定しますが、Adobe は最新の更新を現在ダウンロード可能なインストーラーにすぐ反映するとは限りません。

`AdobeAcrobat` が最新の更新バージョンを返すか確認してください。

### CitrixWorkspaceApp

Citrix は Citrix Workspace アプリの更新フィードを変更することがあり、その結果、バージョン番号やインストーラー URI が正しいデータを返さない場合があります。この問題は、Citrix が Citrix Workspace アプリの更新をスロットリングしていることに関連していると考えられます。データ ソースの問題は通常 72 時間以内に修正されます。

誤ったデータが返される場合、Evergreen は次のようなデータを返します。

```powershell
Version : 24.2.0.172
Title   : Citrix Workspace - LTSR
Size    : 380803896
Hash    : 7efe56e0f177cf9de336fa48daa8b6461080909fd37f7d550fd4f313221091b8
Date    : 10/4/2024
Stream  : LTSR
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.2.0.172.exe

Version : 0.0.0.0
Title   : Citrix Workspace - Current Release
Size    : 382956344
Hash    : 5c369d1c127b14a8530b7441a6d3ec49c681fe672e8447c63ecf453cf8b87237
Date    : 25/4/2024
Stream  : Current
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.3.0.93.exe
```

#### 404 エラー

`Get-EvergreenApp -Name "CitrixWorkspaceApp"` は、次のエラーで失敗することがあります。

```powershell
WARNING: Invoke-EvergreenRestMethod: Error at URI: https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml.
WARNING: Invoke-EvergreenRestMethod: Error encountered: Response status code does not indicate success: 404 (Not Found)..
WARNING: Invoke-EvergreenRestMethod: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
```

これは通常、新しい Workspace アプリのバージョンがリリースされた直後に発生し、しばらくこの結果が返される場合があります。新しいバージョンのリリース直後、クライアントがすぐに更新されないよう Citrix が更新 XML ファイルを利用できなくすることがあります。この関数が動作するには、Citrix が URL を再び利用可能にするまで待つ必要があります。

#### 古い更新フィード

`Get-EvergreenApp -Name "CitrixWorkspaceApp"` が Citrix Workspace アプリの最新バージョンを返さない場合があります。これは、最新の Workspace アプリの自動展開を抑制または防止するため、Citrix が `https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml` の更新フィードを変更していることが原因です。Citrix が更新フィードを修正して最新バージョンを再び含めるまで待つしかありません。

### GhislerTotalCommander

このアプリケーション関数は Windows では追加の要件なしで動作しますが、macOS または Linux では `DnsClient-PS` PowerShell モジュールをインストールする必要があります。

### GoogleChrome

Stable チャネルで利用可能な MSI インストーラーのバージョンは、Stable チャネルとして返されるバージョン番号と一致しません。MSI ファイル内のバージョン番号は、Extended チャネルとして返される MSI インストーラーのバージョンと一致します。URL は異なりますが、Stable と Extended で利用できる MSI は同じファイルです。

### LibreOffice

`LibreOffice` は `https://update.libreoffice.org/check.php` の更新ホストを使って、利用可能な更新リリースを判定します。Document Foundation は、リリース時に更新ホストから最新バージョンをすぐに返すとは限りません。更新ホストが最新バージョンを返さず、TDF が更新ホストから返された同じバージョンのダウンロードを取り下げている場合、`LibreOffice` は有効なダウンロード リンクを作成できません。

現時点では、TDF が更新ホストに最新バージョンを返すよう指示するまで待つしかありません。[LibreOffice のバージョン](https://github.com/eucpilots/evergreen-module/issues/218)も参照してください。

### Microsoft365Apps

`Microsoft365Apps` は公開ドキュメントに記載されたチャネルのみを返します。Microsoft 365 Apps 更新 API で追加のチャネルを利用できる場合がありますが、microsoft.com に記載されたチャネルと一致しない可能性があるため、この関数には含まれていません。

チャネルのプロパティは次の記事に記載されています。[Office Deployment Tool の構成オプション](https://docs.microsoft.com/en-us/deployoffice/office-deployment-tool-configuration-options#channel-attribute-part-of-add-element)、[Office LTSC 2021 の更新チャネル](https://docs.microsoft.com/en-us/deployoffice/ltsc2021/update#update-channel-for-office-ltsc-2021)、[Office 2019 の更新チャネル](https://docs.microsoft.com/en-us/deployoffice/office2019/update#update-channel-for-office-2019)。

チャネルの正式名称は[Microsoft 365 Apps の更新履歴](https://docs.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date)に記載されています。

### MicrosoftWvdRemoteDesktop

`MicrosoftWvdRemoteDesktop` は一部の URL で HTTP 503 エラーを報告する場合があります（以下の例を参照）。これは一時的な動作ですが、関数は引き続き利用可能なデータを返すはずです。`-WarningAction "SilentlyContinue"` を使うと、この警告を抑制できます。

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
```

### MozillaFirefox

#### 言語のサポート

`-AppParams` にハッシュテーブルを渡すと、サポートされる任意の言語を `MozillaFirefox` に指定できます。たとえば `Get-EvergreenApp -Name "MozillaFirefox" -AppParams @{Language="en-GB", "es-ES"}` は、英語（英国）版とスペイン語版の Firefox インストーラーを返します。

ほとんどの[サポート対象言語](https://www.mozilla.org/en-US/firefox/all/#product-desktop-release)は、言語の短縮コードとして関数に渡せます。言語一覧は [MozillaFirefox](https://github.com/eucpilots/evergreen-module/blob/main/Evergreen/Manifests/MozillaFirefox.json) マニフェストで確認できます。

### OBSStudio

OBS Project が `https://obsproject.com/update_studio/manifest.json` の更新マニフェストを利用できない状態に変更すると、OBS Studio の最新バージョンとダウンロード情報を取得できない場合があります。`Get-EvergreenApp -Name OBSStudio` は 404 エラーを返します。OBS Project がマニフェストを再び利用可能にするまで待つしかありません。

Evergreen は GitHub リポジトリからバージョンを照会できますが、OBS Project はリポジトリ内のリリースを一貫して管理していません。OBS Studio の特定のリリースが macOS 版だけの問題を修正する場合があり、その場合 `OBSStudio` は結果を返しません。

 [Get-EvergreenApp OBSStudio が 404 エラーで動作しない](https://github.com/eucpilots/evergreen-module/issues/184)も参照してください。

### OmnissaHorizonClient

`OmnissaHorizonClient` は常に現行リリースを返すとは限りません。VMware Horizon Client のソフトウェア更新データでは、メジャー バージョンのプロパティに並べ替えやすい形式が使われていません。この問題は今後のリリースで修正される可能性があります。[VMware Horizon Client が古いバージョンを報告する](https://github.com/eucpilots/evergreen-module/issues/161)も参照してください。

### PaintDotNet

Linux の PowerShell で `Get-EvergreenApp -Name PaintDotNet` を実行すると、次のエラーが発生します。回避策として、代わりに `Get-EvergreenApp -Name PaintDotNetOfflineInstaller` を使用してください。

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://www.getpaint.net/updates/versions.8.1000.0.x64.en.txt.
WARNING: Invoke-EvergreenWebRequest: Error encountered: The SSL connection could not be established, see inner exception..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /home/aaron/.local/share/powershell/Modules/Evergreen/2205.561/Apps/Get-PaintDotNet.ps1:20
Line |
  20 |      $Content = Invoke-EvergreenWebRequest -Uri $res.Get.Uri
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: The SSL connection could not be established, see inner exception.
```

### VideoLanVlcPlayer

`VideoLanVlcPlayer` は常に最新リリースを返すとは限りません。VLC media player が使用する更新フィードが返すリリースは、更新フィード内のバージョンの都合により、[videolan.org](https://www.videolan.org/vlc/) からダウンロード可能な現行バージョンと異なる場合があります。

更新サイトのソース コードは[VideoLAN organization > update.videolan.org > Repository](https://code.videolan.org/VideoLAN.org/update.videolan.org/-/tree/master/vlc)で確認できます。
