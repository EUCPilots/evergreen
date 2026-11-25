---
layout: doc
---
# Installing the Windows Workbench

::: warning Beta
The Windows Workbench (EvergreenUI) is currently in pre-release. Install with the `-AllowPrerelease` flag. Features and commands may change before the stable release.
:::

::: info
This page reflects EvergreenUI features and functions starting with version **2.0.1-preview**.
:::

## Requirements

| Requirement | Minimum version |
|---|---|
| Operating system | Windows 10 / Windows Server 2019 or later |
| PowerShell | 7.6 or later (PowerShell Core only) |
| Evergreen module | 2603.2832.0 or later |

::: info
The Windows Workbench is Windows-only because it is built on WPF. No additional DLLs are required - the UI uses WPF assemblies that ship with Windows. Windows PowerShell 5.1 is not supported.
:::

## Optional modules

The Evergreen module is the only required dependency. These modules are optional and are checked only when the matching workflow is used. The Workbench never installs them for you; check their status in the [About view](/workbench-desktop#about) or with `Get-EwDependency`.

| Module | Needed for |
|---|---|
| `IntuneWin32App` | Building Intune Win32 packages |
| `Microsoft.Graph.Authentication` | Signing in to Microsoft Intune |
| `Az.Accounts`, `Az.Resources`, `Az.Storage` | Azure and Nerdio storage discovery and publishing |

```powershell
Install-Module -Name IntuneWin32App, Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module -Name Az.Accounts, Az.Resources, Az.Storage -Scope CurrentUser
```

## Install from the PowerShell Gallery

The EvergreenUI module is published to the PowerShell Gallery: [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/).

Because EvergreenUI is currently a pre-release module, you must include the `-AllowPrerelease` flag:

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

The Evergreen module is listed as a dependency in the EvergreenUI module manifest. If you do not already have Evergreen installed, PowerShell will install it automatically.

### Updating the module

To update to the latest pre-release version:

```powershell
Update-Module -Name EvergreenUI -AllowPrerelease -Force
```

## Install from source

To run the Windows Workbench from a cloned copy of the repository:

```powershell
# Install the Evergreen dependency first
Install-Module -Name Evergreen -Scope CurrentUser

# Clone the repository and import the module directly
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Verify the installation

After installing, confirm the module is available:

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```

## Start the Workbench

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

See [Using the Windows Workbench](/workbench-desktop).

## Where settings are stored

| Item | Location |
|---|---|
| Settings and saved interface state | `%APPDATA%\EvergreenWorkbench\settings.json` |
| Nerdio recovery records (no secrets) | `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` |
| Cache | `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
