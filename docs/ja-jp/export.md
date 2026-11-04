---
layout: doc
---
# バージョン情報のエクスポート

`Export-EvergreenApp` を使うと、`Get-EvergreenApp` が返すアプリケーションのバージョン情報を JSON にエクスポートし、ファイルに保存できます。ソフトウェア ライブラリ内のアプリケーション バージョンの詳細を追跡する際に便利です。

次の例では、Microsoft OneDrive のアプリケーション バージョン情報を取得し、対象ディレクトリに OneDrive インストーラーを保存して、アプリケーションのバージョン情報を JSON ファイルに格納します。

```powershell
$OneDrive = Get-EvergreenApp -Name "MicrosoftOneDrive"
Save-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive"
Export-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json"
```

`Export-EvergreenApp` の `-Path` パラメーターに既存の JSON ファイルを指定すると、新しいアプリケーション バージョン情報がファイルに追加され、重複は削除されます。ファイルには次のような JSON データが含まれます。

```json
[
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "jjiooBnk6w0tEt20O1IWzT63jvuFUxpZgJDoJdpkDgg=",
    "Ring": "Enterprise",
    "Architecture": "x86"
  },
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/amd64/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "JjoeTY78Krp49KXJEyjtE1O9WSuFmFoNKECtVwKGDW8=",
    "Ring": "Enterprise",
    "Architecture": "AMD64"
  },
  {
    "Version": "22.131.0619.0001",
    "URI": "https://oneclient.sfx.ms/Win/Prod/22.131.0619.0001/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "ObZEdqfd8gn9RhzR4SkuVS+Xu4R0vye5OnAaUgRl9E4=",
    "Ring": "Production",
    "Architecture": "x86"
  }
]
```

::: tip
`Export-EvergreenApp` は、エクスポートしたファイルの日付を切り詰めません。ファイルが大きくなった場合は、別のプロセスでデータを管理する必要があります。
:::

`ConvertFrom-Json` を使うと、JSON ファイルをオブジェクトに読み戻せます。

```powershell
Get-Content -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json" | ConvertFrom-Json
```
