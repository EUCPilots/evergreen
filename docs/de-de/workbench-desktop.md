---
layout: doc
---
# Desktop Workbench verwenden

::: warning Beta
Die Desktop Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Features und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

::: info
Diese Seite beschreibt die Funktionen und Features von EvergreenUI ab Version **1.0.21**.
:::

## Workbench starten

Importieren Sie das Modul und führen Sie `Start-EvergreenWorkbench` aus, um das Fenster der Evergreen Workbench zu öffnen:

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

Beim erneuten Öffnen stellt die Workbench die zuletzt verwendete Ansicht wieder her. Wenn die gespeicherte Ansicht deaktiviert ist, wird stattdessen die Apps-Ansicht angezeigt.

Verwenden Sie den Umschalter der Navigationsleiste, um zwischen der erweiterten und kompakten Navigation zu wechseln.

![Apps-Ansicht mit Microsoft-Anwendungen sowie Filtern für Kanal, Release, Architektur und Typ](/img/ui/evergreen-workbench-collapsed.png)

## Apps-Ansicht

Die Apps-Ansicht zeigt alle über 500 vom Evergreen-Modul unterstützten Anwendungen in einem durchsuchbaren Datengitter an. Wählen Sie eine Anwendung aus der Liste links aus, um die von `Get-EvergreenApp` zurückgegebenen Versions- und Downloadmetadaten anzuzeigen.

![Apps-Ansicht mit Microsoft-Anwendungen sowie Filtern für Kanal, Release, Architektur und Typ](/img/ui/evergreen-workbench-apps.png)

Verwenden Sie das Suchfeld oben in der Anwendungsliste, um nach Namen zu filtern. Das Datengitter rechts zeigt Versionsdetails wie Version, Datum, Kanal, Release, Architektur, Typ und URI an.

Sie können häufig verwendete Anwendungen in der Liste links mit einem Stern markieren. Favoriten werden oben in der Liste angeheftet und in den lokalen Workbench-Einstellungen gespeichert.

Wenn für die ausgewählte App zwischengespeicherte Daten vorhanden sind, zeigt der Detailkopf außerdem einen Zeitstempel der **letzten Aktualisierung** an. Die folgende Apps-Ansicht zeigt Favoriten, die mit Sternsymbolen oben angeheftet sind, sowie den Detailkopf mit dem Zeitstempel der letzten Aktualisierung.

![Apps-Ansicht mit Microsoft-Anwendungen sowie Filtern für Kanal, Release, Architektur und Typ](/img/ui/evergreen-workbench-collapsed.png)

### Dynamische Filter

Wenn Sie eine Anwendung auswählen, wird der Filterbereich automatisch anhand der von dieser Anwendung zurückgegebenen Eigenschaften aktualisiert. Wenn Sie beispielsweise Adobe Acrobat Reader DC auswählen, werden Filter für Sprache, Architektur und Typ angezeigt.

![Dynamische Filter für Adobe Acrobat Reader DC mit Steuerelementen für Sprache, Architektur und Typ](/img/ui/evergreen-workbench-apps-filter.png)

Die verfügbaren Filtereigenschaften variieren je nach Anwendung und können Folgendes umfassen:

| Eigenschaft | Beispielwerte |
|---|---|
| Architecture | x64, x86, ARM64 |
| Channel | Stable, Beta, Dev |
| Ring | Production, Enterprise |
| Language | English, English (UK) |
| Type | exe, msi, msix, zip |
| Release | General, Enterprise |

Wählen Sie im Filterbereich Werte aus, um die Ergebnisse einzugrenzen. Verwenden Sie **Filter löschen**, um die Filter zurückzusetzen, oder **Als CSV exportieren**, um die gefilterten Ergebnisse zu speichern.

Das Versionsgitter unterstützt das Sortieren nach Spalten. Klicken Sie auf eine Spaltenüberschrift, um aufsteigend zu sortieren, und klicken Sie erneut, um absteigend zu sortieren.

Sie können auch mit der rechten Maustaste auf eine Spaltenüberschrift klicken, um optionale Spalten ein- oder auszublenden. Strukturelle Spalten wie Version und URI bleiben sichtbar.

![Apps-Ansicht mit den Optionen nach einem Rechtsklick auf den Tabellenkopf](/img/ui/evergreen-workbench-rightclick.png)

## Downloadansicht

Um Anwendungsinstaller herunterzuladen, wählen Sie Versionen in der Apps-Ansicht aus und klicken Sie auf **Zur Downloadwarteschlange hinzufügen**. Wechseln Sie zur Downloadansicht, um Downloads zu verwalten und zu starten.

![Downloadansicht mit einem Download von Adobe Acrobat Reader DC in der Warteschlange](/img/ui/evergreen-workbench-download.png)

Die Downloadansicht zeigt die Warteschlange mit den Spalten Status, App, Version, Architektur, URI und Pfad. Die Spalte Pfad wird nach Abschluss eines Downloads ausgefüllt. Verwenden Sie die Symbolleiste, um:

- **Ausgewählte entfernen** – Elemente aus der Warteschlange entfernen
- **Warteschlange leeren** – alle Elemente entfernen
- **Ordner öffnen** – den Download-Ausgabeordner öffnen
- **Alle herunterladen** – alle Elemente in der Warteschlange nacheinander herunterladen

Ein Fortschrittsbalken unten zeigt den aktuellen Download an. Downloads werden nacheinander und in der Reihenfolge der Warteschlange verarbeitet. Das Gitter der Downloadwarteschlange unterstützt die Sortierung nach Spalten.

![Downloadansicht mit den lokalen Pfaden der heruntergeladenen Dateien](/img/ui/evergreen-workbench-download-path.png)

## Bibliotheksansicht

Wenn Sie bereits über eine [Evergreen-Bibliothek](/de-de/newlibrary) verfügen, bietet die Bibliotheksansicht eine grafische Oberfläche zum Durchsuchen und Aktualisieren. Geben Sie den Bibliothekspfad ein oder navigieren Sie dorthin, um den Inhalt der Bibliothek zu laden.

![Bibliotheksansicht mit dem Bibliotheksinhalt und Versionsdetails für Microsoft Edge](/img/ui/evergreen-workbench-library.png)

Die Bibliotheksansicht zeigt Folgendes an:

- **Bibliotheksinhalt** – eine Tabelle der Anwendungen in der Bibliothek mit App-Name, Versionsanzahl und Pfad
- **Details der ausgewählten App** – Version, URI, Typ, Größe, SHA256-Hash, Release und Dateipfad für jede Version der ausgewählten Anwendung

Verwenden Sie die Symbolleiste, um:

- **Durchsuchen** – einen Bibliothekspfad auswählen
- **Ordner öffnen** – das Bibliotheksverzeichnis öffnen
- **Neue Bibliothek** – eine neue Evergreen-Bibliothek erstellen (`New-EvergreenLibrary`)
- **Bibliothek neu laden** – den Bibliotheksinhalt erneut laden (`Get-EvergreenLibrary`)
- **Bibliothek aktualisieren** – die neuesten Versionen in die Bibliothek herunterladen (`Start-EvergreenLibraryUpdate`)

## Installationsansicht

Die Installationsansicht lädt Paketdefinitionen aus einem Verzeichnis, vergleicht die definierten Anwendungsversionen mit den aktuell auf dem Computer installierten Versionen und ermöglicht die direkte Installation oder Aktualisierung von Anwendungen.

![Installationsansicht mit einem Vergleich der installierten und neuesten Anwendungsversionen](/img/ui/evergreen-workbench-install.png)

Jede Zeile zeigt Folgendes an:

- **App** – Anwendungsname und Architektur
- **Herausgeber** – Herausgeber der Anwendung
- **Installiert** – die derzeit auf dem Computer installierte Version (falls vorhanden)
- **Neueste Version** – die neueste über Evergreen verfügbare Version
- **Status** – gibt an, ob die App installiert und aktuell ist, installiert und aktualisierungsbedürftig ist, installiert und noch nicht auf die neueste Version geprüft wurde oder nicht installiert ist
- **Aktion** – verfügbare Aktion: Installieren, Aktualisieren oder keine

Verwenden Sie die Symbolleiste, um:

- **Durchsuchen** – das Verzeichnis mit den Paketdefinitionen auswählen
- **Definitionen laden** – die Paketdefinitionsdateien laden oder erneut laden
- **Neueste Versionen suchen** – die neueste Version jeder definierten Anwendung über Evergreen abfragen
- **Ausgewählte installieren** – die ausgewählten Anwendungen installieren oder aktualisieren

::: info
Wenn die Workbench nicht mit erhöhten Rechten ausgeführt wird, fordern Installer möglicherweise eine UAC-Erhöhung an.
:::

## Register „Import“

Das Register „Import“ bietet Workflows zum Importieren von Anwendungspaketen in externe Plattformen. Es enthält vier Unterregister: **Microsoft Intune Win32-Apps**, **Nerdio Manager Shell Apps**, **Microsoft 365 Apps** und **Authentifizierung**.

Module für Importvorgänge werden beim ersten Öffnen des Registers „Import“ geladen. Bis alle erforderlichen Module geladen sind, bleiben Anmelde- und Importaktionen deaktiviert.

### Microsoft Intune Win32-Apps

::: warning Überprüfung empfohlen
Import-Workflows sind verfügbar. Paketierungs- und Zuweisungsverhalten, die für Ihren Mandanten spezifisch sind, sollten jedoch vor der Bereitstellung in der Produktion in Ihrer Umgebung überprüft werden.
:::

Navigieren Sie zu einem Verzeichnis mit Intune-Paketdefinitionen, laden Sie diese und vergleichen Sie sie mit den Win32-Apps in Ihrem Intune-Mandanten.

![Register „Import“ mit Microsoft-Intune-Win32-Apps, Paketdefinitionen und Importstatus](/img/ui/evergreen-workbench-import-intune.png)

Das Datengitter zeigt Abgleichszeilen mit folgenden Spalten: App, Herausgeber, Intune-Version, Neueste Version, Status und Aktion.

Die Aktionswerte geben an, was als Nächstes zu tun ist:

- **Neue App importieren** – die Definition ist noch nicht in Intune vorhanden
- **Neue Version importieren und ersetzen** – die App ist in Intune vorhanden und muss aktualisiert werden
- **Definition korrigieren** – doppelte Definitions-GUID oder ein anderes Definitionsproblem
- **–** – keine Aktion erforderlich

Verwenden Sie die Aktionsleiste, um Definitionen zu verwalten und zu importieren:

- **Definitionen neu laden** – die Definitionsliste vom Datenträger neu laden
- **Definitionen aktualisieren** – die neueste Evergreen-Version für jede Definition ermitteln und `App.json` sowie Erkennungsregeln direkt aktualisieren; nach Abschluss wird die Definitionsliste automatisch neu geladen
- **Mit Microsoft Intune vergleichen** – die Abgleichsliste erstellen
- **Win32-App importieren** – die ausgewählten Zeilen mit Aktionen verarbeiten

### Nerdio Manager Shell Apps

::: warning Überprüfung empfohlen
Nerdio-Import-Workflows sind verfügbar. Überprüfen Sie jedoch die API-Berechtigungen, Definitionszuordnungen und das Verhalten nach dem Import in Ihrer Umgebung.
:::

Navigieren Sie zu einem Verzeichnis mit Nerdio-Manager-Shell-App-Definitionen, laden Sie diese und vergleichen Sie sie mit den Shell Apps in Ihrer Nerdio-Manager-Umgebung.

![Register „Import“ mit Nerdio Manager Shell Apps und Versionsvergleich](/img/ui/evergreen-workbench-import-nerdio.png)

Das Datengitter zeigt den Status jeder Definition an: ob sie einer vorhandenen Shell App zugeordnet ist, ob ein Update verfügbar ist sowie die aktuelle und neueste Evergreen-Version. Die Statusleiste fasst die Vergleichsergebnisse zusammen.

Verwenden Sie **Mit Nerdio Manager vergleichen**, um die Abgleichsliste zu erstellen. Wählen Sie anschließend für die gewünschte Zeile **Neue Version zu vorhandener Shell App hinzufügen** oder **Neue App importieren**.

### Microsoft 365 Apps

::: warning Überprüfung empfohlen
Der Microsoft-365-Apps-Workflow ist sowohl für Intune- als auch für Nerdio-Manager-Szenarien verfügbar. Überprüfen Sie vor der Verwendung in der Produktion Ihre XML-Konfiguration, die Paketierungsausgabe und die Mandantenberechtigungen.
:::

Navigieren Sie zu einem Ordner mit XML-Konfigurationsdateien des Office-Bereitstellungstools und klicken Sie auf **Konfigurationen laden**.

![Register „Import“ mit Microsoft-365-Apps-Paketkonfigurationen und Importaktionen](/img/ui/evergreen-workbench-import-m365.png)

Das Gitter zeigt für jede Konfiguration Folgendes an:

- **Dateiname** – Name der XML-Datei
- **Anzeigename** – generierter Anzeigename der App
- **Produkte** – analysierte Produkte und Zieldetails
- **Status** – Ergebnis der Konfigurationsprüfung (z. B. Gültig, Keine ID oder Ungültiges XML)

Verwenden Sie die Aktionsleiste, um Paketierung und Import zu konfigurieren:

- **Kanal** – wählt den für die Paketerstellung verwendeten Microsoft-365-Updatekanal aus
- **Unternehmensname** – erforderlicher Wert, der in die Paketmetadaten eingefügt wird
- **Nerdio-Manager-Shell-App importieren** – erstellt das Paket und importiert es in Nerdio Manager
- **Microsoft-Intune-Win32-App importieren** – erstellt das Paket und importiert es in Intune

Für den Nerdio-Workflow in EvergreenUI 1.0.20 liest Workbench Shell-App-Definitionsdateien aus einem Unterverzeichnis `shell-app` neben den XML-Konfigurationen, überprüft die erforderlichen Dateien (`Definition.json`, `Detect.ps1`, `Install.ps1`, `Uninstall.ps1`) und erstellt anhand dieser Definition die Shell App. Dieser Ablauf benötigt für Nerdio-Importe nicht mehr `IntuneWin32App`.

Verbindungsanzeigen auf diesem Register zeigen den Authentifizierungsstatus für Microsoft Intune und Nerdio Manager an.

### Paketdefinitionen

Paketdefinitionen für Installations- und Importfunktionen finden Sie hier: [https://github.com/EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages).

::: info
Diese Paketdefinitionen sollten vor der Verwendung überprüft werden. Langfristig soll eine einheitliche Paketdefinition für Intune-Win32-Apps und Nerdio-Manager-Shell-Apps erstellt werden.
:::

### Authentifizierung

Im Unterregister „Authentifizierung“ werden Verbindungen mit Entra ID, der Nerdio-Manager-API und Azure Storage verwaltet. Diese Verbindungen sind für Import-Workflows von Intune, Nerdio Manager und Microsoft 365 Apps erforderlich.

![Unterregister „Authentifizierung“ mit Verbindungen zu Entra ID, Nerdio-Manager-API und Azure Storage](/img/ui/evergreen-workbench-import-auth.png)

Konfigurieren Sie Folgendes:

- **Entra ID** – geben Sie optional eine Mandanten-ID ein und verwenden Sie **Anmelden**, um eine Verbindung mit Microsoft Intune herzustellen
- **Nerdio-Manager-API** – geben Sie NME-Host, Client-ID, API-Bereich, OAuth-Token-URL, Client-Secret und Mandanten-ID an, um eine Verbindung mit Nerdio Manager herzustellen
- **Azure Storage für Nerdio-Manager-Shell-Apps** – konfigurieren Sie optional Abonnement-ID, Ressourcengruppe, Speicherkonto und Container zum Speichern von Anwendungspaketen

## Aktualisierungsansicht

Die Aktualisierungsansicht führt `Update-Evergreen` über die grafische Oberfläche aus, um den lokalen Cache der Anwendungsdefinitionen mit dem neuesten Release aus dem Repository [evergreen-apps](https://github.com/EUCPilots/evergreen-apps) zu synchronisieren.

![Aktualisierungsansicht mit der Ausgabe von Update-Evergreen, Hashüberprüfung und Synchronisierungsfortschritt](/img/ui/evergreen-workbench-update.png)

Klicken Sie auf **Update-Evergreen ausführen**, um die Aktualisierung zu starten. Im Ausgabebereich werden mit Zeitstempel versehene Protokollmeldungen zur Cacheprüfung, zum Download, zur Hashüberprüfung und zum Synchronisierungsfortschritt angezeigt.

## Infoansicht

Die Infoansicht zeigt die Metadaten des geladenen EvergreenUI-Moduls, darunter Name, Version, Vorabversionsbezeichnung, Projekt-URI und Beschreibung.

![Infoansicht mit Modulmetadaten und erforderlichen Modulen](/img/ui/evergreen-workbench-about.png)

Außerdem enthält sie den Abschnitt **Erforderliche Module**, in dem die von Import-Workflows verwendeten Modulabhängigkeiten aufgeführt und deren Installationsstatus angezeigt werden.

## Einstellungen

In der Einstellungsansicht werden allgemeine Einstellungen und anbieterspezifische Optionen konfiguriert.

![Einstellungsansicht mit den Konfigurationen für Allgemein, Microsoft Intune und Protokolle](/img/ui/evergreen-workbench-settings.png)

### Allgemein

- **Download-Ausgabepfad** – Standardverzeichnis für heruntergeladene Anwendungsinstaller
- **Pfad der Evergreen-Apps** – Pfad zum lokalen Cache der Evergreen-Anwendungsdefinitionen (schreibgeschützt; zeigt den Wert aus `Get-EvergreenAppsPath` an)
- **Design** – zwischen hellem und dunklem Design wechseln
- **Register „Import“ anzeigen** / **Register „Installieren“ anzeigen** – Sichtbarkeit der Import- und Installationsansichten umschalten
- **App-Versionscache** – Versionsdaten werden lokal zwischengespeichert und beim Auswählen einer App geladen. Verwenden Sie **Cache leeren**, um bei der nächsten Auswahl eine neue Abfrage zu erzwingen.
- **Cacheordner öffnen** – den lokalen Cacheordner der App-Versionen öffnen

### Microsoft Intune

- **IntuneWin32App-Modul** – Statusanzeige, ob das IntuneWin32App-Modul geladen ist; verwenden Sie **Neu laden**, um es erneut zu importieren
- **Paketausgabepfad** – Verzeichnis für Intune-Win32-Paketausgabedateien

### Protokolle

- **Protokollordner öffnen** – das lokale EvergreenUI-Protokollverzeichnis öffnen
- **Protokolle löschen** – lokale `.log`-Dateien aus dem EvergreenUI-Protokollverzeichnis löschen

## Protokollbereich

Der Protokollbereich unten im Fenster zeigt Meldungen mit Zeitstempel auf drei Ebenen an:

- **Info** – Fortschritts- und Statusmeldungen
- **Warnung** – nicht kritische Probleme (z. B. eine Weiterleitung als Antwort auf eine Download-URL)
- **Fehler** – Fehler beim Suchen nach Versionen, Herunterladen oder Aktualisieren von Bibliotheken

![Fortschrittsprotokollbereich mit detaillierter Vorgangsausgabe](/img/ui/evergreen-workbench-progresslog.png)

Verwenden Sie **Protokoll kopieren**, **Protokoll speichern**, **Fortschrittsprotokoll anzeigen** oder **Fortschrittsprotokoll ausblenden**, um die Protokollausgabe zu verwalten. Während Vorgänge ausgeführt werden, entstehen Protokollmeldungen in Echtzeit in Hintergrund-Runspaces.
