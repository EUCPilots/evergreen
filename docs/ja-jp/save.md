---
layout: doc
---
# インストーラーのダウンロード

Evergreen には `Save-EvergreenApp` 関数が含まれており、`Get-EvergreenApp` が返すアプリケーション インストーラーを簡単にダウンロードできます。

すべてのアプリケーションは少なくとも `Version` と `URI` プロパティを返し、多くの場合は `Architecture`、`Language`、`Type`、`Ring`、`Channel`、`Release` などの追加プロパティも返します。インストーラーのファイル名は通常、`URI` プロパティから動的に判定されます。

`Save-EvergreenApp` を使わずにアプリケーション インストーラーを取得してダウンロードするには、必要なダウンロード情報に出力を絞り込み、ファイル名を判定してから `Invoke-WebRequest` を使用します。

```powershell
$Teams = Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
$TeamsInstaller = Split-Path -Path $Teams.Uri -Leaf
Invoke-WebRequest -Uri $Teams.Uri -OutFile ".\$TeamsInstaller" -UseBasicParsing
```

これは簡単な例ですが、追加のプロパティや値を返すアプリケーションでは、より複雑な絞り込みが必要な場合があります。たとえば、Microsoft Edge は次のように複数のプロパティを含むオブジェクトを返します。

```powershell
Version      : 89.0.774.68
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 1/4/2021 7:29:00 pm
Hash         : 6E1856B2972688D109F550B0A62C264E9829FF1F392E3BE0FC308900AEFD3455
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/a67b9c83-1671-45ab-982f-e02318eeffc9/MicrosoftEdgeEnterpriseX64.msi
```

`Save-EvergreenApp` は各アプリケーションの出力を受け取ります。アプリケーション オブジェクトのプロパティを使って対象ファイル名を判定し、保存先ディレクトリのパスを作成するため、インストーラーのダウンロードを簡略化できます。

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive | Save-EvergreenApp -Path "C:\Apps\OneDrive"
```

`-Path` を指定すると、`Save-EvergreenApp` はアプリケーション オブジェクトに存在する次のプロパティを、この順番で使用して指定パスの下にフォルダー構造を作成します。`Product`、`Track`、`Channel`、`Release`、`Ring`、`Version`、`Language`、`Architecture`。

`Save-EvergreenApp` はダウンロードした各ファイルのパスを返すため、スクリプト内で他の関数に渡すことができます。

上記の `MicrosoftOneDrive` の例では、次のような出力が返されます。

```powershell
Path
----
C:\Apps\OneDrive\Enterprise\20.169.0823.0008\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.030.0211.0002\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.052.0314.0001\OneDriveSetup.exe
C:\Apps\OneDrive\Insider\21.056.0318.0001\OneDriveSetup.exe
```

アプリケーション インストーラーを 1 つのディレクトリにダウンロードするには、`-CustomPath` パラメーターを使います。アプリケーション オブジェクトが、同じインストーラー名で複数のバージョンやチャネルを返す場合があります。`-CustomPath` を使うと、最初のインストーラーが保存され、同じファイル名を持つ後続のインストーラーはスキップされます。

::: tip
オブジェクトに同じファイル名のインストーラーが複数含まれる場合、Save-EvergreenApp は関数に渡された最初のインストーラーのみをダウンロードします。
:::

そのため、`-CustomPath` を使う場合は、`Save-EvergreenApp` に渡す前に `Get-EvergreenApp` の出力を絞り込むことをお勧めします。例:

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive |
    Where-Object { $_.Ring -eq "Enterprise" -and $_.Architecture -eq "AMD64" -and $_.Type -eq "exe" } |
    Save-EvergreenApp -CustomPath "C:\Apps\OneDrive"
```

## パラメーター

### InputObject

`URI` プロパティを持つアプリケーション オブジェクトです。`-Path` を使う場合は、オブジェクトに `Version` プロパティも含まれている必要があります。

### Path

フォルダー構造を作成し、アプリケーション インストーラーを保存する親ディレクトリです。`-Path` と `-CustomPath` のいずれか一方を指定します。

### CustomPath

サブディレクトリを作成せず、インストーラーを直接保存するディレクトリです。`-CustomPath` と `-Path` のいずれか一方を指定します。

### NoProgress

`Save-EvergreenApp` は `Invoke-WebRequest` を使って対象のアプリケーション インストーラーをダウンロードします。既定ではダウンロードを高速化するため進行状況が抑制されますが、`-Verbose` を使うと進行状況が表示されます。詳細出力を表示しつつダウンロードの進行状況を抑制するには、`-Verbose` とともに `-NoProgress` を使います。

### -Force

対象ディレクトリにファイルがすでに存在する場合でも、URI プロパティから対象のアプリケーション インストーラーをダウンロードするよう強制します。

### -VerifyChecksum

入力オブジェクトの `SHA1`、`SHA256`、`SHA512` チェックサム プロパティを、ダウンロード済みまたは既存ファイルと照合して検証します。チェックサムが一致しないファイルは返されません。

### 再試行オプション

一時的なネットワーク障害や再試行可能な HTTP レスポンスが発生した場合、ダウンロードは再試行されます。既定値は初回試行後に 3 回（`-RetryCount 3`）、初期待機時間 2 秒（`-RetryDelaySeconds 2`）、最大待機時間 300 秒（`-MaximumRetryDelaySeconds 300`）です。再試行の待機時間は指数関数的に増加し、サーバーの `Retry-After` ヘッダーは最大待機時間まで尊重されます。

### タイムアウト オプション

`-ConnectionTimeoutSeconds` は接続のタイムアウトを設定し、既定値は 30 秒です。`-OperationTimeoutSeconds` はデータ読み取り間のタイムアウトを設定し、既定値は 300 秒です。このオプションは PowerShell 7.4 以降の `Invoke-WebRequest` でサポートされています。

## エイリアス

アプリケーションを簡単にダウンロードできるように、`Save-EvergreenApp` には `sea` エイリアスがあります。例:

```powershell
PS /Users/aaron> gea Slack | sea -Path /Users/aaron/Temp/Slack
```
