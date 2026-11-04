---
layout: doc
---
# Instalar una aplicación desde una biblioteca

Una vez que una biblioteca Evergreen contiene descargas de aplicaciones, se puede consultar con `Get-EvergreenAppFromLibrary` para conocer las versiones disponibles de una aplicación concreta. Se deben pasar a `Get-EvergreenAppFromLibrary` los detalles de la biblioteca Evergreen obtenidos con `Get-EvergreenLibrary`.

Los detalles de la aplicación devueltos incluyen la versión y la ruta a los archivos binarios del instalador para instalar la aplicación de destino. Los detalles se devuelven en orden descendente de versión, por lo que se puede usar la versión más reciente disponible o filtrar para obtener una versión específica.

## Ejemplos

En este ejemplo, se obtienen los detalles de la biblioteca de destino `\\server\EvergreenLibrary` con `Get-EvergreenLibrary` y se guardan en la variable `$Library`. A continuación, se usa `Get-EvergreenAppFromLibrary` para buscar Microsoft Visual Studio Code en la biblioteca.

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

Esta sintaxis se puede simplificar pasando por la canalización a `Get-EvergreenAppFromLibrary` los detalles de la biblioteca Evergreen `\\server\EvergreenLibrary`, para obtener los detalles de Microsoft Visual Studio Code.

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

La información de una aplicación obtenida de una biblioteca Evergreen se puede usar en un script para instalar la versión disponible más reciente (en este caso) de Microsoft Visual Studio Code:

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

Si en lugar de la versión más reciente se necesita instalar una versión específica de Visual Studio Code, se puede seleccionar esa versión antes de instalar:

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
