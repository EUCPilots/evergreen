---
layout: doc
---
# Problemas conocidos

## General

Si una fuente de aplicación no está disponible, el valor de la propiedad `URI` devuelta puede ser `https://eucpilots.com/evergreen/issues/`. Si se encuentra con esta situación, siga [los pasos para solucionar problemas](https://eucpilots.com/evergreen/troubleshooting/).

## Funciones públicas

### Get-EvergreenApp

Es posible que `Get-EvergreenApp` no sea totalmente compatible con servidores proxy. Este problema se corregirá en una versión futura.

## Funciones privadas

### Resolve-DnsNameWrapper

Solo es compatible con plataformas Windows. Esta función envuelve `Resolve-DnsName`, que no está disponible en PowerShell 6 o posterior para macOS o Linux. Las funciones de aplicaciones que usan esta función privada devolverán un error en plataformas que no sean Windows.

### Get-GitHubRepoRelease

`Get-GitHubRepoRelease` consulta la información de publicaciones de un repositorio de GitHub especificado para devolver versiones y archivos binarios, o para obtener el número de versión de algunas aplicaciones. De forma predeterminada, las solicitudes a la API REST de GitHub no están autenticadas y están sujetas a un límite de 60 solicitudes por hora. Si usa el parámetro `-Verbose` con `Get-EvergreenApp` para las aplicaciones que usan GitHub como fuente, se mostrará el número de solicitudes disponibles a la API.

Se admiten solicitudes autenticadas mediante las variables de entorno `GITHUB_TOKEN` o `GH_TOKEN`, que aumentan el límite a 5000 solicitudes por hora. Consulte [Trabajar con los límites de frecuencia de GitHub](/es-es/github) para obtener instrucciones de configuración.

## Funciones de aplicaciones

### AdobeAcrobat

Si Adobe publica una actualización de Acrobat/Reader DC para Windows antes que para macOS, es posible que no se devuelva la versión actual del parche. En la mayoría de los casos, Adobe mantiene ambas plataformas sincronizadas, por lo que esto debería ocurrir rara vez.

Para determinar la versión actual de la actualización de `AdobeAcrobat`, se usa la [URL de actualizaciones de macOS](https://armmf.adobe.com/arm-manifests/win/AcrobatDC/acrobat/current_version.txt). Esta permite consultar de forma sencilla el número de la versión más reciente.

::: info
La versión para Windows de Adobe Acrobat y Reader usa una URL de actualización como `https://armmf.adobe.com/arm-manifests/win/AcrobatDCManifest3.msi`, que requeriría desempaquetar y analizar el archivo MSI. Aquí se ha publicado código de ejemplo para consultar la base de datos MSI: [Los vínculos de descarga de AdobeReader no son válidos](https://github.com/eucpilots/evergreen-module/issues/312#issuecomment-1103712904). Sin embargo, este método solo funciona en hosts Windows y no es compatible con macOS ni Linux.
:::

Como alternativa, `AdobeAcrobatDC` y `AdobeAcrobatReaderDC` usan una consulta a una API web para determinar la versión actual de Adobe Acrobat Reader DC, Acrobat Standard DC y Acrobat Pro DC. Las versiones anteriores de Acrobat siguen afectadas por este problema.

### AdobeAcrobatReaderDC

Es posible que `AdobeAcrobatReaderDC` no devuelva un instalador con la [actualización más reciente](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html). Esta aplicación determina los instaladores disponibles a partir de la [página de descarga de Adobe Acrobat Reader](https://get.adobe.com/reader/). Adobe no siempre incluye de inmediato la actualización más reciente en la versión del instalador disponible para descargar.

Compruebe si `AdobeAcrobat` devuelve la versión de actualización más reciente.

### CitrixWorkspaceApp

Citrix cambia ocasionalmente la fuente de actualización de Citrix Workspace app, lo que puede hacer que el número de versión o el URI del instalador no devuelvan los datos correctos. Sospechamos que este problema puede estar relacionado con la limitación de las actualizaciones de Citrix Workspace app por parte de Citrix. Normalmente, el problema con la fuente de datos se corrige en un plazo de 72 horas.

Cuando se devuelven datos incorrectos, Evergreen genera datos similares a los siguientes:

```powershell
Version : 24.2.0.172
Title   : Citrix Workspace - LTSR
Size    : 380803896
Hash    : 7efe56e0f177cf9de336fa48daa8b6461080909fd37f7d550fd4f313221091b8
Date    : 10/4/2024
Stream  : LTSR
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.2.0.172.exe

Version : 0.0.0.0
Title   : Citrix Workspace - Current Release
Size    : 382956344
Hash    : 5c369d1c127b14a8530b7441a6d3ec49c681fe672e8447c63ecf453cf8b87237
Date    : 25/4/2024
Stream  : Current
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.3.0.93.exe
```

#### Error 404

En ocasiones, `Get-EvergreenApp -Name "CitrixWorkspaceApp"` puede fallar con el siguiente error:

```powershell
WARNING: Invoke-EvergreenRestMethod: Error at URI: https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml.
WARNING: Invoke-EvergreenRestMethod: Error encountered: Response status code does not indicate success: 404 (Not Found)..
WARNING: Invoke-EvergreenRestMethod: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
```

Esto suele ocurrir justo después de publicar una versión nueva de Workspace app y puede persistir durante algún tiempo. Tras publicar una nueva versión, Citrix suele dejar temporalmente el archivo XML de actualización fuera de servicio para impedir que los clientes se actualicen de inmediato. Es posible que haya que esperar a que Citrix vuelva a habilitar la URL para que funcione esta función.

#### Fuente de actualización desactualizada

En ocasiones, `Get-EvergreenApp -Name "CitrixWorkspaceApp"` puede no devolver la versión más reciente de Citrix Workspace app. Esto se debe a cambios que Citrix hace en la fuente de actualización `https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml` para limitar o impedir la implementación automática de la versión más reciente de Workspace app. Por ahora, la única solución es esperar a que Citrix corrija la fuente para incluir de nuevo la última versión.

### GhislerTotalCommander

Esta función funciona correctamente en Windows sin requisitos adicionales, pero requiere instalar el módulo de PowerShell `DnsClient-PS` en macOS o Linux.

### GoogleChrome

El instalador MSI disponible para el canal Stable no coincide con el número de versión devuelto para ese canal. El número de versión del archivo MSI sí coincide con el instalador MSI devuelto para el canal Extended. El MSI disponible para los canales Stable y Extended es el mismo archivo, aunque las URL sean distintas.

### LibreOffice

`LibreOffice` usa el host de actualización `https://update.libreoffice.org/check.php` para determinar la versión disponible. The Document Foundation no hace que el host devuelva inmediatamente la versión más reciente cuando se publica. Si el host de actualización no devuelve la versión más reciente y TDF ya ha retirado las descargas de la versión que sí devuelve, `LibreOffice` no puede crear vínculos de descarga válidos.

Por ahora, la única solución es esperar a que TDF indique al host de actualización que devuelva la versión más reciente. Consulte también [Versión de LibreOffice](https://github.com/eucpilots/evergreen-module/issues/218).

### Microsoft365Apps

`Microsoft365Apps` solo devuelve los canales documentados públicamente. La API de actualización de Microsoft 365 Apps puede ofrecer canales adicionales, pero es posible que no coincidan con los documentados en microsoft.com y, por ello, esta función no los incluye.

Los canales se enumeran en estos artículos: [Opciones de configuración de Office Deployment Tool](https://docs.microsoft.com/en-us/deployoffice/office-deployment-tool-configuration-options#channel-attribute-part-of-add-element), [Canal de actualización para Office LTSC 2021](https://docs.microsoft.com/en-us/deployoffice/ltsc2021/update#update-channel-for-office-ltsc-2021) y [Canal de actualización para Office 2019](https://docs.microsoft.com/en-us/deployoffice/office2019/update#update-channel-for-office-2019).

Los nombres completos de los canales se enumeran aquí: [Historial de actualizaciones de Microsoft 365 Apps](https://docs.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date).

### MicrosoftWvdRemoteDesktop

`MicrosoftWvdRemoteDesktop` puede informar de un error HTTP 503 para algunas URL (vea el ejemplo siguiente). Es un comportamiento intermitente, pero la función debería seguir devolviendo datos utilizables. Para ocultar esta advertencia, use `-WarningAction "SilentlyContinue"`.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
```

### MozillaFirefox

#### Compatibilidad con idiomas

Se puede pasar cualquier idioma compatible a `MozillaFirefox` mediante una tabla hash en `-AppParams`. Por ejemplo, `Get-EvergreenApp -Name "MozillaFirefox" -AppParams @{Language="en-GB", "es-ES"}` devuelve los instaladores de Firefox en inglés (Reino Unido) y español.

La mayoría de los [idiomas compatibles](https://www.mozilla.org/en-US/firefox/all/#product-desktop-release) se pueden pasar a la función mediante el código abreviado del idioma. La lista de idiomas está en el manifiesto [MozillaFirefox](https://github.com/eucpilots/evergreen-module/blob/main/Evergreen/Manifests/MozillaFirefox.json).

### OBSStudio

Es posible que no se pueda devolver la versión y descarga más recientes de OBS Studio cuando OBS Project modifica la disponibilidad del manifiesto de actualización en `https://obsproject.com/update_studio/manifest.json`. `Get-EvergreenApp -Name OBSStudio` devolverá un error 404. La única solución es esperar a que OBS Project vuelva a habilitar el manifiesto.

Evergreen podría consultar las versiones en el repositorio de GitHub; sin embargo, OBS Project no mantiene las publicaciones del repositorio de forma coherente. En algunos casos, una versión específica de OBS Studio puede corregir un problema que solo afecta a macOS y, en tal caso, `OBSStudio` no devolvería resultados.

Consulte también [Get-EvergreenApp OBSStudio no funciona debido a errores 404](https://github.com/eucpilots/evergreen-module/issues/184).

### OmnissaHorizonClient

Es posible que `OmnissaHorizonClient` no devuelva siempre la versión actual. La propiedad de versión principal de los datos de actualización de VMware Horizon Client no usa un formato de versión que se pueda ordenar fácilmente. Es posible que esto se corrija en una versión futura. Consulte también [VMware Horizon Client informa de una versión desactualizada](https://github.com/eucpilots/evergreen-module/issues/161).

### PaintDotNet

`Get-EvergreenApp -Name PaintDotNet` genera el siguiente error en PowerShell para Linux. Como alternativa, use `Get-EvergreenApp -Name PaintDotNetOfflineInstaller`.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://www.getpaint.net/updates/versions.8.1000.0.x64.en.txt.
WARNING: Invoke-EvergreenWebRequest: Error encountered: The SSL connection could not be established, see inner exception..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /home/aaron/.local/share/powershell/Modules/Evergreen/2205.561/Apps/Get-PaintDotNet.ps1:20
Line |
  20 |      $Content = Invoke-EvergreenWebRequest -Uri $res.Get.Uri
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: The SSL connection could not be established, see inner exception.
```

### VideoLanVlcPlayer

Es posible que `VideoLanVlcPlayer` no devuelva siempre la versión más reciente disponible. La versión que devuelve la fuente de actualización del reproductor multimedia VLC puede no coincidir con la versión que se puede descargar actualmente del sitio [videolan.org](https://www.videolan.org/vlc/).

El código fuente del sitio de actualización está disponible aquí: [Organización VideoLAN > update.videolan.org > Repositorio](https://code.videolan.org/VideoLAN.org/update.videolan.org/-/tree/master/vlc).
