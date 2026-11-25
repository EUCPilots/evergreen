---
layout: doc
---
# In Microsoft Intune veröffentlichen

::: warning Validierung empfohlen
Die Veröffentlichung erstellt echte Apps in Ihrem Mandanten. Prüfen Sie Paketerstellung, Erkennung und Zuweisungsverhalten in einem Testmandanten, bevor Sie die Lösung produktiv einsetzen.
:::

Die Ansicht **Intune** vergleicht gespeicherte `App.json`-[Definitionen](/de-de/workbench-packages) mit Win32-Apps in Microsoft Intune. Anschließend erstellt und veröffentlicht sie die ausgewählten Apps. Sie enthält die Registerkarten **Win32 apps** und **Microsoft 365 Apps** (siehe [Microsoft 365 Apps-Pakete](/de-de/workbench-m365)).

## Voraussetzungen

Für Intune-Workflows werden die folgenden optionalen Module benötigt. Sie werden erst bei Verwendung geladen:

- `IntuneWin32App` - erstellt `.intunewin`-Pakete
- `Microsoft.Graph.Authentication` - Anmeldung bei Microsoft Graph

Die Anmeldung erfolgt mit `Connect-EwIntune`. Optional kann eine **Tenant ID** angegeben werden. Token verbleiben im Arbeitsspeicher und werden nicht gespeichert.

## Win32-Apps

1. Wählen Sie den **Definitions folder** aus und laden Sie ihn, oder verwenden Sie den in [Packages](/de-de/workbench-packages) gespeicherten Ordner.
2. Klicken Sie zum Anmelden auf **Connect**. Der angemeldete UPN wird neben der Schaltfläche **Connect/Disconnect** angezeigt.
3. Wählen Sie **Load matching Intune apps** / **Compare definitions**. Die Tabelle zeigt Publisher, die **Saved**-Version, die **Intune**-Version und den Übereinstimmungs-**Status**. Der Herausgeber steht neben jeder Definition.
4. Wählen Sie zulässige Zeilen aus und klicken Sie auf **Build and publish selected**.

Mehrdeutige Intune-Übereinstimmungen werden von verknüpften Supersedence-Ketten unterschieden. Doppelte Definitions-GUIDs werden markiert, damit sie in der Definition korrigiert werden können.

### Apps und Supersedence aktualisieren

- Vorhandene übereinstimmende Apps werden durch die neue Version **abgelöst** (Supersedence).
- **Update app** (Kontrollkästchen pro Zeile, standardmäßig deaktiviert) veröffentlicht die App als Update-App, die **All Devices** als **required** zugewiesen wird.

### Einen Stapel veröffentlichen

Eine Bestätigung gilt für den gesamten Stapel. Die Veröffentlichung erfolgt sequenziell, kann Definitionsdateien aktualisieren, wird zwischen Anwendungen angehalten, wenn Sie **Cancel batch** wählen, und meldet lokale und Intune-Teiländerungen in der Tabelle **Batch results** (Definition, Result, New app ID, Previous app ID, Details). Teilweise erstellte App-IDs bleiben erhalten. Bei einem Fehler in der Supersedence verwenden Sie **Retry selected link** in derselben Workbench-Sitzung.

Pakete werden aus dem Downloadordner der Installer erstellt, einschließlich Channel-, Versions- oder Architektur-Unterordnern, und in den Paketausgabeordner geschrieben.

## Befehle

`Connect-EwIntune`, `Disconnect-EwIntune`, `Get-EwIntuneApp`, `Compare-EwIntuneApp`, `Publish-EwIntuneApp`, `Publish-EwIntuneBatch` und `Set-EwIntuneSupersedence`. Siehe die [Befehlsreferenz](/de-de/workbench-commands).

```powershell
Connect-EwIntune
Compare-EwIntuneApp -DefinitionPath C:\Packages
```
