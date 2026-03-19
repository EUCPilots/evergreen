---
layout: doc
---
# Installing the Desktop Workbench

::: warning Beta
The Desktop Workbench (EvergreenUI) is currently in pre-release. Install with the `-AllowPrerelease` flag. Features and commands may change before the stable release.
:::

## Requirements

| Requirement | Minimum version |
|---|---|
| Operating system | Windows 10 / Windows Server 2019 or later |
| PowerShell | 5.1 (Desktop) or 7.0+ |
| .NET | .NET Framework 4.7.2+ (for PowerShell 5.1) or .NET 6+ (for PowerShell 7+) |
| Evergreen module | 2603.2832.0 or later |

::: info
The Desktop Workbench is Windows-only because it is built on WPF. No additional DLLs are required - the UI uses WPF assemblies that ship with Windows.
:::

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

To run the Desktop Workbench from a cloned copy of the repository:

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
