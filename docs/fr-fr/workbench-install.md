---
layout: doc
---
# Installer Windows Workbench

::: warning Bêta
Windows Workbench (EvergreenUI) est actuellement en préversion. Installez-le avec l’indicateur `-AllowPrerelease`. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **2.0.1-preview**.
:::

## Prérequis

| Prérequis | Version minimale |
|---|---|
| Système d’exploitation | Windows 10 / Windows Server 2019 ou version ultérieure |
| PowerShell | 7.6 ou version ultérieure (PowerShell Core uniquement) |
| Module Evergreen | 2603.2832.0 ou version ultérieure |

::: info
Windows Workbench est réservé à Windows, car il repose sur WPF. Aucune DLL supplémentaire n’est requise : l’interface utilise les assemblys WPF fournis avec Windows. Windows PowerShell 5.1 n’est pas pris en charge.
:::

## Modules facultatifs

Le module Evergreen est la seule dépendance requise. Les modules suivants sont facultatifs et vérifiés uniquement lorsqu’un flux correspondant est utilisé. Workbench ne les installe pas. Consultez leur état dans la [vue À propos](/fr-fr/workbench-desktop#about) ou avec `Get-EwDependency`.

| Module | Utilisé pour |
|---|---|
| `IntuneWin32App` | Création de packages Win32 Intune |
| `Microsoft.Graph.Authentication` | Connexion à Microsoft Intune |
| `Az.Accounts`, `Az.Resources`, `Az.Storage` | Détection du stockage Azure/Nerdio et publication |

```powershell
Install-Module -Name IntuneWin32App, Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module -Name Az.Accounts, Az.Resources, Az.Storage -Scope CurrentUser
```

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

Pour exécuter Windows Workbench à partir d’une copie clonée du dépôt :

```powershell
# Installer d’abord la dépendance Evergreen
Install-Module -Name Evergreen -Scope CurrentUser

# Cloner le dépôt et importer directement le module
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Vérifier l’installation

Après l’installation, vérifiez que le module est disponible :

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```

## Démarrer Workbench

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Consultez [Utiliser Windows Workbench](/fr-fr/workbench-desktop).

## Emplacement des paramètres

| Élément | Emplacement |
|---|---|
| Paramètres et état enregistré de l’interface | `%APPDATA%\EvergreenWorkbench\settings.json` |
| Enregistrements de récupération Nerdio (sans secrets) | `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` |
| Cache | `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
