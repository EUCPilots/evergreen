---
layout: doc
---
# Unterstützte Apps aktualisieren

## Update-Evergreen verwenden

Nach der Installation des Evergreen-Moduls müssen die Funktionen für unterstützte Anwendungen mit `Update-Evergreen` heruntergeladen werden. Die Funktion zeigt einen lesbaren Status an und eignet sich sowohl für interaktive Sitzungen als auch für nicht interaktive CI-Bereitstellungen (z. B. Azure Pipelines und GitHub Workflows).

::: warning
Für die Funktion des Evergreen-Moduls sind die Anwendungsfunktionen und Manifeste erforderlich. Führen Sie `Update-Evergreen` unbedingt als ersten Schritt nach der Installation von Evergreen aus.
:::

`Update-Evergreen` lädt das neueste Evergreen-Apps- und Manifest-Release aus dem Repository [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps) herunter, entpackt die Dateien und speichert sie lokal.

![Update-Evergreen zum ersten Mal ausführen](/img/update-evergreen.gif)

Diese Funktion unterstützt den Parameter `-Force`, mit dem das neueste Release der anwendungsspezifischen Funktionen auch dann heruntergeladen wird, wenn diese bereits lokal vorhanden sind. So kann der Administrator Evergreen aktualisieren, falls die lokal zwischengespeicherten Funktionskopien beschädigt sind.

![Update-Evergreen mit dem Parameter -Force ausführen](/img/update-evergreen-force.gif)

Wenn Evergreen importiert wird und der lokale Cache veraltet ist, werden Sie zum Aktualisieren aufgefordert:

![Evergreen importieren und zur Ausführung von Update-Evergreen aufgefordert werden](/img/import-evergreen.gif)

### Auf ein bestimmtes Release aktualisieren

Standardmäßig aktualisiert `Update-Evergreen` auf das neueste Release aus dem Repository [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps). In manchen Fällen möchten Sie möglicherweise ein bestimmtes statt des neuesten Releases herunterladen.

`Update-Evergreen` unterstützt den Parameter `-Release`. Dieser akzeptiert ein Release-Tag wie `v25.10.02.22`. Bei Angabe eines Releases ist der Parameter `-Force` erforderlich:

```powershell
Update-Evergreen -Release "v25.10.02.22" -Force
```

## Aktualisierungsverhalten

Beim Aktualisieren des Caches gelten für Evergreen die folgenden Verhaltensweisen und Regeln:

* Beim Importieren des Evergreen-Moduls wird nach dem neuesten Release gesucht. Der Administrator wird benachrichtigt, wenn der lokale Cache veraltet ist.
* `Update-Evergreen` muss ausgeführt werden – der lokale Cache wird beim Import des Moduls nicht automatisch aktualisiert.
* Ist der lokale Cache beim Ausführen von `Update-Evergreen` veraltet, wird er automatisch auf das neueste Release aktualisiert.
* Wenn die Version des lokalen Caches mit dem neuesten Release übereinstimmt, überprüft `Update-Evergreen` die zwischengespeicherten Dateien anhand der SHA-256-Prüfsummen des Releases. Fehlende oder geänderte Dateien werden gemeldet, aber nicht automatisch ersetzt. Führen Sie `Update-Evergreen -Force` aus, um den Cache erneut zu synchronisieren.
* Vor der Installation von Dateien aus einem heruntergeladenen Release überprüft `Update-Evergreen` deren SHA-256-Prüfsummen. Schlägt die Überprüfung fehl, werden die lokalen Anwendungen und Manifeste nicht ersetzt.
* Wenn Sie ein bestimmtes Evergreen-Apps-Release herunterladen, ist der lokale Cache veraltet. Wenn Sie `Update-Evergreen` erneut ausführen, wird der lokale Cache auf das neueste Release aktualisiert.

## Cache-Speicherort

Evergreen speichert Anwendungsfunktionen und Manifeste an folgenden Speicherorten:

* Windows – `%LocalAppData%\Evergreen`
* macOS und Linux – `~\.evergreen`

Der aktuelle Cache-Speicherort kann mit `Get-EvergreenAppsPath` abgerufen werden:

```powershell
PS C:\> Get-EvergreenAppsPath
C:\Users\aaron\AppData\Local\Evergreen
```

## Benutzerdefinierten Cache-Speicherort festlegen

Mit der Umgebungsvariablen `EVERGREEN_APPS_PATH` kann ein benutzerdefinierter Cache-Speicherort festgelegt werden. Konfigurieren Sie diese Variable im Benutzer- oder Systemkontext und stellen Sie sicher, dass sie auf einen gültigen Pfad verweist.

![EVERGREEN_APPS_PATH unter Windows festlegen](/img/environment-variable.png)
