---
layout: doc
---
# Pakete, Definitionen und lokale Installation

::: warning Vorabversion
Windows Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Funktionen und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

Die Ansicht **Packages** verwendet `App.json`-Definitionen. Eine Definition beschreibt eine Anwendung, wie Evergreen den neuesten Installer findet und wie die Anwendung auf einem Computer erkannt wird. Dieselben Definitionen dienen der lokalen Installation und der Veröffentlichung in Intune.

Definitionen stehen im Repository [evergreen-packages](https://github.com/EUCPilots/evergreen-packages) zur Verfügung.

::: info
Validieren Sie Paketdefinitionen vor ihrer Verwendung. Langfristig ist eine einheitliche Definition für Intune-Win32-Apps und Nerdio-Manager-Shell-Apps vorgesehen.
:::

Die Ansicht enthält zwei Registerkarten. Standardmäßig ist **Definitions** ausgewählt. Wenn als Startansicht Install gespeichert ist, wird Packages mit ausgewählter Registerkarte Install geöffnet. Die Registerkartenauswahl wird nicht gespeichert.

## Registerkarte Definitions

Geben Sie den Ordner mit den Packages-Definitionen ein oder wählen Sie ihn über **Browse** aus und klicken Sie auf **Load definitions** (oder **Reload definitions**). Mit **Save path** speichern Sie den Ordnerpfad. Die Einstellung **Package output folder** legt fest, wo Intune-Pakete erstellt werden.

Die Tabelle enthält für jede Definition Application, Publisher, Version, Architecture und Status.

**Update definitions** löst das neueste Evergreen-Artefakt für jede Definition auf und aktualisiert die `App.json`-Version, Metadaten der Setup-Dateien und Erkennungsregeln direkt. Gespeicherte Ausdrücke in `Application.Filter` werden von einem eingeschränkten Evaluator analysiert und nicht als PowerShell ausgeführt. Aufgelöst werden nur unterstützte Evergreen-Abfragen (`Get-EvergreenApp` und `Get-VcList`) sowie `Where-Object`-Prädikate. Nach Abschluss wird die Liste neu geladen; Fehler einzelner Definitionen bleiben erhalten und werden gemeldet.

## Registerkarte Install

Install testet den anhand einer Definition aufgelösten Installer auf dem lokalen Computer. Dabei handelt es sich weder um ein Bereitstellungspaket noch um eine Voraussetzung für die Veröffentlichung in Intune oder Nerdio.

Beim Öffnen von Install aktualisiert Workbench die Definitionen und die lokale Erkennung. Frühere Prüfungen der neuesten Version und Architektur werden verworfen. Auswahlen für weiterhin vorhandene Definitionen bleiben erhalten. Läuft ein anderer Vorgang, wartet die Aktualisierung; Installationsaktionen bleiben bis zum Eintreffen neuer Ergebnisse deaktiviert.

| Spalte | Bedeutung |
|---|---|
| **Application** / **Publisher** | Aus der Definition |
| **Required architecture** | Von der Definition geforderte Architektur |
| **Artifact architecture** | Architektur des aufgelösten Installers |
| **Architecture status** | Kompatibilität des Installers mit diesem Computer |
| **Installed** | Von den Erkennungsregeln gefundene Version |
| **Latest** | Neueste Version, gefüllt durch **Find latest versions** |
| **Status** | Installiert, Update verfügbar, nicht installiert oder neueste Version nicht geprüft |

Wählen Sie **Find latest versions**, um den Evergreen-Katalog bei Bedarf abzufragen, markieren Sie Zeilen und wählen Sie anschließend **Install selected**. Eine Bestätigung gilt für den gesamten Stapel; jede Anwendung erhält ein eigenes Ergebnis: `Installed`, `Failed`, `Blocked` oder `Skipped`. Mit **Hide incompatible** blenden Sie blockierte Zeilen für die aktuelle Sitzung aus.

Erkennungsregeln unterstützen die Typen File, Registry und MSI. Wenn Workbench nicht mit erhöhten Rechten ausgeführt wird, können Installer eine UAC-Eingabeaufforderung anzeigen.

### Architekturprüfungen

Die native Windows-Architektur wird mit der Anforderung der Definition und dem aufgelösten Installer abgeglichen.

- Nicht kompatible Kombinationen werden **blockiert**.
- Eine **fehlende Anforderung** oder **x64-Emulation auf Arm64** muss für jede betroffene Anwendung separat genehmigt werden. Abgelehnte oder blockierte Anwendungen werden übersprungen.
- x86-Installer werden auf x86, x64 und Arm64 unterstützt. Windows 10 auf Arm unterstützt keine x64-Emulation.
- Ändern sich Definitions- oder Artefaktmetadaten während der Bestätigung, werden sie erneut geprüft; höchstens zwei erneute Bestätigungen sind erforderlich.

Diese Prüfungen hashen nicht die heruntergeladenen Bytes und garantieren nicht, dass eine Anwendung ausgeführt werden kann.

Für unbeaufsichtigte Aufrufe von `Install-EwPackage` müssen Sie `-AllowMissingArchitectureRequirement` und/oder `-AllowX64OnArm64` explizit angeben. `-Confirm:$false` allein genehmigt diese Warnungen nicht. Ein nicht interaktiver Aufruf ohne erforderliche Option löst einen Fehler aus. `-WhatIf` löst keinen Installer auf und lädt keinen herunter.

## Befehle

| Aufgabe | Befehl |
|---|---|
| Definitionen lesen und validieren | `Get-EwDefinition` |
| Neueste Artefakte auflösen | `Resolve-EwArtifact` |
| Definitionen aktualisieren | `Update-EwDefinition` |
| Erkennungsregeln prüfen | `Test-EwDetection` |
| Lokal installieren | `Install-EwPackage` |

Siehe die [Befehlsreferenz](/de-de/workbench-commands).
