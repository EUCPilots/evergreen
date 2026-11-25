---
layout: doc
---
# Microsoft Intune への公開

::: warning 検証を推奨
公開すると、テナントに実際のアプリが作成されます。本番環境で使用する前に、テスト テナントでパッケージ、検出、割り当ての動作を検証してください。
:::

**Intune** ビューでは、保存済みの `App.json` [定義](/ja-jp/workbench-packages)と Microsoft Intune の Win32 アプリを比較し、選択したアプリをビルドして公開します。**Win32 apps** と **Microsoft 365 Apps** の 2 つのタブがあります（[Microsoft 365 Apps パッケージ](/ja-jp/workbench-m365)を参照）。

## 要件

Intune ワークフローでは次のオプション モジュールが必要です。使用時にのみ読み込まれます。

- `IntuneWin32App` - `.intunewin` パッケージのビルド
- `Microsoft.Graph.Authentication` - Microsoft Graph へのサインイン

サインインには `Connect-EwIntune` を使用します。オプションで **Tenant ID** を指定できます。トークンはプロセス メモリに保持され、保存されません。

## Win32 アプリ

1. **Definitions folder** を選択して読み込むか、[Packages](/ja-jp/workbench-packages) に保存されたフォルダーを使用します。
2. **Connect** を選択してサインインします。サインイン中の UPN が **Connect/Disconnect** ボタンの横に表示されます。
3. **Load matching Intune apps** / **Compare definitions** を選びます。テーブルには Publisher、**Saved** バージョン、**Intune** バージョン、照合 **Status** が表示されます。各定義の横には発行元が表示されます。
4. 対象の行を選び、**Build and publish selected** を選択します。

複数候補がある Intune の照合結果は、リンクされた置き換えチェーンと区別して表示されます。定義 GUID の重複は、定義側で修正できるよう警告されます。

### アプリの更新と置き換え

- 一致する既存アプリは、新しいバージョンで**置き換え**られます。
- **Update app**（行ごとのチェックボックス。既定ではオフ）は、アプリを更新アプリとして公開し、**All Devices** に **required** として割り当てます。

### バッチの公開

バッチ全体に対して 1 回確認します。公開は順番に行われ、定義ファイルを更新することがあります。**Cancel batch** を選ぶとアプリ間で停止し、ローカルおよび Intune の部分的な変更は **Batch results** テーブル（Definition、Result、New app ID、Previous app ID、Details）に報告されます。部分的に作成されたアプリ ID は保持されます。置き換え処理が失敗した場合、同じ Workbench セッション中に **Retry selected link** を選択してください。

インストーラーのダウンロード フォルダーから、channel、バージョン、アーキテクチャのサブフォルダーも含めてパッケージを作成し、パッケージ出力フォルダーに保存します。

## コマンド

`Connect-EwIntune`、`Disconnect-EwIntune`、`Get-EwIntuneApp`、`Compare-EwIntuneApp`、`Publish-EwIntuneApp`、`Publish-EwIntuneBatch`、`Set-EwIntuneSupersedence`。詳しくは[コマンド リファレンス](/ja-jp/workbench-commands)を参照してください。

```powershell
Connect-EwIntune
Compare-EwIntuneApp -DefinitionPath C:\Packages
```
