---
layout: doc
---
# Uso de la API de Evergreen

::: warning **La API de Evergreen se ofrece gratuitamente: úsela de forma responsable**.
La API se ofrece en el nivel gratuito de Cloudflare Workers, que permite hasta 100 000 solicitudes totales al día. Use la API con consideración para no agotar las solicitudes y que siga estando disponible para todos.
:::

La diferencia de Evergreen con respecto a otros métodos para encontrar e instalar aplicaciones es que, al usar `Get-EvergreenApp`, solo consulta fuentes oficiales de los proveedores. Así se garantiza que la información devuelta sea fiable, porque procede del proveedor y no de la comunidad.

Evergreen ofrece [una API](https://evergreen-api.stealthpuppy.com/) que devuelve la misma información de versiones de aplicaciones que `Get-EvergreenApp`. La API admite las mismas aplicaciones que el módulo Evergreen, ya que los datos se obtienen mediante el módulo. La API se ejecuta en Cloudflare Workers y sus datos se actualizan cada 24 horas.

Los datos que devuelve la API de Evergreen se pueden consultar en [Evergreen App Tracker](https://eucpilots.com/workbench/).

::: info **Notas importantes sobre la API**
* Los datos de la API se actualizan cada 24 horas. Las solicitudes demasiado frecuentes a los puntos de conexión pueden limitarse.
* La API está pensada únicamente para fines de desarrollo, no para usarse en puntos de conexión distribuidos (por ejemplo, equipos físicos que comprueban localmente si hay actualizaciones de aplicaciones).
* Si tiene problemas o quiere asegurarse de que los datos procedan únicamente del proveedor de la aplicación, use `Get-EvergreenApp`.
:::

La documentación completa de la API está disponible aquí: [evergreen-api](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/). Sin embargo, si ya conoce `Get-EvergreenApp` del módulo Evergreen, la API le resultará fácil de usar.

## Get-EvergreenAppFromApi

Evergreen incluye la función `Get-EvergreenAppFromApi`, que se usa de forma muy similar a `Get-EvergreenApp`. Esta función es más sencilla que usar `Invoke-RestMethod` y filtra automáticamente las aplicaciones disponibles. Por ejemplo, para consultar los datos de Microsoft Edge en la API, use:

```powershell
PS C:\> Get-EvergreenAppFromApi -Name "MicrosoftEdge"

Version      : 89.0.774.76
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 12/4/2021
Hash         : 9E7A29B4BE6E1CD707F80B4B79008F19D2D5DD5C774D317A493EC6DE5BE0B7D7
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/4d12f620-174c-4259-85e6-8a80ea45ff10/MicrosoftEdgeEnterpriseX64.msi
```

Esto devuelve la versión actual y las URL de descarga de Microsoft Edge mediante la API oficial de actualización de Microsoft Edge en [https://edgeupdates.microsoft.com/api/products](https://edgeupdates.microsoft.com/api/products).

Al igual que con `Get-EvergreenApp`, la salida se puede filtrar para obtener un instalador específico con `Where-Object`. El siguiente ejemplo devuelve la versión actual y la URL de descarga del canal Stable del anillo Enterprise de 64 bits de Microsoft Edge.

```powershell
Get-EvergreenAppFromApi -Name "MicrosoftEdge" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

## Uso de la API

En su versión actual, la API tiene solo cuatro puntos de conexión que admiten llamadas GET y devuelven datos en formato JSON:

* `/apps`: devuelve la lista de aplicaciones compatibles
* `/app/{appName}`: devuelve los detalles de una aplicación especificada
* `endpoints/versions`: devuelve la lista de URL de los puntos de conexión que Evergreen usa al conectarse a las fuentes de los proveedores para devolver detalles de las aplicaciones (por ejemplo, con `Get-EvergreenApp`)
* `/endpoints/downloads`: devuelve la lista de URL de los puntos de conexión que Evergreen usa para descargar los archivos binarios de las aplicaciones (por ejemplo, con `Save-EvergreenApp`)

En PowerShell, se puede consultar la API con `Invoke-RestMethod`.

::: warning **Se requiere un agente de usuario personalizado**.
Los agentes de usuario predeterminados de la mayoría de las herramientas se bloquearán para reducir el uso abusivo de la API. Cuando use herramientas como PowerShell, wget o curl, especifique un agente de usuario personalizado que ayude a diagnosticar problemas e identificar quién usa la API (los datos de registro no se hacen públicos). Por ejemplo, puede usar el formato «Aplicación/Versión (Empresa/URL)», como «App-Pipeline/1.0.0 (Contoso; https://contoso.com)», o uno similar.
:::

Devuelva la lista de aplicaciones compatibles desde `/apps`; es el equivalente a ejecutar `Find-EvergreenApp`:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/apps" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

El punto de conexión `/app/{appName}` devuelve los detalles de una aplicación específica, junto con el nombre de la aplicación compatible.

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

Los datos devueltos por la API se pueden filtrar y enviar a `Save-EvergreenApp` para descargar archivos binarios:

```powershell
$Edge = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Edge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" } | Save-EvergreenApp -Path "C:\Apps"
```

Si se pasa una aplicación desconocida al punto de conexión `/app`, se devuelve un error:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/UnsupportedApp" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
Invoke-RestMethod:                                                                                                      
{
  "message": "Application not found. Call /apps for a list of available applications.",
  "documentation": "https://eucpilots.com/evergreen/api/"
}
```
