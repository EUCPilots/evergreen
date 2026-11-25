---
layout: doc
---
# Microsoft 365 Apps パッケージ

::: warning 検証を推奨
本番環境で使用する前に、XML 構成、パッケージの出力、テナントのアクセス許可を検証してください。
:::

**Intune** と **Nerdio** の各ビューには **Microsoft 365 Apps** タブがあります。Office Deployment Tool (ODT) 構成 XML から Microsoft 365 Apps パッケージをビルドし、必要に応じて公開できます。

## ワークフロー

1. 対応するプロバイダー（[Intune](/ja-jp/workbench-intune) または [Nerdio](/ja-jp/workbench-nerdio)）にサインインします。
2. **Configuration folder** を指定し、**Load configurations** を選びます。このフォルダーは Intune と Nerdio で共有されます。各構成には有効で空ではない ID が必要です。
3. 構成を 1 つ選び、**Channel**、**Company name**、**Session type** を指定します。
4. **Preview build** または **Preview publishing** を選び、次に **Build only** または **Build and publish** を選択します。
5. **Save shared settings** でシークレット以外の選択内容を保存します。

Nerdio でビルドのみを行う場合は **API only** サインインを使用できます。Nerdio への公開には、接続済みの Azure テナント、サブスクリプション、ストレージ宛先も必要です。

## 必須ファイル

- `Configuration.Remove` 要素を含む `Uninstall-Microsoft365Apps.xml`。Nerdio のビルドと Intune への公開に必要です。Intune はビルドのみならこのファイルなしでも実行できますが、公開するにはアンインストール コマンドがこのファイルを参照するため、ファイルを含めて再ビルドする必要があります。
- Nerdio の場合、XML と同じ場所に `shell-app` フォルダーを置き、`Definition.json`、`Detect.ps1`、`Install.ps1`、`Uninstall.ps1` を格納します。

ソース XML とスクリプトは変更されません。

## バージョンとビルド

プレビューには、解決済みの **Office channel version** と **ODT download version** が別々に表示されます。署名済み ODT アーカイブは Windows の `tar.exe` で展開され、ダウンロードした実行ファイルは起動されません。ビルドされる構成はローリング チャネルを使用するため、固定バージョンが必要な `DownloadPath` は使用できません。

インストール済みの Office がプレビューより新しい場合があるため、Intune の検出ではプレビューされたバージョン以降を許容します。

::: info
`TenantId` プロパティと会社の `AppSettings\Setup Name="Company"` の値は構成に書き込まれますが、Microsoft はテナントの関連付けや会社の構成として説明していません。サインイン中のテナントは、Office がそのテナントに関連付けられている証拠にはなりません。Microsoft の [`TenantAssociationKey`](https://learn.microsoft.com/microsoft-365-apps/deploy/office-deployment-tool-configuration-options#tenantassociationkey-property-part-of-property-element) は別の値です。
:::

## 公開

ビルドの前に確認が求められます。

- **Intune** は新しいアプリを作成し、構成 ID による既存の一致を表示します。必要に応じて **Optional app to supersede** を使用して、既存アプリを置き換える関係を設定できます（アンインストールを伴わない更新関係）。
- **Nerdio** は Shell App を新規作成するか、**Existing Shell App for add version** で既存の Shell App にバージョンを追加できます。既にあるバージョンを追加するには、*I confirm the configuration changed if this Office version already exists* にチェックを入れます。Nerdio はリモート構成を比較できないため、要求が拒否される場合があります。

書き込み前に入力とプロバイダーの宛先を再確認しますが、原子的な処理ではありません。既存のパッケージは明示的な承認がある場合にのみ置き換えられます。ビルドではステージングされたソースとツールが出力フォルダー内の `<application>\Builds\<GUID>` に保持されます。不要になった場合は手動で削除してください。キャンセルは各段階の間で有効になり、実行中のビルド、アップロード、要求は中断しません。

## 復旧

Intune の不明な結果はシークレットなしで保存され、確認されるまでその構成への書き込みがブロックされます。Intune タブの **Recovery** 展開領域で **Load recovery records** を選び、Intune でアプリを確認してから **Acknowledge reviewed outcome** を選択します。Nerdio の保留中または不明な結果は [Shell Apps の復旧コントロール](/ja-jp/workbench-nerdio)を使用します。再試行、ロールバック、クリーンアップは自動的に行われません。

## コマンド

`Get-EwM365Configuration`、`Get-EwM365BuildPlan`、`New-EwPackage`、`Get-EwM365IntunePublishPlan`、`Publish-EwM365IntuneApp`、`Get-EwM365IntuneRecovery`、`Clear-EwM365IntuneRecovery`、`Get-EwM365NerdioPublishPlan`、`Publish-EwM365NerdioApp`。Microsoft 365 でプレビューなしに `New-EwPackage` を呼び出すと、プレビューが自動作成されますが、プロバイダー セッションは引き続き必要です。
