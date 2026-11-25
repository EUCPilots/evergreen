---
layout: doc
---
# Nerdio Manager への公開

::: warning 検証を推奨
本番環境で使用する前に、API のアクセス許可、定義のマッピング、公開後の動作を検証してください。
:::

**Nerdio** ビューでは Azure と Nerdio Manager API に接続し、Shell App 定義と Nerdio Manager を比較して、新しい Shell App やバージョンを公開し、古いバージョンを整理します。**Settings**、**Shell Apps**、**Microsoft 365 Apps** の 3 つのタブがあります（[Microsoft 365 Apps パッケージ](/ja-jp/workbench-m365)を参照）。

## Settings タブ - 接続

接続は 2 段階で行います。

**Azure ストレージの設定**

1. **Azure tenant ID** と **Azure subscription ID** を入力し、**Connect Azure** を選びます。
2. パッケージを保存する **Resource group**、**Storage account**、**Blob container** を選択します。

**Nerdio API の設定**

**Nerdio HTTPS host**、**Application client ID**、**API scope**、オプションの **OAuth token URL**、**Client secret (not saved)** を入力し、**Connect Nerdio API** を選択します。

**Save setup** でシークレット以外の値を保存します。接続時にクライアント シークレットはフォームから消去され、保存されません。**Disconnect Azure and Nerdio** を選ぶと両方のセッションを終了しますが、無関係な Azure コンテキストには影響しません。

**API only (Microsoft 365 build only)** は Azure ストレージなしで Nerdio に認証します。Nerdio への公開には Azure ストレージを含む完全な接続が必要です。

必要なモジュールは `Az.Accounts`、`Az.Resources`、`Az.Storage` です。必要な場合にのみ読み込まれます。

## Shell Apps タブ

`Definition.json` ファイルとスクリプトを含む **Shell App definitions folder** を入力または参照し、**Save setup**、続いて **Load and compare** を選択します。比較テーブルには各 **Local app**、一致した **Nerdio app**、バージョン、状態が表示されます。

公開できるのは Evergreen に基づく有効な定義のみです。

- 一致する定義がない場合、新しい Shell App（**New Shell App name**）を作成します。
- 一意に一致し、バージョンが新しい場合、既存アプリにバージョンを追加します。
- 最新のアプリ、重複した一致、サポートされていないソースはブロックされます。

解決されたインストーラーは Blob Storage に直接アップロードされます。ローカル定義は変更されません。

### 公開

**Publish selected** を選ぶと、バージョン、操作、Azure と Nerdio の宛先を確認するダイアログが 1 回表示されます。書き込み前にファイル、ソース、一致結果が再確認されます。**Cancel batch** は項目間で有効になり、実行中のプロバイダー操作は先に完了します。結果には判明している blob、アプリ、ジョブの ID が保持されます。

### 復旧

保留中または不明な結果があるとバッチは停止し、確認が完了するまで後続の Nerdio 公開がブロックされます。Workbench は未解決の操作と整理候補を `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` に記録します。トークンやシークレットは保存されません。復旧には同じテナント、サブスクリプション、Nerdio ホスト、ストレージ宛先への再接続が必要です。

未解決の結果を選択し、**Review outcome** を選びます。

- **Yes** - Nerdio で成功を確認した場合のみ
- **No** - 失敗を確認した場合のみ
- **Cancel** - 未解決のままにする

成功として申告された結果は、Workbench が Shell App を更新し、公開したバージョンが一意に最新であることを検証するまで受け入れられません。再試行、ロールバック、削除は自動的に行われません。

### 古いバージョンの整理

公開に成功すると、**Preview published apps** に保存済みの整理候補が表示されます。既定ではアプリは選択されず、新しいバージョンを含めて 1 つのバージョンが保持されます。保持数と対象アプリを変更でき、削除する項目の正確なリストを確認する必要があります。重複、順序を付けられないバージョン、最新でないバージョンはスキップされます。保留中または不明な削除があると整理処理は停止し、確認されるまでその Shell App への公開はブロックされます。延期した候補は再起動後も保持されます。

公開せずに整理するには、一致する Shell App を 1 つ選択し、**Prune selected app** を選びます。一致しない行や複数選択では開始できず、未解決の Nerdio 結果がある場合もブロックされます。削除前に宛先とバージョンのスナップショットを再確認し、比較結果を更新します。

## コマンド

`Connect-EwAzure`、`Connect-EwNerdio`、`Get-EwAzureResourceGroup`、`Get-EwAzureStorageAccount`、`Get-EwAzureStorageContainer`、`Get-EwNerdioDefinition`、`Get-EwNerdioShellApp`、`Get-EwNerdioShellAppVersion`、`Compare-EwNerdioShellApp`、`Get-EwNerdioPublishPlan`、`Publish-EwNerdioApp`、`Publish-EwNerdioBatch`、`Get-EwNerdioShellAppVersionPrunePlan`、`Remove-EwNerdioShellAppVersion`。詳しくは[コマンド リファレンス](/ja-jp/workbench-commands)を参照してください。

`Publish-EwNerdioApp -ShellAppId` は既存の Shell App にバージョンを追加します。`-PackagePath` を省略した場合は定義のソースからダウンロードします。`Remove-EwNerdioShellAppVersion` は `-ExpectedVersionNames` と `-ExpectedRemovalVersions` を受け取り、古いプレビューの使用を拒否できます。
