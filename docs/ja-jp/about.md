---
layout: doc
---
# Evergreen について

Evergreen は、一般的な Windows アプリケーションの最新バージョンとダウンロード リンクを取得する PowerShell モジュールです。

::: tip 信頼性
このプロジェクトの目標は、信頼性を提供することです。Evergreen はお使いの環境で実行され、アプリケーション ベンダーのソースのみを照会します。アプリケーションのバージョンを調べるため、Evergreen はアプリケーション自身が更新を確認する際に使用するものと同じ更新 API、またはベンダーが所有するソースに問い合わせます。つまり、仲介者を介さないため、Evergreen が返す情報を信頼できます。
:::

## 目的

Evergreen は、次のような課題の解決に役立ちます。

* インストール済みまたはダウンロード済みのバージョンと比較するため、アプリケーションの最新バージョンを確認する
* 最新のアプリケーション インストーラーの URL を取得し、ローカルへのインストール（スクリプトによるインストールやゴールド イメージへの組み込み）または対象コンピューターへの展開（Intune や ConfigMgr など）に使用する

Evergreen はソフトウェアの展開を自動化します。たとえば、次の用途があります。

* Hashicorp Packer によるゴールド イメージの作成：一連のアプリケーションの最新バージョンを含むイメージを作成できます
* Microsoft Deployment Toolkit、Configuration Manager、または [Microsoft Intune](https://github.com/aaronparker/packagefactory) へのアプリケーションのインポート：アプリケーションを最新バージョンに保てます
* Windows イメージまたはコンピューターにインストールされているアプリケーションのバージョンの検証や監査
* [アプリケーション インストーラーのライブラリ](https://stealthpuppy.com/apptracker)の作成：Evergreen 関数を定期的に実行すると、アプリケーションの現行バージョンを取得してダウンロードし、後で使用するために保存できます
* `Winget`、`Chocolatey` などへのマニフェストの送信：Evergreen は、最新バージョンのマニフェスト作成に使えるバージョン番号とダウンロード URL を含むオブジェクトを返します

アプリケーションの展開や更新を管理するコミュニティ製および商用のソリューションは、すでに複数存在します。このモジュールはそれらとの競合を目的としておらず、Windows 向けの高機能なパッケージ マネージャーを目指すものでもありません。Evergreen はサードパーティ製ソリューションと併用できます。

## 関数

Evergreen の主な関数は次のとおりです。

* `Find-EvergreenApp` - モジュールがサポートするアプリケーションを一覧表示します
* `Get-EvergreenApp` - お使いの環境からベンダーのソースに直接アクセスし、アプリケーションのバージョンとダウンロードの詳細を取得します
* `Get-EvergreenAppFromApi` - Evergreen API からアプリケーションの詳細を取得します
* `Get-EvergreenEndpointFromApi` - バージョン情報とインストーラーのダウンロードに使用するエンドポイントを一覧表示します
* `Save-EvergreenApp` - Evergreen が返したインストーラーをダウンロードします
* `Test-EvergreenApp` - インストーラー URI にアクセスできるか確認します
* `Export-EvergreenApp` - アプリケーションのバージョン情報を JSON ファイルにエクスポートします
* `Export-EvergreenManifest` - アプリケーションの Evergreen マニフェストをハッシュテーブルとして返します
* `New-EvergreenLibrary` - アプリケーション インストーラーを保存するライブラリ構成を作成します
* `Start-EvergreenLibraryUpdate` - 構成済みのインストーラーをダウンロードし、ライブラリのインベントリを更新します
* `Get-EvergreenLibrary` - ローカルまたはリモートのライブラリと、そこにあるアプリケーションのインベントリを読み取ります
* `Get-EvergreenAppFromLibrary` - ライブラリに保存されているアプリケーションのバージョンを取得します
* `Remove-EvergreenLibraryAppVersion` - 古いインストーラーのバージョンをライブラリから削除します
* `Update-Evergreen` - ローカルのアプリケーション関数とマニフェストをダウンロードまたは更新します
* `Get-EvergreenAppsPath` - ローカルのアプリケーション キャッシュ パスを返します
* `Get-EvergreenAppsVersion` - Evergreen apps リポジトリの最新リリース バージョンを返します
* `ConvertTo-DotNetVersionClass` - バージョン文字列を .NET `System.Version` に変換します
