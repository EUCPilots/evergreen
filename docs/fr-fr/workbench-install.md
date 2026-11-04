---
layout: doc
---
# Installer Desktop Workbench

::: warning Bêta
Desktop Workbench (EvergreenUI) est actuellement en préversion. Installez-le avec l’indicateur `-AllowPrerelease`. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **1.0.21**.
:::

## Prérequis

| Prérequis | Version minimale |
|---|---|
| Système d’exploitation | Windows 10 / Windows Server 2019 ou version ultérieure |
| PowerShell | 5.1 (Desktop) ou 7.0+ |
| .NET | .NET Framework 4.7.2+ (pour PowerShell 5.1) ou .NET 6+ (pour PowerShell 7+) |
| Module Evergreen | 2603.2832.0 ou version ultérieure |

::: info
Desktop Workbench est réservé à Windows, car il repose sur WPF. Aucune DLL supplémentaire n’est requise : l’interface utilise les assemblys WPF fournis avec Windows.
:::

## Installer depuis PowerShell Gallery

Le module EvergreenUI est publié dans PowerShell Gallery : [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/).

Comme EvergreenUI est actuellement un module en préversion, vous devez inclure l’indicateur `-AllowPrerelease` :

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

Le module Evergreen est déclaré comme dépendance dans le manifeste du module EvergreenUI. Si Evergreen n’est pas déjà installé, PowerShell l’installera automatiquement.

### Mettre à jour le module

Pour installer la dernière version préliminaire :

```powershell
Update-Module -Name EvergreenUI -AllowPrerelease -Force
```

## Installer depuis les sources

Pour exécuter Desktop Workbench à partir d’une copie clonée du dépôt :

```powershell
# Install the Evergreen dependency first
Install-Module -Name Evergreen -Scope CurrentUser

# Clone the repository and import the module directly
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Vérifier l’installation

Après l’installation, vérifiez que le module est disponible :

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```
