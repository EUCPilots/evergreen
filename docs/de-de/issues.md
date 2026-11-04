---
layout: doc
---
# Bekannte Probleme

## Allgemein

Wenn eine Anwendungsquelle nicht verfügbar ist, kann als Wert der zurückgegebenen Eigenschaft `URI` `https://eucpilots.com/evergreen/issues/` erscheinen. Befolgen Sie in diesem Fall die [Schritte zur Problembehandlung](https://eucpilots.com/evergreen/troubleshooting/).

## Öffentliche Funktionen

### Get-EvergreenApp

`Get-EvergreenApp` unterstützt Proxyserver möglicherweise nicht vollständig. Dies wird in einer zukünftigen Version behoben.

## Private Funktionen

### Resolve-DnsNameWrapper

Wird nur auf Windows-Plattformen unterstützt. Diese Funktion kapselt `Resolve-DnsName`, das unter PowerShell 6+ auf macOS oder Linux nicht verfügbar ist. Anwendungsfunktionen, die diese private Funktion verwenden, geben auf Nicht-Windows-Plattformen einen Fehler zurück.

### Get-GitHubRepoRelease

`Get-GitHubRepoRelease` fragt Releaseinformationen aus einem angegebenen GitHub-Repository ab, um Version und Binärdateien zurückzugeben, oder ermittelt damit die Versionsnummer bestimmter Anwendungen. Standardmäßig sind Anforderungen an die GitHub-REST-API nicht authentifiziert und auf 60 Anforderungen pro Stunde begrenzt. Wenn Sie für Anwendungen mit GitHub als Quelle `Get-EvergreenApp` mit dem Parameter `-Verbose` ausführen, wird die verbleibende Anzahl an API-Anforderungen angezeigt.

Authentifizierte Anforderungen werden über die Umgebungsvariablen `GITHUB_TOKEN` oder `GH_TOKEN` unterstützt; damit steigt das Ratenlimit auf 5.000 Anforderungen pro Stunde. Anweisungen zur Einrichtung finden Sie unter [Mit GitHub-Ratenbegrenzungen arbeiten](/de-de/github).

## Anwendungsfunktionen

### AdobeAcrobat

Wenn Adobe ein Update für Acrobat/Reader DC für Windows früher als für macOS veröffentlicht, wird möglicherweise nicht das aktuelle Patch-Release zurückgegeben. In den meisten Fällen hält Adobe beide Plattformen synchron, daher sollte dies selten vorkommen.

Zum Ermitteln der aktuellen Updateversion von `AdobeAcrobat` wird die [URL für macOS-Updates](https://armmf.adobe.com/arm-manifests/win/AcrobatDC/acrobat/current_version.txt) verwendet. Sie ermöglicht eine einfache Textabfrage der neuesten Versionsnummer.

::: info
Die Windows-Version von Adobe Acrobat und Reader verwendet eine Update-URL wie `https://armmf.adobe.com/arm-manifests/win/AcrobatDCManifest3.msi`. Dafür müsste die MSI-Datei entpackt und analysiert werden. Beispielcode zum Abfragen der MSI-Datenbank wurde hier veröffentlicht: [AdobeReader download links not valid](https://github.com/eucpilots/evergreen-module/issues/312#issuecomment-1103712904). Diese Vorgehensweise funktioniert jedoch nur auf Windows-Hosts und unterstützt macOS oder Linux nicht.
:::

Alternativ verwenden `AdobeAcrobatDC` und `AdobeAcrobatReaderDC` eine Web-API-Abfrage, um die aktuelle Version von Adobe Acrobat Reader DC, Acrobat Standard DC und Acrobat Pro DC zu ermitteln. Frühere Acrobat-Versionen sind weiterhin von diesem Problem betroffen.

### AdobeAcrobatReaderDC

`AdobeAcrobatReaderDC` gibt möglicherweise keinen Installer mit dem [neuesten Update](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html) zurück. Die verfügbaren Installer werden anhand der [Downloadseite von Adobe Acrobat Reader](https://get.adobe.com/reader/) ermittelt. Adobe stellt das neueste Update nicht immer sofort in der aktuell herunterladbaren Installerversion bereit.

Prüfen Sie, ob `AdobeAcrobat` die neueste Updateversion zurückgibt.

### CitrixWorkspaceApp

Citrix ändert gelegentlich den Updatefeed für die Citrix Workspace App. Dadurch werden die Versionsnummer und/oder die Installer-URI möglicherweise nicht korrekt zurückgegeben. Vermutlich hängt dieses Problem damit zusammen, dass Citrix Updates für die Citrix Workspace App drosselt. Probleme mit der Datenquelle werden üblicherweise innerhalb von 72 Stunden behoben.

Bei fehlerhaften Daten gibt Evergreen beispielsweise Folgendes zurück:

```powershell
Version : 24.2.0.172
Title   : Citrix Workspace - LTSR
Size    : 380803896
Hash    : 7efe56e0f177cf9de336fa48daa8b6461080909fd37f7d550fd4f313221091b8
Date    : 10/4/2024
Stream  : LTSR
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.2.0.172.exe

Version : 0.0.0.0
Title   : Citrix Workspace - Current Release
Size    : 382956344
Hash    : 5c369d1c127b14a8530b7441a6d3ec49c681fe672e8447c63ecf453cf8b87237
Date    : 25/4/2024
Stream  : Current
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.3.0.93.exe
```

#### 404-Fehler

Gelegentlich schlägt `Get-EvergreenApp -Name "CitrixWorkspaceApp"` mit folgendem Fehler fehl:

```powershell
WARNING: Invoke-EvergreenRestMethod: Error at URI: https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml.
WARNING: Invoke-EvergreenRestMethod: Error encountered: Response status code does not indicate success: 404 (Not Found)..
WARNING: Invoke-EvergreenRestMethod: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
```

Dies tritt typischerweise direkt nach der Veröffentlichung einer neuen Version der Workspace App auf; das Ergebnis kann einige Zeit bestehen bleiben. Nach einer neuen Veröffentlichung macht Citrix die Update-XML-Datei häufig vorübergehend nicht verfügbar, damit Clients nicht sofort aktualisiert werden. Möglicherweise müssen Sie warten, bis Citrix die URL wieder verfügbar macht und die Funktion erneut verwendet werden kann.

#### Veralteter Updatefeed

Gelegentlich gibt `Get-EvergreenApp -Name "CitrixWorkspaceApp"` nicht die neueste Version der Citrix Workspace App zurück. Ursache sind Änderungen am Updatefeed unter `https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml`, mit denen Citrix die automatische Bereitstellung der neuesten Workspace App drosselt oder verhindert. In diesem Fall bleibt nur abzuwarten, bis Citrix den Updatefeed korrigiert und wieder die neueste Version der Workspace App enthält.

### GhislerTotalCommander

Diese Anwendungsfunktion funktioniert unter Windows ohne zusätzliche Voraussetzungen, erfordert unter macOS oder Linux jedoch die Installation des PowerShell-Moduls `DnsClient-PS`.

### GoogleChrome

Der für den Stable-Kanal verfügbare MSI-Installer stimmt nicht mit der für den Stable-Kanal zurückgegebenen Versionsnummer überein. Die Versionsnummer in der MSI-Datei entspricht jedoch der des MSI-Installers für den Extended-Kanal. Obwohl sich die URLs unterscheiden, ist die MSI-Datei für den Stable- und den Extended-Kanal dieselbe.

### LibreOffice

`LibreOffice` verwendet den Updatehost unter `https://update.libreoffice.org/check.php`, um das verfügbare Update-Release zu ermitteln. Die Document Foundation lässt den Updatehost zum Veröffentlichungszeitpunkt nicht sofort die neueste Version zurückgeben. Gibt der Updatehost nicht die allerneueste Version zurück und hat die TDF die Downloads für die vom Updatehost gemeldete Version entfernt, kann `LibreOffice` keine gültigen Downloadlinks erstellen.

Derzeit bleibt nur abzuwarten, bis die TDF den Updatehost anweist, die neueste Version zurückzugeben. Siehe auch [LibreOffice version](https://github.com/eucpilots/evergreen-module/issues/218).

### Microsoft365Apps

`Microsoft365Apps` gibt nur öffentlich dokumentierte Kanäle zurück. Über die Microsoft-365-Apps-Update-API sind möglicherweise weitere Kanäle verfügbar. Da diese jedoch nicht unbedingt mit den auf microsoft.com dokumentierten Kanälen übereinstimmen, sind sie in dieser Funktion nicht enthalten.

Kanaleigenschaften sind in den folgenden Artikeln aufgeführt: [Konfigurationsoptionen für das Office-Bereitstellungstool](https://docs.microsoft.com/en-us/deployoffice/office-deployment-tool-configuration-options#channel-attribute-part-of-add-element), [Updatekanal für Office LTSC 2021](https://docs.microsoft.com/en-us/deployoffice/ltsc2021/update#update-channel-for-office-ltsc-2021), [Updatekanal für Office 2019](https://docs.microsoft.com/en-us/deployoffice/office2019/update#update-channel-for-office-2019).

Die vollständigen Kanalnamen sind hier aufgeführt: [Updateverlauf für Microsoft 365 Apps](https://docs.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date).

### MicrosoftWvdRemoteDesktop

`MicrosoftWvdRemoteDesktop` meldet möglicherweise für einige URLs einen HTTP-503-Fehler (siehe folgendes Beispiel). Dieses Verhalten tritt nur gelegentlich auf; die Funktion sollte dennoch verwendbare Daten zurückgeben. Unterdrücken Sie diese Warnung mit `-WarningAction "SilentlyContinue"`.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
```

### MozillaFirefox

#### Sprachunterstützung

Jede unterstützte Sprache kann an `MozillaFirefox` übergeben werden, indem Sie dem Parameter `-AppParams` eine Hashtabelle übergeben. Beispielsweise gibt `Get-EvergreenApp -Name "MozillaFirefox" -AppParams @{Language="en-GB", "es-ES"}` die englischen (Großbritannien) und spanischen Firefox-Installer zurück.

Die meisten [unterstützten Sprachen](https://www.mozilla.org/en-US/firefox/all/#product-desktop-release) können als Sprachcode an die Funktion übergeben werden. Die Sprachliste finden Sie im Manifest [MozillaFirefox](https://github.com/eucpilots/evergreen-module/blob/main/Evergreen/Manifests/MozillaFirefox.json).

### OBSStudio

Das Abrufen der neuesten Version und des Downloads von OBS Studio kann fehlschlagen, wenn das OBS Project die Verfügbarkeit des Update-Manifests unter `https://obsproject.com/update_studio/manifest.json` ändert. `Get-EvergreenApp -Name OBSStudio` gibt dann einen 404-Fehler zurück. In diesem Fall bleibt nur abzuwarten, bis das OBS Project das Manifest wieder verfügbar macht.

Evergreen könnte Versionen aus dem GitHub-Repository abfragen. Das OBS Project pflegt Releases in diesem Repository jedoch nicht durchgängig. Manchmal behebt ein bestimmtes Release von OBS Studio ausschließlich ein Problem der macOS-Version; in diesem Fall gibt `OBSStudio` keine Ergebnisse zurück.

Siehe auch [Get-EvergreenApp OBSStudio not working due to a 404 errors](https://github.com/eucpilots/evergreen-module/issues/184).

### OmnissaHorizonClient

`OmnissaHorizonClient` gibt möglicherweise nicht immer das aktuelle Release zurück. Die Eigenschaft für die Hauptversion in den Softwareupdatedaten des VMware Horizon Client verwendet kein leicht sortierbares Versionsschema. Dies wird möglicherweise in einer zukünftigen Version behoben. Siehe auch [VMware Horizon Client reporting out of date version](https://github.com/eucpilots/evergreen-module/issues/161).

### PaintDotNet

`Get-EvergreenApp -Name PaintDotNet` erzeugt unter PowerShell auf Linux den folgenden Fehler. Als Umgehungslösung können Sie stattdessen `Get-EvergreenApp -Name PaintDotNetOfflineInstaller` verwenden.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://www.getpaint.net/updates/versions.8.1000.0.x64.en.txt.
WARNING: Invoke-EvergreenWebRequest: Error encountered: The SSL connection could not be established, see inner exception..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /home/aaron/.local/share/powershell/Modules/Evergreen/2205.561/Apps/Get-PaintDotNet.ps1:20
Line |
  20 |      $Content = Invoke-EvergreenWebRequest -Uri $res.Get.Uri
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: The SSL connection could not be established, see inner exception.
```

### VideoLanVlcPlayer

`VideoLanVlcPlayer` gibt möglicherweise nicht immer das neueste verfügbare Release zurück. Aufgrund der im Updatefeed gemeldeten Version entspricht das vom VLC-Mediaplayer verwendete Release möglicherweise nicht der aktuellen Version, die auf der Website [videolan.org](https://www.videolan.org/vlc/) zum Download verfügbar ist.

Den Quellcode für die Updatewebsite finden Sie hier: [VideoLAN-Organisation > update.videolan.org > Repository](https://code.videolan.org/VideoLAN.org/update.videolan.org/-/tree/master/vlc).
