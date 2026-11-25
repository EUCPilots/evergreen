---
layout: doc
---
# About the Evergreen Workbench

The Evergreen Workbench is a graphical interface for exploring application version data from the [Evergreen](/about) PowerShell module. It is available in two editions - a **Windows Workbench**, and a **Web Workbench** that runs in any modern browser.

::: info
This page reflects EvergreenUI features and functions starting with version **2.0.1-preview**.
:::

## Windows vs Web

| | Windows Workbench | Web Workbench |
|---|---|---|
| **Platform** | Windows (WPF, PowerShell 7.6+) | Any modern browser |
| **Install** | PowerShell module ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | No install - hosted at [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Browse apps** | Yes | Yes |
| **Search and filter** | Yes | Yes |
| **Dashboard** | - | Yes |
| **Download installers** | Yes | - |
| **Library management** | Yes | - |
| **Definitions and local install** | Yes (pre-release) | - |
| **Publish to Intune / Nerdio Manager** | Yes (pre-release) | - |
| **Microsoft 365 Apps packages** | Yes (pre-release) | - |
| **Scriptable commands** | Yes (`Ew` commands) | - |
| **Export to CSV** | Yes | Yes |
| **RSS feeds** | - | Yes (per app) |
| **PWA install** | - | Yes |
| **Theme** | Light / Dark | Light / Dark |

## Windows Workbench

::: warning Beta
The Windows Workbench (EvergreenUI) is currently in pre-release. Features and commands may change before the stable release.
:::

The Windows Workbench is a WPF-based graphical frontend shipped as the `EvergreenUI` PowerShell module. It wraps the same cmdlets you already use (`Get-EvergreenApp`, `Save-EvergreenApp`, `Update-EvergreenLibrary`, etc.) behind an interactive Windows desktop interface.

Key capabilities:

- **Apps** - browse and filter every Evergreen application, choose visible columns, export to CSV, and queue downloads across applications
- **Library** - read, update and selectively remove applications or versions in a local Evergreen library
- **Packages** - load and update `App.json` definitions and test local installation with architecture safeguards
- **Intune** - compare definitions with Win32 apps, then build and publish them with supersedence
- **Nerdio** - compare Shell Apps, publish apps and versions, and prune old versions
- **Microsoft 365 Apps** - build and publish Office packages to Intune or Nerdio Manager
- **Headless commands** - the same functionality as scriptable `Ew` commands and background jobs
- **Settings and About** - saved folders, theme, and dependency status

Learn more:

- [Installing the Windows Workbench](/workbench-install)
- [Using the Windows Workbench](/workbench-desktop)
- [Packages, definitions and local install](/workbench-packages)
- [Publishing to Microsoft Intune](/workbench-intune)
- [Publishing to Nerdio Manager](/workbench-nerdio)
- [Microsoft 365 Apps packages](/workbench-m365)
- [Windows Workbench command reference](/workbench-commands)

## Web Workbench

The Web Workbench is a browser-based application at [eucpilots.com/workbench](https://eucpilots.com/workbench). It provides a read-only view of all Evergreen-tracked applications - no PowerShell or Windows required.

![The Web Workbench Dashboard](/img/webui/webworkbench-dashboard.jpeg)

Key capabilities:

- **Dashboard** with summary statistics, architecture and file type charts, URI lookup, and recent activity
- **Browse and filter** all Evergreen-supported applications with sortable columns and per-column filters
- **Search** across all applications and download URIs with the global search overlay
- **Export** filtered results to CSV
- **RSS feeds** for individual applications
- **Install as a PWA** for a standalone app experience on any platform

See [Using the Web Workbench](/workbench-web) for full details.
