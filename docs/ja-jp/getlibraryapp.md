---
layout: doc
---
# ライブラリからアプリケーションをインストールする

Evergreen ライブラリにアプリケーションのダウンロードが格納されると、`Get-EvergreenAppFromLibrary` を使って特定のアプリケーションを照会し、利用可能なバージョンを取得できます。`Get-EvergreenAppFromLibrary` には、`Get-EvergreenLibrary` からライブラリの詳細を渡す必要があります。

返されるアプリケーションの詳細には、対象アプリケーションのインストールに使用するバージョンとインストーラー バイナリへのパスが含まれます。アプリケーションの詳細はバージョンの降順で返されるため、利用可能な最新バージョンを使うか、特定のバージョンに絞り込めます。

## 例

この例では、`\\server\EvergreenLibrary` にある対象ライブラリの詳細を `Get-EvergreenLibrary` で取得し、変数 `$Library` に格納します。次に `Get-EvergreenAppFromLibrary` を使って、ライブラリ内の Microsoft Visual Studio Code を検索します。

```powershell
PS C:\> $Library = Get-EvergreenLibrary -Path "\\server\EvergreenLibrary"
PS C:\> Get-EvergreenAppFromLibrary -Inventory $Library -Name "MicrosoftVisualStudioCode"

Version      : 1.74.3
URI          : https://az764295.vo.msecnd.net/stable/97dec172d3256f8ca4bfb2143f3f76b503ca0534/VSCodeSetup-x64-1.74.3.exe
Sha256       : cea32aa015116f8346e054c59497908f6da6059361c1b33d5b68059031f2dc97
Platform     : win32-x64
Path         : \\server\EvergreenLibrary\MicrosoftVisualStudioCode\Stable\1.74.3\x64\VSCodeSetup-x64-1.74.3.exe
Channel      : Stable
Architecture : x64

Version      : 1.74.0
URI          : https://az764295.vo.msecnd.net/stable/5235c6bb189b60b01b1f49062f4ffa42384f8c91/VSCodeSetup-x64-1.74.0.exe
Sha256       : fbe977aa69a1c1438d2c2b9d5525415e1fd8d97b6dbb149301a7c3bf3a84b14a
Platform     : win32-x64
Path         : \\server\EvergreenLibrary\MicrosoftVisualStudioCode\Stable\1.74.3\x64\VSCodeSetup-x64-1.74.0.exe
Channel      : Stable
Architecture : x64
```

`\\server\EvergreenLibrary` にある Evergreen ライブラリの詳細をパイプライン経由で `Get-EvergreenAppFromLibrary` に渡すと、構文を簡略化して Microsoft Visual Studio Code の詳細を取得できます。

```powershell
PS C:\> Get-EvergreenLibrary -Path "\\server\EvergreenLibrary" | Get-EvergreenAppFromLibrary -Name "MicrosoftVisualStudioCode"

Version      : 1.74.3
URI          : https://az764295.vo.msecnd.net/stable/97dec172d3256f8ca4bfb2143f3f76b503ca0534/VSCodeSetup-x64-1.74.3.exe
Sha256       : cea32aa015116f8346e054c59497908f6da6059361c1b33d5b68059031f2dc97
Platform     : win32-x64
Path         : \\server\EvergreenLibrary\MicrosoftVisualStudioCode\Stable\1.74.3\x64\VSCodeSetup-x64-1.74.3.exe
Channel      : Stable
Architecture : x64

Version      : 1.74.0
URI          : https://az764295.vo.msecnd.net/stable/5235c6bb189b60b01b1f49062f4ffa42384f8c91/VSCodeSetup-x64-1.74.0.exe
Sha256       : fbe977aa69a1c1438d2c2b9d5525415e1fd8d97b6dbb149301a7c3bf3a84b14a
Platform     : win32-x64
Path         : \\server\EvergreenLibrary\MicrosoftVisualStudioCode\Stable\1.74.3\x64\VSCodeSetup-x64-1.74.0.exe
Channel      : Stable
Architecture : x64
```

Evergreen ライブラリから返されるアプリケーション情報は、スクリプトで使用して利用可能な最新バージョン（この例では Microsoft Visual Studio Code）をインストールできます。

```powershell
$App = Get-EvergreenLibrary -Path "\\server\EvergreenLibrary" | Get-EvergreenAppFromLibrary -Name "MicrosoftVisualStudioCode" | Select-Object -First 1
$params = @{
    FilePath     = $App.Path
    ArgumentList = "/VERYSILENT /NOCLOSEAPPLICATIONS /NORESTARTAPPLICATIONS /NORESTART /SP- /SUPPRESSMSGBOXES /MERGETASKS=!runcode"
    NoNewWindow  = $true
    Wait         = $true
    PassThru     = $true
    ErrorAction  = "Continue"
}
Start-Process @params
```

最新バージョンではなく特定の Visual Studio Code バージョンをインストールするには、インストール前に対象のバージョンを選択します。

```powershell
$App = Get-EvergreenLibrary -Path "\\server\EvergreenLibrary" | Get-EvergreenAppFromLibrary -Name "MicrosoftVisualStudioCode" | Where-Object { $_.Version -eq "1.74.0" }
$params = @{
    FilePath     = $App.Path
    ArgumentList = "/VERYSILENT /NOCLOSEAPPLICATIONS /NORESTARTAPPLICATIONS /NORESTART /SP- /SUPPRESSMSGBOXES /MERGETASKS=!runcode"
    NoNewWindow  = $true
    Wait         = $true
    PassThru     = $true
    ErrorAction  = "Continue"
}
Start-Process @params
```
