---
layout: doc
---
# Neue Evergreen-Bibliothek erstellen

## Informationen zu Evergreen-Bibliotheken

Eine Evergreen-Bibliothek ist ein Verzeichnis, in dem mehrere Versionen heruntergeladener Anwendungsinstaller gespeichert werden. Die Anwendungen werden in `EvergreenLibrary.json` definiert und mit `Get-EvergreenApp` sowie `Save-EvergreenApp` erfasst.

Evergreen gibt in der Regel nur die neueste Version einer Anwendung zurück. Eine Evergreen-Bibliothek ermöglicht das Herunterladen und Speichern mehrerer Versionen eines Anwendungsinstallers samt Versionsdetails. So lässt sich bei Bedarf eine bestimmte Anwendungsversion installieren.

## Aufbau einer Evergreen-Bibliothek

Eine Evergreen-Bibliothek ist ein Verzeichnis in einem Dateisystem, das die Datei `EvergreenLibrary.json` enthält. Darin werden die Anwendungen definiert, die heruntergeladen und in der Bibliothek gespeichert werden. Im folgenden Beispiel legt `EvergreenLibrary.json` die Anwendungen fest und beschreibt, wie die Ausgabe von `Get-EvergreenApp` gefiltert werden soll, damit der jeweilige Anwendungsinstaller gespeichert wird.

```json
{
    "Name": "EvergreenLibrary",
    "Applications": [
        {
            "Name": "Microsoft.NET",
            "EvergreenApp": "Microsoft.NET",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Installer -eq \"windowsdesktop\" -and $_.Channel -eq \"LTS\""
        },
        {
            "Name": "MicrosoftOneDrive",
            "EvergreenApp": "MicrosoftOneDrive",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Ring -eq \"Production\" -and $_.Throttle -eq \"100\""
        },
        {
            "Name": "MicrosoftEdge",
            "EvergreenApp": "MicrosoftEdge",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        },
        {
            "Name": "MicrosoftEdgeWebView2Runtime",
            "EvergreenApp": "MicrosoftEdgeWebView2Runtime",
            "Filter": "$_.Channel -eq \"Stable\" -and $_.Architecture -eq \"x64\""
        },
        {
            "Name": "MicrosoftTeams",
            "EvergreenApp": "MicrosoftTeams",
            "Filter": "$_.Architecture -eq \"x64\" -and $_.Release -eq \"Enterprise\""
        }
    ]
}
```

Der Filter kann jede Eigenschaft eines Anwendungsversionobjekts festlegen, sodass nur der für die Bibliothek benötigte Installer-Typ heruntergeladen wird. Beispielsweise können Sie eine Bibliothek mit produktiven oder veröffentlichten Installerversionen und eine weitere mit Vorschauversionen von Anwendungsinstallern verwalten.

## Evergreen-Bibliothek erstellen

Verwenden Sie zum Erstellen einer neuen Evergreen-Bibliothek `New-EvergreenLibrary` und geben Sie einen gültigen lokalen Pfad oder UNC-Pfad an:

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary"
```

`New-EvergreenLibrary` erstellt bei Bedarf das Zielverzeichnis und schreibt die Standarddatei `EvergreenLibrary.json`, sofern sie noch nicht vorhanden ist. Mit `-Name` legen Sie den Bibliotheksnamen in der Konfiguration fest:

```powershell
New-EvergreenLibrary -Path "\\server\EvergreenLibrary" -Name "ProductionApps"
```

Die Standardkonfiguration umfasst 64-Bit-Releaseversionen von:

* Microsoft .NET Desktop Runtime (LTS)
* Microsoft OneDrive (Production, Drosselung 100)
* Microsoft Edge (Stable Enterprise)
* Microsoft Edge WebView2 Runtime (Stable)
* Microsoft Teams (Enterprise)

Um die Bibliothek anzupassen, bearbeiten Sie `EvergreenLibrary.json` in einem JSON-Editor (z. B. Visual Studio Code) und fügen Sie Anwendungen nach Bedarf hinzu oder entfernen Sie sie. Wenn die Datei bereits vorhanden ist, lässt `New-EvergreenLibrary` sie unverändert.
