---
layout: doc
---
# Instalar Windows Workbench

::: warning Versión beta
Windows Workbench (EvergreenUI) está actualmente en versión preliminar. Instálelo con la marca `-AllowPrerelease`. Las características y los comandos pueden cambiar antes de la versión estable.
:::

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **2.0.1-preview**.
:::

## Requisitos

| Requisito | Versión mínima |
|---|---|
| Sistema operativo | Windows 10 / Windows Server 2019 o posterior |
| PowerShell | 7.6 o posterior (solo PowerShell Core) |
| Fuente | Windows 10, 2019 y 2022 requieren la [fuente Segoe Fluent Icons para Windows 11](https://www.microsoft.com/en-us/download/details.aspx?id=108863) |
| Módulo Evergreen | 2603.2832.0 o posterior |

::: info
Windows Workbench solo está disponible para Windows porque está basado en WPF. No se requieren DLL adicionales: la interfaz usa ensamblados WPF incluidos en Windows. No se admite Windows PowerShell 5.1.
:::

## Módulos opcionales

El módulo Evergreen es la única dependencia necesaria. Estos módulos son opcionales y solo se comprueban al usar el flujo correspondiente. Workbench no los instala; consulte su estado en la [vista Acerca de](/es-es/workbench-desktop#about) o con `Get-EwDependency`.

| Módulo | Necesario para |
|---|---|
| `IntuneWin32App` | Crear paquetes Win32 de Intune |
| `Microsoft.Graph.Authentication` | Iniciar sesión en Microsoft Intune |
| `Az.Accounts`, `Az.Resources`, `Az.Storage` | Detectar almacenamiento de Azure/Nerdio y publicar |

```powershell
Install-Module -Name IntuneWin32App, Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module -Name Az.Accounts, Az.Resources, Az.Storage -Scope CurrentUser
```

## Instalar desde PowerShell Gallery

El módulo EvergreenUI se publica en PowerShell Gallery: [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/).

Como EvergreenUI es actualmente un módulo en versión preliminar, debe incluir la marca `-AllowPrerelease`:

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

El manifiesto del módulo EvergreenUI indica el módulo Evergreen como dependencia. Si Evergreen aún no está instalado, PowerShell lo instalará automáticamente.

### Actualizar el módulo

Para actualizar a la versión preliminar más reciente:

```powershell
Update-Module -Name EvergreenUI -AllowPrerelease -Force
```

## Instalar desde el código fuente

Para ejecutar Windows Workbench desde una copia clonada del repositorio:

```powershell
# Instalar primero la dependencia de Evergreen
Install-Module -Name Evergreen -Scope CurrentUser

# Clonar el repositorio e importar el módulo directamente
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Verificar la instalación

Después de instalarlo, confirme que el módulo está disponible:

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```

## Iniciar Workbench

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Consulte [Usar Windows Workbench](/es-es/workbench-desktop).

## Ubicación de la configuración

| Elemento | Ubicación |
|---|---|
| Configuración y estado guardado de la interfaz | `%APPDATA%\EvergreenWorkbench\settings.json` |
| Registros de recuperación de Nerdio (sin secretos) | `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` |
| Caché | `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
