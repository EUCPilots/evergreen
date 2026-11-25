---
layout: doc
---
# Windows Workbench command reference

::: warning Pre-release
The Windows Workbench (EvergreenUI) is currently in pre-release. Features and commands may change before the stable release.
:::

Importing the EvergreenUI module loads a headless PowerShell API without loading WPF. The Workbench window calls the same public commands, so everything it does can be scripted. Use `Get-Help <command> -Full` for parameters and examples.

```powershell
Import-Module EvergreenUI
$artifacts = Get-EwApp -Name MicrosoftEdge
Get-EwFilterableProperty -Artifact $artifacts
$artifacts |
    Where-Object Architecture -eq 'x64' |
    Select-Object -First 1 |
    Save-EwArtifact -AppName MicrosoftEdge
Get-EwLibrary
Update-EwLibrary -WhatIf
```

Commands that change data support `-WhatIf` and `-Confirm` where noted in their help.

## Apps and downloads

| Command | Description |
|---|---|
| `Get-EwApp` | List Evergreen applications, or resolve an application's artifacts |
| `Get-EwFilterableProperty` | Describe artifact properties suitable for filtering |
| `Save-EwArtifact` | Download a resolved artifact |
| `Add-EwFavouriteApp` / `Remove-EwFavouriteApp` | Manage favourite applications |

## Library

| Command | Description |
|---|---|
| `Get-EwLibrary` | Read applications and versions in a library (defaults to the saved library path) |
| `Update-EwLibrary` | Update an initialised library |
| `Remove-EwLibraryApp` | Remove an application, or selected artifact rows |

`Remove-EwLibraryApp` supports `-WhatIf` and `-Confirm`. Supply zero-based manifest row numbers with `-Index`, plus the `ManifestHash` and `LibraryHash` from `Get-EwLibrary` as `-ExpectedManifestHash` and `-ExpectedLibraryHash`, for snapshot-checked row removal. Omitting `-Index` removes the whole application.

## Definitions and local install

| Command | Description |
|---|---|
| `Get-EwDefinition` | Read and validate `App.json` definitions |
| `Resolve-EwArtifact` | Resolve the latest artifact for a definition |
| `Update-EwDefinition` | Update definition version and setup-file metadata |
| `Test-EwDetection` | Evaluate File, Registry and MSI detection rules |
| `Install-EwPackage` | Download and install a definition locally (`ShouldProcess`) |

## Packaging and publishing

| Command | Description |
|---|---|
| `New-EwPackage` | Build an Intune Win32 package or a Microsoft 365 Apps package |
| `Get-EwM365Configuration` | List Microsoft 365 Apps configuration files |
| `Get-EwM365BuildPlan` | Preview Microsoft 365 build inputs and provider identity |
| `Connect-EwIntune` / `Disconnect-EwIntune` | Manage the Microsoft Graph session |
| `Get-EwIntuneApp` / `Compare-EwIntuneApp` | List and compare Intune Win32 apps |
| `Publish-EwIntuneApp` / `Publish-EwIntuneBatch` | Publish Win32 apps |
| `Set-EwIntuneSupersedence` | Set a supersedence relationship |
| `Get-EwM365IntunePublishPlan` / `Publish-EwM365IntuneApp` | Preview and publish a Microsoft 365 app to Intune |
| `Get-EwM365IntuneRecovery` / `Clear-EwM365IntuneRecovery` | List and acknowledge unresolved outcomes |

## Azure and Nerdio

| Command | Description |
|---|---|
| `Connect-EwAzure` / `Disconnect-EwAzure` | Sign in to Azure for storage discovery |
| `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer` | List storage destinations |
| `Connect-EwNerdio` / `Disconnect-EwNerdio` | Manage the Nerdio session; `-ApiOnly` skips Azure storage |
| `Get-EwNerdioDefinition` | Read Shell App definitions |
| `Get-EwNerdioShellApp` / `Get-EwNerdioShellAppVersion` | List Shell Apps and versions |
| `Compare-EwNerdioShellApp` | Compare definitions with Nerdio Manager |
| `Get-EwNerdioPublishPlan` / `Publish-EwNerdioBatch` | Plan and publish confirmed selections sequentially |
| `Publish-EwNerdioApp` | Publish a Shell App or add a version (`-ShellAppId`) |
| `Get-EwNerdioShellAppVersionPrunePlan` / `Remove-EwNerdioShellAppVersion` | Preview and remove old versions |
| `Get-EwM365NerdioPublishPlan` / `Publish-EwM365NerdioApp` | Preview and publish a Microsoft 365 package to Nerdio |

Nerdio sessions are shared in memory across the module's job workers. Expiry, disconnect and provider configuration changes require reconnection. Tokens and secrets are never saved.

## Settings, cache and dependencies

| Command | Description |
|---|---|
| `Get-EwSetting` / `Set-EwSetting` / `Reset-EwSetting` | Read and change Workbench settings |
| `Clear-EwCache` | Clear catalog, version and definition-artifact caches (`-WhatIf`, `-Confirm`, `-CachePath`) |
| `Get-EwDependency` | Report module dependency status |
| `Update-EwEvergreen` | Update Evergreen application data |

An explicit `-CachePath` on `Clear-EwCache` targets that definition cache and still invalidates catalog caches; other custom directories are not searched. Invalidation applies across Workbench runspaces and processes that share the cache.

## Background jobs

| Command | Description |
|---|---|
| `Start-EwJob` | Run a script block in the shared pool (up to four workers) |
| `Get-EwJob` | Report state, progress, information, errors and output |
| `Stop-EwJob` | Request cancellation |
| `Remove-EwJob` | Release a completed job |

Job script blocks are recreated in the worker and do not capture caller variables; pass inputs with `-ArgumentList`. Use `-NoModuleImport` for work that does not need Workbench commands, though a reused worker may still contain modules loaded by earlier jobs.

```powershell
$job = Start-EwJob -Name 'Edge lookup' -ScriptBlock { Get-EwApp -Name MicrosoftEdge }
do {
    Start-Sleep -Seconds 1
    $snapshot = Get-EwJob -Id $job.Id
} while ($snapshot.State -in 'NotStarted', 'Running', 'Stopping')
$snapshot.Output
Remove-EwJob -Id $job.Id -Confirm:$false
```

## Settings

Settings are stored in `%APPDATA%\EvergreenWorkbench\settings.json`. `Set-EwSetting -Name` accepts: `Theme`, `OutputPath`, `LibraryPath`, `PackageOutputPath`, `IntuneDefinitionsPath`, `IntuneTenantId`, `NerdioDefinitionsPath`, `NerdioTenantId`, `NmeHost`, `NmeClientId`, `NmeApiScope`, `NmeOAuthTokenUrl`, `NmeSubscriptionId`, `NmeResourceGroup`, `NmeStorageAccount`, `NmeContainer`, `M365DefinitionsPath`, `M365Channel`, `M365CompanyName`, `M365ImportFor`, `StartupView`, `LastAppName`, `WindowWidth`, `WindowHeight`, `DownloadTrayHeight`, `AppsListWidth`, `ArtifactHiddenColumns` and `WindowMaximized`.
