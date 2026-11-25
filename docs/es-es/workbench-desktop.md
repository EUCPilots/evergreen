---
layout: doc
---
# Usar Windows Workbench

::: warning Versión preliminar
Windows Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **2.0.1-preview**.
:::

## Iniciar Workbench

Importe el módulo y ejecute `Start-EvergreenWorkbench` para abrir la ventana:

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

`Start-EvergreenWorkbench` carga WPF cuando es necesario. Si la sesión de PowerShell no se ejecuta en un apartamento de un solo subproceso (STA), Workbench aloja la ventana en un runspace STA dedicado; no se necesitan opciones especiales de inicio. Workbench solo funciona en Windows y requiere PowerShell 7.6 o posterior.

Al iniciarse, Workbench restaura el tamaño y el estado maximizado de la ventana, la última página visitada, la última aplicación seleccionada, el ancho de la lista de aplicaciones y la altura de la cola de descargas. De forma predeterminada, sigue el tema claro u oscuro de Windows y usa Mica en los sistemas compatibles. La configuración de transparencia y contraste de Windows puede generar un fondo opaco.

## Navegación

El panel de navegación de la izquierda permite cambiar entre las vistas principales. Use el control de la parte superior para alternar entre la navegación expandida y la compacta (solo iconos).

| Vista | Función |
|---|---|
| **Apps** | Explorar aplicaciones, inspeccionar y filtrar versiones, poner instaladores en cola y descargarlos, y mantener los datos de Evergreen |
| **Library** | Leer, actualizar y quitar contenido de una biblioteca local de Evergreen |
| **Packages** | Administrar definiciones App.json y probar la instalación local |
| **Intune** | Comparar, crear y publicar aplicaciones Win32 y Microsoft 365 Apps en Microsoft Intune |
| **Nerdio** | Comparar y publicar Shell Apps y Microsoft 365 Apps en Nerdio Manager |
| **Settings** | Carpetas guardadas y apariencia |
| **About** | Metadatos de Workbench y estado de las dependencias |

El **registro de actividad**, en la parte inferior de la ventana, anota mensajes Info, Warning y Error con fecha y hora de todas las vistas. Arrastre el controlador (o use las flechas arriba y abajo) para cambiar su tamaño; puede contraerlo cuando no lo necesite. Las operaciones largas usan un grupo compartido de hasta cuatro procesos en segundo plano para mantener la ventana receptiva. Las vistas deshabilitan las acciones incompatibles mientras hay una operación en curso y la ventana no se puede cerrar mientras Workbench escribe cambios de mantenimiento.

## Apps

La vista Apps muestra todas las aplicaciones del catálogo Evergreen. Seleccione una para resolver sus versiones con `Get-EvergreenApp` y mostrarlas en la tabla.

- **Search**: filtra la lista por nombre de aplicación.
- **Favourites**: haga clic en la estrella para fijar una aplicación al principio de la lista. Los favoritos se guardan en la configuración de Workbench.
- **Resize**: arrastre el separador para cambiar el ancho de la lista de aplicaciones. El ancho se recuerda.

### Filtrar versiones

El panel de filtros se adapta a las propiedades que devuelve la aplicación seleccionada, como Architecture, Channel, Language, Type o Release. Cada filtro es una lista desplegable de selección múltiple:

- Los valores de una misma propiedad se combinan con **OR**.
- Las propiedades distintas se combinan con **AND**.
- Si no se selecciona ningún valor, se aplica **All**.

### Tabla de versiones

La tabla muestra todas las propiedades devueltas para la aplicación seleccionada, incluidas las que aparecen solo en algunas filas. Primero aparecen las columnas habituales (por ejemplo, Version, Date, Channel y Architecture), seguidas de las propiedades específicas de la aplicación; **URI** es la última. Los valores ausentes quedan en blanco.

- Haga clic en el encabezado de una columna para ordenar de forma ascendente y vuelva a hacer clic para ordenar de forma descendente.
- **Columns** muestra u oculta columnas opcionales. **Version** y **URI** siempre están visibles. La selección se aplica a todas las aplicaciones y se recuerda entre sesiones.
- **Export to CSV** guarda las filas filtradas y las columnas visibles en su orden actual.
- Haga clic con el botón derecho en una fila para elegir **Copy URI** o **Open URI**.

### Descargar instaladores

Seleccione una o varias filas y elija **Add to queue**. La cola incluye varias aplicaciones, por lo que puede agrupar descargas de distintas aplicaciones. Use **Show queue** para expandir el panel de la cola y arrastre su controlador para cambiar el tamaño.

Cada fila muestra la aplicación, Version, Architecture, Status, URI y, tras la descarga, el **Saved file**. Las acciones de fila permiten descargar un elemento o quitarlo.

| Acción | Resultado |
|---|---|
| **Download now** | Descargar los elementos en cola en la carpeta de descargas |
| **Clear completed** | Quitar las filas descargadas y las que hayan fallado |
| **Clear queue** | Quitar todas las filas (no disponible durante una descarga) |
| **Open folder** | Abrir la carpeta que contiene un archivo descargado |
| **Change** | Cambiar la carpeta de descargas |

La carpeta de descargas se guarda en la configuración y aparece junto a la cola. Una barra de progreso muestra la descarga activa.

### Mantenimiento

El menú **Actions...** de la vista Apps ofrece tareas de mantenimiento:

| Acción | Función |
|---|---|
| **Refresh** | Volver a cargar el catálogo de aplicaciones |
| **Reload selected app versions** | Omitir la caché para la aplicación seleccionada |
| **Update Evergreen** | Actualizar los datos de aplicaciones de Evergreen (`Update-Evergreen`). No actualiza el módulo de PowerShell instalado |
| **Clear Workbench cache** | Tras confirmarlo, borrar los datos en caché del catálogo y las versiones en `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
| **Open cache folder** | Abrir la carpeta de caché y crearla si es necesario |

Los resultados de `Get-EvergreenApp` se almacenan en caché durante 24 horas, en un archivo JSON por aplicación. Borrar la caché no elimina los datos de aplicaciones de Evergreen, los instaladores descargados, el contenido de Library, la configuración ni los registros de recuperación del proveedor. El mantenimiento se ejecuta en segundo plano y después actualiza Apps sin perder la selección, la búsqueda, los filtros ni las descargas en cola. Los errores parciales se notifican y no se reintentan automáticamente.

## Library

La vista Library lee y administra una [biblioteca de Evergreen](/es-es/newlibrary) inicializada.

- **Library location**: lista desplegable con las 10 carpetas de biblioteca guardadas más recientes, junto con **Browse** y **Save path**. La carpeta debe contener `EvergreenLibrary.json`.
- **Load**: leer el inventario de la biblioteca.
- **Update library**: descargar las versiones más recientes de todas las aplicaciones de la biblioteca (`Update-EvergreenLibrary`).
- **Open folder**: abrir la carpeta de la biblioteca en el Explorador de archivos.

La tabla superior muestra cada aplicación con su número de **Versions** y **Location**. La tabla inferior muestra las versiones de la aplicación seleccionada, con Version, Architecture, Type, **Location** del instalador local (pase el cursor para ver la ruta completa) y URI. Haga clic con el botón derecho en cualquiera de las tablas y elija **Open folder** para abrir la carpeta de la aplicación o del instalador.

### Quitar contenido

La eliminación es independiente del comando de retención de Evergreen:

- **Remove application** quita la aplicación seleccionada, sus instaladores registrados y su registro en la biblioteca, de modo que las actualizaciones posteriores no volverán a descargarla.
- **Remove versions** quita solo las filas seleccionadas en la tabla de versiones. Use **Ctrl** o **Shift** para seleccionar varias. No afecta a otras arquitecturas ni tipos de instalador que compartan el mismo número de versión.

Cada acción solicita confirmación y **Cancel** es la opción predeterminada. Solo se eliminan los archivos de instalador registrados en la carpeta de la aplicación; se conservan los que aún estén referenciados en el inventario y los archivos no registrados no se modifican. Las rutas no seguras o un manifiesto modificado desde su carga cancelan la eliminación. Si se produce un error, se detiene el trabajo, se notifican los cambios parciales y se vuelve a cargar el inventario; las acciones destructivas nunca se reintentan automáticamente.

::: warning
La eliminación no se puede deshacer. Si se detiene antes de escribir el manifiesto, algunas filas pueden seguir apareciendo aunque se hayan quitado archivos de instalador. Revise las rutas indicadas.
:::

## Packages

La vista Packages tiene dos pestañas: **Definitions** e **Install**. Consulte [Paquetes, definiciones e instalación local](/es-es/workbench-packages) para obtener más información.

## Intune

La vista Intune compara las definiciones App.json con las aplicaciones Win32 de Microsoft Intune, crea y publica paquetes y administra la supersedencia. También incluye el flujo de Microsoft 365 Apps para Intune. Consulte [Publicar en Microsoft Intune](/es-es/workbench-intune).

## Nerdio

La vista Nerdio se conecta a Azure y a la API de Nerdio Manager, compara definiciones de Shell Apps, publica aplicaciones y versiones y elimina versiones antiguas. También incluye el flujo de Microsoft 365 Apps para Nerdio. Consulte [Publicar en Nerdio Manager](/es-es/workbench-nerdio) y [Paquetes de Microsoft 365 Apps](/es-es/workbench-m365).

## Settings

La vista Settings muestra las carpetas guardadas para cada flujo de trabajo y las opciones de apariencia.

**Carpetas guardadas**

| Carpeta | Se usa en |
|---|---|
| **Download folder** | Descargas de Apps |
| **Library folder** | Library |
| **Packages definitions folder** | Packages e Intune |
| **Package output folder** | Creación de paquetes de Intune |
| **Microsoft 365 Apps configurations folder** | Microsoft 365 Apps en Intune y Nerdio (compartida) |
| **Nerdio Manager Shell Apps directory** | Shell Apps de Nerdio |

Use **Browse** para guardar una carpeta o los controles de cada flujo de trabajo. Si cambia en Settings una de las tres carpetas del flujo, se sustituye cualquier cambio de carpeta no guardado en ese flujo. **Open folder** solo está disponible si se puede acceder a la carpeta.

**Apariencia**

- **Color theme**: elija **System**, **Light** u **Dark**.

La configuración de Azure y la API de Nerdio se encuentra en la pestaña Settings de la vista Nerdio.

La configuración y el estado guardado de la interfaz se almacenan en `%APPDATA%\EvergreenWorkbench\settings.json`. Los tokens de autenticación y los secretos de cliente solo se mantienen en memoria y nunca se guardan en la configuración.

## About

La vista About muestra los metadatos de Workbench (nombre, versión, etiqueta de versión preliminar, URI del proyecto y descripción) y una tabla **Dependencies** con la función de cada módulo, la versión mínima, la versión **Installed** más alta que se encuentre localmente y la versión **Loaded (window)** en el runspace de Workbench. Las versiones cargadas pueden diferir de las de la sesión que realizó la llamada o de un trabajo en segundo plano.

El estado se actualiza al abrir About y cuando se solicita. Nunca se instalan, actualizan ni importan dependencias opcionales. Si falla la actualización, los resultados anteriores siguen visibles y se marcan como obsoletos.

## Usar los comandos sin la ventana

Todas las funciones de Workbench están disponibles como comandos de PowerShell, incluidos los trabajos en segundo plano, las definiciones, la publicación y el mantenimiento de la caché. Consulte la [referencia de comandos de Windows Workbench](/es-es/workbench-commands).
