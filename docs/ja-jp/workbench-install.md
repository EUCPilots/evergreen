---
layout: doc
---
# Windows Workbench のインストール

::: warning ベータ
Windows Workbench (EvergreenUI) は現在プレリリースです。`-AllowPrerelease` フラグを指定してインストールしてください。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

::: info
このページでは、バージョン **2.0.1-preview** 以降の EvergreenUI の機能について説明します。
:::

## 要件

| 要件 | 最小バージョン |
|---|---|
| オペレーティング システム | Windows 10 / Windows Server 2019 以降 |
| PowerShell | 7.6 以降（PowerShell Core のみ） |
| フォント | Windows 10、2019、2022 では [Windows 11 用 Segoe Fluent Icons フォント](https://www.microsoft.com/en-us/download/details.aspx?id=108863) が必要です |
| Evergreen モジュール | 2603.2832.0 以降 |

::: info
Windows Workbench は WPF 上に構築されているため、Windows 専用です。追加の DLL は不要です。UI は Windows に付属する WPF アセンブリを使用します。Windows PowerShell 5.1 はサポートされません。
:::

## オプション モジュール

Evergreen モジュールが唯一の必須依存関係です。次のモジュールはオプションで、対応するワークフローを使用した場合にのみ確認されます。Workbench はこれらをインストールしません。[バージョン情報ビュー](/ja-jp/workbench-desktop#about)または `Get-EwDependency` で状態を確認してください。

| モジュール | 用途 |
|---|---|
| `IntuneWin32App` | Intune Win32 パッケージのビルド |
| `Microsoft.Graph.Authentication` | Microsoft Intune へのサインイン |
| `Az.Accounts`、`Az.Resources`、`Az.Storage` | Azure/Nerdio ストレージの検出と公開 |

```powershell
Install-Module -Name IntuneWin32App, Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module -Name Az.Accounts, Az.Resources, Az.Storage -Scope CurrentUser
```

## PowerShell Gallery からインストールする

EvergreenUI モジュールは PowerShell Gallery で公開されています。[EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/) を参照してください。

EvergreenUI は現在プレリリース モジュールのため、`-AllowPrerelease` フラグを含める必要があります。

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

Evergreen モジュールは EvergreenUI モジュール マニフェストで依存関係として定義されています。Evergreen がまだインストールされていない場合、PowerShell が自動的にインストールします。

### モジュールの更新

最新のプレリリース バージョンに更新するには、次のようにします。

```powershell
Update-Module -Name EvergreenUI -AllowPrerelease -Force
```

## ソースからインストールする

複製したリポジトリから Windows Workbench を実行するには、次のようにします。

```powershell
# 先に Evergreen 依存関係をインストールする
Install-Module -Name Evergreen -Scope CurrentUser

# リポジトリを複製してモジュールを直接インポートする
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## インストールを確認する

インストール後、モジュールが利用可能であることを確認します。

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```

## Workbench を起動する

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

[Windows Workbench の使い方](/ja-jp/workbench-desktop)を参照してください。

## 設定の保存場所

| 項目 | 場所 |
|---|---|
| 設定と保存された UI 状態 | `%APPDATA%\EvergreenWorkbench\settings.json` |
| Nerdio 復旧レコード（シークレットなし） | `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` |
| キャッシュ | `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
