---
layout: doc
---
# Solución de problemas

## Esperar y volver a intentarlo

Los problemas más comunes que observamos son transitorios: como Evergreen consulta las fuentes al ejecutar `Get-EvergreenApp`, los resultados pueden verse afectados por cualquier elemento entre usted y la fuente de datos del proveedor de la aplicación. El problema podría deberse a la red o al DNS, o a cambios que el proveedor haya realizado.

Si encuentra un problema, espere una hora e inténtelo de nuevo.

## Errores de funciones

Si se produce un error al devolver los detalles de una aplicación existente, vuelva a ejecutar `Get-EvergreenApp` con el parámetro `-Verbose`. Se mostrarán más detalles, que deberían indicar dónde falla la solicitud.

En la mayoría de los casos, el problema se debe a que las ubicaciones de origen del proveedor no están disponibles temporalmente (y deberían volver a estarlo) o han cambiado, lo que puede requerir una actualización del módulo.

### Ejemplo: MicrosoftWvdInfraAgent

En este ejemplo, observamos que la llamada a `MicrosoftWvdInfraAgent` genera un error HTTP 503. Al ejecutar el comando más tarde ese mismo día, la solicitud se completó correctamente. El problema estaba en la fuente del proveedor y se resolvió sin que tuviéramos que hacer nada.

```powershell
Get-EvergreenApp -Name "MicrosoftWvdInfraAgent"

Invoke-EvergreenWebRequest : Invoke-EvergreenWebRequest: The remote server returned an error: (503) Server Unavailable..
At C:\projects\evergreen\Evergreen\Apps\Get-MicrosoftWvdInfraAgent.ps1:25 char:16
+     $Content = Invoke-EvergreenWebRequest @params
+                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Write-Error], WriteErrorException
    + FullyQualifiedErrorId : Microsoft.PowerShell.Commands.WriteErrorException,Invoke-EvergreenWebRequest
```

### Ejemplo: MicrosoftWvdMultimediaRedirection

En este ejemplo, se vuelve a producir un error HTTP 503, así que probablemente la ubicación de origen no esté disponible.

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

Si ejecutamos el mismo comando con el parámetro `-Verbose`, se mostrarán más detalles.

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

### Ejemplo: Zoom

En el siguiente ejemplo, vamos a obtener los detalles de `Zoom` con el parámetro `-Verbose`, que nos permitirá ver qué hace Evergreen para recuperar los detalles de Zoom:

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

En esta solicitud se observa un problema en `https://zoom.us/client/latest/ZoomRooms.exe`. Al validar esta URL en el navegador o con `Invoke-WebRequest`, vemos que la fuente no está disponible. Es posible que el proveedor la haya cambiado temporalmente, por lo que Evergreen volverá a funcionar cuando se restablezca. Si el proveedor cambió la ubicación de forma permanente, Evergreen deberá actualizarse para usar las nuevas ubicaciones.

## Errores de salida

### Suprimir errores y advertencias

Algunas funciones pueden generar errores y advertencias, pero aun así devolver información de versiones de aplicaciones. En el siguiente ejemplo, `MicrosoftWvdRemoteDesktop` devuelve datos, pero también genera varias advertencias:

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

Estas advertencias se pueden suprimir con el parámetro `-WarningAction`:

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" -ErrorAction "SilentlyContinue" -WarningAction "SilentlyContinue"
```

### Salida inesperada

Si una función genera una salida claramente incorrecta, debería [registrar un problema](https://github.com/eucpilots/evergreen-module/issues).

Lo que puede ser más habitual es filtrar la salida de forma incorrecta y no obtener el resultado esperado. A continuación se muestra un ejemplo de salida de `MicrosoftWvdRemoteDesktop`, que tiene varias versiones con distintas propiedades. Si se muestra la salida sin filtros, aparecerán todas las versiones y propiedades:

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

Para devolver una sola versión, podemos filtrar la salida con `Where-Object`. Es importante usar la sintaxis correcta y el valor esperado de cada propiedad del filtro:

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Public" }

Version      : 1.2.3317.0
Architecture : x64
Channel      : Public
Date         : 13/7/2022
Filename     : RemoteDesktop_1.2.3317.0_x64.msi
URI          : https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE518ld
```
