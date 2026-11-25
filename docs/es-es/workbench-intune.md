---
layout: doc
---
# Publicar en Microsoft Intune

::: warning Se recomienda validar
La publicación crea aplicaciones reales en el inquilino. Valide el empaquetado, la detección y el comportamiento de las asignaciones en un inquilino de prueba antes de usarlo en producción.
:::

La vista **Intune** compara las [definiciones](/es-es/workbench-packages) `App.json` guardadas con las aplicaciones Win32 de Microsoft Intune y, después, crea y publica las que seleccione. Tiene dos pestañas: **Win32 apps** y **Microsoft 365 Apps** (consulte [Paquetes de Microsoft 365 Apps](/es-es/workbench-m365)).

## Requisitos

Los flujos de trabajo de Intune necesitan estos módulos opcionales, que se cargan solo cuando se usan:

- `IntuneWin32App`: crea paquetes `.intunewin`
- `Microsoft.Graph.Authentication`: inicia sesión en Microsoft Graph

El inicio de sesión usa `Connect-EwIntune`. Puede proporcionar un **Tenant ID** opcional. Los tokens permanecen en la memoria del proceso y no se guardan.

## Aplicaciones Win32

1. Seleccione y cargue **Definitions folder**, o reutilice la carpeta guardada en [Packages](/es-es/workbench-packages).
2. Seleccione **Connect** para iniciar sesión. El UPN de la sesión aparece junto al botón **Connect/Disconnect**.
3. Seleccione **Load matching Intune apps** / **Compare definitions**. La tabla muestra Publisher, la versión **Saved**, la versión de **Intune** y el **Status** de coincidencia. El editor aparece junto a cada definición.
4. Seleccione las filas aptas y elija **Build and publish selected**.

Las coincidencias ambiguas de Intune se distinguen de las cadenas de supersedencia vinculadas; los GUID de definición duplicados se marcan para corregirlos en la definición.

### Actualizar aplicaciones y supersedencia

- Las aplicaciones existentes que coincidan quedan **superseded** por la nueva versión.
- **Update app** (casilla por fila, desactivada de forma predeterminada) publica la aplicación como una aplicación de actualización asignada como **required** a **All Devices**.

### Publicar un lote

Una confirmación cubre todo el lote. La publicación es secuencial, puede actualizar los archivos de definición, se detiene entre aplicaciones si selecciona **Cancel batch** y muestra los cambios parciales locales y de Intune en la tabla **Batch results** (Definition, Result, New app ID, Previous app ID, Details). Se conservan los ID de aplicación parciales. Si falla la supersedencia, use **Retry selected link** durante la misma sesión de Workbench.

Los paquetes se crean a partir de la carpeta de descargas del instalador, incluidos los subdirectorios de canal, versión o arquitectura, y se escriben en la carpeta de salida de paquetes.

## Comandos

`Connect-EwIntune`, `Disconnect-EwIntune`, `Get-EwIntuneApp`, `Compare-EwIntuneApp`, `Publish-EwIntuneApp`, `Publish-EwIntuneBatch` y `Set-EwIntuneSupersedence`. Consulte la [referencia de comandos](/es-es/workbench-commands).

```powershell
Connect-EwIntune
Compare-EwIntuneApp -DefinitionPath C:\Packages
```
