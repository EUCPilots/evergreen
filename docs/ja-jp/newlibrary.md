---
layout: doc
---
# Evergreen ライブラリを新規作成する

## Evergreen ライブラリについて

Evergreen ライブラリは、複数バージョンのダウンロード済みアプリケーション インストーラーを保存するディレクトリです。`EvergreenLibrary.json` で定義され、`Get-EvergreenApp` と `Save-EvergreenApp` を使って情報を収集します。

Evergreen は通常、アプリケーションの最新バージョンのみを返します。Evergreen ライブラリを使うと、複数バージョンのアプリケーション インストーラーと各バージョンの詳細をダウンロードして保存できます。この機能により、必要に応じて特定のバージョンのアプリケーションをインストールできます。

## Evergreen ライブラリの構成

Evergreen ライブラリは、ダウンロードして保存するアプリケーションを定義した `EvergreenLibrary.json` を含むファイル システム上のディレクトリです。次の例では、`EvergreenLibrary.json` にアプリケーションと、特定のアプリケーション インストーラーを保存するために `Get-EvergreenApp` の出力を絞り込む方法を記述しています。

```json
{
    "Name": "EvergreenLibrary",
    "Applications": [
        {
            "Name": "Microsoft.NET",
            "EvergreenApp": "Microsoft.NET",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Installer -eq \"windowsdesktop\" -and $_.Channel -eq \"LTS\""
        },
        {
            "Name": "MicrosoftOneDrive",
            "EvergreenApp": "MicrosoftOneDrive",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Ring -eq \"Production\" -and $_.Throttle -eq \"100\""
        },
        {
            "Name": "MicrosoftEdge",
            "EvergreenApp": "MicrosoftEdge",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        },
        {
            "Name": "MicrosoftEdgeWebView2Runtime",
            "EvergreenApp": "MicrosoftEdgeWebView2Runtime",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\""
        },
        {
            "Name": "MicrosoftTeams",
            "EvergreenApp": "MicrosoftTeams",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        }
    ]
}
```

フィルターにはアプリケーション バージョン オブジェクトの任意のプロパティを指定できるため、ライブラリに必要なインストーラーの種類だけをダウンロードできます。たとえば、Production または正式リリース版のインストーラーを含むライブラリと、アプリケーションのプレビュー版インストーラーを保存する別のライブラリを作成できます。

## Evergreen ライブラリを作成する

新しい Evergreen ライブラリを作成するには、`New-EvergreenLibrary` を使って有効なローカル パスまたは UNC パスを指定します。

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary"
```

`New-EvergreenLibrary` は必要に応じて対象ディレクトリを作成し、既存でなければ既定の `EvergreenLibrary.json` を書き込みます。`-Name` を使うと、構成内のライブラリ名を設定できます。

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary" -Name "ProductionApps"
```

既定の構成には、次の 64 ビット版リリースが含まれます。

* Microsoft .NET Desktop Runtime（LTS）
* Microsoft OneDrive（Production、スロットル 100）
* Microsoft Edge（Stable Enterprise）
* Microsoft Edge WebView2 Runtime（Stable）
* Microsoft Teams（Enterprise）

ライブラリをカスタマイズするには、JSON エディター（Visual Studio Code など）で `EvergreenLibrary.json` を編集し、必要に応じてアプリケーションを追加または削除します。ファイルがすでに存在する場合、`New-EvergreenLibrary` は変更しません。
