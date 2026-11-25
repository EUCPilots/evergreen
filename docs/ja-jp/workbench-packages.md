---
layout: doc
---
# パッケージ、定義、ローカル インストール

::: warning プレリリース
Windows Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

**Packages** ビューでは `App.json` 定義を使用します。定義には、アプリケーション、Evergreen で最新のインストーラーを検索する方法、コンピューター上でアプリを検出する方法が記述されています。同じ定義をローカル インストールと Intune への公開に使用します。

定義は [evergreen-packages](https://github.com/EUCPilots/evergreen-packages) リポジトリから入手できます。

::: info
パッケージ定義は使用前に検証してください。長期的には、Intune Win32 アプリと Nerdio Manager Shell Apps に共通の定義を使用することを目指しています。
:::

ビューには 2 つのタブがあります。既定は **Definitions** です。保存されたスタートアップ ビューが Install の場合、Packages は Install タブを選択した状態で開きます。タブの選択状態自体は保存されません。

## Definitions タブ

Packages 定義フォルダーを入力するか **Browse** で選択し、**Load definitions**（または **Reload definitions**）を選択します。**Save path** でフォルダーを保存します。**Package output folder** の設定で Intune パッケージの出力先を指定します。

テーブルには各定義の Application、Publisher、Version、Architecture、Status が表示されます。

**Update definitions** は、各定義の最新 Evergreen アーティファクトを解決し、`App.json` のバージョン、セットアップ ファイルのメタデータ、検出ルールをその場で更新します。保存された `Application.Filter` 式は、PowerShell として実行されず、制約付き評価器で解析されます。サポート対象の Evergreen クエリ（`Get-EvergreenApp` と `Get-VcList`）および `Where-Object` 述語のみが解決されます。更新完了後に一覧が再読み込みされ、個々の定義で発生したエラーは保持されて報告されます。

## Install タブ

Install は、定義から解決したインストーラーをローカル コンピューターでテストします。これは展開パッケージではなく、Intune や Nerdio への公開条件でもありません。

Install を開くと Workbench は定義とローカル検出を更新します。以前の最新バージョンとアーキテクチャの評価は破棄されますが、現在も存在する定義の選択状態は保持されます。別の処理が実行中の場合は更新を待ち、新しい結果が届くまでインストール操作は無効になります。

| 列 | 説明 |
|---|---|
| **Application** / **Publisher** | 定義の値 |
| **Required architecture** | 定義が必要とするアーキテクチャ |
| **Artifact architecture** | 解決したインストーラーのアーキテクチャ |
| **Architecture status** | このコンピューターとの互換性 |
| **Installed** | 定義の検出ルールで検出されたバージョン |
| **Latest** | **Find latest versions** で取得した最新バージョン |
| **Status** | インストール済み、更新あり、未インストール、または最新バージョン未確認 |

**Find latest versions** で必要に応じて Evergreen カタログを照会し、行を選択して **Install selected** を選びます。バッチ全体で 1 回確認します。各アプリには `Installed`、`Failed`、`Blocked`、`Skipped` のいずれかが個別に報告されます。**Hide incompatible** を選ぶと、現在のセッションでブロックされた行が非表示になります。

検出ルールは File、Registry、MSI の種類に対応しています。Workbench を昇格して実行していない場合、インストーラーから UAC が求められることがあります。

### アーキテクチャの確認

Windows のネイティブ アーキテクチャを定義の要件および解決されたインストーラーと照合します。

- 互換性のない組み合わせは**ブロック**されます。
- **要件がない場合**、または **Arm64 上で x64 エミュレーション**を使用する場合、該当するアプリごとに個別の承認が必要です。拒否またはブロックされたアプリはスキップされます。
- x86 インストーラーは x86、x64、Arm64 でサポートされます。Arm 上の Windows 10 は x64 エミュレーションをサポートしません。
- 確認中に定義またはアーティファクトのメタデータが変更された場合、再確認されます。再確認は最大 2 回です。

これらの確認でダウンロードしたバイトのハッシュは検証されず、アプリの動作が保証されるわけではありません。

`Install-EwPackage` を非対話形式で使用する場合は、`-AllowMissingArchitectureRequirement`、`-AllowX64OnArm64`、または両方を明示的に指定してください。`-Confirm:$false` だけでは警告を承認したことにならず、必要なオプトインがない非対話呼び出しはエラーになります。`-WhatIf` はインストーラーを解決またはダウンロードしません。

## コマンド

| タスク | コマンド |
|---|---|
| 定義の読み取りと検証 | `Get-EwDefinition` |
| 最新アーティファクトの解決 | `Resolve-EwArtifact` |
| 定義の更新 | `Update-EwDefinition` |
| 検出ルールの確認 | `Test-EwDetection` |
| ローカル インストール | `Install-EwPackage` |

[コマンド リファレンス](/ja-jp/workbench-commands)を参照してください。
