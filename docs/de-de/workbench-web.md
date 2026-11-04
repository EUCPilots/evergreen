---
layout: doc
---
# Web Workbench verwenden

Die Evergreen Web Workbench ist eine browserbasierte Anwendung zum Erkunden von Anwendungsversionsdaten, die vom Modul [Evergreen](/de-de/about) erfasst werden. Sie ist auf jeder Plattform verfügbar und kann hier geöffnet werden:

**[eucpilots.com/workbench](https://eucpilots.com/workbench)**

::: tip
Die Web Workbench kann als Progressive Web App (PWA) installiert und eigenständig verwendet werden. Fügen Sie sie mit der Installationsoption Ihres Browsers zum Desktop oder Startbildschirm hinzu.
:::

## Dashboard

Das Dashboard bietet eine Übersicht über alle von Evergreen erfassten Anwendungen.

![Dashboard der Web Workbench mit Zusammenfassungsstatistiken, Diagrammen und letzten Aktivitäten](/img/webui/webworkbench-dashboard.jpeg)

### Zusammenfassungsstatistiken

In der oberen Zeile werden wichtige Kennzahlen angezeigt:

| Kennzahl | Beschreibung |
|---|---|
| Erfasste Apps | Gesamtzahl der von Evergreen erfassten Anwendungen |
| Versionseinträge | Gesamtzahl der Versionsdatensätze für alle Anwendungen |
| Architekturen | Anzahl verschiedener CPU-Architekturen (x64, x86, ARM64 usw.) |
| Dateitypen | Anzahl verschiedener Installerformate (exe, msi, msix, zip usw.) |
| Kürzlich aktualisiert | Anwendungen, deren Daten in den letzten 48 Stunden aktualisiert wurden |

### Diagramme

Zwei horizontale Balkendiagramme veranschaulichen die Verteilung der Versionseinträge:

- **Architektur** – Aufschlüsselung nach CPU-Architektur (x64, x86, ARM64, aarch64 usw.)
- **Dateityp** – Aufschlüsselung nach Installerformat (exe, msi, msix, zip, cab usw.)

### URI-Suche

Fügen Sie eine Download-URL in das URI-Suchfeld ein, um die zugehörige Evergreen-Anwendung zu ermitteln.

### Letzte Aktivitäten

Eine Liste der Anwendungen mit den neuesten Datenaktualisierungen, die den Anwendungsnamen und den Zeitpunkt der letzten Aktualisierung anzeigt.

## Apps-Ansicht

In der Apps-Ansicht werden links in einer Seitenleiste alle von Evergreen unterstützten Anwendungen und rechts die Versionsdetails aufgelistet. Wählen Sie eine Anwendung aus, um ihre Versionseinträge anzuzeigen.

![Apps-Ansicht mit Adobe Acrobat Reader DC und den Spalten für Version, Sprache, Größe, Architektur und URI](/img/webui/webworkbench-apps.jpeg)

Die Seitenleiste zeigt Folgendes an:

- **Anwendungsanzahl** – Gesamtzahl und Anzahl aktiver Filter
- **Suchfeld** – filtern Sie die Anwendungsliste nach Namen
- **Sternsymbol** – Anwendungen mit aktuellen Updates sind hervorgehoben
- **Filter „Kürzlich aktualisiert“** – beschränkt die Seitenleiste auf Anwendungen, die in den letzten 24 Stunden, 48 Stunden, 72 Stunden oder einer Woche aktualisiert wurden

Die Tabelle mit den Versionsdetails enthält folgende Spalten:

| Spalte | Beschreibung |
|---|---|
| Version | Versionszeichenfolge der Anwendung |
| Sprache | Sprache oder Gebietsschema des Installers |
| Größe | Dateigröße des Installers in MB |
| Architektur | CPU-Architektur (x64, x86, ARM64 usw.) |
| URI | Direkte Download-URL des Installers |

Je nach Anwendung sind weitere Spalten verfügbar (Channel, Release, Date, Expiry, SHA256, Type). Mit der Schaltfläche **Spalten** können Sie Spalten ein- oder ausblenden.

### Filter für Architektur und Typ

Oben im Detailbereich können Sie die Ergebnisse mithilfe von Kontrollkästchen nach Architektur (z. B. x64, x86) und Dateityp (z. B. exe, msi) eingrenzen. Die Anzahl der passenden Ergebnisse wird beim Aktivieren und Deaktivieren der Filter aktualisiert.

### Symbolleiste

Die Symbolleiste über der Versionstabelle bietet:

- **Befehl Get-EvergreenApp** – Kopierschaltfläche mit dem PowerShell-Befehl zum Abrufen derselben Daten (z. B. `Get-EvergreenApp -Name AdobeAcrobatReaderDC`)
- **RSS** – Link zum RSS-Feed der ausgewählten Anwendung
- **Aktualisierungsdatum** – zeigt an, wann die Anwendungsdaten zuletzt aktualisiert wurden
- **Suche löschen** – Suchtext in der Seitenleiste löschen
- **Filter löschen** – alle Spalten- und Architektur-/Typfilter zurücksetzen
- **Spalten** – Tabellenspalten ein- oder ausblenden
- **Als CSV exportieren** – die aktuell gefilterte Ansicht als CSV-Datei herunterladen

## Filtern

Unter der Überschrift jeder Spalte der Tabelle mit Versionsdetails befindet sich ein Textfilterfeld. Geben Sie einen Suchtext in ein beliebiges Filterfeld ein, um die Ergebnisse auf passende Zeilen einzugrenzen.

![Apps-Ansicht mit einem Filter für die Spalte Sprache, der nur englische Ergebnisse anzeigt](/img/webui/webworkbench-filter.jpeg)

Spaltenfilter funktionieren gemeinsam mit den Kontrollkästchenfiltern für Architektur und Typ. Sie können beispielsweise das Kontrollkästchen für die Architektur x64 aktivieren und im Sprachfilter „English“ eingeben, um nur englische x64-Installer anzuzeigen.

Klicken Sie auf **Filter löschen**, um alle Spaltenfilter zurückzusetzen, oder auf **Suche löschen**, um die Suche in der Seitenleiste zurückzusetzen.

## Suchen

### Suche in der Seitenleiste

Das Suchfeld oben in der Anwendungsseitenleiste filtert die Anwendungsliste während der Eingabe. Es wird nur nach Anwendungsnamen gesucht.

![Apps-Ansicht mit einer Seitenleistenfilterung, die nur Microsoft-Edge-Anwendungen anzeigt](/img/webui/webworkbench-searchapps.jpeg)

### Globale Suche

Drücken Sie **Ctrl+K** (oder klicken Sie auf das Suchsymbol in der oberen Leiste), um die globale Suche zu öffnen. Die globale Suche findet Übereinstimmungen in allen Anwendungsnamen und Download-URIs.

![Globale Suchüberlagerung mit Suchergebnissen aus Anwendungsnamen und URIs](/img/webui/webworkbench-search.jpeg)

Navigieren Sie mit den Pfeiltasten durch die Ergebnisse und drücken Sie **Enter**, um ein Ergebnis auszuwählen. Drücken Sie **Esc**, um die globale Suche zu schließen.

## Weitere Funktionen

### Als PWA installieren

Die Web Workbench ist eine Progressive Web App. Verwenden Sie die Installationsoption Ihres Browsers (üblicherweise in der Adressleiste oder im Browsermenü), um sie als eigenständige Anwendung unter Windows, macOS, Linux oder auf Mobilgeräten zu installieren.

### Design

Wechseln Sie mit der Designschaltfläche (Mond-/Sonnensymbol) oben rechts auf der Seite zwischen hellem und dunklem Design.

### RSS-Feeds

Für jede Anwendung ist über den Link **RSS** in der Symbolleiste ein RSS-Feed verfügbar. Abonnieren Sie den Feed einer Anwendung, um benachrichtigt zu werden, wenn neue Versionsdaten verfügbar sind.

### Tastenkombinationen

Drücken Sie **?**, um die verfügbaren Tastenkombinationen anzuzeigen. Dazu gehören:

- **Ctrl+K** – globale Suche öffnen
- **?** – Tastenkombinationen anzeigen
