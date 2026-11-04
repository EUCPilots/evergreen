---
layout: doc
---
# Actualizar una biblioteca Evergreen

Para actualizar una biblioteca, use `Start-EvergreenLibraryUpdate`. Esta función lee el archivo `EvergreenLibrary.json` y usa `Get-EvergreenApp` y `Save-EvergreenApp` para rellenar la biblioteca con los instaladores de aplicaciones y mantener un manifiesto con la información de versiones para futuras consultas.

Este es un ejemplo: `EvergreenLibrary.json` contiene la siguiente entrada para Microsoft Teams:

```json
{
    "Name": "MicrosoftTeams",
    "EvergreenApp": "MicrosoftTeams",
    "Filter": "$_.Ring -eq \"General\" -and $_.Architecture -eq \"x64\" -and $_.Type -eq \"msi\""
}
```

* `Name`: define la carpeta de la aplicación en la biblioteca. Puede que quiera descargar las versiones de 32 y 64 bits del instalador de Microsoft Teams.
* `EvergreenApp`: define el nombre de la aplicación compatible con Evergreen. Para ver los nombres de las aplicaciones compatibles, use `Find-EvergreenApp`.
* `Filter`: filtro que normalmente se usa con `Get-EvergreenApp | Where-Object` para filtrar la información de versiones y obtener el instalador específico de una aplicación.

En este ejemplo, el instalador de Microsoft Teams se descargará en la siguiente estructura de carpetas: `\\server\EvergreenLibrary\MicrosoftTeams\General\1.5.00.17656\x64`. Una vez descargados los instaladores, se guarda la información de versiones de la aplicación. En este ejemplo, se guardará el archivo `\\server\EvergreenLibrary\MicrosoftTeams\MicrosoftTeams.json` con los siguientes detalles:

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

Cada vez que se descarga una versión nueva del instalador de Teams, se actualiza `MicrosoftTeams.json` con la versión nueva para futuras consultas.

## Cómo actualizar una biblioteca

`Start-EvergreenLibraryUpdate` tiene un único parámetro, `-Path`, que debe contener la ruta a la biblioteca Evergreen:

```powershell
Start-EvergreenLibraryUpdate -Path "\\server\EvergreenLibrary"
```

Si se especifica una ruta que no contiene `EvergreenLibrary.json`, se genera un error.

Para descargar instaladores nuevos cuando se detecte una nueva versión, se puede ejecutar `Start-EvergreenLibraryUpdate` mediante una tarea programada u otra herramienta de automatización. Así se puede actualizar la biblioteca fácilmente y dejar las nuevas aplicaciones disponibles para instalarlas o empaquetarlas.
