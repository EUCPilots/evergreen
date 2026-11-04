---
layout: doc
---
# Usar Desktop Workbench

::: warning Versión beta
Desktop Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **1.0.21**.
:::

## Iniciar Workbench

Importe el módulo y ejecute `Start-EvergreenWorkbench` para abrir la ventana de Evergreen Workbench:

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Al volver a abrir Workbench, se restaura la última vista utilizada. Si la vista guardada está deshabilitada, se abre la vista Apps.

Use el control de la barra de navegación para alternar entre la navegación expandida y la compacta.

![Vista Apps con aplicaciones Microsoft y filtros de canal, versión, arquitectura y Type](/img/ui/evergreen-workbench-collapsed.png)

## Vista de aplicaciones

La vista Apps muestra en una cuadrícula de datos con búsqueda las más de 500 aplicaciones compatibles con el módulo Evergreen. Seleccione una aplicación de la lista de la izquierda para ver los metadatos de versión y descarga devueltos por `Get-EvergreenApp`.

![Vista Apps con aplicaciones Microsoft y filtros de canal, versión, arquitectura y Type](/img/ui/evergreen-workbench-apps.png)

Use el cuadro de búsqueda de la parte superior de la lista para filtrar por nombre. La cuadrícula de datos de la derecha muestra los detalles de las versiones, incluidos Version, Date, Channel, Release, Architecture, Type y URI.

Puede marcar con una estrella las aplicaciones que usa con frecuencia en la lista de la izquierda. Las favoritas aparecen fijadas en la parte superior y se guardan en la configuración local de Workbench.

El encabezado de detalles de la aplicación también muestra la marca de tiempo **Última actualización** cuando hay datos en caché para la aplicación seleccionada. A continuación se muestra la vista Apps con las aplicaciones favoritas fijadas en la parte superior mediante indicadores de estrella y el encabezado de detalles con la marca de tiempo de última actualización.

![Vista Apps con aplicaciones Microsoft y filtros de canal, versión, arquitectura y Type](/img/ui/evergreen-workbench-collapsed.png)

### Filtros dinámicos

Al seleccionar una aplicación, el panel de filtros se actualiza automáticamente en función de las propiedades que devuelve esa aplicación. Por ejemplo, al seleccionar Adobe Acrobat Reader DC se muestran filtros para Language, Architecture y Type.

![Filtros dinámicos de Adobe Acrobat Reader DC con controles de Language, Architecture y Type](/img/ui/evergreen-workbench-apps-filter.png)

Las propiedades de filtro disponibles varían según la aplicación y pueden incluir:

| Propiedad | Valores de ejemplo |
|---|---|
| Architecture | x64, x86, ARM64 |
| Channel | Stable, Beta, Dev |
| Ring | Production, Enterprise |
| Language | English, English (UK) |
| Type | exe, msi, msix, zip |
| Release | General, Enterprise |

Seleccione valores en el panel de filtros para restringir los resultados. Use **Borrar filtros** para restablecerlos o **Exportar a CSV** para guardar los resultados filtrados.

La cuadrícula de versiones permite ordenar las columnas. Haga clic en el encabezado de una columna para ordenar en sentido ascendente y vuelva a hacer clic para ordenar en sentido descendente.

También puede hacer clic con el botón derecho en el encabezado de una columna para mostrar u ocultar columnas opcionales. Las columnas estructurales, como Version y URI, permanecen visibles.

![Vista Apps con opciones del menú contextual del encabezado de la tabla](/img/ui/evergreen-workbench-rightclick.png)

## Vista de descargas

Para descargar instaladores de aplicaciones, seleccione las versiones en la vista Apps y haga clic en **Agregar a la cola de descargas**. Cambie a la vista Download para administrar e iniciar las descargas.

![Vista Download con una descarga de Adobe Acrobat Reader DC en cola](/img/ui/evergreen-workbench-download.png)

La vista Download muestra la cola con las columnas Status, App, Version, Architecture, URI y Path. La columna Path se completa cuando termina la descarga. Use la barra de herramientas para:

- **Quitar seleccionados**: quitar elementos de la cola
- **Borrar cola**: quitar todos los elementos
- **Abrir carpeta**: abrir la carpeta de salida de las descargas
- **Descargar todo**: descargar secuencialmente todos los elementos de la cola

Una barra de progreso en la parte inferior muestra el estado de la descarga actual. Las descargas se procesan secuencialmente y en el orden de la cola. La cuadrícula de descargas permite ordenar las columnas.

![Vista Download con las rutas locales de los archivos descargados](/img/ui/evergreen-workbench-download-path.png)

## Vista de biblioteca

Si ya tiene una [biblioteca Evergreen](/es-es/newlibrary), la vista Library proporciona una interfaz gráfica para explorarla y actualizarla. Escriba o busque la ruta a la biblioteca para cargar su contenido.

![Vista Library con el contenido de la biblioteca y detalles de versión de Microsoft Edge](/img/ui/evergreen-workbench-library.png)

La vista Library muestra:

- **Contenido de la biblioteca**: tabla de aplicaciones de la biblioteca con el nombre, el número de versiones y la ruta de cada aplicación
- **Detalles de la aplicación seleccionada**: versión, URI, tipo, tamaño, hash SHA256, versión y ruta del archivo de cada versión de la aplicación seleccionada

Use la barra de herramientas para:

- **Examinar**: seleccionar la ruta de una biblioteca
- **Abrir carpeta**: abrir el directorio de la biblioteca
- **Nueva biblioteca**: crear una biblioteca Evergreen (`New-EvergreenLibrary`)
- **Recargar biblioteca**: volver a cargar el contenido (`Get-EvergreenLibrary`)
- **Actualizar biblioteca**: descargar las versiones más recientes en la biblioteca (`Start-EvergreenLibraryUpdate`)

## Vista de instalación

La vista Install carga definiciones de paquetes desde un directorio, compara las versiones definidas de las aplicaciones con las que están instaladas en el equipo y permite instalar o actualizar aplicaciones directamente.

![Vista Install que compara las versiones instaladas y las más recientes de las aplicaciones](/img/ui/evergreen-workbench-install.png)

Cada fila muestra:

- **App**: nombre y arquitectura de la aplicación
- **Publisher**: editor de la aplicación
- **Installed**: versión actualmente instalada en el equipo, si la hay
- **Latest**: versión más reciente disponible en Evergreen
- **Status**: indica si la aplicación está instalada y actualizada, necesita actualizarse, está instalada pero no se ha comprobado si hay una versión más reciente o no está instalada
- **Action**: acción disponible: Install, Update o ninguna

Use la barra de herramientas para:

- **Examinar**: seleccionar el directorio con las definiciones de paquetes
- **Cargar definiciones**: cargar o volver a cargar los archivos de definiciones
- **Buscar las versiones más recientes**: consultar en Evergreen la versión más reciente de cada aplicación definida
- **Instalar seleccionadas**: instalar o actualizar las aplicaciones seleccionadas

::: info
Si Workbench no se ejecuta con privilegios elevados, es posible que los instaladores soliciten elevación mediante UAC.
:::

## Pestaña de importación

La pestaña Import proporciona flujos de trabajo para importar paquetes de aplicaciones a plataformas externas. Tiene cuatro subpestañas: **Microsoft Intune Win32 Apps**, **Nerdio Manager Shell Apps**, **Microsoft 365 Apps** y **Authentication**.

Los módulos relacionados con la importación se cargan la primera vez que se abre la pestaña Import. Mientras no se hayan cargado los módulos necesarios, las acciones de inicio de sesión e importación permanecerán deshabilitadas.

### Microsoft Intune Win32 Apps

::: warning Se recomienda validar
Los flujos de trabajo de importación están disponibles, pero debe validar en su entorno el empaquetado y el comportamiento de asignación específicos del inquilino antes de implementarlos en producción.
:::

Busque un directorio que contenga definiciones de paquetes de Intune, cárguelas y compárelas con las aplicaciones Win32 del inquilino de Intune.

![Pestaña Import con Microsoft Intune Win32 Apps, definiciones de paquetes y estado de importación](/img/ui/evergreen-workbench-import-intune.png)

La cuadrícula de datos muestra filas de conciliación con estas columnas: App, Publisher, Intune Version, Latest, Status y Action.

Los valores de Action indican qué hacer a continuación:

- **Import new app**: la definición todavía no está en Intune
- **Import new version and supersede**: la aplicación ya existe en Intune y necesita actualizarse
- **Fix in definition**: hay un GUID de definición duplicado u otro problema en la definición
- **-**: no se requiere ninguna acción

Use la barra de acciones para administrar las definiciones y la importación:

- **Reload definitions**: volver a cargar de disco la lista de definiciones
- **Update definitions**: resolver la última versión de Evergreen para cada definición y actualizar `App.json` y las reglas de detección; la lista de definiciones se vuelve a cargar automáticamente al terminar
- **Compare with Microsoft Intune**: crear la lista de conciliación
- **Import Win32 app**: procesar las filas seleccionadas que requieren una acción

### Nerdio Manager Shell Apps

::: warning Se recomienda validar
Los flujos de trabajo de importación de Nerdio están disponibles, pero debe validar los permisos de API, las asignaciones de definiciones y el comportamiento posterior a la importación en su entorno.
:::

Busque un directorio con definiciones de Nerdio Manager Shell App, cárguelas y compárelas con las Shell Apps del entorno de Nerdio Manager.

![Pestaña Import con Nerdio Manager Shell Apps y comparación de versiones](/img/ui/evergreen-workbench-import-nerdio.png)

La cuadrícula de datos muestra el estado de cada definición: si coincide con una Shell App existente, si hay una actualización disponible y cuáles son las versiones actual y más reciente de Evergreen. La barra de estado resume los resultados de la comparación.

Use **Compare with Nerdio Manager** para crear la lista de conciliación. A continuación, use **Add new version to existing Shell App** o **Import New App** en la fila seleccionada.

### Microsoft 365 Apps

::: warning Se recomienda validar
El flujo de trabajo de Microsoft 365 Apps está disponible para escenarios tanto de Intune como de Nerdio Manager. Valide la configuración XML, la salida del empaquetado y los permisos del inquilino antes de usarlo en producción.
:::

Busque una carpeta con archivos de configuración XML de Office Deployment Tool y haga clic en **Load configurations**.

![Pestaña Import con configuraciones de paquetes de Microsoft 365 Apps y acciones de importación](/img/ui/evergreen-workbench-import-m365.png)

La cuadrícula muestra cada configuración con:

- **Filename**: nombre del archivo XML
- **Display Name**: nombre para mostrar generado para la aplicación
- **Products**: productos analizados y detalles de destino
- **Status**: resultado de la validación de la configuración (por ejemplo, Valid, No ID o Invalid XML)

Use la barra de acciones para configurar el empaquetado y la importación:

- **Channel**: selecciona el canal de actualización de Microsoft 365 usado para generar el paquete
- **Company name**: valor obligatorio que se inserta en los metadatos del paquete
- **Import Nerdio Manager Shell App**: crea e importa el paquete a Nerdio Manager
- **Import Microsoft Intune Win32 App**: crea e importa el paquete a Intune

En EvergreenUI 1.0.20, para el flujo de trabajo de Nerdio Workbench lee los archivos de definición de Shell App de un subdirectorio `shell-app` junto a las configuraciones XML, valida los archivos obligatorios (`Definition.json`, `Detect.ps1`, `Install.ps1`, `Uninstall.ps1`) y crea la Shell App a partir de esa definición. Este flujo ya no depende de `IntuneWin32App` para las importaciones de Nerdio.

Los indicadores de conexión de esta pestaña muestran el estado de autenticación de Microsoft Intune y Nerdio Manager.

### Definiciones de paquetes

Las definiciones de paquetes para las funciones Install e Import están disponibles aquí: [https://github.com/EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages).

::: info
Estas definiciones de paquetes deben validarse antes de usarlas. El objetivo a largo plazo es crear una definición de paquete unificada para aplicaciones Win32 de Intune y Nerdio Manager Shell Apps.
:::

### Autenticación

La subpestaña Authentication administra las conexiones a Entra ID, la API de Nerdio Manager y Azure Storage. Estas conexiones son necesarias para los flujos de trabajo de importación de Intune, Nerdio Manager y Microsoft 365 Apps.

![Subpestaña Authentication con conexiones a Entra ID, la API de Nerdio Manager y Azure Storage](/img/ui/evergreen-workbench-import-auth.png)

Configure lo siguiente:

- **Entra ID**: escriba un identificador de inquilino opcional y use **Sign in** para conectarse a Microsoft Intune
- **Nerdio Manager API**: proporcione NME Host, Client ID, API Scope, OAuth token URL, Client Secret y Tenant ID para conectarse a Nerdio Manager
- **Azure Storage for Nerdio Manager Shell Apps**: configure opcionalmente Subscription ID, Resource Group, Storage Account y Container para almacenar paquetes de aplicaciones

## Vista de actualización

La vista Update ejecuta `Update-Evergreen` desde la interfaz gráfica para sincronizar la caché local de definiciones de aplicaciones con la versión más reciente del repositorio [evergreen-apps](https://github.com/EUCPilots/evergreen-apps).

![Vista Update con la salida de Update-Evergreen, validación de hashes y progreso de sincronización](/img/ui/evergreen-workbench-update.png)

Haga clic en **Run Update-Evergreen** para iniciar la actualización. El panel de salida muestra mensajes de registro con marcas de tiempo sobre la comprobación de la caché, la descarga, la validación de hashes y el progreso de sincronización.

## Vista Acerca de

La vista About muestra los metadatos del módulo EvergreenUI cargado, incluidos el nombre, la versión, la etiqueta de versión preliminar, el URI del proyecto y la descripción.

![Vista About con los metadatos del módulo y los módulos necesarios](/img/ui/evergreen-workbench-about.png)

También incluye una sección **Required Modules**, que enumera las dependencias del módulo usadas por los flujos de trabajo de importación e indica si cada módulo está instalado.

## Configuración

La vista Settings permite configurar las preferencias generales y las opciones específicas de cada proveedor.

![Vista Settings con la configuración General, Microsoft Intune y Logs](/img/ui/evergreen-workbench-settings.png)

### General

- **Download output path**: directorio predeterminado para los instaladores de aplicaciones descargados
- **Evergreen apps path**: ruta a la caché local de definiciones de aplicaciones Evergreen (solo lectura; muestra el valor de `Get-EvergreenAppsPath`)
- **Theme**: alterna entre los temas claro y oscuro
- **Show Import tab** / **Show Install tab**: muestra u oculta las vistas Import e Install
- **App version cache**: los datos de versiones en caché se almacenan localmente y se cargan al seleccionar una aplicación; use **Clear cache** para forzar una consulta nueva en la próxima selección
- **Open cache folder**: abre la carpeta local de caché de versiones de aplicaciones

### Microsoft Intune

- **IntuneWin32App module**: indicador de estado que muestra si el módulo IntuneWin32App está cargado; use **Reload** para volver a importarlo
- **Package output path**: directorio de los archivos de salida de paquetes Win32 de Intune

### Logs

- **Open logs folder**: abre el directorio local de registros de EvergreenUI
- **Clear logs**: elimina los archivos `.log` locales del directorio de registros de EvergreenUI

## Panel de registro

El panel de registro de la parte inferior de la ventana muestra mensajes con marcas de tiempo y tres niveles:

- **Info**: actualizaciones de progreso y mensajes de estado
- **Warning**: problemas no críticos (por ejemplo, una URL de descarga que devolvió una redirección)
- **Error**: fallos al buscar versiones, descargar archivos o actualizar bibliotecas

![Panel de registro de progreso con información detallada de las operaciones](/img/ui/evergreen-workbench-progresslog.png)

Use **Copy log**, **Save log**, **Show progress log** o **Hide progress log** para administrar la salida del registro. Los mensajes se generan en tiempo real desde espacios de ejecución en segundo plano a medida que se ejecutan las operaciones.
