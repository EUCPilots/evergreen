---
layout: doc
---
# Ein Blick unter die Haube

Evergreen ist ein eigenständiges PowerShell-Modul. Nach der Installation benötigt es neben den offiziellen Herstellerquellen, die zum Abrufen von Details zu einer angegebenen Anwendung verwendet werden, keinen Zugriff auf weitere Inhalte.

Aufgrund der Vorgehensweise von Evergreen zum Ermitteln der neuesten Version und Download-URL einer Anwendung ist für die meisten Anwendungen benutzerdefinierter Code erforderlich. Einige Anwendungen verwenden eine gemeinsame Quelle wie GitHub (mit einer API für Releases); bei den meisten Anwendungen muss jedoch eine anwendungsspezifische API oder Website abgefragt werden.

## Modulstruktur

Evergreen verfügt über die folgende Verzeichnisstruktur:

* `<ModuleBase>/Public` – öffentliche Funktionen wie `Get-EvergreenApp`, `Find-EvergreenApp` und `Save-EvergreenApp`
* `<ModuleBase>/Apps` – interne anwendungsspezifische Funktionen mit der Logik zum Abrufen von Anwendungsdetails. Diese Funktionen sind häufig für jede Anwendung einzigartig.
* `<ModuleBase>/Shared` – interne Funktionen, die von bestimmten Anwendungen verwendet werden, um doppelten Code zu vermeiden
* `<ModuleBase>/Manifests` – jede Anwendung verfügt über ein Manifest im JSON-Format mit anwendungsspezifischen Details, die von den Anwendungsfunktionen verwendet werden. Dazu gehören unter anderem URLs zum Ermitteln der neuesten Anwendungsversion.
* `<ModuleBase>/Private` – interne Funktionen mit wiederverwendbarem Code

### Public

Der Ordner `Public` enthält alle aus Evergreen exportierten Funktionen:

* `ConvertTo-DotNetVersionClass.ps1`
* `Export-EvergreenApp.ps1`
* `Export-EvergreenManifest.ps1`
* `Find-EvergreenApp.ps1`
* `Get-EvergreenApp.ps1`
* `Get-EvergreenAppFromApi.ps1`
* `Get-EvergreenAppFromLibrary.ps1`
* `Get-EvergreenEndpointFromApi.ps1`
* `Get-EvergreenLibrary.ps1`
* `New-EvergreenLibrary.ps1`
* `Save-EvergreenApp.ps1`
* `Start-EvergreenLibraryUpdate.ps1`
* `Test-EvergreenApp.ps1`

### Apps

Der Ordner `Apps` enthält anwendungsspezifische Funktionen, die die Details der Zielanwendung ermitteln.

Beispielsweise fragt `Get-MicrosoftEdge` die offizielle Edge-Versionsliste unter `https://edgeupdates.microsoft.com/api/products` ab. Dadurch verwendet die Funktion denselben Prozess wie Edge selbst, um die neueste Edge-Version und die URL zum Herunterladen des Installers zu ermitteln. Bei Verwendung von `Get-EvergreenApp -Name MicrosoftEdge` ruft `Get-EvergreenApp` die Funktion `Get-MicrosoftEdge` auf und übergibt das Ergebnis zurück an die Pipeline.

Die meisten Funktionen enthalten anwendungsspezifischen Code. Einige Anwendungen verwenden jedoch GitHub oder SourceForge als Quelle zum Ermitteln von Versionen und Updates und können deshalb mehr gemeinsam genutzten Code verwenden.

### Manifeste

Jede Anwendung enthält eine Manifestdatei im JSON-Format mit Details, die von der internen Anwendungsfunktion beim Abrufen der Anwendungsversion und Download-URI verwendet werden. Die Manifeststruktur umfasst drei Haupteigenschaften: `Name` (Hersteller- und Anwendungsname), `Source` (Link zu einer offiziellen Website) und `Get`, das beispielsweise die URL zum Ermitteln von Anwendungsupdates festlegt. Die grundlegende Manifeststruktur sieht etwa wie folgt aus:

```json
{
    "Name": "Vendor Application name",
    "Source": "https://www.vendorwebsite.com/product",
    "Get": {
        "Update": {
            "Uri": "https://update.vendorwebsite.com/api/product"
        }
    },
    "Download": {
            "Uri": "https://download.vendorwebsite.com/files"
    },
}
```

Außerdem definiert jedes Manifest die Eigenschaft `Install` mit Details zur Anwendungsinstallation. Beachten Sie jedoch, dass diese Angaben zwar bei vielen Anwendungen enthalten sind, aber keine verbindliche Installationsanleitung darstellen.

### Private

Der Ordner `Private` enthält wiederverwendbaren Code, der von vielen Anwendungsfunktionen genutzt wird. Zu den wichtigsten Funktionen gehören:

* `Get-GitHubRepoRelease` – gibt Releases aus einem GitHub-Zielrepository zurück
* `Get-SourceForgeRepoRelease` – gibt Releases aus einem SourceForge-Zielrepository zurück
* `Invoke-EvergreenRestMethod` – ergänzt `Invoke-RestMethod` um Logik zum Abrufen von Inhalten aus einer Update-API
* `Invoke-EvergreenWebRequest` – ergänzt `Invoke-WebRequest` um Logik zum Abrufen von Inhalten von einer Ziel-URI
