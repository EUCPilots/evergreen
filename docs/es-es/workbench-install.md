---
layout: doc
---
# Instalar Desktop Workbench

::: warning Versión beta
Desktop Workbench (EvergreenUI) está actualmente en versión preliminar. Instálelo con la marca `-AllowPrerelease`. Las características y los comandos pueden cambiar antes de la versión estable.
:::

::: info
Esta página describe las características y funciones de EvergreenUI a partir de la versión **1.0.21**.
:::

## Requisitos

| Requisito | Versión mínima |
|---|---|
| Sistema operativo | Windows 10 / Windows Server 2019 o posterior |
| PowerShell | 5.1 (Desktop) o 7.0+ |
| .NET | .NET Framework 4.7.2+ (para PowerShell 5.1) o .NET 6+ (para PowerShell 7+) |
| Módulo Evergreen | 2603.2832.0 o posterior |

::: info
Desktop Workbench solo está disponible para Windows porque está basado en WPF. No se requieren DLL adicionales: la interfaz usa ensamblados WPF incluidos en Windows.
:::

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

Para ejecutar Desktop Workbench desde una copia clonada del repositorio:

```powershell
# Install the Evergreen dependency first
Install-Module -Name Evergreen -Scope CurrentUser

# Clone the repository and import the module directly
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Verificar la instalación

Después de instalarlo, confirme que el módulo está disponible:

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```
