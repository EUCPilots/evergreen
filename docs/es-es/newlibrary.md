---
layout: doc
---
# Crear una biblioteca Evergreen

## Acerca de las bibliotecas Evergreen

Una biblioteca Evergreen es un directorio que almacena varias versiones de instaladores de aplicaciones descargados, definidos por `EvergreenLibrary.json` y recopilados mediante `Get-EvergreenApp` y `Save-EvergreenApp`.

Por lo general, Evergreen devuelve solo la versión más reciente de una aplicación. Una biblioteca Evergreen permite descargar y almacenar varias versiones de un instalador, junto con sus detalles. Así se puede instalar una versión específica de una aplicación cuando sea necesario.

## Estructura de una biblioteca Evergreen

Una biblioteca Evergreen es un directorio del sistema de archivos que contiene `EvergreenLibrary.json`, donde se definen las aplicaciones que se descargarán y almacenarán en la biblioteca. En el siguiente ejemplo, `EvergreenLibrary.json` enumera las aplicaciones y define cómo se debe filtrar la salida de `Get-EvergreenApp` para almacenar el instalador específico de cada una.

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

El filtro puede definir cualquier propiedad de un objeto de versión de aplicación, de modo que se descargue solo el tipo de instalador requerido para la biblioteca. Por ejemplo, puede tener una biblioteca con versiones de producción o publicadas de los instaladores y otra que aloje versiones preliminares.

## Crear una biblioteca Evergreen

Para crear una biblioteca Evergreen, use `New-EvergreenLibrary` y especifique una ruta local o UNC válida:

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary"
```

`New-EvergreenLibrary` crea el directorio de destino si es necesario y escribe el archivo `EvergreenLibrary.json` predeterminado si aún no existe. Use `-Name` para definir el nombre de la biblioteca en la configuración:

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary" -Name "ProductionApps"
```

La configuración predeterminada incluye versiones publicadas de 64 bits de:

* Microsoft .NET Desktop Runtime (LTS)
* Microsoft OneDrive (Production, throttle 100)
* Microsoft Edge (Stable Enterprise)
* Microsoft Edge WebView2 Runtime (Stable)
* Microsoft Teams (Enterprise)

Para personalizar la biblioteca, edite `EvergreenLibrary.json` en un editor JSON (por ejemplo, Visual Studio Code) y agregue o quite aplicaciones según sea necesario. Si el archivo ya existe, `New-EvergreenLibrary` no lo modifica.
