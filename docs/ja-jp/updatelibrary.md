---
layout: doc
---
# Evergreen ライブラリを更新する

ライブラリを更新するには `Start-EvergreenLibraryUpdate` を使います。この関数は `EvergreenLibrary.json` ファイルを読み取り、`Get-EvergreenApp` と `Save-EvergreenApp` を使ってライブラリにアプリケーション インストーラーを格納し、後で参照できるようアプリケーションのバージョン情報を含むマニフェストを管理します。

次の例では、`EvergreenLibrary.json` に Microsoft Teams のエントリが含まれています。

```json
{
    "Name": "MicrosoftTeams",
    "EvergreenApp": "MicrosoftTeams",
    "Filter": "$_.Ring -eq \"General\" -and $_.Architecture -eq \"x64\" -and $_.Type -eq \"msi\""
}
```

* `Name` - ライブラリ内のアプリケーション フォルダー名を定義します。Microsoft Teams インストーラーの 32 ビット版と 64 ビット版の両方をダウンロードする場合などに、別々の名前を指定できます
* `EvergreenApp` - Evergreen がサポートするアプリケーション名を定義します。サポート対象のアプリケーション名は `Find-EvergreenApp` で確認できます
* `Filter` - 特定のアプリケーション インストーラーのバージョン情報に出力を絞り込むため、通常 `Get-EvergreenApp | Where-Object` で使うフィルターです

この例では、Microsoft Teams インストーラーは次のフォルダー構造にダウンロードされます。`\\server\EvergreenLibrary\MicrosoftTeams\General\1.5.00.17656\x64` インストーラーのダウンロードが完了すると、アプリケーションのバージョン情報が保存されます。この例では `\\server\EvergreenLibrary\MicrosoftTeams\MicrosoftTeams.json` に次の詳細が保存されます。

```json
{
  "Version": "1.5.00.17656",
  "URI": "https://statics.teams.cdn.office.net/production-windows-x64/1.5.00.17656/Teams_windows_x64.msi",
  "Type": "msi",
  "Ring": "General",
  "Path": "/Users/aaron/Temp/Evergreen/MicrosoftTeams/General/1.5.00.17656/x64/Teams_windows_x64.msi",
  "Architecture": "x64"
}
```

Teams インストーラーの新しいバージョンがダウンロードされるたびに、後で使用できるよう `MicrosoftTeams.json` が新しいバージョンで更新されます。

## ライブラリを更新する方法

`Start-EvergreenLibraryUpdate` には `-Path` パラメーターが 1 つあります。このパラメーターには Evergreen ライブラリへのパスを指定します。

```powershell
Start-EvergreenLibraryUpdate -Path "\\server\EvergreenLibrary"
```

`EvergreenLibrary.json` を含まないパスを指定すると、エラーが発生します。

新しいバージョンが検出されたときに新しいアプリケーション インストーラーをダウンロードするには、スケジュールされたタスクや他の自動化ツールから `Start-EvergreenLibraryUpdate` を実行できます。これにより、ライブラリを簡単に更新し、新しいアプリケーションをインストールやパッケージ化に使えるようになります。
