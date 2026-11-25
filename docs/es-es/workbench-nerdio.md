---
layout: doc
---
# Publicar en Nerdio Manager

::: warning Se recomienda validar
Valide los permisos de API, las asignaciones de definiciones y el comportamiento posterior a la publicación en su entorno antes de usarlo en producción.
:::

La vista **Nerdio** se conecta a Azure y a la API de Nerdio Manager, compara las definiciones de Shell Apps con Nerdio Manager, publica nuevas Shell Apps o versiones y elimina versiones antiguas. Tiene tres pestañas: **Settings**, **Shell Apps** y **Microsoft 365 Apps** (consulte [Paquetes de Microsoft 365 Apps](/es-es/workbench-m365)).

## Pestaña Settings: conexiones

La conexión se realiza en dos fases.

**Configuración del almacenamiento de Azure**

1. Escriba el **Azure tenant ID** y el **Azure subscription ID** y seleccione **Connect Azure**.
2. Seleccione el **Resource group**, el **Storage account** y el **Blob container** donde se guardarán los paquetes.

**Configuración de la API de Nerdio**

Escriba **Nerdio HTTPS host**, **Application client ID**, **API scope**, una **OAuth token URL** opcional y **Client secret (not saved)**; a continuación, seleccione **Connect Nerdio API**.

Use **Save setup** para guardar los valores no secretos. Al conectar, el secreto de cliente se borra del formulario y nunca se guarda. **Disconnect Azure and Nerdio** finaliza ambas sesiones, pero no cambia ningún contexto de Azure ajeno a esta conexión.

**API only (Microsoft 365 build only)** permite autenticarse en Nerdio sin almacenamiento de Azure. Para publicar en Nerdio se necesita una conexión completa con almacenamiento de Azure.

Los módulos necesarios son `Az.Accounts`, `Az.Resources` y `Az.Storage`; se cargan solo cuando se necesitan.

## Pestaña Shell Apps

Escriba o busque la **Shell App definitions folder** (que contiene archivos `Definition.json` y scripts), seleccione **Save setup** y, después, **Load and compare**. La tabla de comparación muestra cada **Local app**, su aplicación **Nerdio** coincidente, las versiones y el estado.

Solo se pueden publicar definiciones válidas respaldadas por Evergreen:

- Las definiciones sin coincidencia crean una Shell App (**New Shell App name**).
- Las coincidencias no ambiguas con una versión más reciente agregan una versión a la aplicación existente.
- Se bloquean las aplicaciones actualizadas, las coincidencias duplicadas y los orígenes no compatibles.

El instalador resuelto se carga directamente en Blob Storage. Las definiciones locales no se modifican.

### Publicación

**Publish selected** muestra una confirmación con las versiones, operaciones y destinos de Azure y Nerdio. Los archivos, orígenes y coincidencias se vuelven a comprobar antes de escribir. **Cancel batch** se aplica entre elementos; la operación actual del proveedor finaliza primero. Los resultados conservan los ID conocidos de blobs, aplicaciones y trabajos.

### Recuperación

Los resultados pendientes o desconocidos detienen el lote y bloquean nuevas publicaciones en Nerdio hasta que se revisen. Workbench guarda las operaciones sin resolver y las propuestas de limpieza en `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json`. No se almacenan tokens ni secretos. La recuperación requiere volver a conectarse al mismo inquilino, suscripción, host de Nerdio y destino de almacenamiento.

Seleccione un resultado sin resolver y elija **Review outcome**:

- **Yes**: solo después de confirmar en Nerdio que se completó correctamente
- **No**: solo después de confirmar que se produjo un error
- **Cancel**: dejarlo sin resolver

El resultado satisfactorio no se acepta hasta que Workbench actualiza la Shell App y verifica que la versión publicada es, de forma inequívoca, la más reciente. No se vuelve a intentar, revierte ni elimina nada automáticamente.

### Eliminar versiones antiguas

Tras una publicación correcta, **Preview published apps** muestra propuestas de limpieza guardadas. No se selecciona ninguna aplicación de forma predeterminada y se conserva una versión de forma predeterminada (incluida la nueva). Puede cambiar el número de versiones retenidas y las aplicaciones, y debe confirmar la lista exacta de eliminación. Se omiten las versiones duplicadas, imposibles de ordenar o que no sean las más recientes. Una eliminación pendiente o desconocida detiene la limpieza y bloquea la publicación en esa Shell App hasta revisarla. Las propuestas aplazadas se conservan después de reiniciar.

Para limpiar sin publicar, seleccione una Shell App coincidente y elija **Prune selected app**. Las filas sin coincidencia y varias selecciones no pueden iniciar esta acción, y los resultados de Nerdio sin resolver la bloquean. Antes de eliminar, se vuelven a comprobar el destino y la instantánea de versiones; después se actualiza la comparación.

## Comandos

`Connect-EwAzure`, `Connect-EwNerdio`, `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer`, `Get-EwNerdioDefinition`, `Get-EwNerdioShellApp`, `Get-EwNerdioShellAppVersion`, `Compare-EwNerdioShellApp`, `Get-EwNerdioPublishPlan`, `Publish-EwNerdioApp`, `Publish-EwNerdioBatch`, `Get-EwNerdioShellAppVersionPrunePlan` y `Remove-EwNerdioShellAppVersion`. Consulte la [referencia de comandos](/es-es/workbench-commands).

`Publish-EwNerdioApp -ShellAppId` agrega una versión a una Shell App existente y descarga el origen de la definición si se omite `-PackagePath`. `Remove-EwNerdioShellAppVersion` acepta `-ExpectedVersionNames` y `-ExpectedRemovalVersions` para rechazar una vista previa obsoleta.
