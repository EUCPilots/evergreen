---
layout: doc
---
# Using the Windows Workbench

::: warning Pre-release
The Windows Workbench (EvergreenUI) is currently in pre-release. Features and commands may change before the stable release.
:::

::: info
This page reflects EvergreenUI features and functions starting with version **2.0.5-preview**.
:::

## Launching the Workbench

Import the module and run `Start-EvergreenWorkbench` to open the Workbench window:

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

`Start-EvergreenWorkbench` loads WPF on demand. If your PowerShell session is not running in a single-threaded apartment (STA), the Workbench hosts the window on a dedicated STA runspace, so no special start-up switches are needed. The Workbench is Windows-only and requires PowerShell 7.6 or later.

The Workbench restores its window size and maximised state, the last page you viewed, the last selected application, the width of the application list and the height of the download queue when it starts. It follows the Windows light or dark theme by default and uses Mica on supported systems; Windows transparency and contrast settings can produce an opaque background.

## Navigation

The navigation rail on the left switches between the main views. Use the toggle at the top of the rail to switch between expanded and compact (icon only) navigation.

| View | Purpose |
|---|---|
| **Apps** | Browse applications, inspect and filter versions, queue and download installers, and maintain Evergreen data |
| **Library** | Read, update and remove content in a local Evergreen library |
| **Packages** | Manage App.json definitions and test local installation |
| **Intune** | Compare, build and publish Win32 apps and Microsoft 365 Apps to Microsoft Intune |
| **Nerdio** | Compare and publish Shell Apps and Microsoft 365 Apps to Nerdio Manager |
| **Settings** | Saved folders and appearance |
| **About** | Workbench metadata and dependency status |

The **Activity log** at the bottom of the window records timestamped Info, Warning and Error messages from every view. Drag its handle (or use the up and down arrow keys) to resize it, and collapse it when you do not need it. Long-running work runs in a shared pool of up to four background workers so the window stays responsive. Views that start work disable conflicting actions until the active operation finishes, and the window cannot be closed while the Workbench is writing maintenance changes.

## Apps

The Apps view lists every application in the Evergreen catalog. Select an application to resolve its versions with `Get-EvergreenApp` and display them in the versions table.

- **Search** - filter the application list by name.
- **Favourites** - click the star to pin an application to the top of the list. Favourites are saved in your Workbench settings.
- **Resize** - drag the divider to change the width of the application list. The width is remembered.

### Filtering versions

The filter panel adapts to the properties the selected application returns, such as Architecture, Channel, Language, Type or Release. Each filter is a multi-select drop-down:

- Values within one property combine with **OR**.
- Different properties combine with **AND**.
- No selection means **All**.

### Versions table

The versions table shows every property returned for the selected application, including properties that appear on only some rows. Familiar columns (such as Version, Date, Channel and Architecture) appear first, followed by app-specific properties, with **URI** last. Missing values are blank.

- Click a column header to sort ascending, then again to sort descending.
- **Columns** shows or hides optional columns. **Version** and **URI** can never be hidden. The choice applies to every application and is remembered between sessions.
- **Export to CSV** saves the filtered rows and visible columns, in their current order.
- Right-click a row to **Copy URI** or **Open URI**.

### Downloading installers

Select one or more rows and choose **Add to queue**. The queue spans applications, so you can batch downloads from several apps. Use **Show queue** to expand the queue tray, and drag its handle to resize it.

Each queue row shows the application, Version, Architecture, Status, URI and, after download, the **Saved file**. Row actions let you download a single item or remove it.

| Action | Result |
|---|---|
| **Download now** | Download the queued items to the download folder |
| **Clear completed** | Remove downloaded and failed rows |
| **Clear queue** | Remove every queued row (not available while a download is running) |
| **Open folder** | Open the folder that contains a downloaded file |
| **Change** | Change the download folder |

The download folder is saved in your settings and is shown beside the queue. A progress bar tracks the active download.

### Maintenance

The **Actions...** menu on the Apps view provides maintenance tasks:

| Action | What it does |
|---|---|
| **Refresh** | Reload the application catalog |
| **Reload selected app versions** | Bypass the cache for the selected application |
| **Update Evergreen** | Update the Evergreen application data (`Update-Evergreen`). This does not upgrade the installed PowerShell module |
| **Clear Workbench cache** | After confirmation, clear the cached catalog and version data under `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
| **Open cache folder** | Open the cache folder, creating it if needed |

`Get-EvergreenApp` results are cached as one JSON file per application for 24 hours. Clearing the cache does not remove Evergreen application data, downloaded installers, Library contents, settings or provider recovery records. Maintenance runs in the background, refreshes Apps afterwards while preserving your selection, search, filters and queued downloads, and reports partial failures without retrying automatically.

## Library

The Library view reads and manages an initialised [Evergreen library](/newlibrary).

- **Library location** - a drop-down listing your 10 most recently saved library folders, with **Browse** and **Save path** options. The folder must contain `EvergreenLibrary.json`.
- **Load** - read the library inventory.
- **Update library** - download the latest versions of every application in the library (`Update-EvergreenLibrary`).
- **Open folder** - open the library folder in File Explorer.

The top table lists each application with its **Versions** count and **Location**. The bottom table lists the versions of the selected application, including Version, Architecture, Type, the local installer **Location** (hover to see the full path) and URI. Right-click either table and choose **Open folder** to open the application or installer folder.

### Removing content

Removal is independent of Evergreen's retention command:

- **Remove application** - removes the selected application, its recorded installers and its library registration, so later library updates do not download it again.
- **Remove versions** - removes only the selected rows in the versions table. Use **Ctrl** or **Shift** to select several rows. Other architectures or installer types that share the same version number are not affected.

Each action asks for confirmation, with **Cancel** as the default. Removal deletes only recorded installer files inside the application's folder, preserves files still referenced by the retained inventory, and leaves unrecorded files alone. Unsafe paths or a manifest that has changed since you loaded it abort the removal. Failures stop further work, report any partial changes and reload the inventory; destructive work is never retried automatically.

::: warning
Removal cannot be undone. If deletion stops before the manifest is written, rows can remain listed even though some installer files were removed. Review the reported paths.
:::

## Packages

The Packages view has two tabs, **Definitions** and **Install**. See [Packages, definitions and local install](/workbench-packages) for details.

## Intune

The Intune view compares your App.json definitions with Win32 apps in Microsoft Intune, builds and publishes packages, and manages supersedence. It also hosts the Microsoft 365 Apps workflow for Intune. See [Publishing to Microsoft Intune](/workbench-intune).

## Nerdio

The Nerdio view connects to Azure and the Nerdio Manager API, compares Shell App definitions, publishes new apps and versions, and prunes old versions. It also hosts the Microsoft 365 Apps workflow for Nerdio. See [Publishing to Nerdio Manager](/workbench-nerdio) and [Microsoft 365 Apps packages](/workbench-m365).

## Settings

The Settings view shows the folders saved for each workflow and the appearance options.

**Saved folders**

| Folder | Used by |
|---|---|
| **Download folder** | Apps downloads |
| **Library folder** | Library |
| **Packages definitions folder** | Packages and Intune |
| **Package output folder** | Intune package builds |
| **Microsoft 365 Apps configurations folder** | Microsoft 365 Apps in Intune and Nerdio (shared) |
| **Nerdio Manager Shell Apps directory** | Nerdio Shell Apps |

Use **Browse** to save a folder, or use the controls in each workflow. Changing one of the three workflow folders in Settings replaces any unsaved folder edit in that workflow. **Open folder** is available only when the folder can be reached.

**Maintenance**

- **Update Evergreen** refreshes Evergreen application data; it does not upgrade the installed PowerShell module.
- **Clear Workbench cache** asks for confirmation before clearing cached catalog and version data.
- **Open cache folder** opens the Workbench cache location.

**Window layout and defaults**

- **Reset window layout** restores the saved window size and panel layout to their defaults.
- **Restore Workbench defaults** asks for confirmation before restoring settings and UI preferences. It does not delete downloads, Library contents or provider recovery records.

**Appearance**

- **Color theme** - choose **System**, **Light** or **Dark**.

The Nerdio Azure and API setup lives in the Nerdio view, on its Settings tab.

Settings and saved interface state are stored in `%APPDATA%\EvergreenWorkbench\settings.json`. Authentication tokens and client secrets are held in memory only and are never written to settings.

## About

The About view shows Workbench metadata (name, version, prerelease label, project URI and description) and a **Dependencies** table listing each module with its purpose, the minimum version, the highest **Installed** version discoverable locally and the version **Loaded (window)** in the Workbench runspace. Loaded versions can differ from your calling session or a background job.

Status refreshes when About opens and on request. It never installs, updates or imports optional dependencies, and if a refresh fails the previous results stay visible and are marked stale.

## Using the commands without the window

Everything the Workbench does is available as PowerShell commands, including background jobs, definitions, publishing and cache maintenance. See [Windows Workbench command reference](/workbench-commands).
