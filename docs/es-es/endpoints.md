---
layout: doc
---
# Recuperar los puntos de conexión que usa Evergreen

La API de Evergreen puede devolver las URL de los puntos de conexión que usa para recuperar la versión y los detalles de descarga de las aplicaciones, así como las URL necesarias para descargar los instaladores.

La lista de puntos de conexión se puede importar a sistemas de firewall o servidor proxy en los que se necesite una lista de permitidos antes de usar Evergreen para descargar instaladores. Todos los puntos de conexión se acceden mediante TCP 80 o 443.

## Get-EvergreenEndpointFromApi

`Get-EvergreenEndpointFromApi` simplifica el uso de la API al devolver todos los puntos de conexión que usa Evergreen en un solo objeto. Si se ejecuta sin parámetros, devuelve una lista completa de los puntos de conexión y puertos de todas las aplicaciones.

```powershell
PS C:\> Get-EvergreenEndpointFromApi

Application          Endpoints                                                                              Ports
-----------          ---------                                                                              -----
1Password            {1password.com, app-updates.agilebits.com, downloads.1password.com, cdn.agilebits.com} {443}
1Password7           {1password.com, c.1password.com}                                                       {443}
1PasswordCLI         {app-updates.agilebits.com, cache.agilebits.com, developer.1password.com}              {443}
7zip                 {nchc.dl.sourceforge.net, sourceforge.net, www.7-zip.org, versaweb.dl.sourceforge.net} {443}
7ZipZS               {api.github.com, mcmilk.de, github.com}                                                {443}
AdobeAcrobat         {ardownload2.adobe.com, armmf.adobe.com, helpx.adobe.com}                              {443}
AdobeAcrobatDC       {ardownload2.adobe.com, rdc.adobe.io, www.adobe.com}                                   {443}
AdobeAcrobatProStdDC {helpx.adobe.com, rdc.adobe.io, trials.adobe.com}                                      {443}
AdobeAcrobatReaderDC {acrobat.adobe.com, rdc.adobe.io, ardownload2.adobe.com}                               {443}
AdobeBrackets        {brackets.io, api.github.com, github.com}                                              {80, 443}
```

`Get-EvergreenEndpointFromApi` puede devolver los puntos de conexión de una aplicación o de una matriz de aplicaciones mediante el parámetro `-Name`. En el ejemplo siguiente, se usa para devolver los puntos de conexión y puertos de Microsoft Teams y Microsoft Edge.

```powershell
PS C:\> Get-EvergreenEndpointFromApi -Name "MicrosoftTeams", "MicrosoftEdge"

Application    Endpoints                                                                              Ports
-----------    ---------                                                                              -----
MicrosoftEdge  {edgeupdates.microsoft.com, www.microsoft.com, msedge.sf.dl.delivery.mp.microsoft.com} {443}
MicrosoftTeams {config.teams.microsoft.com, www.microsoft.com, statics.teams.cdn.office.net}          {443}
```

### Devolver una lista sencilla de todos los puntos de conexión

La salida de `Get-EvergreenEndpointFromApi` se puede filtrar para crear una lista sencilla de todas las URL de puntos de conexión únicas. El comando siguiente genera una matriz de URL que se puede usar como lista de permitidos con todos los puntos de conexión necesarios para Evergreen.

```powershell
PS C:\> Get-EvergreenEndpointFromApi | Select-Object -ExpandProperty "Endpoints" -Unique
```

### Convertir la salida a CSV

El código siguiente convierte la salida de `Get-EvergreenEndpointFromApi` en un archivo CSV. El archivo incluirá el nombre de la aplicación, las URL de los puntos de conexión en una lista separada por comas y los puertos en otra lista separada por comas.

```powershell
$Path = "./Endpoints.csv"
Get-EvergreenEndpointFromApi | ForEach-Object {
    [PSCustomObject]@{
        Application = $_.Application
        Endpoints   = $_.Endpoints -join ","
        Ports       = $_.Ports -join ","
    }
} | Export-Csv -Path $Path -NoTypeInformation -Encoding "Utf8" -Append
```

## Uso de la API

La API proporciona dos listas de puntos de conexión: las URL que Evergreen usa para determinar las versiones y descargas de aplicaciones, y las URL que usa para descargar los instaladores.

::: warning **Se requiere un agente de usuario personalizado**.
Los agentes de usuario predeterminados de la mayoría de las herramientas se bloquearán para reducir el uso abusivo de la API. Cuando use herramientas como PowerShell, wget o curl, especifique un agente de usuario personalizado que ayude a diagnosticar problemas e identificar quién usa la API (los datos de registro no se hacen públicos). Por ejemplo, especifique un agente de usuario con el formato «nombre de empresa/ubicación» o similar.
:::

### Devolver una lista de las URL que se usan para determinar las versiones de las aplicaciones

El módulo de PowerShell Evergreen usa la lista de URL que sirven para determinar las versiones de las aplicaciones. Esta información ya está disponible en la API de Evergreen y no es necesaria si usa el punto de conexión `/app/{appName}` de la API para buscar versiones e instaladores. La lista de URL se actualizará a medida que se actualicen las aplicaciones compatibles con Evergreen.

Este es un ejemplo de uso de `Invoke-RestMethod` para devolver la lista de URL que Evergreen usa para determinar las versiones de las aplicaciones:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Devolver una lista de las URL que se usan para descargar instaladores

Esta lista de URL se usa al descargar los instaladores de aplicaciones identificados por Evergreen. Debería permanecer prácticamente estática, aunque puede cambiar para algunas aplicaciones. Por ejemplo, `Get-EvergreenApp -Name "VideoLanVlcPlayer` devuelve una lista de URL de descarga basada en la lista de réplicas que proporciona VLC.

Este es un ejemplo de uso de `Invoke-RestMethod` para devolver la lista de URL que Evergreen usa al descargar instaladores con `Save-EvergreenApp`:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/downloads" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Salida

La salida de ambos puntos de conexión está en formato JSON: devuelve tanto el nombre de la aplicación (una cadena) como los puntos de conexión (una matriz) de esa aplicación. A continuación se muestra un ejemplo filtrado para Microsoft Edge:

```json
{
    "Application": "MicrosoftEdge",
    "Endpoints": [
        "msedge.sf.dl.delivery.mp.microsoft.com"
    ],
    "Ports": [
        "443"
    ]
}
```

Si usa PowerShell, emplee `Invoke-RestMethod` para devolver un objeto con las aplicaciones y los puntos de conexión:

```powershell
$Endpoints = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Endpoints | Where-Object { $_.Application -eq "MicrosoftEdge" }

Application   Endpoints                                      Ports
-----------   ---------                                      -----
MicrosoftEdge {edgeupdates.microsoft.com, www.microsoft.com} {443}
```
