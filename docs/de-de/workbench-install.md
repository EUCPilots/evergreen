---
layout: doc
---
# Windows Workbench installieren

::: warning Betaversion
Windows Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Installieren Sie sie mit dem Flag `-AllowPrerelease`. Funktionen und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

::: info
Diese Seite beschreibt die Funktionen und Features von EvergreenUI ab Version **2.0.1-preview**.
:::

## Voraussetzungen

| Voraussetzung | Mindestversion |
|---|---|
| Betriebssystem | Windows 10 / Windows Server 2019 oder höher |
| PowerShell | 7.6 oder höher (nur PowerShell Core) |
| Evergreen-Modul | 2603.2832.0 oder höher |

::: info
Die Windows Workbench ist nur unter Windows verfügbar, da sie auf WPF basiert. Es sind keine zusätzlichen DLLs erforderlich – die Benutzeroberfläche verwendet WPF-Assemblys, die mit Windows ausgeliefert werden. Windows PowerShell 5.1 wird nicht unterstützt.
:::

## Optionale Module

Das Evergreen-Modul ist die einzige erforderliche Abhängigkeit. Diese Module sind optional und werden nur geprüft, wenn der jeweilige Workflow verwendet wird. Die Workbench installiert sie nicht; prüfen Sie ihren Status in der [Infoansicht](/de-de/workbench-desktop#about) oder mit `Get-EwDependency`.

| Modul | Benötigt für |
|---|---|
| `IntuneWin32App` | Erstellung von Intune-Win32-Paketen |
| `Microsoft.Graph.Authentication` | Anmeldung bei Microsoft Intune |
| `Az.Accounts`, `Az.Resources`, `Az.Storage` | Azure-/Nerdio-Speicherermittlung und Veröffentlichung |

```powershell
Install-Module -Name IntuneWin32App, Microsoft.Graph.Authentication -Scope CurrentUser
Install-Module -Name Az.Accounts, Az.Resources, Az.Storage -Scope CurrentUser
```

## Installation aus der PowerShell Gallery

Das EvergreenUI-Modul wird in der PowerShell Gallery veröffentlicht: [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/).

Da sich EvergreenUI derzeit in der Vorabversion befindet, müssen Sie das Flag `-AllowPrerelease` angeben:

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

Das Evergreen-Modul ist im EvergreenUI-Modulmanifest als Abhängigkeit aufgeführt. Wenn Evergreen noch nicht installiert ist, installiert PowerShell es automatisch.

### Modul aktualisieren

So aktualisieren Sie auf die neueste Vorabversion:

```powershell
Update-Module -Name EvergreenUI -AllowPrerelease -Force
```

## Installation aus dem Quellcode

So führen Sie Windows Workbench aus einer geklonten Kopie des Repositorys aus:

```powershell
# Zuerst die Evergreen-Abhängigkeit installieren
Install-Module -Name Evergreen -Scope CurrentUser

# Repository klonen und das Modul direkt importieren
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Installation überprüfen

Überprüfen Sie nach der Installation, ob das Modul verfügbar ist:

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```

## Workbench starten

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Siehe [Windows Workbench verwenden](/de-de/workbench-desktop).

## Speicherorte der Einstellungen

| Element | Speicherort |
|---|---|
| Einstellungen und gespeicherter Oberflächenstatus | `%APPDATA%\EvergreenWorkbench\settings.json` |
| Nerdio-Wiederherstellungsdaten (ohne Geheimnisse) | `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json` |
| Cache | `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
