---
layout: doc
---
# 内部の仕組み

Evergreen は自己完結型の PowerShell モジュールです。インストール後、指定したアプリケーションの詳細を取得するために使用する公式ベンダー ソース以外のコンテンツにアクセスする必要はありません。

アプリケーションの最新バージョンとダウンロード URL を見つける Evergreen の仕組み上、ほとんどのアプリケーションに個別のコードが必要です。GitHub のようにリリース用 API を提供する共通のソースを使うアプリケーションもありますが、多くの場合はアプリケーション専用の API やサイトに問い合わせて詳細を取得します。

## モジュールの構造

Evergreen には次のディレクトリ構造が含まれます。

* `<ModuleBase>/Public` - `Get-EvergreenApp`、`Find-EvergreenApp`、`Save-EvergreenApp` などのパブリック関数
* `<ModuleBase>/Apps` - アプリケーションの詳細を取得するロジックを含む、アプリケーションごとの内部関数。多くの場合、アプリケーションごとに固有です
* `<ModuleBase>/Shared` - コードの重複を減らすため、特定のアプリケーションで使用する内部関数
* `<ModuleBase>/Manifests` - 各アプリケーションの JSON 形式のマニフェスト。アプリケーションごとの関数が使用する詳細情報（アプリケーションの最新バージョンを判定する URL など）を記述します
* `<ModuleBase>/Private` - 再利用可能なコードを含む内部関数

### Public

`Public` フォルダーには、Evergreen からエクスポートされるすべての関数が含まれます。

* `ConvertTo-DotNetVersionClass.ps1`
* `Export-EvergreenApp.ps1`
* `Export-EvergreenManifest.ps1`
* `Find-EvergreenApp.ps1`
* `Get-EvergreenApp.ps1`
* `Get-EvergreenAppFromApi.ps1`
* `Get-EvergreenAppFromLibrary.ps1`
* `Get-EvergreenEndpointFromApi.ps1`
* `Get-EvergreenLibrary.ps1`
* `New-EvergreenLibrary.ps1`
* `Save-EvergreenApp.ps1`
* `Start-EvergreenLibraryUpdate.ps1`
* `Test-EvergreenApp.ps1`

### Apps

`Apps` フォルダーには、対象アプリケーションの詳細を判定する処理を担う、アプリケーション固有の関数が含まれます。

たとえば `Get-MicrosoftEdge` は、`https://edgeupdates.microsoft.com/api/products` でホストされている Edge の公式バージョン一覧を照会します。この関数は Edge 自身と同じ手順で最新の Edge バージョンとインストーラーのダウンロード URL を判定できます。`Get-EvergreenApp -Name MicrosoftEdge` を実行すると、`Get-EvergreenApp` は `Get-MicrosoftEdge` を呼び出し、その結果をパイプラインに返します。

ほとんどの関数はアプリケーション固有のコードを含みますが、GitHub や SourceForge をソースとしてアプリケーションのバージョンや更新情報を取得するものもあり、他の関数より多くの共有コードを使用できます。

### Manifests

各アプリケーションには JSON 形式のマニフェストが含まれています。マニフェストには、内部のアプリケーション関数がアプリケーションのバージョンとダウンロード URI を取得する際に使用する詳細が記述されています。マニフェストの主なプロパティは `Name`（ベンダー名とアプリケーション名）、`Source`（公式サイトへのリンク）、およびアプリケーション更新の確認に使う URL などを定義する `Get` です。基本的なマニフェスト構造は次のようになります。

```json
{
    "Name": "Vendor Application name",
    "Source": "https://www.vendorwebsite.com/product",
    "Get": {
        "Update": {
            "Uri": "https://update.vendorwebsite.com/api/product"
        }
    },
    "Download": {
            "Uri": "https://download.vendorwebsite.com/files"
    },
}
```

さらに、各マニフェストにはアプリケーションのインストールに関する詳細を含む `Install` プロパティがあります。ただし、多くのアプリケーションでこのプロパティは含まれていますが、アプリケーションのインストール方法を決定的に定義するものではありません。

### Private

`Private` フォルダーには、多くのアプリケーション関数で使用する再利用可能なコードが含まれます。主な関数は次のとおりです。

* `Get-GitHubRepoRelease` - 対象の GitHub リポジトリからリリースを返します
* `Get-SourceForgeRepoRelease` - 対象の SourceForge リポジトリからリリースを返します
* `Invoke-EvergreenRestMethod` - `Invoke-RestMethod` の処理を提供し、更新 API からコンテンツを返します
* `Invoke-EvergreenWebRequest` - `Invoke-WebRequest` の処理を提供し、対象 URI からコンテンツを返します
