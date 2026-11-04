---
layout: doc
---
# Desktop Workbench のインストール

::: warning ベータ
Desktop Workbench (EvergreenUI) は現在プレリリースです。`-AllowPrerelease` フラグを指定してインストールしてください。安定版リリースまでに機能やコマンドが変更される可能性があります。
:::

::: info
このページでは、バージョン **1.0.21** 以降の EvergreenUI の機能について説明します。
:::

## 要件

| 要件 | 最小バージョン |
|---|---|
| オペレーティング システム | Windows 10 / Windows Server 2019 以降 |
| PowerShell | 5.1（Desktop）または 7.0 以降 |
| .NET | .NET Framework 4.7.2 以降（PowerShell 5.1 の場合）または .NET 6 以降（PowerShell 7 以降の場合） |
| Evergreen モジュール | 2603.2832.0 以降 |

::: info
Desktop Workbench は WPF 上に構築されているため、Windows 専用です。追加の DLL は不要です。UI は Windows に付属する WPF アセンブリを使用します。
:::

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

複製したリポジトリから Desktop Workbench を実行するには、次のようにします。

```powershell
# Install the Evergreen dependency first
Install-Module -Name Evergreen -Scope CurrentUser

# Clone the repository and import the module directly
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## インストールを確認する

インストール後、モジュールが利用可能であることを確認します。

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```
