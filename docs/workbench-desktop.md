---
layout: doc
---
# Using the Desktop Workbench

::: warning Beta
The Desktop Workbench (EvergreenUI) is currently in pre-release. Features and commands may change before the stable release.
:::

## Launching the Workbench

Import the module and run `Start-EvergreenUI` to open the Evergreen Workbench window:

```powershell
Import-Module EvergreenUI
Start-EvergreenUI
```

::: tip
`Start-EvergreenWorkbench` is available as an alias for `Start-EvergreenUI`.
:::

The UI opens to the Apps view by default. You can change the startup view and other preferences in [Settings](#settings).

## Apps view

The Apps view displays all 500+ applications supported by the Evergreen module in a searchable data grid. Select an application from the list on the left to view version and download metadata returned by `Get-EvergreenApp`.

![The Apps view showing Microsoft applications with channel, release, architecture, and file type filters](/img/ui/evergreen-workbench-apps.png)

Use the search box at the top of the application list to filter by name. The data grid on the right shows version details including Version, Date, Channel, Release, Architecture, Type, and URI.

### Dynamic filters

When you select an application, the filter panel updates automatically based on the properties that application returns. For example, selecting Adobe Acrobat Reader DC displays filters for Language, Architecture, and File type.

![Dynamic filters for Adobe Acrobat Reader DC showing Language, Architecture, and File type controls](/img/ui/evergreen-workbench-apps-filter.png)

Available filter properties vary by application and can include:

| Property | Example values |
|---|---|
| Architecture | x64, x86, ARM64 |
| Channel | Stable, Beta, Dev |
| Ring | Production, Enterprise |
| Language | English, English (UK) |
| Type | exe, msi, msix, zip |
| Release | General, Enterprise |

Select values in the filter panel to narrow down the results. Use **Clear filters** to reset, or **Export to CSV** to save the filtered results.

## Download view

To download application installers, select versions in the Apps view and click **Add to download queue**. Switch to the Download view to manage and start downloads.

![The Download view showing a queued download for Adobe Acrobat Reader DC](/img/ui/evergreen-workbench-download.png)

The Download view shows the queue with Status, App, Version, Architecture, and URI columns. Use the toolbar to:

- **Remove selected** - remove items from the queue
- **Clear queue** - remove all items
- **Open folder** - open the download output folder
- **Download all** - start downloading all queued items sequentially

A progress bar at the bottom tracks the current download. Downloads are processed sequentially and in queue order.

## Library view

If you have an existing [Evergreen library](/newlibrary), the Library view provides a GUI for browsing and updating it. Enter or browse to your library path to load the library contents.

![The Library view showing library contents and version details for Microsoft Edge](/img/ui/evergreen-workbench-library.png)

The Library view displays:

- **Library contents** - a table of applications in the library with app name, version count, and path
- **Selected app details** - version, URI, type, size, SHA256 hash, release, and file path for each version of the selected application

Use the toolbar to:

- **Browse** - select a library path
- **Open folder** - open the library directory
- **New library** - create a new Evergreen library (`New-EvergreenLibrary`)
- **Refresh library** - reload the library contents (`Get-EvergreenLibrary`)
- **Update library** - download the latest versions into the library (`Start-EvergreenLibraryUpdate`)

## Install view

::: warning In development
The Install feature is in development and may not function as expected. Package definition details will be documented at a later date.
:::

The Install view loads package definitions from a directory, compares the defined application versions against what is currently installed on the machine, and allows you to install or update applications directly.

![The Install view comparing installed and latest application versions](/img/ui/evergreen-workbench-install.png)

Each row shows:

- **App** - the application name and architecture
- **Publisher** - the application publisher
- **Installed** - the version currently installed on the machine (if any)
- **Latest** - the latest version available from Evergreen
- **Status** - whether the app is installed (up to date), installed (update needed), installed (latest not checked), or not installed
- **Action** - the available action: Install, Update, or none

Use the toolbar to:

- **Browse** - select the directory containing package definitions
- **Load definitions** - load or reload the package definition files
- **Find latest versions** - query Evergreen for the latest version of each defined application
- **Install selected** - install or update the selected applications

::: info
If the Workbench is not running elevated, installers may prompt for UAC elevation.
:::

## Import tab

The Import tab provides workflows for importing application packages into external platforms. It has three sub-tabs: **Microsoft Intune Win32 Apps**, **Nerdio Manager Shell Apps**, and **Authentication**.

### Microsoft Intune Win32 Apps

::: warning In development
The Intune import feature is in development and is not yet functional.
:::

Browse to a directory containing Intune package definitions, load them, and compare against the Win32 apps currently in your Intune tenant.

![The Import tab showing Microsoft Intune Win32 Apps with package definitions and import status](/img/ui/evergreen-workbench-import-intune.png)

The data grid shows each package definition with its publisher, Intune version (if already imported), definition version, match status, update requirements, and available action (Import as new app or update existing). Use **Import as new Win32 app** to push selected packages to Intune.

### Nerdio Manager Shell Apps

::: warning In development
The Nerdio Manager Shell Apps import works but has not been validated in production environments.
:::

Browse to a directory containing Nerdio Manager Shell App definitions, load them, and compare against the Shell Apps in your Nerdio Manager environment.

![The Import tab showing Nerdio Manager Shell Apps with version comparison](/img/ui/evergreen-workbench-import-nerdio.png)

The data grid shows the status of each definition - whether it is matched to an existing Shell App, whether an update is available, and the current versus latest Evergreen version. The status bar summarises the comparison results. Use the toolbar to add new versions to existing Shell Apps or import new ones.

### Authentication

The Authentication sub-tab manages connections to Entra ID, the Nerdio Manager API, and Azure Storage. These connections are required for the Intune and Nerdio Manager import workflows.

![The Authentication sub-tab showing Entra ID, Nerdio Manager API, and Azure Storage connections](/img/ui/evergreen-workbench-import-auth.png)

Configure the following:

- **Entra ID** - sign in with your tenant ID to connect to Microsoft Intune
- **Nerdio Manager API** - provide the NME Host, Client ID, API Scope, OAuth token URL, Client Secret, and Tenant ID to connect to Nerdio Manager
- **Azure Storage** - optionally configure a Subscription, Resource Group, Storage Account, and Container for storing application packages

## Update view

The Update view runs `Update-Evergreen` from the GUI to synchronise the local application definitions cache with the latest release from the [evergreen-apps](https://github.com/EUCPilots/evergreen-apps) repository.

![The Update view showing Update-Evergreen output with hash validation and sync progress](/img/ui/evergreen-workbench-update.png)

Click **Run Update-Evergreen** to start the update. The output panel displays timestamped log messages showing the cache check, download, hash validation, and sync progress. Use **Clear output** to reset the log.

## Settings

The Settings view configures general preferences and provider-specific options.

![The Settings view showing General, Nerdio Manager, and Microsoft Intune configuration](/img/ui/evergreen-workbench-settings.png)

### General

- **Download output path** - default directory for downloaded application installers
- **Evergreen apps path** - path to the local Evergreen application definitions cache (read-only, shows the value from `Get-EvergreenAppsPath`)
- **Log verbosity** - set the log output level (Normal or Verbose)
- **Theme** - switch between Light and Dark themes
- **Show Import tab** / **Show Install tab** - toggle visibility of the Import and Install views
- **Startup view** - choose which view opens when the Workbench launches (Apps, Download, Library, etc.)
- **App version cache** - cached version data is stored locally and loaded when you select an app; use **Clear cache** to force a fresh query on next selection

### Nerdio Manager

- **NerdioShellApps.psm1 path** - path to the Nerdio Shell Apps module file; use **Browse** to locate it and **Reload** to re-import

### Microsoft Intune

- **IntuneWin32App module** - status indicator showing whether the IntuneWin32App module is loaded; use **Reload** to re-import
- **Package output path** - directory for Intune Win32 package output files

## Log panel

The log panel at the bottom of the window displays timestamped messages at three levels:

- **Info** - progress updates and status messages
- **Warning** - non-critical issues (e.g., a download URL returned a redirect)
- **Error** - failures during version lookups, downloads, or library updates

![The progress log panel showing detailed operation output](/img/ui/evergreen-workbench-progresslog.png)

Use **Copy log**, **Save log**, or **Show progress log** / **Hide progress log** to manage the log output. Log messages are generated in real time from background runspaces as operations execute.
