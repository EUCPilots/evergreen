---
layout: doc
---
# Desktop Workbench installieren

::: warning Betaversion
Die Desktop Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Installieren Sie sie mit dem Flag `-AllowPrerelease`. Features und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

::: info
Diese Seite beschreibt die Funktionen und Features von EvergreenUI ab Version **1.0.21**.
:::

## Voraussetzungen

| Voraussetzung | Mindestversion |
|---|---|
| Operating system | Windows 10 / Windows Server 2019 or later |
| PowerShell | 5.1 (Desktop) or 7.0+ |
| .NET | .NET Framework 4.7.2+ (for PowerShell 5.1) or .NET 6+ (for PowerShell 7+) |
| Evergreen module | 2603.2832.0 or later |

::: info
Die Desktop Workbench ist nur unter Windows verfügbar, da sie auf WPF basiert. Es sind keine zusätzlichen DLLs erforderlich – die Benutzeroberfläche verwendet WPF-Assemblys, die mit Windows ausgeliefert werden.
:::

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

So führen Sie die Desktop Workbench aus einer geklonten Kopie des Repositorys aus:

```powershell
# Install the Evergreen dependency first
Install-Module -Name Evergreen -Scope CurrentUser

# Clone the repository and import the module directly
git clone https://github.com/EUCPilots/evergreen-ui.git
Import-Module ./evergreen-ui/EvergreenUI/EvergreenUI.psd1
```

## Installation überprüfen

Überprüfen Sie nach der Installation, ob das Modul verfügbar ist:

```powershell
Get-Module -Name EvergreenUI -ListAvailable
```
