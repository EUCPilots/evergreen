---
layout: doc
---
# Devolver los detalles de una aplicación

## Uso de Get-EvergreenApp

`Get-EvergreenApp` devuelve detalles de una aplicación especificando su nombre con el parámetro `-Name`.

Por ejemplo, vamos a buscar la versión más reciente del agente Microsoft FSLogix Apps:

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

Se devolverá una salida similar a la siguiente, que muestra el número de versión y la URL de descarga de la aplicación. La salida también incluye la fecha de publicación:

```powershell
Version : 2.9.7979.62170
Date    : 9/11/2021
Channel : Production
URI     : https://download.microsoft.com/download/3/f/7/3f755dbd-debe-46d4-811c-3e7c87bc4408/FSLogix_Apps_2.9.7979.62170.zip
```

Todas las propiedades de salida son cadenas que se pueden procesar con otras funciones y cmdlets, por ejemplo, filtrando la salida con `Where-Object`.

## Salida

Cada aplicación Evergreen devuelve al menos dos propiedades en el objeto que envía a la canalización:

* `Version`: propiedad de cadena que contiene el número de versión de la aplicación. Si necesita el formato de versión, conviértala con `[System.Version]`.
* `URI`: propiedad de cadena que indica la ubicación de descarga de la versión más reciente de la aplicación. Estas ubicaciones son públicas y suelen ofrecer instaladores en formatos de Windows, como `exe` y `msi`. Algunas descargas pueden estar en otros formatos, como `zip`, que deberán extraerse antes de la instalación.

::: tip Interpretar la salida
Como no hay un formato de salida estándar entre proveedores, ni siquiera para algunas aplicaciones de un mismo proveedor, Evergreen no puede devolver los mismos datos para todas las aplicaciones. Por tanto, los datos pueden variar.
:::

Algunas aplicaciones pueden incluir propiedades adicionales en la salida, que a menudo habrá que filtrar. Entre ellas:

* `Architecture`: arquitectura del procesador para la que está destinado el instalador
* `Type`: formato de descarga del instalador de una aplicación, por ejemplo `exe`, `msi` o `zip`. En algunos casos, `Type` puede devolver datos algo distintos
* `Ring`, `Channel` o `Release`: algunas aplicaciones tienen anillos o canales de versiones diferentes para uso empresarial. El valor de esta propiedad suele ser específico de la aplicación
* `Language`: algunos instaladores de aplicaciones admiten idiomas específicos
* `Date`: en algunos casos, Evergreen puede devolver la fecha de publicación de la versión

## Usar la salida

Con esta salida, podemos descargar la versión más reciente de Microsoft Teams y copiarla a una ubicación de destino o instalarla directamente en el sistema actual. Los siguientes comandos filtran `Get-EvergreenApp -Name MicrosoftTeams` para obtener la versión y descarga más recientes, descargan el instalador con `Save-EvergreenApp` y, por último, usan `msiexec` para instalar Teams en una configuración compatible con VDI:

```powershell
$Teams = Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
$TeamsInstaller = $Teams | Save-EvergreenApp -Path "C:\Temp\Teams"
& "$env:SystemRoot\System32\msiexec.exe" "/package $($TeamsInstaller.FullName) ALLUSER=1 ALLUSERS=1 /quiet"
```

## Parámetros

### Name

El parámetro `-Name` especifica el nombre de la aplicación cuyos detalles se quieren obtener. Es un parámetro obligatorio. Para ver la lista de aplicaciones compatibles, use `Find-EvergreenApp`.

### Verbose

El parámetro `-Verbose` puede ayudar a ver de dónde se obtienen los detalles de la aplicación (por ejemplo, la URL de actualización) y a diagnosticar por qué no se devuelven los detalles esperados.

## Alias

`Get-EvergreenApp` tiene el alias `gea`, que simplifica la recuperación de detalles de aplicaciones. Por ejemplo:

```powershell
PS /Users/aaron> gea Slack

Version      : 4.14.0
Platform     : PerMachine
Architecture : x64
URI          : https://downloads.slack-edge.com/releases/windows/4.14.0/prod/x64/slack-standalone-4.14.0.0.msi
```
