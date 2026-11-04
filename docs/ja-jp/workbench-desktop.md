---
layout: doc
---
# Desktop Workbench の使い方

::: warning ベータ
Desktop Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

::: info
このページでは、バージョン **1.0.21** 以降の EvergreenUI の機能について説明します。
:::

## Workbench の起動

モジュールをインポートし、`Start-EvergreenWorkbench` を実行して Evergreen Workbench ウィンドウを開きます。

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Workbench を再度開くと、最後に使用したビューが復元されます。保存したビューが無効になっている場合は、Apps View が代わりに表示されます。

ナビゲーション レールの切り替えを使うと、展開表示とコンパクト表示を切り替えられます。

![チャネル、リリース、アーキテクチャ、Type のフィルターがある Microsoft アプリケーションの Apps View](/img/ui/evergreen-workbench-collapsed.png)

## Apps View

Apps View では、Evergreen モジュールがサポートする 500 以上のアプリケーションが検索可能なデータ グリッドに表示されます。左側の一覧からアプリケーションを選択すると、`Get-EvergreenApp` が返すバージョンとダウンロードのメタデータを確認できます。

![チャネル、リリース、アーキテクチャ、Type のフィルターがある Microsoft アプリケーションの Apps View](/img/ui/evergreen-workbench-apps.png)

アプリケーション一覧上部の検索ボックスを使うと、名前で絞り込めます。右側のデータ グリッドには、Version、Date、Channel、Release、Architecture、Type、URI などのバージョン詳細が表示されます。

左側の一覧で、よく使うアプリケーションに星を付けられます。お気に入りは一覧の先頭に固定され、ローカルの Workbench 設定に保存されます。

選択したアプリにキャッシュ データが存在する場合、アプリ詳細のヘッダーに **Last refresh** のタイムスタンプも表示されます。以下の Apps View では、お気に入りのアプリケーションが星の印とともに一覧の先頭に固定され、アプリ詳細ヘッダーには Last refresh のタイムスタンプが表示されています。

![チャネル、リリース、アーキテクチャ、Type のフィルターがある Microsoft アプリケーションの Apps View](/img/ui/evergreen-workbench-collapsed.png)

### 動的なフィルター

アプリケーションを選択すると、そのアプリケーションが返すプロパティに応じてフィルター パネルが自動的に更新されます。たとえば Adobe Acrobat Reader DC を選択すると、Language、Architecture、Type のフィルターが表示されます。

![Language、Architecture、Type のコントロールを表示した Adobe Acrobat Reader DC の動的フィルター](/img/ui/evergreen-workbench-apps-filter.png)

利用可能なフィルター プロパティはアプリケーションによって異なり、次のようなものがあります。

| プロパティ | 値の例 |
|---|---|
| Architecture | x64、x86、ARM64 |
| Channel | Stable、Beta、Dev |
| Ring | Production、Enterprise |
| Language | English、English (UK) |
| Type | exe、msi、msix、zip |
| Release | General、Enterprise |

フィルター パネルで値を選択して結果を絞り込みます。**Clear filters** でリセットするか、**Export to CSV** で絞り込んだ結果を保存できます。

バージョン グリッドでは列を並べ替えられます。列見出しをクリックすると昇順になり、もう一度クリックすると降順になります。

列見出しを右クリックして、任意の列を表示または非表示にすることもできます。Version や URI などの構造列は常に表示されます。

![テーブルのヘッダーを右クリックしたときのオプションを表示する Apps View](/img/ui/evergreen-workbench-rightclick.png)

## Download View

アプリケーション インストーラーをダウンロードするには、Apps View でバージョンを選び、**Add to download queue** をクリックします。Download View に切り替えて、ダウンロードを管理および開始します。

![Adobe Acrobat Reader DC のダウンロードがキューに追加された Download View](/img/ui/evergreen-workbench-download.png)

Download View では、Status、App、Version、Architecture、URI、Path の列を含むキューが表示されます。ダウンロードが完了すると Path 列にパスが設定されます。ツールバーでは、次の操作ができます。

- **Remove selected** - 選択した項目をキューから削除
- **Clear queue** - すべての項目を削除
- **Open folder** - ダウンロード出力フォルダーを開く
- **Download all** - キュー内の項目を順番にすべてダウンロード

ウィンドウ下部の進行状況バーで、現在のダウンロード状況を確認できます。ダウンロードはキューの順序どおりに 1 件ずつ処理されます。ダウンロード キューのグリッドでは列を並べ替えられます。

![ダウンロード済みファイルのローカル パスを表示する Download View](/img/ui/evergreen-workbench-download-path.png)

## Library View

既存の [Evergreen ライブラリ](/ja-jp/newlibrary)がある場合、Library View では GUI を使ってライブラリを閲覧および更新できます。ライブラリ パスを入力するか参照して、ライブラリの内容を読み込みます。

![Microsoft Edge のライブラリ内容とバージョン詳細を表示する Library View](/img/ui/evergreen-workbench-library.png)

Library View には次の情報が表示されます。

- **ライブラリの内容** - ライブラリ内のアプリケーション、アプリ名、バージョン数、パスを含むテーブル
- **選択したアプリの詳細** - 選択したアプリケーションの各バージョンの Version、URI、type、size、SHA256 ハッシュ、release、ファイル パス

ツールバーでは、次の操作ができます。

- **Browse** - ライブラリ パスを選択
- **Open folder** - ライブラリ ディレクトリを開く
- **New Library** - 新しい Evergreen ライブラリを作成（`New-EvergreenLibrary`）
- **Refresh Library** - ライブラリの内容を再読み込み（`Get-EvergreenLibrary`）
- **Update Library** - 最新バージョンをライブラリにダウンロード（`Start-EvergreenLibraryUpdate`）

## Install View

Install View は、ディレクトリからパッケージ定義を読み込み、定義されたアプリケーション バージョンをコンピューターに現在インストールされているバージョンと比較して、アプリケーションを直接インストールまたは更新できるようにします。

![インストール済みと最新のアプリケーション バージョンを比較する Install View](/img/ui/evergreen-workbench-install.png)

各行には次の情報が表示されます。

- **App** - アプリケーション名とアーキテクチャ
- **Publisher** - アプリケーションの発行元
- **Installed** - 現在コンピューターにインストールされているバージョン（ある場合）
- **Latest** - Evergreen で利用可能な最新バージョン
- **Status** - アプリの状態（インストール済み（最新）、インストール済み（更新が必要）、インストール済み（最新バージョン未確認）、未インストール）
- **Action** - 利用可能な操作（Install、Update、またはなし）

ツールバーでは、次の操作ができます。

- **Browse** - パッケージ定義を含むディレクトリを選択
- **Load definitions** - パッケージ定義ファイルを読み込む、または再読み込み
- **Find latest versions** - Evergreen に問い合わせ、定義された各アプリケーションの最新バージョンを取得
- **Install selected** - 選択したアプリケーションをインストールまたは更新

::: info
Workbench が昇格された権限で実行されていない場合、インストーラーによって UAC の昇格を求められることがあります。
:::

## Import タブ

Import タブでは、アプリケーション パッケージを外部プラットフォームにインポートするワークフローを利用できます。4 つのサブタブがあります。**Microsoft Intune Win32 Apps**、**Nerdio Manager Shell Apps**、**Microsoft 365 Apps**、**Authentication**。

Import タブを最初に開くと、インポート関連モジュールが読み込まれます。必要なモジュールの読み込みが完了するまでは、サインインとインポートの操作は無効です。

### Microsoft Intune Win32 Apps

::: warning 検証を推奨
インポート ワークフローは利用できますが、本番環境に展開する前に、テナント固有のパッケージ化と割り当ての動作をお使いの環境で検証してください。
:::

Intune パッケージ定義が含まれるディレクトリを参照して読み込み、Intune テナント内の現在の Win32 アプリと比較します。

![パッケージ定義とインポート状態を表示する Microsoft Intune Win32 Apps の Import タブ](/img/ui/evergreen-workbench-import-intune.png)

データ グリッドには、App、Publisher、Intune Version、Latest、Status、Action の列を含む調整結果が表示されます。

Action の値は次に行う操作を示します。

- **Import new app** - 定義がまだ Intune にありません
- **Import new version and supersede** - アプリケーションは Intune に存在し、更新が必要です
- **Fix in definition** - 定義 GUID の重複など、定義に問題があります
- **-** - 操作は不要です

アクション バーでは、定義とインポートを管理できます。

- **Reload definitions** - ディスクから定義一覧を再読み込み
- **Update definitions** - 各定義の最新 Evergreen バージョンを解決し、`App.json` と検出ルールをその場で更新します。完了すると定義一覧が自動的に再読み込みされます
- **Compare with Microsoft Intune** - 調整一覧を作成
- **Import Win32 app** - 操作可能な選択行を処理

### Nerdio Manager Shell Apps

::: warning 検証を推奨
Nerdio のインポート ワークフローは利用できますが、API 権限、定義のマッピング、インポート後の動作をお使いの環境で検証してください。
:::

Nerdio Manager Shell App 定義が含まれるディレクトリを参照して読み込み、Nerdio Manager 環境内の Shell Apps と比較します。

![バージョン比較を表示する Nerdio Manager Shell Apps の Import タブ](/img/ui/evergreen-workbench-import-nerdio.png)

データ グリッドには、各定義の状態が表示されます。既存の Shell App と一致しているか、更新が利用可能か、現在の Evergreen バージョンと最新バージョンは何かを確認できます。ステータス バーには比較結果の概要が表示されます。

**Compare with Nerdio Manager** を使って調整一覧を作成します。その後、選択した行に対して **Add new version to existing Shell App** または **Import New App** を使います。

### Microsoft 365 Apps

::: warning 検証を推奨
Microsoft 365 Apps ワークフローは、Intune と Nerdio Manager の両方のシナリオで利用できます。本番環境で使用する前に、XML 構成、パッケージ出力、テナントの権限を検証してください。
:::

Office Deployment Tool の XML 構成ファイルを含むフォルダーを参照し、**Load configurations** をクリックします。

![パッケージ構成とインポート操作を表示する Microsoft 365 Apps の Import タブ](/img/ui/evergreen-workbench-import-m365.png)

グリッドには各構成について次の情報が表示されます。

- **Filename** - XML ファイル名
- **Display Name** - 生成されたアプリケーション表示名
- **Products** - 解析された製品と対象の詳細
- **Status** - 構成の検証結果（Valid、No ID、Invalid XML など）

アクション バーでは、パッケージ化とインポートを設定できます。

- **Channel** - パッケージ生成に使用する Microsoft 365 更新チャネルを選択
- **Company name** - パッケージ メタデータに挿入する必須の値
- **Import Nerdio Manager Shell App** - パッケージをビルドして Nerdio Manager にインポート
- **Import Microsoft Intune Win32 App** - パッケージをビルドして Intune にインポート

EvergreenUI 1.0.20 の Nerdio ワークフローでは、Workbench は XML 構成の隣にある `shell-app` サブディレクトリから Shell App 定義ファイルを読み込み、必要なファイル（`Definition.json`、`Detect.ps1`、`Install.ps1`、`Uninstall.ps1`）を検証して、その定義から Shell App を作成します。このフローでは、Nerdio へのインポートに `IntuneWin32App` は必要ありません。

このタブの接続インジケーターには、Microsoft Intune と Nerdio Manager の認証状態が表示されます。

### パッケージ定義

Install と Import の機能で使うパッケージ定義は、[https://github.com/EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages) にあります。

::: info
これらのパッケージ定義は使用前に検証してください。長期的には、Intune Win32 アプリと Nerdio Manager Shell Apps で共通のパッケージ定義を作成することを目指しています。
:::

### 認証

Authentication サブタブでは、Entra ID、Nerdio Manager API、Azure Storage への接続を管理します。これらの接続は、Intune、Nerdio Manager、Microsoft 365 Apps のインポート ワークフローで必要です。

![Entra ID、Nerdio Manager API、Azure Storage の接続を表示する Authentication サブタブ](/img/ui/evergreen-workbench-import-auth.png)

次の項目を設定します。

- **Entra ID** - テナント ID（任意）を入力し、**Sign in** を使って Microsoft Intune に接続
- **Nerdio Manager API** - Nerdio Manager に接続するため、NME Host、Client ID、API Scope、OAuth token URL、Client Secret、Tenant ID を指定
- **Azure Storage for Nerdio Manager Shell Apps** - アプリケーション パッケージ保存用に Subscription ID、Resource Group、Storage Account、Container を任意で構成

## Update View

Update View は GUI から `Update-Evergreen` を実行し、ローカルのアプリケーション定義キャッシュを [evergreen-apps](https://github.com/EUCPilots/evergreen-apps) リポジトリの最新リリースと同期します。

![ハッシュ検証と同期の進行状況を含む Update-Evergreen の出力を表示する Update View](/img/ui/evergreen-workbench-update.png)

**Run Update-Evergreen** をクリックすると更新が開始されます。出力パネルには、キャッシュの確認、ダウンロード、ハッシュ検証、同期の進行状況を示すタイムスタンプ付きのログ メッセージが表示されます。

## About View

About View には、名前、バージョン、プレリリース ラベル、プロジェクト URI、説明など、読み込まれた EvergreenUI モジュールのメタデータが表示されます。

![モジュールのメタデータと必須モジュールを表示する About View](/img/ui/evergreen-workbench-about.png)

また、インポート ワークフローで使用するモジュール依存関係と、各モジュールがインストール済みかどうかを示す **Required Modules** セクションも含まれます。

## Settings

Settings View では、一般的な設定とプロバイダー固有のオプションを構成します。

![General、Microsoft Intune、Logs の設定を表示する Settings View](/img/ui/evergreen-workbench-settings.png)

### General

- **Download output path** - ダウンロードしたアプリケーション インストーラーの既定のディレクトリ
- **Evergreen apps path** - ローカルの Evergreen アプリケーション定義キャッシュへのパス（読み取り専用。`Get-EvergreenAppsPath` の値を表示）
- **Theme** - Light と Dark のテーマを切り替え
- **Show Import tab** / **Show Install tab** - Import ビューと Install ビューの表示を切り替え
- **App version cache** - バージョン データはローカルにキャッシュされ、アプリ選択時に読み込まれます。次回選択時に新しいクエリを実行するには **Clear cache** を使用
- **Open cache folder** - ローカルのアプリケーション バージョン キャッシュ フォルダーを開く

### Microsoft Intune

- **IntuneWin32App module** - IntuneWin32App モジュールが読み込まれているかを示す状態インジケーター。再インポートするには **Reload** を使用
- **Package output path** - Intune Win32 パッケージ出力ファイルのディレクトリ

### Logs

- **Open logs folder** - EvergreenUI のローカル ログ ディレクトリを開く
- **Clear logs** - EvergreenUI のログ ディレクトリからローカルの `.log` ファイルを削除

## Log Panel

ウィンドウ下部の Log Panel には、次の 3 つのレベルのタイムスタンプ付きメッセージが表示されます。

- **Info** - 進行状況の更新と状態メッセージ
- **Warning** - 重大ではない問題（ダウンロード URL がリダイレクトを返した場合など）
- **Error** - バージョンの検索、ダウンロード、ライブラリ更新中の失敗

![操作の詳細な出力を表示する進行状況ログ パネル](/img/ui/evergreen-workbench-progresslog.png)

**Copy log**、**Save log**、**Show progress log** / **Hide progress log** を使ってログ出力を管理できます。操作の実行中、バックグラウンドの runspace からログ メッセージがリアルタイムに生成されます。
