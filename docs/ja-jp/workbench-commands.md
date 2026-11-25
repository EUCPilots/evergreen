---
layout: doc
---
# Windows Workbench コマンド リファレンス

::: warning プレリリース
Windows Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

EvergreenUI モジュールをインポートすると、WPF を読み込まずにヘッドレス PowerShell API が利用可能になります。Workbench ウィンドウも同じ公開コマンドを呼び出すため、すべての機能をスクリプトから実行できます。パラメーターや例は `Get-Help <command> -Full` で確認してください。

```powershell
Import-Module EvergreenUI
$artifacts = Get-EwApp -Name MicrosoftEdge
Get-EwFilterableProperty -Artifact $artifacts
$artifacts |
    Where-Object Architecture -eq 'x64' |
    Select-Object -First 1 |
    Save-EwArtifact -AppName MicrosoftEdge
Get-EwLibrary
Update-EwLibrary -WhatIf
```

データを変更するコマンドは、ヘルプに記載されている場合に `-WhatIf` と `-Confirm` をサポートします。

## アプリとダウンロード

| コマンド | 説明 |
|---|---|
| `Get-EwApp` | Evergreen アプリの一覧表示、またはアプリのアーティファクトの解決 |
| `Get-EwFilterableProperty` | フィルター可能なアーティファクト プロパティの説明 |
| `Save-EwArtifact` | 解決済みアーティファクトのダウンロード |
| `Add-EwFavouriteApp` / `Remove-EwFavouriteApp` | お気に入りアプリの管理 |

## Library

| コマンド | 説明 |
|---|---|
| `Get-EwLibrary` | ライブラリ内のアプリとバージョンの読み取り（既定では保存済みのライブラリ パスを使用） |
| `Update-EwLibrary` | 初期化済みライブラリの更新 |
| `Remove-EwLibraryApp` | アプリまたは選択したアーティファクト行の削除 |

`Remove-EwLibraryApp` は `-WhatIf` と `-Confirm` をサポートします。スナップショットを検証しながら行を削除するには、`-Index` に 0 始まりのマニフェスト行番号を指定し、`Get-EwLibrary` の `ManifestHash` と `LibraryHash` を `-ExpectedManifestHash` と `-ExpectedLibraryHash` として渡します。`-Index` を省略するとアプリ全体が削除されます。

## 定義とローカル インストール

| コマンド | 説明 |
|---|---|
| `Get-EwDefinition` | `App.json` 定義の読み取りと検証 |
| `Resolve-EwArtifact` | 定義の最新アーティファクトの解決 |
| `Update-EwDefinition` | 定義のバージョンとセットアップ ファイルのメタデータの更新 |
| `Test-EwDetection` | File、Registry、MSI 検出ルールの評価 |
| `Install-EwPackage` | 定義をダウンロードし、ローカルにインストール (`ShouldProcess`) |

## パッケージと公開

| コマンド | 説明 |
|---|---|
| `New-EwPackage` | Intune Win32 または Microsoft 365 Apps パッケージのビルド |
| `Get-EwM365Configuration` | Microsoft 365 Apps 構成ファイルの一覧表示 |
| `Get-EwM365BuildPlan` | Microsoft 365 ビルドの入力とプロバイダー ID のプレビュー |
| `Connect-EwIntune` / `Disconnect-EwIntune` | Microsoft Graph セッションの管理 |
| `Get-EwIntuneApp` / `Compare-EwIntuneApp` | Intune Win32 アプリの一覧表示と比較 |
| `Publish-EwIntuneApp` / `Publish-EwIntuneBatch` | Win32 アプリの公開 |
| `Set-EwIntuneSupersedence` | 置き換え関係の設定 |
| `Get-EwM365IntunePublishPlan` / `Publish-EwM365IntuneApp` | Microsoft 365 アプリの Intune 公開プレビューと実行 |
| `Get-EwM365IntuneRecovery` / `Clear-EwM365IntuneRecovery` | 未解決の結果の一覧表示と確認 |

## Azure と Nerdio

| コマンド | 説明 |
|---|---|
| `Connect-EwAzure` / `Disconnect-EwAzure` | Azure にサインインしてストレージ宛先を検索 |
| `Get-EwAzureResourceGroup`、`Get-EwAzureStorageAccount`、`Get-EwAzureStorageContainer` | ストレージ宛先の一覧表示 |
| `Connect-EwNerdio` / `Disconnect-EwNerdio` | Nerdio セッションの管理。`-ApiOnly` は Azure ストレージを省略 |
| `Get-EwNerdioDefinition` | Shell App 定義の読み取り |
| `Get-EwNerdioShellApp` / `Get-EwNerdioShellAppVersion` | Shell Apps とバージョンの一覧表示 |
| `Compare-EwNerdioShellApp` | Nerdio Manager と定義を比較 |
| `Get-EwNerdioPublishPlan` / `Publish-EwNerdioBatch` | 確認済みの選択内容を計画し、順番に公開 |
| `Publish-EwNerdioApp` | Shell App の公開またはバージョンの追加 (`-ShellAppId`) |
| `Get-EwNerdioShellAppVersionPrunePlan` / `Remove-EwNerdioShellAppVersion` | 古いバージョンのプレビューと削除 |
| `Get-EwM365NerdioPublishPlan` / `Publish-EwM365NerdioApp` | Microsoft 365 パッケージの Nerdio 公開プレビューと実行 |

Nerdio セッションはモジュールのジョブ ワーカー間でメモリ内共有されます。期限切れ、切断、プロバイダー構成の変更後は再接続が必要です。トークンやシークレットは保存されません。

## 設定、キャッシュ、依存関係

| コマンド | 説明 |
|---|---|
| `Get-EwSetting` / `Set-EwSetting` / `Reset-EwSetting` | Workbench 設定の読み取りと変更 |
| `Clear-EwCache` | カタログ、バージョン、定義アーティファクトのキャッシュを消去 (`-WhatIf`、`-Confirm`、`-CachePath`) |
| `Get-EwDependency` | モジュール依存関係の状態を報告 |
| `Update-EwEvergreen` | Evergreen アプリ データの更新 |

`Clear-EwCache` に明示的な `-CachePath` を指定すると、その定義キャッシュが対象になり、カタログ キャッシュも無効化されます。他のカスタム ディレクトリは検索されません。無効化は同じキャッシュを共有する Workbench の runspace とプロセスに適用されます。

## バックグラウンド ジョブ

| コマンド | 説明 |
|---|---|
| `Start-EwJob` | 共有プール内でスクリプト ブロックを実行（最大 4 ワーカー） |
| `Get-EwJob` | 状態、進行状況、情報、エラー、出力の確認 |
| `Stop-EwJob` | キャンセルの要求 |
| `Remove-EwJob` | 完了したジョブの解放 |

ジョブのスクリプト ブロックはワーカー内で再作成され、呼び出し元の変数をキャプチャしません。入力は `-ArgumentList` で渡します。Workbench コマンドが不要な処理には `-NoModuleImport` を使います。ただし再利用されたワーカーには、以前のジョブで読み込まれたモジュールが残っている場合があります。

```powershell
$job = Start-EwJob -Name 'Edge lookup' -ScriptBlock { Get-EwApp -Name MicrosoftEdge }
do {
    Start-Sleep -Seconds 1
    $snapshot = Get-EwJob -Id $job.Id
} while ($snapshot.State -in 'NotStarted', 'Running', 'Stopping')
$snapshot.Output
Remove-EwJob -Id $job.Id -Confirm:$false
```

## Settings

設定は `%APPDATA%\EvergreenWorkbench\settings.json` に保存されます。`Set-EwSetting -Name` で指定できる値は `Theme`、`OutputPath`、`LibraryPath`、`PackageOutputPath`、`IntuneDefinitionsPath`、`IntuneTenantId`、`NerdioDefinitionsPath`、`NerdioTenantId`、`NmeHost`、`NmeClientId`、`NmeApiScope`、`NmeOAuthTokenUrl`、`NmeSubscriptionId`、`NmeResourceGroup`、`NmeStorageAccount`、`NmeContainer`、`M365DefinitionsPath`、`M365Channel`、`M365CompanyName`、`M365ImportFor`、`StartupView`、`LastAppName`、`WindowWidth`、`WindowHeight`、`DownloadTrayHeight`、`AppsListWidth`、`ArtifactHiddenColumns`、`WindowMaximized` です。
