---
layout: doc
---
# In Nerdio Manager veröffentlichen

::: warning Validierung empfohlen
Prüfen Sie API-Berechtigungen, Definitionszuordnungen und das Verhalten nach der Veröffentlichung in Ihrer Umgebung, bevor Sie die Lösung produktiv einsetzen.
:::

Die Ansicht **Nerdio** verbindet sich mit Azure und der Nerdio-Manager-API, vergleicht Shell-App-Definitionen mit Nerdio Manager, veröffentlicht neue Shell Apps oder Versionen und bereinigt alte Versionen. Sie enthält die Registerkarten **Settings**, **Shell Apps** und **Microsoft 365 Apps** (siehe [Microsoft 365 Apps-Pakete](/de-de/workbench-m365)).

## Registerkarte Settings - Verbindungen

Die Verbindung erfolgt in zwei Schritten.

**Azure-Speicher einrichten**

1. Geben Sie die **Azure tenant ID** und **Azure subscription ID** ein und wählen Sie **Connect Azure**.
2. Wählen Sie die **Resource group**, das **Storage account** und den **Blob container** für die Pakete aus.

**Nerdio-API einrichten**

Geben Sie den **Nerdio HTTPS host**, die **Application client ID**, den **API scope**, optional eine **OAuth token URL** und das **Client secret (not saved)** ein. Wählen Sie anschließend **Connect Nerdio API**.

Mit **Save setup** speichern Sie die nicht geheimen Werte. Beim Verbinden wird das Clientgeheimnis aus dem Formular gelöscht und nie gespeichert. **Disconnect Azure and Nerdio** beendet beide Sitzungen, ändert aber keinen davon unabhängigen Azure-Kontext.

**API only (Microsoft 365 build only)** authentifiziert Nerdio ohne Azure-Speicher. Für Veröffentlichungen in Nerdio ist eine vollständige Verbindung einschließlich Azure-Speicher erforderlich.

Benötigt werden die Module `Az.Accounts`, `Az.Resources` und `Az.Storage`; sie werden nur bei Bedarf geladen.

## Registerkarte Shell Apps

Geben Sie den **Shell App definitions folder** (mit `Definition.json`-Dateien und Skripts) ein oder navigieren Sie dorthin. Wählen Sie **Save setup** und anschließend **Load and compare**. In der Vergleichstabelle werden jede **Local app**, die passende **Nerdio app**, Versionen und Status angezeigt.

Veröffentlicht werden können nur gültige, von Evergreen unterstützte Definitionen:

- Nicht zugeordnete Definitionen erstellen eine neue Shell App (**New Shell App name**).
- Eindeutige Übereinstimmungen mit einer neueren Version fügen der vorhandenen App eine Version hinzu.
- Aktuelle Apps, doppelte Übereinstimmungen und nicht unterstützte Quellen werden blockiert.

Der aufgelöste Installer wird direkt in den Blob-Speicher hochgeladen. Lokale Definitionen bleiben unverändert.

### Veröffentlichen

**Publish selected** zeigt eine Bestätigung mit Versionen, Vorgängen und Azure- sowie Nerdio-Ziel. Dateien, Quellen und Übereinstimmungen werden vor dem Schreiben erneut geprüft. **Cancel batch** wird zwischen den Elementen wirksam; der aktuelle Provider-Vorgang wird zuerst abgeschlossen. Die Ergebnisse enthalten bekannte Blob-, App- und Job-IDs.

### Wiederherstellung

Ausstehende oder unbekannte Ergebnisse halten den Stapel an und blockieren weitere Nerdio-Veröffentlichungen, bis sie geprüft wurden. Workbench speichert ungelöste Vorgänge und Bereinigungsvorschläge in `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json`. Token und Geheimnisse werden nicht gespeichert. Für die Wiederherstellung müssen Sie sich erneut mit demselben Mandanten, Abonnement, Nerdio-Host und Speicherziel verbinden.

Wählen Sie ein ungelöstes Ergebnis aus und klicken Sie auf **Review outcome**:

- **Yes** - nur, nachdem Sie den Erfolg in Nerdio bestätigt haben
- **No** - nur, nachdem Sie den Fehler bestätigt haben
- **Cancel** - Ergebnis ungelöst lassen

Ein bestätigter Erfolg wird erst akzeptiert, wenn Workbench die Shell App aktualisiert und prüft, dass die veröffentlichte Version eindeutig die neueste ist. Es wird nichts automatisch erneut versucht, zurückgesetzt oder entfernt.

### Alte Versionen bereinigen

Nach einer erfolgreichen Veröffentlichung zeigt **Preview published apps** gespeicherte Bereinigungsvorschläge an. Standardmäßig ist keine App ausgewählt und eine Version bleibt erhalten (einschließlich der neuen). Sie können Aufbewahrungsanzahl und Apps ändern und müssen die genaue Löschliste bestätigen. Doppelte, nicht sortierbare oder nicht neueste Versionen werden übersprungen. Eine ausstehende oder unbekannte Löschung hält die Bereinigung an und blockiert die Veröffentlichung in dieser Shell App, bis sie geprüft wurde. Aufgeschobene Vorschläge bleiben nach Neustarts erhalten.

Zum Bereinigen ohne Veröffentlichung wählen Sie eine zugeordnete Shell App und klicken auf **Prune selected app**. Nicht zugeordnete Zeilen und Mehrfachauswahlen können diese Aktion nicht starten; ungelöste Nerdio-Ergebnisse blockieren sie. Vor dem Löschen werden Ziel und Versionssnapshot erneut geprüft, danach wird der Vergleich aktualisiert.

## Befehle

`Connect-EwAzure`, `Connect-EwNerdio`, `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer`, `Get-EwNerdioDefinition`, `Get-EwNerdioShellApp`, `Get-EwNerdioShellAppVersion`, `Compare-EwNerdioShellApp`, `Get-EwNerdioPublishPlan`, `Publish-EwNerdioApp`, `Publish-EwNerdioBatch`, `Get-EwNerdioShellAppVersionPrunePlan` und `Remove-EwNerdioShellAppVersion`. Siehe die [Befehlsreferenz](/de-de/workbench-commands).

`Publish-EwNerdioApp -ShellAppId` fügt einer vorhandenen Shell App eine Version hinzu und lädt die Quelle der Definition herunter, wenn `-PackagePath` nicht angegeben wurde. `Remove-EwNerdioShellAppVersion` akzeptiert `-ExpectedVersionNames` und `-ExpectedRemovalVersions`, um eine veraltete Vorschau zurückzuweisen.
