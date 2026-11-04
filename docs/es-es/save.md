---
layout: doc
---
# Descargar instaladores

Evergreen incluye la función `Save-EvergreenApp`, que simplifica la descarga de los instaladores de aplicaciones devueltos por `Get-EvergreenApp`.

Todas las aplicaciones devuelven como mínimo las propiedades `Version` y `URI`, y muchas devuelven otras propiedades como `Architecture`, `Language`, `Type`, `Ring`, `Channel` y `Release`. El nombre del archivo del instalador suele determinarse dinámicamente a partir de la propiedad `URI`.

Para recuperar y descargar un instalador sin `Save-EvergreenApp`, filtre la salida para obtener la descarga necesaria, determine el nombre del archivo y use `Invoke-WebRequest`:

```powershell
$Teams = Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
$TeamsInstaller = Split-Path -Path $Teams.Uri -Leaf
Invoke-WebRequest -Uri $Teams.Uri -OutFile ".\$TeamsInstaller" -UseBasicParsing
```

Este es un ejemplo sencillo, pero las aplicaciones con propiedades y valores de salida adicionales pueden requerir filtros más complejos. Por ejemplo, Microsoft Edge incluye varias propiedades en el objeto devuelto:

```powershell
Version      : 89.0.774.68
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 1/4/2021 7:29:00 pm
Hash         : 6E1856B2972688D109F550B0A62C264E9829FF1F392E3BE0FC308900AEFD3455
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/a67b9c83-1671-45ab-982f-e02318eeffc9/MicrosoftEdgeEnterpriseX64.msi
```

`Save-EvergreenApp` acepta la salida de cada aplicación y simplifica la descarga de los instaladores incluidos en un objeto de aplicación: determina el nombre del archivo de destino y construye una ruta al directorio de destino a partir de las propiedades presentes en la salida.

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive | Save-EvergreenApp -Path "C:\Apps\OneDrive"
```

Con `-Path`, `Save-EvergreenApp` crea una estructura de carpetas dentro de la ruta especificada usando, en este orden, las propiedades que estén presentes en cada objeto de aplicación: `Product`, `Track`, `Channel`, `Release`, `Ring`, `Version`, `Language` y `Architecture`.

`Save-EvergreenApp` devuelve la ruta de cada archivo descargado, que se puede pasar a otras funciones de un script.

En el ejemplo anterior con `MicrosoftOneDrive`, `Save-EvergreenApp` devuelve una salida similar a esta:

```powershell
Path
----
C:\Apps\OneDrive\Enterprise\20.169.0823.0008\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.030.0211.0002\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.052.0314.0001\OneDriveSetup.exe
C:\Apps\OneDrive\Insider\21.056.0318.0001\OneDriveSetup.exe
```

Para descargar los instaladores en un solo directorio, se puede usar el parámetro `-CustomPath`. Tenga en cuenta que un objeto de aplicación puede devolver varias versiones o canales con el mismo nombre de instalador: al usar `-CustomPath`, se guarda el primer instalador y se omiten los siguientes que tengan el mismo nombre.

::: tip
Si el objeto pasado a `Save-EvergreenApp` incluye varios instaladores con el mismo nombre de archivo, la función solo descarga el primero.
:::

Por tanto, al usar `-CustomPath`, es recomendable filtrar la salida de `Get-EvergreenApp` antes de pasarla a `Save-EvergreenApp`. Por ejemplo:

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive |
    Where-Object { $_.Ring -eq "Enterprise" -and $_.Architecture -eq "AMD64" -and $_.Type -eq "exe" } |
    Save-EvergreenApp -CustomPath "C:\Apps\OneDrive"
```

## Parámetros

### InputObject

Objeto de aplicación con una propiedad `URI`. Al usar `-Path`, el objeto también debe incluir una propiedad `Version`.

### Path

Directorio principal bajo el que se creará una estructura de directorios y se guardarán los instaladores. Use `-Path` o `-CustomPath`, pero no ambos.

### CustomPath

Directorio en el que se guardarán directamente los instaladores, sin subdirectorios. Use `-CustomPath` o `-Path`, pero no ambos.

### NoProgress

`Save-EvergreenApp` usa `Invoke-WebRequest` para descargar los instaladores de las aplicaciones de destino. De forma predeterminada, se oculta el progreso de descarga para agilizarla; sin embargo, si se usa `-Verbose`, se muestra. Use `-NoProgress` junto con `-Verbose` para ocultar el progreso de descarga y mostrar a la vez la salida detallada.

### -Force

Obliga a esta función a descargar los instaladores de destino desde la propiedad URI, aunque ya existan en el directorio de destino.

### -VerifyChecksum

Valida las sumas de comprobación `SHA1`, `SHA256` y `SHA512` del objeto de entrada comparándolas con el archivo descargado o existente. No se devuelven los archivos cuyas sumas no coinciden.

### Opciones de reintento

Las descargas se reintentan ante fallos de red transitorios y respuestas HTTP que admiten reintentos. De forma predeterminada, se hacen tres reintentos tras el intento inicial (`-RetryCount 3`), con una espera inicial de dos segundos (`-RetryDelaySeconds 2`) y una espera máxima de 300 segundos (`-MaximumRetryDelaySeconds 300`). Las esperas aumentan exponencialmente y se respeta el encabezado `Retry-After` del servidor hasta alcanzar la espera máxima.

### Opciones de tiempo de espera

`-ConnectionTimeoutSeconds` establece el tiempo de espera de conexión, que es de 30 segundos de forma predeterminada. `-OperationTimeoutSeconds` establece el tiempo de espera entre lecturas de datos, que es de 300 segundos de forma predeterminada; `Invoke-WebRequest` lo admite en PowerShell 7.4 y versiones posteriores.

## Alias

`Save-EvergreenApp` tiene el alias `sea`, que simplifica la descarga de aplicaciones. Por ejemplo:

```powershell
PS /Users/aaron> gea Slack | sea -Path /Users/aaron/Temp/Slack
```
