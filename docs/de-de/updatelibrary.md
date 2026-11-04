---
layout: doc
---
# Evergreen-Bibliothek aktualisieren

Verwenden Sie zum Aktualisieren einer Bibliothek `Start-EvergreenLibraryUpdate`. Diese Funktion liest die Datei `EvergreenLibrary.json` und verwendet `Get-EvergreenApp` sowie `Save-EvergreenApp`, um die Bibliothek mit Anwendungsinstallern zu befüllen und ein Manifest mit Anwendungsversionsinformationen für spätere Referenzzwecke zu verwalten.

Hier ein Beispiel: `EvergreenLibrary.json` enthält den folgenden Eintrag für Microsoft Teams:

```json
{
    "Name": "MicrosoftTeams",
    "EvergreenApp": "MicrosoftTeams",
    "Filter": "$_.Ring -eq \"General\" -and $_.Architecture -eq \"x64\" -and $_.Type -eq \"msi\""
}
```

* `Name` – definiert den Anwendungsordner in der Bibliothek. Möglicherweise möchten Sie sowohl die 32-Bit- als auch die 64-Bit-Version des Microsoft-Teams-Installers herunterladen.
* `EvergreenApp` – definiert den von Evergreen unterstützten Anwendungsnamen. Die Liste der unterstützten Anwendungsnamen erhalten Sie mit `Find-EvergreenApp`.
* `Filter` – der Filter, der üblicherweise mit `Get-EvergreenApp | Where-Object` verwendet wird, um die Anwendungsversionsinformationen auf einen bestimmten Anwendungsinstaller einzugrenzen.

In diesem Beispiel wird der Microsoft-Teams-Installer in die folgende Ordnerstruktur heruntergeladen: `\\server\EvergreenLibrary\MicrosoftTeams\General\1.5.00.17656\x64`. Nach dem erfolgreichen Herunterladen der Installer werden die Anwendungsversionsinformationen gespeichert. Für dieses Beispiel wird `\\server\EvergreenLibrary\MicrosoftTeams\MicrosoftTeams.json` mit den folgenden Details gespeichert:

```json
{
  "Version": "1.5.00.17656",
  "URI": "https://statics.teams.cdn.office.net/production-windows-x64/1.5.00.17656/Teams_windows_x64.msi",
  "Type": "msi",
  "Ring": "General",
  "Path": "/Users/aaron/Temp/Evergreen/MicrosoftTeams/General/1.5.00.17656/x64/Teams_windows_x64.msi",
  "Architecture": "x64"
}
```

Bei jedem Download einer neuen Version des Teams-Installers wird `MicrosoftTeams.json` für eine spätere Verwendung mit der neuen Version aktualisiert.

## Bibliothek aktualisieren

`Start-EvergreenLibraryUpdate` verfügt über einen einzelnen Parameter, `-Path`, der auf den Pfad zur Evergreen-Bibliothek verweisen muss:

```powershell
Start-EvergreenLibraryUpdate -Path "\\server\EvergreenLibrary"
```

Wenn ein Pfad angegeben wird, der keine Datei `EvergreenLibrary.json` enthält, wird ein Fehler ausgelöst.

Damit neue Anwendungsinstaller heruntergeladen werden, sobald eine neue Version erkannt wird, kann `Start-EvergreenLibraryUpdate` über eine geplante Aufgabe oder andere Automatisierungstools ausgeführt werden. So lässt sich die Bibliothek einfach aktualisieren und neue Anwendungen können für die Installation oder Paketierung bereitgestellt werden.
