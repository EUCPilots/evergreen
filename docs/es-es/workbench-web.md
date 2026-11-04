---
layout: doc
---
# Usar Web Workbench

Evergreen Web Workbench es una aplicación basada en navegador para explorar los datos de versiones de aplicaciones cuyo seguimiento realiza el módulo [Evergreen](/es-es/about). Está disponible en cualquier plataforma. Ábrala aquí:

**[eucpilots.com/workbench](https://eucpilots.com/workbench)**

::: tip
Web Workbench se puede instalar como una aplicación web progresiva (PWA) para usarla como aplicación independiente. Use la opción de instalación del navegador para agregarla al escritorio o a la pantalla de inicio.
:::

## Panel

El panel ofrece un resumen general de todas las aplicaciones cuyo seguimiento realiza Evergreen.

![Panel de Web Workbench con estadísticas de resumen, gráficos y actividad reciente](/img/webui/webworkbench-dashboard.jpeg)

### Estadísticas de resumen

La fila superior muestra las métricas principales:

| Métrica | Descripción |
|---|---|
| Aplicaciones con seguimiento | Número total de aplicaciones cuyo seguimiento realiza Evergreen |
| Entradas de versión | Número total de registros de versiones de todas las aplicaciones |
| Arquitecturas | Número de arquitecturas de CPU distintas (x64, x86, ARM64, etc.) |
| Tipos de archivo | Número de formatos de instalador distintos (exe, msi, msix, zip, etc.) |
| Actualizadas recientemente | Aplicaciones cuyos datos se actualizaron en las últimas 48 horas |

### Gráficos

Dos gráficos de barras horizontales muestran la distribución de las entradas de versiones:

- **Architecture**: distribución por arquitectura de CPU (x64, x86, ARM64, aarch64, etc.)
- **Tipo de archivo**: distribución por formato de instalador (exe, msi, msix, zip, cab, etc.)

### Búsqueda de URI

Pegue una URL de descarga en el campo de búsqueda de URI para encontrar a qué aplicación Evergreen pertenece.

### Actividad reciente

Lista de aplicaciones con los datos actualizados más recientemente; muestra el nombre de la aplicación y hace cuánto se actualizó.

## Vista de aplicaciones

La vista Apps muestra todas las aplicaciones compatibles con Evergreen en una barra lateral a la izquierda y los detalles de las versiones a la derecha. Seleccione una aplicación para ver sus entradas de versiones.

![Vista Apps con Adobe Acrobat Reader DC y las columnas de versión, idioma, tamaño, arquitectura y URI](/img/webui/webworkbench-apps.jpeg)

La barra lateral muestra:

- **Número de aplicaciones**: total de aplicaciones y número de filtros activos
- **Cuadro de búsqueda**: permite filtrar la lista de aplicaciones por nombre
- **Icono de estrella**: resalta las aplicaciones con actualizaciones recientes
- **Filtro de recientes**: filtra la barra lateral para mostrar solo las aplicaciones actualizadas en las últimas 24 o 48 horas, en los últimos 72 horas o en la última semana

La tabla de detalles de versiones muestra estas columnas:

| Columna | Descripción |
|---|---|
| Version | Cadena de versión de la aplicación |
| Language | Idioma o configuración regional del instalador |
| Size | Tamaño del archivo instalador en MB |
| Architecture | Arquitectura de CPU (x64, x86, ARM64, etc.) |
| URI | URL de descarga directa del instalador |

Hay otras columnas (Channel, Release, Date, Expiry, SHA256 y Type) disponibles según la aplicación. Use el botón **Columnas** para mostrar u ocultar columnas.

### Filtros de arquitectura y tipo

En la parte superior del panel de detalles, los filtros de casilla permiten restringir los resultados por arquitectura (por ejemplo, x64 o x86) y tipo de archivo (por ejemplo, exe o msi). El número de resultados coincidentes se actualiza al cambiar los filtros.

### Barra de herramientas

La barra de herramientas situada sobre la tabla de versiones incluye:

- **Comando Get-EvergreenApp**: botón para copiar el comando de PowerShell que recupera los mismos datos (por ejemplo, `Get-EvergreenApp -Name AdobeAcrobatReaderDC`)
- **RSS**: vínculo a la fuente RSS de la aplicación seleccionada
- **Fecha de actualización**: indica cuándo se actualizaron por última vez los datos de la aplicación
- **Borrar búsqueda**: borra el texto de búsqueda de la barra lateral
- **Borrar filtros**: restablece los filtros de columna, arquitectura y tipo
- **Columnas**: muestra u oculta columnas de la tabla
- **Exportar a CSV**: descarga la vista filtrada actual como archivo CSV

## Filtrado

Cada columna de la tabla de detalles de versiones tiene un campo de filtro de texto debajo del encabezado. Escriba en cualquiera de ellos para restringir los resultados a las filas coincidentes.

![Vista Apps con un filtro en la columna Language que muestra solo resultados en inglés](/img/webui/webworkbench-filter.jpeg)

Los filtros de columna funcionan junto con los filtros de casilla de arquitectura y tipo. Por ejemplo, puede seleccionar la casilla de arquitectura x64 y escribir «English» en el filtro Language para mostrar solo los instaladores x64 en inglés.

Haga clic en **Borrar filtros** para restablecer todos los filtros de columna o en **Borrar búsqueda** para restablecer la búsqueda de la barra lateral.

## Búsqueda

### Búsqueda en la barra lateral

El cuadro de búsqueda de la parte superior de la barra lateral filtra la lista de aplicaciones a medida que escribe. Solo se filtra por el nombre de la aplicación.

![Vista Apps con la barra lateral filtrada para mostrar solo aplicaciones de Microsoft Edge](/img/webui/webworkbench-searchapps.jpeg)

### Búsqueda global

Pulse **Ctrl+K** (o haga clic en el icono de búsqueda de la barra superior) para abrir la superposición de búsqueda global. Esta búsqueda encuentra coincidencias en todos los nombres de aplicaciones y URI de descarga.

![Superposición de búsqueda global con resultados para una búsqueda de nombres de aplicaciones y URI](/img/webui/webworkbench-search.jpeg)

Use las teclas de dirección para recorrer los resultados y pulse **Enter** para seleccionar uno. Pulse **Esc** para cerrar la superposición de búsqueda.

## Otras características

### Instalar como PWA

Web Workbench es una aplicación web progresiva. Use la opción de instalación del navegador (normalmente en la barra de direcciones o el menú del navegador) para instalarla como aplicación independiente en Windows, macOS, Linux o dispositivos móviles.

### Tema

Use el botón de tema (icono de luna o sol) de la esquina superior derecha de la página para alternar entre los temas claro y oscuro.

### Fuentes RSS

Cada aplicación tiene una fuente RSS disponible mediante el vínculo **RSS** de la barra de herramientas. Suscríbase a la fuente de una aplicación para recibir notificaciones cuando haya nuevos datos de versiones.

### Métodos abreviados de teclado

Pulse **?** para ver los métodos abreviados de teclado disponibles. Entre ellos:

- **Ctrl+K**: abre la búsqueda global
- **?**: muestra los métodos abreviados de teclado
