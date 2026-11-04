---
layout: doc
---
# Evergreen API の使い方

::: warning **Evergreen API は無料で提供されています。過度な利用はお控えください。**
API は Cloudflare Workers の無料プランで提供されており、1 日あたり合計 100,000 件までリクエストできます。すべての人が利用できるよう、リクエスト数を使い切らないようご配慮ください。
:::

Evergreen がアプリケーションを検索・インストールする他の方法と異なる点は、`Get-EvergreenApp` を使用すると、公式のベンダー ソースのみを照会することです。返される情報はベンダーから取得され、ユーザー投稿に基づくものではないため、信頼できます。

Evergreen は、`Get-EvergreenApp` と同じアプリケーション バージョン情報を返す [API](https://evergreen-api.stealthpuppy.com/) をサポートしています。データはモジュール経由で取得されるため、この API は Evergreen モジュールと同じアプリケーションをサポートします。API は Cloudflare Workers 上で実行され、データは 24 時間ごとに更新されます。

Evergreen API が返すデータは [Evergreen App Tracker](https://eucpilots.com/workbench/) で確認できます。

::: info **API に関する重要な注意事項**
* API データは 24 時間ごとに更新されます。エンドポイントに頻繁にリクエストすると、スロットリングされる可能性があります。
* API は開発目的のみを想定しており、分散されたエンドポイント（ローカルでアプリケーション更新を確認する物理 PC など）での使用は想定していません。
* 問題が発生した場合や、アプリケーション ベンダーからのみデータを取得したい場合は、`Get-EvergreenApp` を使用してください。
:::

API の完全なドキュメントは [evergreen-api](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/) で確認できます。ただし、Evergreen モジュールの `Get-EvergreenApp` に慣れていれば、API も簡単に使えます。

## Get-EvergreenAppFromApi

Evergreen には `Get-EvergreenApp` とほぼ同じ方法で使用できる `Get-EvergreenAppFromApi` 関数が含まれています。`Invoke-RestMethod` を使うより簡単で、利用可能なアプリケーションを自動的に絞り込みます。たとえば、Microsoft Edge のアプリケーション データを API に問い合わせるには、次のようにします。

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

これは [https://edgeupdates.microsoft.com/api/products](https://edgeupdates.microsoft.com/api/products) の Microsoft Edge 公式更新 API を使用し、Microsoft Edge の現在のバージョンとダウンロード URL を返します。

`Get-EvergreenApp` と同様に、`Where-Object` を使って特定のアプリケーション インストーラーに出力を絞り込めます。次の例は、Microsoft Edge の Stable チャネル、64 ビット Enterprise リリースの現在のバージョンとダウンロード URL を返します。

```powershell
Get-EvergreenAppFromApi -Name "MicrosoftEdge" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

## API の使用方法

現在のバージョンでは、API に GET 呼び出しをサポートし、JSON 形式でデータを返すエンドポイントが 4 つあります。

* `/apps` - サポートされているアプリケーションの一覧を返します
* `/app/{appName}` - 指定したアプリケーションの詳細を返します
* `endpoints/versions` - Evergreen がベンダー ソースに接続してアプリケーションの詳細を返すとき（つまり `Get-EvergreenApp` 使用時）に使う URL エンドポイントの一覧を返します
* `/endpoints/downloads` - Evergreen がアプリケーションのバイナリをダウンロードするとき（つまり `Save-EvergreenApp` 使用時）に使う URL エンドポイントの一覧を返します

PowerShell では `Invoke-RestMethod` で API に問い合わせることができます。

::: warning **カスタム User-Agent が必要です。**
API の過度な利用を最小限に抑えるため、多くのツールの既定 User-Agent はブロックされます。PowerShell、wget、curl などのツールを使う場合は、カスタム User-Agent を指定してください。トラブルシューティングに役立ち、誰が API を使用しているかを識別できる値を指定してください（ログ データは公開されません）。たとえば、`"Application/Version (Company/URL)"` の形式、例: `"App-Pipeline/1.0.0 (Contoso; https://contoso.com)"` などを指定します。
:::

`/apps` からサポートされているアプリケーションの一覧を取得します。これは `Find-EvergreenApp` の実行に相当します。

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/apps" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

特定のアプリケーションの詳細は、サポート対象のアプリケーション名とともに `/app/{appName}` エンドポイントから返されます。

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

API が返すデータを絞り込み、`Save-EvergreenApp` に渡してバイナリをダウンロードできます。

```powershell
$Edge = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Edge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" } | Save-EvergreenApp -Path "C:\Apps"
```

不明なアプリケーションを `/app` エンドポイントに渡すと、エラーが返されます。

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/UnsupportedApp" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
Invoke-RestMethod:                                                                                                      
{
  "message": "Application not found. Call /apps for a list of available applications.",
  "documentation": "https://eucpilots.com/evergreen/api/"
}
```
