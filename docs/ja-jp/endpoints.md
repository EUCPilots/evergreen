---
layout: doc
---
# Evergreen が使用するエンドポイントの取得

Evergreen API は、Evergreen がアプリケーションのバージョンやダウンロードの詳細を取得するために使用するエンドポイント URL と、アプリケーション インストーラーのダウンロードに必要なエンドポイント URL を返します。

Evergreen でアプリケーション インストーラーをダウンロードする前にエンドポイントの許可リストが必要な場合、エンドポイント一覧をファイアウォールやプロキシ サーバーのシステムにインポートできます。すべてのエンドポイントには TCP 80 または 443 でアクセスします。

## Get-EvergreenEndpointFromApi

`Get-EvergreenEndpointFromApi` を使うと、Evergreen が使用するすべてのエンドポイントを単一のオブジェクトとして返し、API の利用を簡素化できます。パラメーターなしで `Get-EvergreenEndpointFromApi` を実行すると、すべてのアプリケーションで使用されるエンドポイントとポートの一覧が返されます。

```powershell
PS C:\> Get-EvergreenEndpointFromApi

Application          Endpoints                                                                              Ports
-----------          ---------                                                                              -----
1Password            {1password.com, app-updates.agilebits.com, downloads.1password.com, cdn.agilebits.com} {443}
1Password7           {1password.com, c.1password.com}                                                       {443}
1PasswordCLI         {app-updates.agilebits.com, cache.agilebits.com, developer.1password.com}              {443}
7zip                 {nchc.dl.sourceforge.net, sourceforge.net, www.7-zip.org, versaweb.dl.sourceforge.net} {443}
7ZipZS               {api.github.com, mcmilk.de, github.com}                                                {443}
AdobeAcrobat         {ardownload2.adobe.com, armmf.adobe.com, helpx.adobe.com}                              {443}
AdobeAcrobatDC       {ardownload2.adobe.com, rdc.adobe.io, www.adobe.com}                                   {443}
AdobeAcrobatProStdDC {helpx.adobe.com, rdc.adobe.io, trials.adobe.com}                                      {443}
AdobeAcrobatReaderDC {acrobat.adobe.com, rdc.adobe.io, ardownload2.adobe.com}                               {443}
AdobeBrackets        {brackets.io, api.github.com, github.com}                                              {80, 443}
```

`-Name` パラメーターを使うと、`Get-EvergreenEndpointFromApi` は単一のアプリケーションまたは複数のアプリケーションのエンドポイントを返せます。次の例では、Microsoft Teams と Microsoft Edge のエンドポイントとポートを取得します。

```powershell
PS C:\> Get-EvergreenEndpointFromApi -Name "MicrosoftTeams", "MicrosoftEdge"

Application    Endpoints                                                                              Ports
-----------    ---------                                                                              -----
MicrosoftEdge  {edgeupdates.microsoft.com, www.microsoft.com, msedge.sf.dl.delivery.mp.microsoft.com} {443}
MicrosoftTeams {config.teams.microsoft.com, www.microsoft.com, statics.teams.cdn.office.net}          {443}
```

### すべてのエンドポイントを簡潔な一覧で取得する

`Get-EvergreenEndpointFromApi` の出力を絞り込むと、重複のないすべてのエンドポイント URL の簡潔な一覧を作成できます。次のコマンドは、Evergreen に必要なすべてのエンドポイントの許可リストに使える URL 配列を生成します。

```powershell
PS C:\> Get-EvergreenEndpointFromApi | Select-Object -ExpandProperty "Endpoints" -Unique
```

### 出力を CSV に変換する

次のコードを使うと、`Get-EvergreenEndpointFromApi` の出力を CSV 形式のファイルに変換できます。ファイルにはアプリケーション名、カンマ区切りのエンドポイント URL、およびカンマ区切りのポートが含まれます。

```powershell
$Path = "./Endpoints.csv"
Get-EvergreenEndpointFromApi | ForEach-Object {
    [PSCustomObject]@{
        Application = $_.Application
        Endpoints   = $_.Endpoints -join ","
        Ports       = $_.Ports -join ","
    }
} | Export-Csv -Path $Path -NoTypeInformation -Encoding "Utf8" -Append
```

## API の使用方法

API は、アプリケーションのバージョンとダウンロードを判定するために Evergreen が使う URL と、アプリケーション インストーラーのダウンロードに使う URL の 2 種類のエンドポイント一覧を提供します。

::: warning **カスタム User-Agent が必要です。**
API の過度な利用を最小限に抑えるため、多くのツールの既定 User-Agent はブロックされます。PowerShell、wget、curl などのツールを使う場合は、カスタム User-Agent を指定してください。トラブルシューティングに役立つ値を指定してください（ログ データは公開されません）。たとえば、会社名や場所などを指定します。
:::

### アプリケーション バージョンの判定に使用する URL の一覧を取得する

アプリケーションのバージョンの判定に使用する URL の一覧は、Evergreen PowerShell モジュールで使われます。この情報はすでに Evergreen API でホストされているため、`/app/{appName}` API エンドポイントを使ってアプリケーションのバージョンとインストーラーを検索する場合は必要ありません。この URL の一覧は、Evergreen のサポート対象アプリケーションが更新されると更新されます。

`Invoke-RestMethod` を使って、Evergreen がアプリケーションのバージョンを判定するために使用する URL の一覧を取得する例を示します。

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### アプリケーション インストーラーのダウンロードに使用する URL の一覧を取得する

この URL 一覧は、Evergreen が判定したアプリケーション インストーラーをダウンロードするときに使われます。通常、この一覧はほぼ固定ですが、一部のアプリケーションでは変更されることがあります。たとえば、`Get-EvergreenApp -Name "VideoLanVlcPlayer` は VLC が返すミラーの一覧に基づいて、複数のダウンロード URL を返します。

`Save-EvergreenApp` でアプリケーション インストーラーをダウンロードする際に Evergreen が使う URL の一覧を `Invoke-RestMethod` で取得する例を示します。

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/downloads" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### 出力

これら 2 つのエンドポイントから返される出力は JSON 形式です。アプリケーション名（文字列）とエンドポイント（配列）が返されます。Microsoft Edge で絞り込んだ出力例を示します。

```json
{
    "Application": "MicrosoftEdge",
    "Endpoints": [
        "msedge.sf.dl.delivery.mp.microsoft.com"
    ],
    "Ports": [
        "443"
    ]
}
```

PowerShell では `Invoke-RestMethod` を使い、アプリケーションとエンドポイントのオブジェクトを取得できます。

```powershell
$Endpoints = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Endpoints | Where-Object { $_.Application -eq "MicrosoftEdge" }

Application   Endpoints                                      Ports
-----------   ---------                                      -----
MicrosoftEdge {edgeupdates.microsoft.com, www.microsoft.com} {443}
```
