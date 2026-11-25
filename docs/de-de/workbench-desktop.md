---
layout: doc
---
# Windows Workbench verwenden

::: warning Vorabversion
Windows Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Funktionen und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

::: info
Diese Seite beschreibt die Funktionen von EvergreenUI ab Version **2.0.1-preview**.
:::

## Workbench starten

Importieren Sie das Modul und führen Sie `Start-EvergreenWorkbench` aus, um das Workbench-Fenster zu öffnen:

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

`Start-EvergreenWorkbench` lädt WPF bei Bedarf. Wird Ihre PowerShell-Sitzung nicht im Single-Threaded Apartment (STA) ausgeführt, hostet Workbench das Fenster in einem dedizierten STA-Runspace. Besondere Startparameter sind daher nicht erforderlich. Workbench ist nur unter Windows verfügbar und erfordert PowerShell 7.6 oder höher.

Beim Start stellt Workbench Fenstergröße und Maximierungsstatus, die zuletzt angezeigte Seite und ausgewählte Anwendung sowie die Breite der Anwendungsliste und Höhe der Downloadwarteschlange wieder her. Standardmäßig wird das helle oder dunkle Windows-Design verwendet; auf unterstützten Systemen kommt Mica hinzu. Transparenz- und Kontrasteinstellungen von Windows können einen undurchsichtigen Hintergrund bewirken.

## Navigation

Über die Navigationsleiste links wechseln Sie zwischen den Ansichten. Mit dem Schalter oben in der Leiste wechseln Sie zwischen erweiterter und kompakter (nur Symbole) Navigation.

| Ansicht | Zweck |
|---|---|
| **Apps** | Anwendungen durchsuchen, Versionen untersuchen und filtern, Installer in die Warteschlange stellen und herunterladen sowie Evergreen-Daten verwalten |
| **Library** | Inhalte einer lokalen Evergreen-Bibliothek lesen, aktualisieren und entfernen |
| **Packages** | App.json-Definitionen verwalten und lokale Installationen testen |
| **Intune** | Win32- und Microsoft-365-Apps in Microsoft Intune vergleichen, erstellen und veröffentlichen |
| **Nerdio** | Shell Apps und Microsoft-365-Apps in Nerdio Manager vergleichen und veröffentlichen |
| **Settings** | Gespeicherte Ordner und Darstellung |
| **About** | Workbench-Metadaten und Abhängigkeitsstatus |

Das **Aktivitätsprotokoll** am unteren Fensterrand erfasst zeitgestempelte Info-, Warning- und Error-Meldungen aus allen Ansichten. Ziehen Sie den Griff (oder verwenden Sie die Pfeiltasten nach oben und unten), um die Größe zu ändern. Bei Bedarf können Sie das Protokoll einklappen. Längere Vorgänge laufen in einem gemeinsamen Pool mit bis zu vier Hintergrund-Workern, damit das Fenster reaktionsfähig bleibt. Während eines Vorgangs werden widersprüchliche Aktionen deaktiviert; während Workbench Wartungsänderungen schreibt, kann das Fenster nicht geschlossen werden.

## Apps

Die Apps-Ansicht listet alle Anwendungen im Evergreen-Katalog auf. Wählen Sie eine Anwendung aus, um ihre Versionen mit `Get-EvergreenApp` aufzulösen und in der Tabelle anzuzeigen.

- **Search** - Anwendungsliste nach Namen filtern.
- **Favourites** - Klicken Sie auf den Stern, um eine Anwendung oben in der Liste anzuheften. Favoriten werden in den Workbench-Einstellungen gespeichert.
- **Resize** - Ziehen Sie den Teiler, um die Breite der Anwendungsliste zu ändern. Die Breite wird gespeichert.

### Versionen filtern

Der Filterbereich passt sich an die Eigenschaften der ausgewählten Anwendung an, etwa Architecture, Channel, Language, Type oder Release. Jeder Filter ist eine Mehrfachauswahlliste:

- Werte innerhalb einer Eigenschaft werden mit **OR** kombiniert.
- Verschiedene Eigenschaften werden mit **AND** kombiniert.
- Ohne Auswahl gilt **All**.

### Versionentabelle

Die Tabelle zeigt alle Eigenschaften der ausgewählten Anwendung, auch Eigenschaften, die nur in manchen Zeilen vorkommen. Übliche Spalten wie Version, Date, Channel und Architecture stehen zuerst, danach folgen anwendungsspezifische Eigenschaften; **URI** steht zuletzt. Fehlende Werte bleiben leer.

- Klicken Sie auf eine Spaltenüberschrift, um aufsteigend und erneut, um absteigend zu sortieren.
- **Columns** blendet optionale Spalten ein oder aus. **Version** und **URI** können nicht ausgeblendet werden. Die Auswahl gilt für alle Anwendungen und wird gespeichert.
- **Export to CSV** speichert die gefilterten Zeilen und sichtbaren Spalten in der aktuellen Reihenfolge.
- Per Rechtsklick auf eine Zeile können Sie **Copy URI** oder **Open URI** auswählen.

### Installer herunterladen

Wählen Sie eine oder mehrere Zeilen aus und klicken Sie auf **Add to queue**. Die Warteschlange gilt anwendungsübergreifend, sodass Sie Downloads für mehrere Anwendungen bündeln können. Mit **Show queue** wird die Warteschlange eingeblendet. Ziehen Sie den Griff, um ihre Größe anzupassen.

Jede Zeile zeigt Anwendung, Version, Architecture, Status, URI und nach dem Download die **Saved file**. Über die Zeilenaktionen können Sie ein Element herunterladen oder entfernen.

| Aktion | Ergebnis |
|---|---|
| **Download now** | Elemente in der Warteschlange in den Downloadordner herunterladen |
| **Clear completed** | Heruntergeladene und fehlgeschlagene Zeilen entfernen |
| **Clear queue** | Alle Zeilen entfernen (während eines Downloads nicht verfügbar) |
| **Open folder** | Den Ordner mit einer heruntergeladenen Datei öffnen |
| **Change** | Downloadordner ändern |

Der Downloadordner wird in den Einstellungen gespeichert und neben der Warteschlange angezeigt. Ein Fortschrittsbalken zeigt den aktiven Download an.

### Wartung

Das Menü **Actions...** der Apps-Ansicht enthält Wartungsaufgaben:

| Aktion | Funktion |
|---|---|
| **Refresh** | Anwendungskatalog neu laden |
| **Reload selected app versions** | Cache für die ausgewählte Anwendung umgehen |
| **Update Evergreen** | Evergreen-Anwendungsdaten aktualisieren (`Update-Evergreen`). Das installierte PowerShell-Modul wird dabei nicht aktualisiert |
| **Clear Workbench cache** | Nach Bestätigung den Katalog- und Versionscache unter `%LOCALAPPDATA%\EvergreenWorkbench\Cache` löschen |
| **Open cache folder** | Cacheordner öffnen und bei Bedarf erstellen |

Ergebnisse von `Get-EvergreenApp` werden 24 Stunden lang als JSON-Datei pro Anwendung zwischengespeichert. Das Leeren des Caches entfernt keine Evergreen-Anwendungsdaten, heruntergeladenen Installer, Library-Inhalte, Einstellungen oder Provider-Wiederherstellungsdatensätze. Die Wartung läuft im Hintergrund, aktualisiert anschließend Apps und behält dabei Auswahl, Suche, Filter und Downloads in der Warteschlange bei. Teilfehler werden gemeldet und nicht automatisch erneut versucht.

## Library

Die Library-Ansicht liest und verwaltet eine initialisierte [Evergreen-Bibliothek](/de-de/newlibrary).

- **Library location** - Dropdown mit den zehn zuletzt gespeicherten Bibliotheksordnern sowie **Browse** und **Save path**. Der Ordner muss `EvergreenLibrary.json` enthalten.
- **Load** - Bibliotheksinventar lesen.
- **Update library** - neueste Versionen aller Bibliotheksanwendungen herunterladen (`Update-EvergreenLibrary`).
- **Open folder** - Bibliotheksordner im Datei-Explorer öffnen.

Die obere Tabelle listet jede Anwendung mit der Anzahl ihrer **Versions** und dem **Location** auf. Die untere Tabelle zeigt Versionen der ausgewählten Anwendung mit Version, Architecture, Type, lokalem Installer-**Location** (darauf zeigen, um den vollständigen Pfad zu sehen) und URI. Öffnen Sie per Rechtsklick auf eine der Tabellen den Anwendungs- oder Installerordner mit **Open folder**.

### Inhalte entfernen

Das Entfernen ist unabhängig vom Evergreen-Aufbewahrungsbefehl:

- **Remove application** entfernt die ausgewählte Anwendung, ihre registrierten Installer und den Bibliothekseintrag. Spätere Bibliotheksaktualisierungen laden sie nicht erneut herunter.
- **Remove versions** entfernt nur die ausgewählten Zeilen in der Versionentabelle. Mit **Ctrl** oder **Shift** können mehrere Zeilen ausgewählt werden. Andere Architekturen oder Installer-Typen mit derselben Versionsnummer bleiben unberührt.

Für jede Aktion ist eine Bestätigung erforderlich; **Cancel** ist die Standardauswahl. Entfernt werden nur registrierte Installerdateien im Anwendungsordner. Dateien, auf die der beibehaltene Bestand verweist, bleiben erhalten; nicht registrierte Dateien werden nicht verändert. Unsichere Pfade oder ein seit dem Laden geändertes Manifest brechen den Vorgang ab. Bei Fehlern werden weitere Schritte angehalten, Teiländerungen gemeldet und das Inventar neu geladen. Destruktive Vorgänge werden nie automatisch wiederholt.

::: warning
Das Entfernen kann nicht rückgängig gemacht werden. Wird der Vorgang vor dem Schreiben des Manifests abgebrochen, können Zeilen weiterhin aufgeführt sein, obwohl Installerdateien bereits entfernt wurden. Prüfen Sie die gemeldeten Pfade.
:::

## Packages

Die Packages-Ansicht enthält die beiden Registerkarten **Definitions** und **Install**. Weitere Informationen finden Sie unter [Pakete, Definitionen und lokale Installation](/de-de/workbench-packages).

## Intune

Die Intune-Ansicht vergleicht Ihre App.json-Definitionen mit Win32-Apps in Microsoft Intune, erstellt und veröffentlicht Pakete und verwaltet Supersedence. Außerdem enthält sie den Microsoft-365-Apps-Workflow für Intune. Siehe [Veröffentlichung in Microsoft Intune](/de-de/workbench-intune).

## Nerdio

Die Nerdio-Ansicht verbindet sich mit Azure und der Nerdio-Manager-API, vergleicht Shell-App-Definitionen, veröffentlicht Apps und Versionen und entfernt alte Versionen. Sie enthält auch den Microsoft-365-Apps-Workflow für Nerdio. Siehe [Veröffentlichung in Nerdio Manager](/de-de/workbench-nerdio) und [Microsoft 365 Apps-Pakete](/de-de/workbench-m365).

## Settings

Die Settings-Ansicht zeigt für jeden Workflow gespeicherte Ordner und Optionen für das Erscheinungsbild.

**Gespeicherte Ordner**

| Ordner | Verwendet von |
|---|---|
| **Download folder** | Apps-Downloads |
| **Library folder** | Library |
| **Packages definitions folder** | Packages und Intune |
| **Package output folder** | Intune-Paketerstellung |
| **Microsoft 365 Apps configurations folder** | Microsoft 365 Apps in Intune und Nerdio (gemeinsam) |
| **Nerdio Manager Shell Apps directory** | Nerdio Shell Apps |

Speichern Sie mit **Browse** einen Ordner oder verwenden Sie die Steuerelemente im jeweiligen Workflow. Wenn Sie in Settings einen der drei Workflowordner ändern, wird eine nicht gespeicherte Ordneränderung im jeweiligen Workflow ersetzt. **Open folder** ist nur verfügbar, wenn auf den Ordner zugegriffen werden kann.

**Darstellung**

- **Color theme** - wählen Sie **System**, **Light** oder **Dark**.

Die Azure- und API-Konfiguration für Nerdio befindet sich in der Nerdio-Ansicht auf der Registerkarte Settings.

Einstellungen und gespeicherter Oberflächenstatus befinden sich in `%APPDATA%\EvergreenWorkbench\settings.json`. Authentifizierungstoken und Clientgeheimnisse werden nur im Arbeitsspeicher gehalten und nie in den Einstellungen gespeichert.

## About

Die About-Ansicht zeigt Workbench-Metadaten (Name, Version, Vorabversionskennzeichnung, Projekt-URI und Beschreibung) sowie eine **Dependencies**-Tabelle. Diese enthält den Zweck jedes Moduls, die Mindestversion, die höchste lokal auffindbare **Installed**-Version und die Version **Loaded (window)** im Workbench-Runspace. Geladene Versionen können von Ihrer aufrufenden Sitzung oder einem Hintergrundjob abweichen.

Der Status wird beim Öffnen von About und auf Anforderung aktualisiert. Optionale Abhängigkeiten werden weder installiert noch aktualisiert oder importiert. Schlägt eine Aktualisierung fehl, bleiben die bisherigen Ergebnisse sichtbar und werden als veraltet markiert.

## Befehle ohne Fenster verwenden

Alle Workbench-Funktionen sind als PowerShell-Befehle verfügbar, darunter Hintergrundjobs, Definitionen, Veröffentlichung und Cachewartung. Siehe die [Befehlsreferenz für Windows Workbench](/de-de/workbench-commands).
