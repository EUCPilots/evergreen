---
layout: doc
---
# Evergreen Workbench について

Evergreen Workbench は、[Evergreen](/ja-jp/about) PowerShell モジュールが追跡するアプリケーション バージョン データを調べるためのグラフィカル インターフェイスです。Windows 向けの **Desktop Workbench** と、最新のブラウザーで動作する **Web Workbench** の 2 つのエディションがあります。

::: info
このページでは、バージョン **1.0.21** 以降の EvergreenUI の機能について説明します。
:::

## Desktop 版と Web 版の比較

| | Desktop Workbench | Web Workbench |
|---|---|---|
| **プラットフォーム** | Windows (WPF) | 最新のブラウザー |
| **インストール** | PowerShell モジュール ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | インストール不要 - [eucpilots.com/workbench](https://eucpilots.com/workbench) でホスト |
| **アプリの閲覧** | はい | はい |
| **検索と絞り込み** | はい | はい |
| **ダッシュボード** | - | はい |
| **インストーラーのダウンロード** | はい | - |
| **ライブラリ管理** | はい | - |
| **アプリのインストール / 更新** | はい（プレリリース） | - |
| **Intune / Nerdio / Microsoft 365 Apps へのインポート** | はい（プレリリース） | - |
| **CSV へのエクスポート** | はい | はい |
| **RSS フィード** | - | はい（アプリごと） |
| **PWA としてインストール** | - | はい |
| **テーマ** | ライト / ダーク | ライト / ダーク |

## Desktop Workbench

::: warning ベータ
Desktop Workbench (EvergreenUI) は現在プレリリースです。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

Desktop Workbench は WPF ベースのグラフィカル フロントエンドで、`EvergreenUI` PowerShell モジュールとして提供されます。すでに使用しているコマンドレット（`Get-EvergreenApp`、`Save-EvergreenApp`、`Start-EvergreenLibraryUpdate` など）を、対話型の Windows デスクトップ インターフェイスから利用できます。

![Desktop Workbench のアプリ ビュー](/img/ui/evergreen-workbench-apps.png)

主な機能:

- **閲覧と絞り込み** - 動的なフィルター パネルで Evergreen がサポートするすべてのアプリケーションを表示
- **ダウンロード** - キュー形式のダウンロード マネージャーでアプリケーション インストーラーをダウンロード
- **ライブラリ管理** - Evergreen ライブラリの作成、閲覧、ディスク上での更新
- **インストールと更新** - パッケージ定義からアプリケーションを直接インストールおよび更新（*プレリリース ワークフロー*）
- **インポート** - アプリケーション パッケージを Microsoft Intune（Win32 アプリ）、Nerdio Manager（Shell Apps）、Microsoft 365 Apps のワークフローにインポート（*プレリリース ワークフロー*）
- **設定** - ダウンロード パス、テーマ、ログの詳細度、プロバイダー構成

詳細は[Desktop Workbench のインストール](/ja-jp/workbench-install)および[Desktop Workbench の使い方](/ja-jp/workbench-desktop)を参照してください。

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
