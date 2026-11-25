---
layout: doc
---
# Informationen zur Evergreen Workbench

Die Evergreen Workbench ist eine grafische Oberfläche zum Erkunden von Anwendungsversionsdaten aus dem PowerShell-Modul [Evergreen](/de-de/about). Sie ist in zwei Editionen verfügbar: als **Windows Workbench** für Windows und als **Web Workbench**, die in jedem modernen Browser ausgeführt wird.

::: info
Diese Seite beschreibt die Funktionen und Features von EvergreenUI ab Version **2.0.1-preview**.
:::

## Windows Workbench und Web Workbench

| | Windows Workbench | Web Workbench |
|---|---|---|
| **Plattform** | Windows (WPF, PowerShell 7.6+) | Jeder moderne Browser |
| **Installation** | PowerShell-Modul ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | Keine Installation – gehostet unter [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Apps durchsuchen** | Ja | Ja |
| **Suchen und filtern** | Ja | Ja |
| **Dashboard** | – | Ja |
| **Installer herunterladen** | Ja | – |
| **Bibliotheksverwaltung** | Ja | – |
| **Definitionen und lokale Installation** | Ja (Vorabversion) | – |
| **In Intune/Nerdio Manager veröffentlichen** | Ja (Vorabversion) | – |
| **Microsoft-365-Apps-Pakete** | Ja (Vorabversion) | – |
| **Scriptfähige Befehle** | Ja (`Ew`) | – |
| **Als CSV exportieren** | Ja | Ja |
| **RSS-Feeds** | – | Ja (pro App) |
| **Als PWA installieren** | – | Ja |
| **Design** | Hell/Dunkel | Hell/Dunkel |

## Windows Workbench

::: warning Betaversion
Die Windows Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Features und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

Die Windows Workbench ist eine WPF-basierte grafische Oberfläche, die als PowerShell-Modul `EvergreenUI` bereitgestellt wird. Sie stellt dieselben Cmdlets bereit, die Sie bereits verwenden (`Get-EvergreenApp`, `Save-EvergreenApp`, `Update-EvergreenLibrary` usw.).

Wichtige Funktionen:

- **Apps** - alle Evergreen-Anwendungen durchsuchen und filtern, sichtbare Spalten auswählen und Downloads in eine Warteschlange stellen
- **Bibliothek** - Anwendungen oder Versionen in einer lokalen Evergreen-Bibliothek lesen, aktualisieren und gezielt entfernen
- **Pakete** - `App.json`-Definitionen laden und aktualisieren sowie die lokale Installation testen
- **Intune** - Definitionen mit Win32-Apps vergleichen und Pakete erstellen und veröffentlichen
- **Nerdio** - Shell Apps vergleichen, Apps und Versionen veröffentlichen und alte Versionen bereinigen
- **Microsoft 365 Apps** - Office-Pakete für Intune oder Nerdio Manager erstellen und veröffentlichen
- **Headless-Befehle** - dieselben Funktionen als scriptfähige `Ew`-Befehle
- **Einstellungen und Info** - gespeicherte Ordner, Design und Abhängigkeitsstatus

Weitere Informationen:

- [Windows Workbench installieren](/de-de/workbench-install)
- [Windows Workbench verwenden](/de-de/workbench-desktop)
- [Pakete, Definitionen und lokale Installation](/de-de/workbench-packages)
- [In Microsoft Intune veröffentlichen](/de-de/workbench-intune)
- [In Nerdio Manager veröffentlichen](/de-de/workbench-nerdio)
- [Microsoft 365 Apps-Pakete](/de-de/workbench-m365)
- [Windows Workbench-Befehlsreferenz](/de-de/workbench-commands)

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
