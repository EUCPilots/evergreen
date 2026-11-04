---
layout: doc
---
# アプリケーションの詳細を取得する

## Get-EvergreenApp を使う

`Get-EvergreenApp` は `-Name` パラメーターでアプリケーションを指定して、その詳細を返します。

たとえば、Microsoft FSLogix Apps エージェントの最新バージョンを取得してみましょう。

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

アプリケーションのバージョン番号とダウンロード URL を一覧表示する、次のような出力が返されます。このアプリケーションの出力にはリリース日も含まれます。

```powershell
Version : 2.9.7979.62170
Date    : 9/11/2021
Channel : Production
URI     : https://download.microsoft.com/download/3/f/7/3f755dbd-debe-46d4-811c-3e7c87bc4408/FSLogix_Apps_2.9.7979.62170.zip
```

出力のすべてのプロパティは文字列であり、他の関数やコマンドレットで処理できます。`Where-Object` を使って出力を絞り込むこともできます。

## 出力

各 Evergreen アプリケーションは、パイプラインに送るオブジェクトに少なくとも 2 つのプロパティを返します。

* `Version` - アプリケーションのバージョン番号を示す文字列プロパティです。バージョン型が必要な場合は `[System.Version]` にキャストしてください
* `URI` - アプリケーションの最新バージョンのダウンロード先を示す文字列プロパティです。インストーラーは通常、`exe` や `msi` などの一般公開された Windows インストーラー形式で提供されます。インストール前に展開が必要な `zip` など、別の形式の場合もあります

::: tip 出力について
ベンダーごとに標準的な出力形式がなく、同じベンダーのアプリケーション間でも形式が異なる場合があります。そのため、Evergreen はすべてのアプリケーションで同じデータを返せず、返されるデータはアプリケーションによって異なることがあります。
:::

多くのアプリケーションは、出力に追加のプロパティを含みます。これらのプロパティで絞り込みが必要になる場合があります。

* `Architecture` - インストーラーのプロセッサ アーキテクチャ
* `Type` - アプリケーションが返すインストーラーのダウンロード形式。`exe`、`msi`、`zip` など。場合によっては `Type` が異なるデータを返すことがあります
* `Ring`、`Channel`、`Release` - 一部のアプリケーションでは、エンタープライズ用途向けに異なるリリース リングやチャネルが含まれます。このプロパティの値はアプリケーションごとに異なることがよくあります
* `Language` - アプリケーション インストーラーが特定の言語に対応している場合に含まれます
* `Date` - Evergreen が返したバージョンのリリース日を取得できる場合に含まれます

## 出力の使用方法

出力を使って Microsoft Teams の最新バージョンをダウンロードし、対象の場所にコピーしたり、現在のシステムに直接インストールしたりできます。次のコマンドは `Get-EvergreenApp -Name MicrosoftTeams` の出力を絞り込んで最新バージョンとダウンロード情報を取得し、`Save-EvergreenApp` でインストーラーをダウンロードした後、`msiexec` を使って VDI 対応の構成で Teams をインストールします。

```powershell
$Teams = Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
$TeamsInstaller = $Teams | Save-EvergreenApp -Path "C:\Temp\Teams"
& "$env:SystemRoot\System32\msiexec.exe" "/package $($TeamsInstaller.FullName) ALLUSER=1 ALLUSERS=1 /quiet"
```

## パラメーター

### Name

`-Name` パラメーターは、詳細を取得するアプリケーション名を指定します。このパラメーターは必須です。サポート対象のアプリケーション一覧は `Find-EvergreenApp` で確認できます。

### Verbose

`-Verbose` パラメーターを使うと、アプリケーションの詳細をどこから取得したか（アプリケーション更新 URL など）を確認できます。また、期待する詳細が返されない場合のトラブルシューティングにも役立ちます。

## エイリアス

アプリケーションの詳細を簡単に取得できるように、`Get-EvergreenApp` には `gea` エイリアスがあります。例:

```powershell
PS /Users/aaron> gea Slack

Version      : 4.14.0
Platform     : PerMachine
Architecture : x64
URI          : https://downloads.slack-edge.com/releases/windows/4.14.0/prod/x64/slack-standalone-4.14.0.0.msi
```
