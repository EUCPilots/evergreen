---
layout: doc
---
# Evergreen Workbench について

Evergreen Workbench は、[Evergreen](/ja-jp/about) PowerShell モジュールが追跡するアプリケーション バージョン データを調べるためのグラフィカル インターフェイスです。Windows 向けの **Windows Workbench** と、最新のブラウザーで動作する **Web Workbench** の 2 つのエディションがあります。

::: info
このページでは、バージョン **2.0.1-preview** 以降の EvergreenUI の機能について説明します。
:::

## Windows Workbench と Web Workbench

| | Windows Workbench | Web Workbench |
|---|---|---|
| **プラットフォーム** | Windows (WPF、PowerShell 7.6+) | 最新のブラウザー |
| **インストール** | PowerShell モジュール ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | インストール不要 - [eucpilots.com/workbench](https://eucpilots.com/workbench) でホスト |
| **アプリの閲覧** | はい | はい |
| **検索と絞り込み** | はい | はい |
| **ダッシュボード** | - | はい |
| **インストーラーのダウンロード** | はい | - |
| **ライブラリ管理** | はい | - |
| **定義とローカル インストール** | はい（プレリリース） | - |
| **Intune / Nerdio Manager への公開** | はい（プレリリース） | - |
| **Microsoft 365 Apps パッケージ** | はい（プレリリース） | - |
| **スクリプト可能なコマンド** | はい（`Ew`） | - |
| **CSV へのエクスポート** | はい | はい |
| **RSS フィード** | - | はい（アプリごと） |
| **PWA としてインストール** | - | はい |
| **テーマ** | ライト / ダーク | ライト / ダーク |

## Windows Workbench

::: warning ベータ
Windows Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

Windows Workbench は WPF ベースのグラフィカル フロントエンドで、`EvergreenUI` PowerShell モジュールとして提供されます。既存のコマンドレット（`Get-EvergreenApp`、`Save-EvergreenApp`、`Update-EvergreenLibrary` など）を対話型の Windows インターフェイスで利用できます。

主な機能:

- **Apps** - Evergreen のすべてのアプリを閲覧・絞り込み、表示列を選択し、ダウンロードをキューに登録
- **Library** - ローカル Evergreen ライブラリのアプリやバージョンを読み取り、更新、選択削除
- **Packages** - `App.json` 定義を読み込み・更新し、ローカル インストールをテスト
- **Intune** - 定義を Win32 アプリと比較し、パッケージをビルド・公開
- **Nerdio** - Shell App を比較し、アプリとバージョンを公開し、古いバージョンを削除
- **Microsoft 365 Apps** - Office パッケージを Intune または Nerdio Manager にビルド・公開
- **ヘッドレス コマンド** - スクリプト可能な `Ew` コマンドで同じ機能を利用
- **設定とバージョン情報** - 保存フォルダー、テーマ、依存関係の状態

詳細:

- [Windows Workbench のインストール](/ja-jp/workbench-install)
- [Windows Workbench の使い方](/ja-jp/workbench-desktop)
- [パッケージ、定義、ローカル インストール](/ja-jp/workbench-packages)
- [Microsoft Intune への公開](/ja-jp/workbench-intune)
- [Nerdio Manager への公開](/ja-jp/workbench-nerdio)
- [Microsoft 365 Apps パッケージ](/ja-jp/workbench-m365)
- [Windows Workbench コマンド リファレンス](/ja-jp/workbench-commands)

## Web Workbench

Web Workbench は [eucpilots.com/workbench](https://eucpilots.com/workbench) にあるブラウザー ベースのアプリケーションです。Evergreen が追跡するすべてのアプリケーションを読み取り専用で表示でき、PowerShell や Windows は必要ありません。

![Web Workbench のダッシュボード](/img/webui/webworkbench-dashboard.jpeg)

主な機能:

- **ダッシュボード** - 概要統計、アーキテクチャとファイル形式のグラフ、URI 検索、最近のアクティビティ
- **閲覧と絞り込み** - 並べ替え可能な列と列ごとのフィルターですべてのサポート対象アプリケーションを表示
- **検索** - グローバル検索オーバーレイで、すべてのアプリケーションとダウンロード URI を検索
- **エクスポート** - 絞り込み済みの結果を CSV にエクスポート
- **RSS フィード** - 個々のアプリケーションのフィード
- **PWA としてインストール** - 任意のプラットフォームでスタンドアロン アプリとして利用

詳細は[Web Workbench の使い方](/ja-jp/workbench-web)を参照してください。
