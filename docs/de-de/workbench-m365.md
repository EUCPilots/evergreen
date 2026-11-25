---
layout: doc
---
# Microsoft 365 Apps-Pakete

::: warning Validierung empfohlen
Prüfen Sie die XML-Konfiguration, Paketausgabe und Mandantenberechtigungen, bevor Sie die Lösung produktiv einsetzen.
:::

Die Ansichten **Intune** und **Nerdio** enthalten jeweils eine Registerkarte **Microsoft 365 Apps**. Sie erstellt aus einer Office-Deployment-Tool-Konfigurations-XML (ODT) ein Microsoft-365-Apps-Paket und kann es optional veröffentlichen.

## Workflow

1. Melden Sie sich beim jeweiligen Anbieter an ([Intune](/de-de/workbench-intune) oder [Nerdio](/de-de/workbench-nerdio)).
2. Geben Sie den **Configuration folder** an und wählen Sie **Load configurations**. Der Ordner wird von Intune und Nerdio gemeinsam verwendet. Jede Konfiguration benötigt eine gültige, nicht leere ID.
3. Wählen Sie eine Konfiguration und legen Sie **Channel**, **Company name** und **Session type** fest.
4. Wählen Sie **Preview build** oder **Preview publishing** und anschließend **Build only** oder **Build and publish**.
5. Mit **Save shared settings** speichern Sie die nicht geheimen Auswahlen.

Die reine Paketerstellung in Nerdio kann die Anmeldung **API only** verwenden. Für eine Veröffentlichung in Nerdio müssen außerdem Azure-Mandant, Abonnement und Speicherziel verbunden sein.

## Erforderliche Dateien

- `Uninstall-Microsoft365Apps.xml` mit einem Element `Configuration.Remove`. Für Nerdio-Erstellungen und Intune-Veröffentlichungen erforderlich. Intune kann ein Paket ohne diese Datei erstellen, für die Veröffentlichung ist jedoch eine Neuerstellung mit der Datei erforderlich, da der Deinstallationsbefehl darauf verweist.
- Für Nerdio ein Ordner `shell-app` neben der XML-Datei mit `Definition.json`, `Detect.ps1`, `Install.ps1` und `Uninstall.ps1`.

Quell-XML und Skripts werden nie geändert.

## Versionen und Paketerstellung

In der Vorschau werden die aufgelöste **Office channel version** und die **ODT download version** getrennt angezeigt. Das signierte ODT-Archiv wird mit Windows-`tar.exe` entpackt; die heruntergeladene ausführbare Datei wird nicht ausgeführt. Die erstellte Konfiguration verwendet einen fortlaufenden Channel und kann kein `DownloadPath` verwenden, da dafür eine festgelegte Version erforderlich ist.

Eine installierte Office-Version kann neuer als die Vorschauversion sein. Die Intune-Erkennung akzeptiert daher die angezeigte Version oder eine neuere.

::: info
Die Eigenschaft `TenantId` und der Unternehmenswert `AppSettings\Setup Name="Company"` werden in die Konfiguration geschrieben. Microsoft dokumentiert sie jedoch nicht als Mandantenzuordnung oder Unternehmenskonfiguration. Der angemeldete Mandant beweist nicht, dass Office ihm zugeordnet ist. Microsofts [`TenantAssociationKey`](https://learn.microsoft.com/microsoft-365-apps/deploy/office-deployment-tool-configuration-options#tenantassociationkey-property-part-of-property-element) ist ein anderer Wert.
:::

## Veröffentlichen

Vor der Paketerstellung ist eine Bestätigung erforderlich.

- **Intune** erstellt eine neue App, zeigt vorhandene Übereinstimmungen anhand der Konfigurations-ID an und kann optional mit **Optional app to supersede** eine App ablösen (Update-Beziehung ohne Deinstallation).
- **Nerdio** kann eine Shell App erstellen oder einer vorhandenen App über **Existing Shell App for add version** eine Version hinzufügen. Zum Hinzufügen einer bereits vorhandenen Version muss *I confirm the configuration changed if this Office version already exists* aktiviert werden. Nerdio kann die Remote-Konfiguration nicht vergleichen und kann den Vorgang dennoch ablehnen.

Eingaben und Providerziele werden vor dem Schreiben erneut geprüft, jedoch nicht atomar. Vorhandene Pakete werden nur mit ausdrücklicher Genehmigung ersetzt. Bei Builds bleiben bereitgestellte Quellen und Tools im Ausgabeordner unter `<application>\Builds\<GUID>` erhalten; nicht mehr benötigte Dateien müssen manuell gelöscht werden. Abbruch wird zwischen den Phasen wirksam und unterbricht keinen laufenden Build, Upload oder Request.

## Wiederherstellung

Unbekannte Intune-Ergebnisse werden ohne Geheimnisse gespeichert und blockieren Schreibvorgänge für diese Konfiguration bis zur Überprüfung. Verwenden Sie den Bereich **Recovery** auf der Intune-Registerkarte: **Load recovery records**, prüfen Sie die App in Intune und wählen Sie **Acknowledge reviewed outcome**. Ausstehende und unbekannte Nerdio-Ergebnisse verwenden die [Shell-Apps-Wiederherstellungssteuerelemente](/de-de/workbench-nerdio). Es wird nichts automatisch erneut versucht, zurückgesetzt oder bereinigt.

## Befehle

`Get-EwM365Configuration`, `Get-EwM365BuildPlan`, `New-EwPackage`, `Get-EwM365IntunePublishPlan`, `Publish-EwM365IntuneApp`, `Get-EwM365IntuneRecovery`, `Clear-EwM365IntuneRecovery`, `Get-EwM365NerdioPublishPlan` und `Publish-EwM365NerdioApp`. Ein Microsoft-365-Aufruf von `New-EwPackage` ohne Vorschau erstellt automatisch eine Vorschau und erfordert weiterhin die Anbietersitzung.
