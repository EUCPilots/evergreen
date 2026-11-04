---
layout: doc
---
# トラブルシューティング

## 時間をおいて再試行する

よく発生する問題のほとんどは一時的なものです。`Get-EvergreenApp` を実行した時点で Evergreen が更新情報を取得するため、ユーザーとアプリケーション ベンダーのデータ ソース間にある要因が結果に影響する可能性があります。ネットワークや DNS の問題、またはベンダー側の変更が原因となることがあります。

問題が発生した場合は、1 時間ほど待ってから再試行してください。

## 関数のエラー

既存のアプリケーションの詳細を取得する際にエラーが発生した場合は、`-Verbose` パラメーターを付けて `Get-EvergreenApp` を再実行してください。追加情報が表示され、リクエストがどこで失敗しているかを把握する手がかりになります。

多くの場合、ベンダーのソースの一時的な利用不可（通常は後で解消します）、またはソースの変更が原因です。ソースが変更された場合はモジュールの更新が必要になることがあります。

### 例 - MicrosoftWvdInfraAgent

この例では、`MicrosoftWvdInfraAgent` を呼び出すと HTTP 503 エラーが発生しています。同じ日の後の時間帯にコマンドを実行すると、リクエストは成功しました。これはベンダーのソースに関する問題で、追加の操作を行うことなく解消されました。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdInfraAgent"

Invoke-EvergreenWebRequest : Invoke-EvergreenWebRequest: The remote server returned an error: (503) Server Unavailable..
At C:\projects\evergreen\Evergreen\Apps\Get-MicrosoftWvdInfraAgent.ps1:25 char:16
+     $Content = Invoke-EvergreenWebRequest @params
+                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Write-Error], WriteErrorException
    + FullyQualifiedErrorId : Microsoft.PowerShell.Commands.WriteErrorException,Invoke-EvergreenWebRequest
```

### 例 - MicrosoftWvdMultimediaRedirection

この例でも HTTP 503 エラーが発生しているため、ソースの場所を利用できない可能性があります。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdMultimediaRedirection"

WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1:25
Line |
  25 |      $Content = Invoke-EvergreenWebRequest @params
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: Response status code does not indicate success: 503 (Service Unavailable)..

WARNING: Get-MicrosoftWvdMultimediaRedirection: Failed to return a header from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
Exception: /Users/aaron/projects/evergreen/Evergreen/Public/Get-EvergreenApp.ps1:80
Line |
  80 |                  throw "Failed to capture output from: Get-$Name."
     |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Failed to capture output from: Get-MicrosoftWvdMultimediaRedirection.
```

同じコマンドを `-Verbose` パラメーター付きで実行すると、さらに詳しい情報が表示されます。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdMultimediaRedirection" -Verbose

VERBOSE: Function path: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1
VERBOSE: Function exists: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1.
VERBOSE: Dot sourcing: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1.
VERBOSE: Get-FunctionResource: read application resource strings from [/Users/aaron/projects/evergreen/Evergreen/Manifests/MicrosoftWvdMultimediaRedirection.json]
VERBOSE: Calling: Get-MicrosoftWvdMultimediaRedirection.
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [Method: Head].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [UserAgent: Mozilla/5.0 (Macintosh; Darwin 21.5.0 Darwin Kernel Version 21.5.0: Tue Apr 26 21:08:29 PDT 2022; root:xnu-8020.121.3~4/RELEASE_ARM64_T8101; en-AU) AppleWebKit/534.6 (KHTML, like Gecko) Chrome/7.0.500.0 Safari/534.6].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [UseBasicParsing: True].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [Uri: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF].
VERBOSE: HEAD with 0-byte payload
VERBOSE: received 175-byte response of content type text/html
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1:25
Line |
  25 |      $Content = Invoke-EvergreenWebRequest @params
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: Response status code does not indicate success: 503 (Service Unavailable)..

WARNING: Get-MicrosoftWvdMultimediaRedirection: Failed to return a header from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
Exception: /Users/aaron/projects/evergreen/Evergreen/Public/Get-EvergreenApp.ps1:80
Line |
  80 |                  throw "Failed to capture output from: Get-$Name."
     |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Failed to capture output from: Get-MicrosoftWvdMultimediaRedirection.
```

### 例 - Zoom

次の例では、`-Verbose` パラメーターを使って `Zoom` の詳細を取得します。Zoom の情報を取得する際に Evergreen が実行している処理を確認できます。

```powershell
Get-EvergreenApp -Name "Zoom" -Verbose

VERBOSE: Get-EvergreenApp: Function exists: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
VERBOSE: Get-EvergreenApp: Dot sourcing: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
VERBOSE: Get-EvergreenApp: Calling: Get-Zoom.
VERBOSE: Get-FunctionResource: read application resource strings from [/Users/aaron/Projects/evergreen/Evergreen/Manifests/Zoom.json]
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomCitrixHDXMediaPlugin.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomCitrixHDXMediaPlugin.msi?_x_zm_rtaid=1ntgQ-l3TsyzTXmWzDs59w.1625872867055.20bd6639bacc03053f5e85d49d21fc77&_x_zm_rhtaid=731].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomInstaller.exe.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.1.543/ZoomInstaller.exe].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomOutlookPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.0.64/ZoomOutlookPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomNotesPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.0.65/ZoomNotesPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomInstallerFull.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.1.543/ZoomInstallerFull.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomRooms.exe.
WARNING: Resolve-SystemNetWebRequest: Error at URI: https://zoom.us/client/latest/ZoomRooms.exe.
WARNING: Resolve-SystemNetWebRequest: Response:  -
WARNING: Resolve-SystemNetWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
VERBOSE: Get-Zoom: Setting fallback URL to: https://eucpilots.com/evergreen/issues/.
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomLyncPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.2.44882.0827/ZoomLyncPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomVmwareMediaPlugin.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomVmwareMediaPlugin.msi?_x_zm_rtaid=kow6DBRDQhO8sS9-JyHTDQ.1625872876745.f65b9ac6613cb7a22686fc40291be0bf&_x_zm_rhtaid=705].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomInstallerVDI.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomInstallerVDI.msi?_x_zm_rtaid=EiXK_i85Qnyxl0PnXE6ITg.1625872878653.8a666f93edfe18920e810d72dadd4246&_x_zm_rhtaid=751].
VERBOSE: Get-EvergreenApp: Output result from: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
```

このリクエストでは、`https://zoom.us/client/latest/ZoomRooms.exe` で問題が発生しています。ブラウザーまたは `Invoke-WebRequest` でこの URL を確認すると、ソースを利用できないことがわかります。ベンダーが一時的にソースを移動した可能性があり、ソースが再び利用可能になれば Evergreen は動作します。ベンダーがソースの場所を恒久的に変更した場合は、新しいソースの場所を使うため Evergreen の更新が必要です。

## 出力エラー

### エラーと警告を抑制する

一部の関数はエラーや警告を出力しながら、アプリケーションのバージョン情報を返すことがあります。次の例では `MicrosoftWvdRemoteDesktop` がデータを返していますが、複数の警告も出力しています。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop"

WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
```

これらの警告は `-WarningAction` パラメーターで抑制できます。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" -ErrorAction "SilentlyContinue" -WarningAction "SilentlyContinue"
```

### 想定外の出力

関数が明らかに誤った出力を返す場合は、[問題を報告](https://github.com/eucpilots/evergreen-module/issues)してください。

より一般的なのは、出力の絞り込みが正しくなく、期待した結果が得られないケースです。次は複数のリリースとプロパティを持つ `MicrosoftWvdRemoteDesktop` の出力例です。絞り込まずに表示すると、すべてのリリースとプロパティが表示されます。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" | Format-Table

Version    Architecture Channel Date      Filename                           URI
-------    ------------ ------- ----      --------                           ---
1.2.3401.0 ARM64        Insider Unknown   RemoteDesktop_1.2.3401.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9
1.2.3401.0 x64          Insider 19/7/2022 RemoteDesktop_1.2.3401.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy5
1.2.3401.0 x86          Insider Unknown   RemoteDesktop_1.2.3401.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7
1.2.3401.0 ARM64        Dogfood Unknown   RemoteDesktop_1.2.3401.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9
1.2.3401.0 x64          Dogfood 19/7/2022 RemoteDesktop_1.2.3401.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy5
1.2.3401.0 x86          Dogfood Unknown   RemoteDesktop_1.2.3401.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7
1.2.3317.0 ARM64        Public  13/7/2022 RemoteDesktop_1.2.3317.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50W7e
1.2.3317.0 x64          Public  13/7/2022 RemoteDesktop_1.2.3317.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE518ld
1.2.3317.0 x86          Public  13/7/2022 RemoteDesktop_1.2.3317.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50W7f
```

1 つのリリースだけを返すには `Where-Object` で出力を絞り込みます。フィルターの構文が正しく、各プロパティに対して想定される値を指定していることを確認してください。

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Public" }

Version      : 1.2.3317.0
Architecture : x64
Channel      : Public
Date         : 13/7/2022
Filename     : RemoteDesktop_1.2.3317.0_x64.msi
URI          : https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE518ld
```
