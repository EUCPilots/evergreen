---
layout: doc
---
# Installer une application depuis une bibliothèque

Une fois la bibliothèque Evergreen remplie de téléchargements d’applications, `Get-EvergreenAppFromLibrary` permet d’y rechercher les versions disponibles d’une application donnée. Les détails de la bibliothèque doivent être transmis à `Get-EvergreenAppFromLibrary` par `Get-EvergreenLibrary`.

Les détails renvoyés comprennent la version et le chemin d’accès aux fichiers binaires du programme d’installation. Les versions sont renvoyées dans l’ordre décroissant ; vous pouvez donc utiliser la dernière version disponible ou filtrer les détails sur une version précise.

## Exemples

Dans cet exemple, `Get-EvergreenLibrary` récupère les détails de la bibliothèque située dans `\\server\EvergreenLibrary` et les place dans la variable `$Library`. `Get-EvergreenAppFromLibrary` recherche ensuite Microsoft Visual Studio Code dans la bibliothèque.

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

Cette syntaxe peut être simplifiée en transmettant dans le pipeline les détails de la bibliothèque Evergreen située dans `\\server\EvergreenLibrary` à `Get-EvergreenAppFromLibrary` afin d’obtenir les détails de Microsoft Visual Studio Code.

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

Les informations d’application renvoyées par une bibliothèque Evergreen peuvent servir dans un script pour installer la dernière version disponible de Microsoft Visual Studio Code :

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

Pour installer une version précise de Visual Studio Code plutôt que la dernière version, sélectionnez-la avant l’installation :

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
