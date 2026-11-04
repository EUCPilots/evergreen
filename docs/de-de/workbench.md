---
layout: doc
---
# Informationen zur Evergreen Workbench

Die Evergreen Workbench ist eine grafische Oberfläche zum Erkunden von Anwendungsversionsdaten aus dem PowerShell-Modul [Evergreen](/de-de/about). Sie ist in zwei Editionen verfügbar: als **Desktop Workbench** für Windows und als **Web Workbench**, die in jedem modernen Browser ausgeführt wird.

::: info
Diese Seite beschreibt die Funktionen und Features von EvergreenUI ab Version **1.0.21**.
:::

## Desktop und Web im Vergleich

| | Desktop Workbench | Web Workbench |
|---|---|---|
| **Plattform** | Windows (WPF) | Jeder moderne Browser |
| **Installation** | PowerShell-Modul ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | Keine Installation – gehostet unter [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Apps durchsuchen** | Ja | Ja |
| **Suchen und filtern** | Ja | Ja |
| **Dashboard** | – | Ja |
| **Installer herunterladen** | Ja | – |
| **Bibliotheksverwaltung** | Ja | – |
| **Apps installieren/aktualisieren** | Ja (Vorabversion) | – |
| **In Intune/Nerdio/Microsoft 365 Apps importieren** | Ja (Vorabversion) | – |
| **Als CSV exportieren** | Ja | Ja |
| **RSS-Feeds** | – | Ja (pro App) |
| **Als PWA installieren** | – | Ja |
| **Design** | Hell/Dunkel | Hell/Dunkel |

## Desktop Workbench

::: warning Betaversion
Die Desktop Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Features und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

Die Desktop Workbench ist eine WPF-basierte grafische Oberfläche, die als PowerShell-Modul `EvergreenUI` bereitgestellt wird. Sie stellt dieselben Cmdlets, die Sie bereits verwenden (`Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate` usw.), über eine interaktive Windows-Desktopoberfläche bereit.

![Apps-Ansicht der Desktop Workbench](/img/ui/evergreen-workbench-apps.png)

Wichtige Funktionen:

- **Durchsuchen und filtern** aller von Evergreen unterstützten Anwendungen mit dynamischen Filterbereichen
- **Herunterladen** von Anwendungsinstallern über eine Downloadwarteschlange
- **Verwalten von Bibliotheken** – Evergreen-Bibliotheken auf dem Datenträger erstellen, durchsuchen und aktualisieren
- **Installieren und aktualisieren** von Anwendungen direkt anhand von Paketdefinitionen *(Vorabversion-Workflow)*
- **Importieren** von Anwendungspaketen in Microsoft Intune (Win32-Apps), Nerdio Manager (Shell Apps) und Microsoft-365-Apps-Workflows *(Vorabversion-Workflows)*
- **Einstellungen** für Downloadpfade, Designs, Protokollausführlichkeit und Anbieterkonfiguration

Ausführliche Informationen finden Sie unter [Desktop Workbench installieren](/de-de/workbench-install) und [Desktop Workbench verwenden](/de-de/workbench-desktop).

## Web Workbench

Die Web Workbench ist eine browserbasierte Anwendung unter [eucpilots.com/workbench](https://eucpilots.com/workbench). Sie bietet eine schreibgeschützte Ansicht aller von Evergreen nachverfolgten Anwendungen – PowerShell oder Windows sind nicht erforderlich.

![Dashboard der Web Workbench](/img/webui/webworkbench-dashboard.jpeg)

Wichtige Funktionen:

- **Dashboard** mit Zusammenfassungsstatistiken, Diagrammen zu Architektur und Dateityp, URI-Suche und aktuellen Aktivitäten
- **Durchsuchen und filtern** aller von Evergreen unterstützten Anwendungen mit sortierbaren Spalten und Filtern pro Spalte
- **Suchen** in allen Anwendungen und Download-URIs mit der globalen Suchüberlagerung
- **Exportieren** gefilterter Ergebnisse als CSV
- **RSS-Feeds** für einzelne Anwendungen
- **Als PWA installieren** für eine eigenständige App auf jeder Plattform

Ausführliche Informationen finden Sie unter [Web Workbench verwenden](/de-de/workbench-web).
