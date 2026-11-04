---
layout: doc
---
# Über Evergreen

Evergreen ist ein PowerShell-Modul, das die neuesten Versionen und Downloadlinks für eine Reihe gängiger Windows-Anwendungen bereitstellt.

::: tip Vertrauen
Ziel dieses Projekts ist es, verlässliche Ergebnisse zu liefern. Evergreen wird in Ihrer Umgebung ausgeführt und fragt ausschließlich Quellen der Anwendungshersteller ab. Um Anwendungsversionen zu ermitteln, fragt Evergreen dieselben Update-APIs ab, die auch die Anwendung für die Suche nach Updates verwendet, oder eine vom Hersteller betriebene Quelle. Dadurch können Sie den Ergebnissen von Evergreen vertrauen, denn es gibt keinen Mittelsmann.
:::

## Warum

Evergreen hilft bei verschiedenen Aufgaben, unter anderem:

* Ermitteln der neuesten Anwendungsversion, um sie mit einer bereits installierten oder heruntergeladenen Version zu vergleichen
* Ermitteln der URL des neuesten Anwendungsinstallers, um ihn zur lokalen Installation (per Skript oder in einem Gold-Image) oder zur Bereitstellung auf Zielgeräten (z. B. mit Intune oder ConfigMgr) herunterzuladen

Evergreen hilft dabei, Softwarebereitstellungen zu automatisieren, zum Beispiel:

* Erstellen von Gold-Images mit Hashicorp Packer – Images können mit den neuesten Versionen einer Reihe von Anwendungen erstellt werden
* Importieren von Anwendungen in das Microsoft Deployment Toolkit, Configuration Manager oder [Microsoft Intune](https://github.com/aaronparker/packagefactory), um die Anwendungen auf dem neuesten Stand zu halten
* Überprüfen oder Auditieren installierter Anwendungsversionen in einem Windows-Image oder auf einem Computer
* Erstellen einer [Bibliothek mit Anwendungsinstallern](https://stealthpuppy.com/apptracker) – durch regelmäßiges Ausführen von Evergreen-Funktionen können Sie die aktuellen Anwendungsversionen abrufen, herunterladen und für später speichern
* Übermitteln von Manifesten an `Winget`, `Chocolatey` oder ähnliche Tools – Evergreen kann ein Objekt mit Versionsnummer und Download-URL zurückgeben, aus dem sich Manifeste für die neuesten Versionen erstellen lassen

Es gibt bereits verschiedene Community- und kommerzielle Lösungen zur Verwaltung von Anwendungsbereitstellungen und Updates. Dieses Modul soll nicht mit ihnen konkurrieren und Evergreen ist kein vollwertiger Paketmanager für Windows. Evergreen kann Lösungen von Drittanbietern ergänzen.

## Funktionen

Zu den wichtigsten Funktionen von Evergreen gehören:

* `Find-EvergreenApp` – listet die vom Modul unterstützten Anwendungen auf
* `Get-EvergreenApp` – ruft Versions- und Downloadinformationen zu Anwendungen direkt aus Herstellerquellen in Ihrer Umgebung ab
* `Get-EvergreenAppFromApi` – ruft Anwendungsinformationen über die Evergreen-API ab
* `Get-EvergreenEndpointFromApi` – listet die Endpunkte auf, die zum Abrufen von Versionsinformationen und zum Herunterladen von Installern verwendet werden
* `Save-EvergreenApp` – lädt von Evergreen zurückgegebene Installer herunter
* `Test-EvergreenApp` – prüft, ob Installer-URIs erreichbar sind
* `Export-EvergreenApp` – exportiert Anwendungsversionsinformationen in eine JSON-Datei
* `Export-EvergreenManifest` – gibt das Evergreen-Manifest einer Anwendung als Hashtabelle zurück
* `New-EvergreenLibrary` – erstellt eine Bibliothekskonfiguration zum Speichern von Anwendungsinstallern
* `Start-EvergreenLibraryUpdate` – lädt konfigurierte Installer herunter und aktualisiert das Bibliotheksinventar
* `Get-EvergreenLibrary` – liest eine lokale oder remote Bibliothek und ihr Anwendungsinventar
* `Get-EvergreenAppFromLibrary` – ruft in einer Bibliothek gespeicherte Anwendungsversionen ab
* `Remove-EvergreenLibraryAppVersion` – entfernt ältere Installerversionen aus einer Bibliothek
* `Update-Evergreen` – lädt lokale Anwendungsfunktionen und Manifeste herunter oder aktualisiert sie
* `Get-EvergreenAppsPath` – gibt den lokalen Cachepfad der Anwendungen zurück
* `Get-EvergreenAppsVersion` – gibt die neueste Releaseversion des Evergreen-Apps-Repositorys zurück
* `ConvertTo-DotNetVersionClass` – wandelt eine Versionszeichenfolge in eine .NET-`System.Version` um
