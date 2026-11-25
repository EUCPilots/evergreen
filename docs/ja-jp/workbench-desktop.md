---
layout: doc
---
# Windows Workbench の使い方

::: warning プレリリース
Windows Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

::: info
このページでは、バージョン **2.0.1-preview** 以降の EvergreenUI の機能について説明します。
:::

## Workbench の起動

モジュールをインポートし、`Start-EvergreenWorkbench` を実行して Workbench ウィンドウを開きます。

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

`Start-EvergreenWorkbench` は必要に応じて WPF を読み込みます。PowerShell セッションがシングル スレッド アパートメント (STA) で実行されていない場合、Workbench は専用の STA runspace でウィンドウをホストするため、特別な起動スイッチは必要ありません。Workbench は Windows 専用で、PowerShell 7.6 以降が必要です。

起動時に、ウィンドウのサイズと最大化状態、最後に表示したページと選択したアプリ、アプリ一覧の幅、ダウンロード キューの高さが復元されます。既定では Windows のライトまたはダーク テーマに従い、対応システムでは Mica を使用します。Windows の透明度やコントラストの設定によって、背景が不透明になる場合があります。

## ナビゲーション

左側のナビゲーション レールでメイン ビューを切り替えます。レール上部の切り替えボタンを使うと、展開表示とコンパクト表示（アイコンのみ）を切り替えられます。

| ビュー | 目的 |
|---|---|
| **Apps** | アプリの閲覧、バージョンの確認と絞り込み、インストーラーのキュー登録とダウンロード、Evergreen データの保守 |
| **Library** | ローカル Evergreen ライブラリのコンテンツの読み取り、更新、削除 |
| **Packages** | App.json 定義の管理とローカル インストールのテスト |
| **Intune** | Microsoft Intune の Win32 アプリと Microsoft 365 Apps の比較、ビルド、公開 |
| **Nerdio** | Nerdio Manager の Shell Apps と Microsoft 365 Apps の比較、公開 |
| **Settings** | 保存済みフォルダーと外観 |
| **About** | Workbench のメタデータと依存関係の状態 |

ウィンドウ下部の **Activity log** には、各ビューの Info、Warning、Error メッセージがタイムスタンプ付きで記録されます。ハンドルをドラッグするか上下の矢印キーを使ってサイズを変更し、不要なときは折りたためます。時間のかかる処理は最大 4 つのバックグラウンド ワーカーを共有して実行されるため、ウィンドウの応答性が保たれます。処理中は競合する操作が無効になり、メンテナンス変更を書き込んでいる間はウィンドウを閉じられません。

## Apps

Apps ビューには Evergreen カタログのすべてのアプリが表示されます。アプリを選択すると、`Get-EvergreenApp` でバージョンが解決され、テーブルに表示されます。

- **Search** - アプリ名で一覧を絞り込みます。
- **Favourites** - 星印をクリックするとアプリが一覧の先頭に固定されます。お気に入りは Workbench の設定に保存されます。
- **Resize** - 区切り線をドラッグしてアプリ一覧の幅を変更します。幅は保存されます。

### バージョンのフィルター

フィルター パネルは選択したアプリが返すプロパティ（Architecture、Channel、Language、Type、Release など）に合わせて表示されます。各フィルターは複数選択可能なドロップダウンです。

- 同一プロパティ内の値は **OR** で結合されます。
- 異なるプロパティは **AND** で結合されます。
- 何も選択しない場合は **All** になります。

### バージョン テーブル

選択したアプリが返すすべてのプロパティが表示されます。一部の行にしかないプロパティも含まれます。Version、Date、Channel、Architecture などの一般的な列が先に並び、その後にアプリ固有のプロパティが続き、**URI** が最後に表示されます。値がない場合は空欄です。

- 列見出しをクリックすると昇順になり、もう一度クリックすると降順になります。
- **Columns** で任意の列を表示または非表示にできます。**Version** と **URI** は非表示にできません。選択はすべてのアプリに適用され、セッション間で保持されます。
- **Export to CSV** は、フィルター済みの行と表示中の列を現在の順序で保存します。
- 行を右クリックすると **Copy URI** または **Open URI** を選択できます。

### インストーラーのダウンロード

1 つ以上の行を選択し、**Add to queue** を選びます。アプリをまたいでキューに登録できるため、複数のアプリのダウンロードをまとめられます。**Show queue** でキュー トレイを展開し、ハンドルをドラッグしてサイズを変更します。

各行にはアプリ、Version、Architecture、Status、URI、およびダウンロード後に **Saved file** が表示されます。行の操作で項目を個別にダウンロードまたは削除できます。

| 操作 | 結果 |
|---|---|
| **Download now** | キュー内の項目をダウンロード フォルダーにダウンロード |
| **Clear completed** | ダウンロード済みおよび失敗した行を削除 |
| **Clear queue** | すべての行を削除（ダウンロード中は利用不可） |
| **Open folder** | ダウンロードしたファイルを含むフォルダーを開く |
| **Change** | ダウンロード フォルダーを変更 |

ダウンロード フォルダーは設定に保存され、キューの横に表示されます。進行状況バーで実行中のダウンロードを確認できます。

### メンテナンス

Apps ビューの **Actions...** メニューにはメンテナンス操作があります。

| 操作 | 内容 |
|---|---|
| **Refresh** | アプリ カタログを再読み込み |
| **Reload selected app versions** | 選択したアプリのキャッシュを使わずに読み込み |
| **Update Evergreen** | Evergreen アプリ データを更新 (`Update-Evergreen`)。インストール済み PowerShell モジュールは更新しません |
| **Clear Workbench cache** | 確認後、`%LOCALAPPDATA%\EvergreenWorkbench\Cache` にあるカタログとバージョンのキャッシュを消去 |
| **Open cache folder** | 必要に応じてキャッシュ フォルダーを作成して開く |

`Get-EvergreenApp` の結果はアプリごとの JSON ファイルとして 24 時間キャッシュされます。キャッシュを消去しても、Evergreen アプリ データ、ダウンロード済みインストーラー、Library の内容、設定、プロバイダーの復旧レコードは削除されません。メンテナンスはバックグラウンドで実行され、Apps を更新した後も選択、検索、フィルター、キュー内のダウンロードを維持します。部分的な失敗は報告されますが、自動的には再試行されません。

## Library

Library ビューでは、初期化済みの [Evergreen ライブラリ](/ja-jp/newlibrary)を読み込み、管理できます。

- **Library location** - 最近保存した最大 10 個のライブラリ フォルダーを表示するドロップダウンです。**Browse** と **Save path** も使用できます。フォルダーには `EvergreenLibrary.json` が必要です。
- **Load** - ライブラリ インベントリを読み込みます。
- **Update library** - ライブラリ内のすべてのアプリの最新バージョンをダウンロードします (`Update-EvergreenLibrary`)。
- **Open folder** - エクスプローラーでライブラリ フォルダーを開きます。

上部のテーブルには各アプリと **Versions** の数、**Location** が表示されます。下部のテーブルには選択したアプリの Version、Architecture、Type、ローカル インストーラーの **Location**（ポインターを合わせると完全なパスを表示）、URI が表示されます。いずれかのテーブルを右クリックし、**Open folder** を選ぶとアプリまたはインストーラーのフォルダーを開けます。

### コンテンツの削除

削除は Evergreen の保持コマンドとは独立しています。

- **Remove application** - 選択したアプリ、記録済みインストーラー、ライブラリ登録を削除します。以降のライブラリ更新で再ダウンロードされなくなります。
- **Remove versions** - バージョン テーブルで選択した行のみ削除します。**Ctrl** または **Shift** で複数選択できます。同じバージョン番号を共有する他のアーキテクチャやインストーラーの種類には影響しません。

各操作では確認が必要で、既定の選択肢は **Cancel** です。アプリ フォルダー内の記録済みインストーラー ファイルだけが削除され、保持されたインベントリが参照するファイルは残ります。未記録のファイルは変更されません。安全でないパスや、読み込み後に変更されたマニフェストがある場合、削除は中止されます。失敗すると後続処理を停止し、部分的な変更を報告してインベントリを再読み込みします。破壊的な操作が自動で再試行されることはありません。

::: warning
削除は元に戻せません。マニフェストが書き込まれる前に停止すると、インストーラー ファイルが削除されていても行が一覧に残る場合があります。報告されたパスを確認してください。
:::

## Packages

Packages ビューには **Definitions** と **Install** の 2 つのタブがあります。詳しくは[パッケージ、定義、ローカル インストール](/ja-jp/workbench-packages)を参照してください。

## Intune

Intune ビューでは App.json 定義と Microsoft Intune の Win32 アプリを比較し、パッケージをビルド、公開して、置き換え関係を管理します。Intune 用 Microsoft 365 Apps ワークフローも利用できます。[Microsoft Intune への公開](/ja-jp/workbench-intune)を参照してください。

## Nerdio

Nerdio ビューは Azure と Nerdio Manager API に接続し、Shell App 定義を比較してアプリやバージョンを公開し、古いバージョンを整理します。Nerdio 用 Microsoft 365 Apps ワークフローも利用できます。[Nerdio Manager への公開](/ja-jp/workbench-nerdio)と[Microsoft 365 Apps パッケージ](/ja-jp/workbench-m365)を参照してください。

## Settings

Settings ビューでは各ワークフローに保存されたフォルダーと外観オプションを確認できます。

**保存済みフォルダー**

| フォルダー | 用途 |
|---|---|
| **Download folder** | Apps のダウンロード |
| **Library folder** | Library |
| **Packages definitions folder** | Packages と Intune |
| **Package output folder** | Intune パッケージのビルド |
| **Microsoft 365 Apps configurations folder** | Intune と Nerdio の Microsoft 365 Apps（共有） |
| **Nerdio Manager Shell Apps directory** | Nerdio Shell Apps |

**Browse** または各ワークフローのコントロールでフォルダーを保存します。Settings で 3 つのワークフロー フォルダーのいずれかを変更すると、そのワークフローで未保存のフォルダー変更が置き換わります。**Open folder** はフォルダーにアクセスできる場合にのみ使用できます。

**外観**

- **Color theme** - **System**、**Light**、**Dark** から選択します。

Nerdio の Azure と API の設定は Nerdio ビューの Settings タブにあります。

設定と保存された UI 状態は `%APPDATA%\EvergreenWorkbench\settings.json` に保存されます。認証トークンとクライアント シークレットはメモリ内にのみ保持され、設定には保存されません。

## About

About ビューには Workbench のメタデータ（名前、バージョン、プレリリース ラベル、プロジェクト URI、説明）と **Dependencies** テーブルが表示されます。このテーブルには各モジュールの用途、最小バージョン、ローカルで検出できる最上位の **Installed** バージョン、Workbench runspace に読み込まれた **Loaded (window)** バージョンが表示されます。読み込み済みバージョンは呼び出し元のセッションやバックグラウンド ジョブとは異なる場合があります。

状態は About を開いたとき、および要求時に更新されます。オプションの依存関係をインストール、更新、インポートすることはありません。更新に失敗した場合、以前の結果を表示したまま古い情報として示します。

## ウィンドウを使わずにコマンドを実行する

バックグラウンド ジョブ、定義、公開、キャッシュ メンテナンスなど、Workbench のすべての機能を PowerShell コマンドから実行できます。[Windows Workbench コマンド リファレンス](/ja-jp/workbench-commands)を参照してください。
