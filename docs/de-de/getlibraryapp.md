---
layout: doc
---
# Eine Anwendung aus einer Bibliothek installieren

Sobald eine Evergreen-Bibliothek Anwendungsdownloads enthält, können mit `Get-EvergreenAppFromLibrary` die verfügbaren Versionen einer bestimmten Anwendung abgefragt werden. Die Details der Evergreen-Bibliothek müssen mit `Get-EvergreenLibrary` abgerufen und an `Get-EvergreenAppFromLibrary` übergeben werden.

Die zurückgegebenen Anwendungsdetails enthalten die Version und den Pfad zu den Installer-Binärdateien für die Installation der Zielanwendung. Die Anwendungsdetails werden in absteigender Versionsreihenfolge zurückgegeben. Sie können daher die neueste verfügbare Version verwenden oder die Details nach einer bestimmten Version filtern.

## Beispiele

In diesem Beispiel werden mit `Get-EvergreenLibrary` Details der Zielbibliothek unter `\\server\EvergreenLibrary` abgerufen und in der Variablen `$Library` gespeichert. Anschließend wird mit `Get-EvergreenAppFromLibrary` in der Bibliothek nach Microsoft Visual Studio Code gesucht.

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

Diese Syntax lässt sich vereinfachen, indem die Details der Evergreen-Bibliothek unter `\\server\EvergreenLibrary` per Pipeline an `Get-EvergreenAppFromLibrary` übergeben werden, um Details zu Microsoft Visual Studio Code abzurufen.

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

Mit den aus einer Evergreen-Bibliothek abgerufenen Anwendungsinformationen kann in einem Skript die neueste verfügbare Version von Microsoft Visual Studio Code installiert werden:

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

Wenn statt der neuesten Version eine bestimmte Version von Visual Studio Code installiert werden soll, kann diese vor der Installation ausgewählt werden:

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
