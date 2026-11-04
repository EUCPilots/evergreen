---
layout: doc
---
# サポート対象のアプリケーションを検索する

## Find-EvergreenApp を使う

`Find-EvergreenApp` は、Evergreen がサポートするアプリケーションの一覧を返します。たとえば、Microsoft FSLogix Apps エージェントが Evergreen でサポートされているか確認してみましょう。

```powershell
Find-EvergreenApp -Name "FSLogix"
```

Microsoft FSLogix Apps エージェントは Evergreen でサポートされているため、次のような出力が返されます。

```powershell
Name        : MicrosoftFSLogixApps
Application : Microsoft FSLogix Apps
Link        : https://docs.microsoft.com/fslogix/
```

`Name` プロパティの値を `Get-EvergreenApp` で使用すると、Microsoft FSLogix Apps エージェントの最新情報を取得できます。

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

また、`Find-EvergreenApp` の出力をそのまま `Get-EvergreenApp` に渡すこともできます。

```powershell
Find-EvergreenApp -Name "FSLogix" | Get-EvergreenApp
```

次のコマンドを使うと、`Find-EvergreenApp` の出力をページ単位で表示し、サポート対象アプリケーションの一覧全体を確認できます。

```powershell
Find-EvergreenApp | Out-Host -Paging
```

## 出力

`Find-EvergreenApp` は次の 3 つのプロパティを出力します。

* `Name` - サポート対象アプリケーションの識別子です。アプリケーション マニフェストで使われる名前と一致します
* `Application` - アプリケーション マニフェストに含まれる正式なアプリケーション名です
* `Link` - 各アプリケーション マニフェストには、そのアプリケーションの公式ホームページの URL が含まれます

`Find-EvergreenApp` の出力例を示します。

```powershell
Name                 Application             Link
----                 -----------             ----
1Password            1Password               https://1password.com/
7zip                 7zip                    https://www.7-zip.org/
AdobeAcrobat         Adobe Acrobat           https://helpx.adobe.com/au/enterprise/using/deploying-acrobat.html
AdobeAcrobatReaderDC Adobe Acrobat Reader DC https://acrobat.adobe.com/us/en/acrobat/pdf-reader.html
AdobeBrackets        Adobe Brackets          http://brackets.io/
```

## パラメーター

### Name

`-Name` パラメーターは、詳細を取得するアプリケーション名を指定します。このパラメーターは必須です。サポート対象のアプリケーション一覧は `Find-EvergreenApp` で確認できます。

## エイリアス

サポート対象のアプリケーションを簡単に取得できるように、`Find-EvergreenApp` には `fea` エイリアスがあります。例:

```powershell
PS /Users/aaron> fea

Name      Application   Link
----      -----------   ----
1Password 1Password     https://1password.com/
7zip      7zip          https://www.7-zip.org/
```
