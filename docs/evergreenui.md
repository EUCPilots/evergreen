---
layout: doc
---
# About EvergreenUI

::: warning Beta
EvergreenUI is currently in pre-release. Core functionality is implemented and published to the PowerShell Gallery as a beta module. Features and commands may change before the stable release.
:::

EvergreenUI is a WPF-based graphical frontend for the [Evergreen](/about) PowerShell module. It provides a Windows desktop GUI for browsing, filtering, and downloading application installers — without needing to write PowerShell commands.

![The Evergreen Workbench Apps view](/img/ui/evergreen-workbench-apps.png)

EvergreenUI ships as a separate PowerShell module (`EvergreenUI`) so it never modifies the core Evergreen module. It wraps the same cmdlets you already use (`Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate`, etc.) behind an interactive interface.

## Features

- **Apps view** — search and browse all 500+ Evergreen-supported applications in a data grid with version and download metadata from `Get-EvergreenApp`
- **Dynamic filters** — the filter panel builds itself at runtime from whatever properties a given application returns (Architecture, Channel, Ring, Language, Type, Release, etc.)
- **Download queue** — select multiple application and version combinations and download them sequentially via `Save-EvergreenApp`
- **Library management** — inspect and update an Evergreen library on disk using `Start-EvergreenLibraryUpdate` and related library cmdlets
- **Install view** — load package definitions, compare installed versus latest versions, and install or update applications directly from the UI
- **Import tab** — import application packages into Microsoft Intune as Win32 apps or compare and update Nerdio Manager Shell Apps
- **Update view** — run `Update-Evergreen` from the GUI to synchronise the local application definitions cache
- **Settings** — configure download paths, library paths, theme, log verbosity, startup view, and provider-specific settings for Nerdio Manager and Microsoft Intune
- **Fluent UI design** — light and dark themes aligned to the Evergreen brand palette
- **Real-time log panel** — timestamped progress log with Info, Warning, and Error levels, updated live from background runspaces
- **Session persistence** — last-used paths, theme, window size, and startup view stored in `$env:APPDATA\EvergreenUI\settings.json`

## How it works

EvergreenUI runs entirely in WPF — no external DLLs or frameworks are required beyond what ships with Windows. The UI uses a multi-threaded runspace model to keep the interface responsive while long-running Evergreen operations (version lookups, downloads, library updates) execute in the background.

Under the hood, every operation delegates to the core Evergreen cmdlets. EvergreenUI does not implement its own application discovery or download logic.

## Source code

EvergreenUI is open source and available on GitHub:

- **Repository:** [EUCPilots/evergreen-ui](https://github.com/EUCPilots/evergreen-ui)
- **Licence:** MIT
- **PowerShell Gallery:** [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)
