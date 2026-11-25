---
layout: doc
---
# Windows Workbench-Befehlsreferenz

::: warning Vorabversion
Windows Workbench (EvergreenUI) befindet sich derzeit in der Vorabversion. Funktionen und Befehle können sich vor der stabilen Veröffentlichung ändern.
:::

Beim Importieren des EvergreenUI-Moduls wird eine PowerShell-API ohne Benutzeroberfläche verfügbar, ohne WPF zu laden. Das Workbench-Fenster verwendet dieselben öffentlichen Befehle; alle Funktionen lassen sich daher skripten. Mit `Get-Help <command> -Full` finden Sie Parameter und Beispiele.

```powershell
Import-Module EvergreenUI
$artifacts = Get-EwApp -Name MicrosoftEdge
Get-EwFilterableProperty -Artifact $artifacts
$artifacts |
    Where-Object Architecture -eq 'x64' |
    Select-Object -First 1 |
    Save-EwArtifact -AppName MicrosoftEdge
Get-EwLibrary
Update-EwLibrary -WhatIf
```

Befehle, die Daten ändern, unterstützen `-WhatIf` und `-Confirm`, sofern dies in der Hilfe angegeben ist.

## Apps und Downloads

| Befehl | Beschreibung |
|---|---|
| `Get-EwApp` | Evergreen-Anwendungen auflisten oder Artefakte einer Anwendung auflösen |
| `Get-EwFilterableProperty` | Filterbare Artefakteigenschaften beschreiben |
| `Save-EwArtifact` | Ein aufgelöstes Artefakt herunterladen |
| `Add-EwFavouriteApp` / `Remove-EwFavouriteApp` | Favoriten verwalten |

## Library

| Befehl | Beschreibung |
|---|---|
| `Get-EwLibrary` | Anwendungen und Versionen in einer Bibliothek lesen (Standard ist der gespeicherte Bibliothekspfad) |
| `Update-EwLibrary` | Eine initialisierte Bibliothek aktualisieren |
| `Remove-EwLibraryApp` | Eine Anwendung oder ausgewählte Artefaktzeilen entfernen |

`Remove-EwLibraryApp` unterstützt `-WhatIf` und `-Confirm`. Für eine Snapshot-geprüfte Entfernung von Zeilen geben Sie mit `-Index` nullbasierte Manifestzeilennummern an und übergeben Sie `ManifestHash` und `LibraryHash` aus `Get-EwLibrary` als `-ExpectedManifestHash` und `-ExpectedLibraryHash`. Ohne `-Index` wird die gesamte Anwendung entfernt.

## Definitionen und lokale Installation

| Befehl | Beschreibung |
|---|---|
| `Get-EwDefinition` | `App.json`-Definitionen lesen und validieren |
| `Resolve-EwArtifact` | Neueste Artefakte für eine Definition auflösen |
| `Update-EwDefinition` | Definitionsversion und Metadaten der Setup-Dateien aktualisieren |
| `Test-EwDetection` | File-, Registry- und MSI-Erkennungsregeln auswerten |
| `Install-EwPackage` | Eine Definition herunterladen und lokal installieren (`ShouldProcess`) |

## Paketerstellung und Veröffentlichung

| Befehl | Beschreibung |
|---|---|
| `New-EwPackage` | Ein Intune-Win32- oder Microsoft-365-Apps-Paket erstellen |
| `Get-EwM365Configuration` | Microsoft-365-Apps-Konfigurationsdateien auflisten |
| `Get-EwM365BuildPlan` | Eingaben und Provideridentität der Paketerstellung in der Vorschau anzeigen |
| `Connect-EwIntune` / `Disconnect-EwIntune` | Microsoft-Graph-Sitzung verwalten |
| `Get-EwIntuneApp` / `Compare-EwIntuneApp` | Intune-Win32-Apps auflisten und vergleichen |
| `Publish-EwIntuneApp` / `Publish-EwIntuneBatch` | Win32-Apps veröffentlichen |
| `Set-EwIntuneSupersedence` | Supersedence-Beziehung festlegen |
| `Get-EwM365IntunePublishPlan` / `Publish-EwM365IntuneApp` | Microsoft-365-App für Intune in der Vorschau anzeigen und veröffentlichen |
| `Get-EwM365IntuneRecovery` / `Clear-EwM365IntuneRecovery` | Ungelöste Ergebnisse auflisten und bestätigen |

## Azure und Nerdio

| Befehl | Beschreibung |
|---|---|
| `Connect-EwAzure` / `Disconnect-EwAzure` | Bei Azure zur Speicherermittlung anmelden |
| `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer` | Speicherziele auflisten |
| `Connect-EwNerdio` / `Disconnect-EwNerdio` | Nerdio-Sitzung verwalten; `-ApiOnly` überspringt Azure-Speicher |
| `Get-EwNerdioDefinition` | Shell-App-Definitionen lesen |
| `Get-EwNerdioShellApp` / `Get-EwNerdioShellAppVersion` | Shell Apps und Versionen auflisten |
| `Compare-EwNerdioShellApp` | Definitionen mit Nerdio Manager vergleichen |
| `Get-EwNerdioPublishPlan` / `Publish-EwNerdioBatch` | Bestätigte Auswahlen planen und nacheinander veröffentlichen |
| `Publish-EwNerdioApp` | Shell App veröffentlichen oder Version hinzufügen (`-ShellAppId`) |
| `Get-EwNerdioShellAppVersionPrunePlan` / `Remove-EwNerdioShellAppVersion` | Alte Versionen anzeigen und entfernen |
| `Get-EwM365NerdioPublishPlan` / `Publish-EwM365NerdioApp` | Microsoft-365-Paket für Nerdio in der Vorschau anzeigen und veröffentlichen |

Nerdio-Sitzungen werden im Arbeitsspeicher zwischen den Job-Workern des Moduls geteilt. Bei Ablauf, Trennung oder Änderungen an der Providerkonfiguration ist eine erneute Verbindung erforderlich. Token und Geheimnisse werden nie gespeichert.

## Einstellungen, Cache und Abhängigkeiten

| Befehl | Beschreibung |
|---|---|
| `Get-EwSetting` / `Set-EwSetting` / `Reset-EwSetting` | Workbench-Einstellungen lesen und ändern |
| `Clear-EwCache` | Katalog-, Versions- und Definitionsartefakt-Caches löschen (`-WhatIf`, `-Confirm`, `-CachePath`) |
| `Get-EwDependency` | Abhängigkeitsstatus von Modulen melden |
| `Update-EwEvergreen` | Evergreen-Anwendungsdaten aktualisieren |

Ein explizites `-CachePath` für `Clear-EwCache` betrifft diesen Definitionscache und macht auch Katalog-Caches ungültig. Andere benutzerdefinierte Verzeichnisse werden nicht durchsucht. Die Invalidierung gilt für Workbench-Runspaces und -Prozesse, die denselben Cache verwenden.

## Hintergrundjobs

| Befehl | Beschreibung |
|---|---|
| `Start-EwJob` | Skriptblock im gemeinsamen Pool ausführen (bis zu vier Worker) |
| `Get-EwJob` | Status, Fortschritt, Informationen, Fehler und Ausgabe melden |
| `Stop-EwJob` | Abbruch anfordern |
| `Remove-EwJob` | Abgeschlossenen Job freigeben |

Job-Skriptblöcke werden im Worker neu erstellt und übernehmen keine Variablen des Aufrufers. Übergeben Sie Eingaben mit `-ArgumentList`. Verwenden Sie `-NoModuleImport`, wenn Workbench-Befehle nicht benötigt werden. Ein wiederverwendeter Worker kann dennoch Module aus vorherigen Jobs enthalten.

```powershell
$job = Start-EwJob -Name 'Edge lookup' -ScriptBlock { Get-EwApp -Name MicrosoftEdge }
do {
    Start-Sleep -Seconds 1
    $snapshot = Get-EwJob -Id $job.Id
} while ($snapshot.State -in 'NotStarted', 'Running', 'Stopping')
$snapshot.Output
Remove-EwJob -Id $job.Id -Confirm:$false
```

## Settings

Einstellungen werden in `%APPDATA%\EvergreenWorkbench\settings.json` gespeichert. `Set-EwSetting -Name` akzeptiert: `Theme`, `OutputPath`, `LibraryPath`, `PackageOutputPath`, `IntuneDefinitionsPath`, `IntuneTenantId`, `NerdioDefinitionsPath`, `NerdioTenantId`, `NmeHost`, `NmeClientId`, `NmeApiScope`, `NmeOAuthTokenUrl`, `NmeSubscriptionId`, `NmeResourceGroup`, `NmeStorageAccount`, `NmeContainer`, `M365DefinitionsPath`, `M365Channel`, `M365CompanyName`, `M365ImportFor`, `StartupView`, `LastAppName`, `WindowWidth`, `WindowHeight`, `DownloadTrayHeight`, `AppsListWidth`, `ArtifactHiddenColumns` und `WindowMaximized`.
