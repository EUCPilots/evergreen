---
layout: doc
---
# Paquetes de Microsoft 365 Apps

::: warning Se recomienda validar
Valide la configuración XML, el resultado del empaquetado y los permisos del inquilino antes de usarlo en producción.
:::

Las vistas **Intune** y **Nerdio** tienen una pestaña **Microsoft 365 Apps** que crea un paquete de Microsoft 365 Apps a partir del XML de configuración de Office Deployment Tool (ODT) y, de forma opcional, lo publica.

## Flujo de trabajo

1. Inicie sesión en el proveedor correspondiente ([Intune](/es-es/workbench-intune) o [Nerdio](/es-es/workbench-nerdio)).
2. Escriba **Configuration folder** y seleccione **Load configurations**. La carpeta se comparte entre Intune y Nerdio. Cada configuración necesita un ID válido y no vacío.
3. Seleccione una configuración y elija **Channel**, **Company name** y **Session type**.
4. Seleccione **Preview build** o **Preview publishing** y, después, **Build only** o **Build and publish**.
5. Use **Save shared settings** para guardar las opciones no secretas.

La creación sin publicación en Nerdio puede usar el inicio de sesión **API only**. La publicación en Nerdio también necesita el inquilino, la suscripción y el destino de almacenamiento de Azure conectados.

## Archivos necesarios

- `Uninstall-Microsoft365Apps.xml` con un elemento `Configuration.Remove`. Es necesario para crear paquetes de Nerdio y publicar en Intune. Intune puede crear el paquete sin él, pero para publicar hay que volver a crearlo con este archivo, ya que el comando de desinstalación hace referencia a él.
- Para Nerdio, una carpeta `shell-app` junto al XML con `Definition.json`, `Detect.ps1`, `Install.ps1` y `Uninstall.ps1`.

Los archivos XML y scripts de origen nunca se modifican.

## Versiones y creación

La vista previa muestra por separado la **Office channel version** resuelta y la **ODT download version**. El archivo ODT firmado se extrae mediante `tar.exe` de Windows; el ejecutable descargado no se ejecuta. La configuración generada usa un canal continuo y no puede usar `DownloadPath`, que requiere una versión fija.

La versión de Office instalada puede ser más reciente que la de la vista previa, por lo que la detección de Intune acepta la versión mostrada o una posterior.

::: info
La propiedad `TenantId` y el valor `AppSettings\Setup Name="Company"` de la empresa se escriben en la configuración, pero Microsoft no los documenta como asociación del inquilino ni como configuración de empresa. El inquilino con sesión iniciada no demuestra que Office esté asociado a él. El [`TenantAssociationKey`](https://learn.microsoft.com/microsoft-365-apps/deploy/office-deployment-tool-configuration-options#tenantassociationkey-property-part-of-property-element) de Microsoft es otro valor.
:::

## Publicación

Se solicita confirmación antes de crear el paquete.

- **Intune** crea una aplicación, muestra las coincidencias existentes por ID de configuración y puede, de forma opcional, superseder una mediante **Optional app to supersede** (una relación de actualización que no la desinstala).
- **Nerdio** puede crear una Shell App o agregar una versión en **Existing Shell App for add version**. Para agregar una versión que ya existe, debe marcar *I confirm the configuration changed if this Office version already exists*. Nerdio no puede comparar la configuración remota y aun así puede rechazar la operación.

Las entradas y los destinos del proveedor se vuelven a comprobar antes de escribir, pero no de forma atómica. Los paquetes existentes solo se reemplazan con aprobación explícita. Los procesos de creación conservan el código fuente preparado y la herramienta en `<application>\Builds\<GUID>` dentro de la carpeta de salida; elimínelos manualmente cuando ya no los necesite. La cancelación se aplica entre fases y no interrumpe una creación, carga o solicitud en curso.

## Recuperación

Los resultados desconocidos de Intune se guardan sin secretos y bloquean las escrituras para esa configuración hasta que se revisen. Use el expansor **Recovery** de la pestaña Intune: **Load recovery records**, inspeccione la aplicación en Intune y seleccione **Acknowledge reviewed outcome**. Los resultados pendientes o desconocidos de Nerdio usan los [controles de recuperación de Shell Apps](/es-es/workbench-nerdio). No se vuelve a intentar, revierte ni limpia nada automáticamente.

## Comandos

`Get-EwM365Configuration`, `Get-EwM365BuildPlan`, `New-EwPackage`, `Get-EwM365IntunePublishPlan`, `Publish-EwM365IntuneApp`, `Get-EwM365IntuneRecovery`, `Clear-EwM365IntuneRecovery`, `Get-EwM365NerdioPublishPlan` y `Publish-EwM365NerdioApp`. Una llamada de Microsoft 365 a `New-EwPackage` sin una vista previa crea una automáticamente y sigue requiriendo la sesión del proveedor.
