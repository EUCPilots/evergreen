---
layout: doc
---
# Evergreen のインストール

## PowerShell のサポート

Evergreen は Windows PowerShell 5.1 および PowerShell 7.0 以降をサポートしています。Evergreen は PowerShell Core 6.x でも動作するはずですが、このバージョンでは現在テストを行っていないため、サポートを保証できません。

## PowerShell Gallery からインストールする

Evergreen モジュールは PowerShell Gallery で公開されています。[Evergreen](https://www.powershellgallery.com/packages/Evergreen/) を参照してください。

::: info
PowerShell Gallery から Evergreen をインストールする方法が、モジュールの推奨インストール方法です。
:::

次のコマンドで Gallery からモジュールをインストールできます。

```powershell
Install-Module -Name Evergreen
Import-Module -Name Evergreen
```

### モジュールの更新

以前のバージョンのモジュールを Gallery からインストールしている場合、`Update-Module` と `-Force` パラメーターを使って最新の更新をインストールできます。

```powershell
Update-Module -Name Evergreen -Force
```

### 詳細なインストール方法

スクリプトによるインストール（オペレーティング システムの展開など）では、モジュールのインストール前に PowerShell Gallery を信頼済みに設定すると便利な場合があります。

```powershell
if (Get-PSRepository | Where-Object { $_.Name -eq "PSGallery" -and $_.InstallationPolicy -ne "Trusted" }) {
    Install-PackageProvider -Name "NuGet" -MinimumVersion 2.8.5.208 -Force
    Set-PSRepository -Name "PSGallery" -InstallationPolicy "Trusted"
}
```

次に、モジュールがインストールされているか、古いバージョンかどうかに応じて、Evergreen をインストールまたは更新できます。

```powershell
$Installed = Get-Module -Name "Evergreen" -ListAvailable | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | `
    Select-Object -First 1
$Published = Find-Module -Name "Evergreen"
if ($Null -eq $Installed) {
    Install-Module -Name "Evergreen"
}
elseif ([System.Version]$Published.Version -gt [System.Version]$Installed.Version) {
    Update-Module -Name "Evergreen"
}
```

## リポジトリから手動でインストールする

モジュールを含む [GitHub ソース リポジトリ](https://github.com/eucpilots/evergreen-module)の `Evergreen` フォルダーをダウンロードできます。フォルダーを PowerShell モジュール パスのいずれかにコピーします。利用可能な PowerShell モジュール パスの一覧を表示するには、PowerShell コンソールで `$env:PSModulePath.split(';')` を実行します。

一般的な PowerShell モジュール パスは次のとおりです。

* 現在のユーザー: `%USERPROFILE%\Documents\WindowsPowerShell\Modules\`
* すべてのユーザー: `%ProgramFiles%\WindowsPowerShell\Modules\`
* OneDrive: `$env:OneDrive\Documents\WindowsPowerShell\Modules\`

リポジトリからインストールするには、次の手順を実行します。

1. `main branch` をワークステーションにダウンロードします
2. Evergreen フォルダーの内容を、ワークステーション上の任意の PowerShell モジュール パスにコピーします
3. 管理者として実行するオプションを使って PowerShell コンソールを開きます
4. `RemoteSigned` または `Bypass` パラメーターを指定して `Set-ExecutionPolicy` を実行します
5. `Get-ChildItem -Path <path to module> -Recurse | Unblock-File` でファイルのブロックを解除します

インストールが完了したら、`Get-Module -ListAvailable Evergreen` を実行してモジュールが存在することを確認できます。モジュールを使用するには、次のように読み込みます。

```powershell
Import-Module Evergreen
```
