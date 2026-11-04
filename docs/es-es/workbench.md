---
layout: doc
---
# Acerca de Evergreen Workbench

Evergreen Workbench es una interfaz gráfica para explorar los datos de versiones de aplicaciones del módulo de PowerShell [Evergreen](/es-es/about). Está disponible en dos ediciones: **Desktop Workbench** para Windows y **Web Workbench**, que se ejecuta en cualquier navegador moderno.

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **1.0.21**.
:::

## Desktop frente a Web

| | Desktop Workbench | Web Workbench |
|---|---|---|
| **Plataforma** | Windows (WPF) | Cualquier navegador moderno |
| **Instalación** | Módulo de PowerShell ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | No requiere instalación; está alojado en [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Explorar aplicaciones** | Sí | Sí |
| **Buscar y filtrar** | Sí | Sí |
| **Panel** | - | Sí |
| **Descargar instaladores** | Sí | - |
| **Administrar bibliotecas** | Sí | - |
| **Instalar o actualizar aplicaciones** | Sí (versión preliminar) | - |
| **Importar en Intune / Nerdio / Microsoft 365 Apps** | Sí (versión preliminar) | - |
| **Exportar a CSV** | Sí | Sí |
| **Fuentes RSS** | - | Sí (por aplicación) |
| **Instalación como PWA** | - | Sí |
| **Tema** | Claro / Oscuro | Claro / Oscuro |

## Desktop Workbench

::: warning Versión beta
Desktop Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

Desktop Workbench es una interfaz gráfica basada en WPF, distribuida como el módulo de PowerShell `EvergreenUI`. Proporciona una interfaz de escritorio interactiva para los mismos cmdlets que ya usa (`Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate`, etc.).

![Vista Apps de Desktop Workbench](/img/ui/evergreen-workbench-apps.png)

Características principales:

- **Explorar y filtrar** todas las aplicaciones compatibles con Evergreen mediante paneles de filtros dinámicos
- **Descargar** instaladores de aplicaciones con un administrador de descargas en cola
- **Administrar bibliotecas**: crear, explorar y actualizar bibliotecas Evergreen en el disco
- **Instalar y actualizar** aplicaciones directamente desde las definiciones de paquetes *(flujo de trabajo preliminar)*
- **Importar** paquetes de aplicaciones en los flujos de trabajo de Microsoft Intune (aplicaciones Win32), Nerdio Manager (Shell Apps) y Microsoft 365 Apps *(flujos de trabajo preliminares)*
- **Configuración** de rutas de descarga, temas, nivel de detalle del registro y configuración de proveedores

Consulte [Instalar Desktop Workbench](/es-es/workbench-install) y [Usar Desktop Workbench](/es-es/workbench-desktop) para obtener todos los detalles.

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
