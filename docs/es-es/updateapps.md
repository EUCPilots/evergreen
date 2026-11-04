---
layout: doc
---
# Actualizar las aplicaciones compatibles

## Uso de Update-Evergreen

Después de instalar el módulo Evergreen, es necesario descargar las funciones de las aplicaciones compatibles mediante `Update-Evergreen`. Esta función muestra información de estado legible, tanto en sesiones interactivas como en implementaciones de CI no interactivas (por ejemplo, Azure Pipelines y GitHub Workflows).

::: warning
El módulo Evergreen necesita las funciones y los manifiestos de las aplicaciones para funcionar. Asegúrese de ejecutar `Update-Evergreen` como primera acción después de instalar Evergreen.
:::

`Update-Evergreen` descarga la versión más reciente de las aplicaciones y los manifiestos de Evergreen desde el repositorio [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps), descomprime los archivos y los almacena localmente.

![Primera ejecución de Update-Evergreen](/img/update-evergreen.gif)

Esta función admite el parámetro `-Force`, que fuerza la descarga de la versión más reciente de las funciones específicas de cada aplicación aunque ya estén almacenadas localmente. Así, los administradores pueden actualizar Evergreen cuando las copias almacenadas en caché local estén dañadas.

![Ejecución de Update-Evergreen con el parámetro -Force](/img/update-evergreen-force.gif)

Al importar Evergreen, si la caché local está desactualizada, se le pedirá que la actualice:

![Importación de Evergreen y solicitud para ejecutar Update-Evergreen](/img/import-evergreen.gif)

### Actualizar a una versión específica

El comportamiento predeterminado de `Update-Evergreen` es actualizar a la versión más reciente del repositorio [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps). En algunos casos, puede que quiera descargar una versión específica en lugar de la más reciente.

`Update-Evergreen` admite el parámetro `-Release`, que acepta una etiqueta de versión, como `v25.10.02.22`. Para especificar una versión, también es necesario usar el parámetro `-Force`:

```powershell
Update-Evergreen -Release "v25.10.02.22" -Force
```

## Comportamiento de actualización

Evergreen sigue estas reglas al actualizar la caché:

* Al importar el módulo Evergreen, se busca la versión más reciente y se notifica al administrador si la caché local está desactualizada.
* Es necesario ejecutar `Update-Evergreen`: la caché local no se actualiza automáticamente al importar el módulo.
* Al ejecutar `Update-Evergreen`, si la caché local está desactualizada, se actualiza automáticamente a la versión más reciente.
* Si la versión de la caché local coincide con la versión más reciente, `Update-Evergreen` comprueba los archivos almacenados comparando sus sumas SHA-256 con las de la publicación. Informa de los archivos que faltan o se han modificado, pero no los reemplaza automáticamente; ejecute `Update-Evergreen -Force` para volver a sincronizar la caché.
* Antes de instalar los archivos de una versión descargada, `Update-Evergreen` valida sus sumas SHA-256. Si la validación falla, no se reemplazan las aplicaciones ni los manifiestos locales.
* Si descarga una versión específica de las aplicaciones Evergreen, la caché local quedará desactualizada. Si vuelve a ejecutar `Update-Evergreen`, se actualizará a la versión más reciente.

## Ubicación de la caché

Evergreen almacena las funciones y los manifiestos de las aplicaciones en estas ubicaciones:

* Windows: `%LocalAppData%\Evergreen`
* macOS y Linux: `~\.evergreen`

La ubicación actual de la caché se puede obtener con `Get-EvergreenAppsPath`:

```powershell
PS C:\> Get-EvergreenAppsPath
C:\Users\aaron\AppData\Local\Evergreen
```

## Definir una ubicación personalizada para la caché

Se puede definir una ubicación personalizada para la caché con la variable de entorno `EVERGREEN_APPS_PATH`. Configure esta variable en el contexto de usuario o sistema y asegúrese de que apunte a una ruta válida.

![Configuración de EVERGREEN_APPS_PATH en Windows](/img/environment-variable.png)
