---
layout: doc
---
# Acerca de Evergreen Workbench

Evergreen Workbench es una interfaz gráfica para explorar los datos de versiones de aplicaciones del módulo de PowerShell [Evergreen](/es-es/about). Está disponible en dos ediciones: **Windows Workbench** para Windows y **Web Workbench**, que se ejecuta en cualquier navegador moderno.

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **2.0.1-preview**.
:::

## Windows Workbench y Web Workbench

| | Windows Workbench | Web Workbench |
|---|---|---|
| **Plataforma** | Windows (WPF, PowerShell 7.6+) | Cualquier navegador moderno |
| **Instalación** | Módulo de PowerShell ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | No requiere instalación; está alojado en [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Explorar aplicaciones** | Sí | Sí |
| **Buscar y filtrar** | Sí | Sí |
| **Panel** | - | Sí |
| **Descargar instaladores** | Sí | - |
| **Administrar bibliotecas** | Sí | - |
| **Definiciones e instalación local** | Sí (versión preliminar) | - |
| **Publicar en Intune / Nerdio Manager** | Sí (versión preliminar) | - |
| **Paquetes de Microsoft 365 Apps** | Sí (versión preliminar) | - |
| **Comandos automatizables** | Sí (`Ew`) | - |
| **Exportar a CSV** | Sí | Sí |
| **Fuentes RSS** | - | Sí (por aplicación) |
| **Instalación como PWA** | - | Sí |
| **Tema** | Claro / Oscuro | Claro / Oscuro |

## Windows Workbench

::: warning Versión beta
Windows Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

Windows Workbench es una interfaz gráfica basada en WPF, distribuida como el módulo de PowerShell `EvergreenUI`. Proporciona acceso interactivo a los mismos cmdlets que ya usa (`Get-EvergreenApp`, `Save-EvergreenApp`, `Update-EvergreenLibrary`, etc.).

Características principales:

- **Apps**: explorar y filtrar todas las aplicaciones Evergreen, elegir las columnas visibles y poner descargas en cola
- **Biblioteca**: leer, actualizar y eliminar selectivamente aplicaciones o versiones
- **Paquetes**: cargar y actualizar definiciones `App.json` y probar la instalación local
- **Intune**: comparar definiciones con aplicaciones Win32 y crear y publicar paquetes
- **Nerdio**: comparar Shell Apps, publicar aplicaciones y versiones y eliminar las versiones antiguas
- **Microsoft 365 Apps**: crear y publicar paquetes de Office en Intune o Nerdio Manager
- **Comandos sin interfaz**: las mismas funciones mediante comandos `Ew` automatizables
- **Configuración y Acerca de**: carpetas guardadas, tema y estado de las dependencias

Más información:

- [Instalar Windows Workbench](/es-es/workbench-install)
- [Usar Windows Workbench](/es-es/workbench-desktop)
- [Paquetes, definiciones e instalación local](/es-es/workbench-packages)
- [Publicar en Microsoft Intune](/es-es/workbench-intune)
- [Publicar en Nerdio Manager](/es-es/workbench-nerdio)
- [Paquetes de Microsoft 365 Apps](/es-es/workbench-m365)
- [Referencia de comandos de Windows Workbench](/es-es/workbench-commands)

## Web Workbench

Web Workbench es una aplicación basada en navegador disponible en [eucpilots.com/workbench](https://eucpilots.com/workbench). Ofrece una vista de solo lectura de todas las aplicaciones cuyo seguimiento realiza Evergreen; no requiere PowerShell ni Windows.

![Panel de Web Workbench](/img/webui/webworkbench-dashboard.jpeg)

Características principales:

- **Panel** con estadísticas de resumen, gráficos de arquitectura y tipos de archivo, búsqueda de URI y actividad reciente
- **Explorar y filtrar** todas las aplicaciones compatibles con Evergreen con columnas ordenables y filtros por columna
- **Buscar** en todas las aplicaciones y los URI de descarga mediante la superposición de búsqueda global
- **Exportar** los resultados filtrados a CSV
- **Fuentes RSS** para aplicaciones individuales
- **Instalar como PWA** para usar una aplicación independiente en cualquier plataforma

Consulte [Usar Web Workbench](/es-es/workbench-web) para obtener todos los detalles.
