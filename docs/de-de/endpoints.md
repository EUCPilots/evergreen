---
layout: doc
---
# Von Evergreen verwendete Endpunkte abrufen

Die Evergreen-API kann die von Evergreen verwendeten Endpunkt-URLs zum Abrufen von Anwendungsversionen und Downloadinformationen sowie die zum Herunterladen von Anwendungsinstallern erforderlichen Endpunkt-URLs zurückgeben.

Die Endpunktliste kann in Firewall- oder Proxyserver-Systeme importiert werden, wenn vor dem Herunterladen von Anwendungsinstallern mit Evergreen eine Zulassungsliste erforderlich ist. Auf alle Endpunkte wird über TCP-Port 80 oder 443 zugegriffen.

## Get-EvergreenEndpointFromApi

`Get-EvergreenEndpointFromApi` vereinfacht die Verwendung der API, indem alle von Evergreen verwendeten Endpunkte in einem einzelnen Objekt zurückgegeben werden. Wird `Get-EvergreenEndpointFromApi` ohne Parameter ausgeführt, wird eine vollständige Liste der für alle Anwendungen verwendeten Endpunkte und Ports zurückgegeben.

```powershell
PS C:\> Get-EvergreenEndpointFromApi

Application          Endpoints                                                                              Ports
-----------          ---------                                                                              -----
1Password            {1password.com, app-updates.agilebits.com, downloads.1password.com, cdn.agilebits.com} {443}
1Password7           {1password.com, c.1password.com}                                                       {443}
1PasswordCLI         {app-updates.agilebits.com, cache.agilebits.com, developer.1password.com}              {443}
7zip                 {nchc.dl.sourceforge.net, sourceforge.net, www.7-zip.org, versaweb.dl.sourceforge.net} {443}
7ZipZS               {api.github.com, mcmilk.de, github.com}                                                {443}
AdobeAcrobat         {ardownload2.adobe.com, armmf.adobe.com, helpx.adobe.com}                              {443}
AdobeAcrobatDC       {ardownload2.adobe.com, rdc.adobe.io, www.adobe.com}                                   {443}
AdobeAcrobatProStdDC {helpx.adobe.com, rdc.adobe.io, trials.adobe.com}                                      {443}
AdobeAcrobatReaderDC {acrobat.adobe.com, rdc.adobe.io, ardownload2.adobe.com}                               {443}
AdobeBrackets        {brackets.io, api.github.com, github.com}                                              {80, 443}
```

Mit dem Parameter `-Name` kann `Get-EvergreenEndpointFromApi` die Endpunkte für eine einzelne Anwendung oder für ein Array von Anwendungen zurückgeben. Im folgenden Beispiel werden damit die Endpunkte und Ports für Microsoft Teams und Microsoft Edge ausgegeben.

```powershell
PS C:\> Get-EvergreenEndpointFromApi -Name "MicrosoftTeams", "MicrosoftEdge"

Application    Endpoints                                                                              Ports
-----------    ---------                                                                              -----
MicrosoftEdge  {edgeupdates.microsoft.com, www.microsoft.com, msedge.sf.dl.delivery.mp.microsoft.com} {443}
MicrosoftTeams {config.teams.microsoft.com, www.microsoft.com, statics.teams.cdn.office.net}          {443}
```

### Einfache Liste aller Endpunkte ausgeben

Die Ausgabe von `Get-EvergreenEndpointFromApi` lässt sich filtern, um eine einfache Liste aller eindeutigen Endpunkt-URLs zu erstellen. Der folgende Befehl generiert ein URL-Array, das als Zulassungsliste aller von Evergreen benötigten Endpunkte verwendet werden kann.

```powershell
PS C:\> Get-EvergreenEndpointFromApi | Select-Object -ExpandProperty "Endpoints" -Unique
```

### Ausgabe in CSV konvertieren

Mit dem folgenden Code kann die Ausgabe von `Get-EvergreenEndpointFromApi` in eine Datei im CSV-Format konvertiert werden. Die Datei enthält den Anwendungsnamen, die Endpunkt-URLs als durch Kommas getrennte Liste sowie die Ports ebenfalls als durch Kommas getrennte Liste.

```powershell
$Path = "./Endpoints.csv"
Get-EvergreenEndpointFromApi | ForEach-Object {
    [PSCustomObject]@{
        Application = $_.Application
        Endpoints   = $_.Endpoints -join ","
        Ports       = $_.Ports -join ","
    }
} | Export-Csv -Path $Path -NoTypeInformation -Encoding "Utf8" -Append
```

## API-Verwendung

Die API stellt zwei Endpunktlisten bereit: URLs, die Evergreen zum Ermitteln von Anwendungsversionen und Downloads verwendet, sowie URLs zum Herunterladen von Anwendungsinstallern.

::: warning **Ein benutzerdefinierter User-Agent ist erforderlich.**
Die Standard-User-Agents der meisten Tools werden blockiert, um Missbrauch der API zu minimieren. Geben Sie bei der Verwendung von PowerShell, wget, curl oder ähnlichen Tools einen eigenen User-Agent an. Verwenden Sie einen User-Agent, der bei der Problembehandlung hilft und erkennen lässt, wer die API nutzt (Protokolldaten werden nicht veröffentlicht). Geben Sie beispielsweise einen User-Agent in der Form „Unternehmensname/Standort“ an.
:::

### Liste der zum Ermitteln von Anwendungsversionen verwendeten URLs ausgeben

Die Liste der zum Ermitteln von Anwendungsversionen verwendeten URLs wird vom Evergreen-PowerShell-Modul genutzt. Diese Informationen werden bereits von der Evergreen-API gehostet und sind nicht erforderlich, wenn Sie den API-Endpunkt `/app/{appName}` zum Ermitteln von Anwendungsversionen und Installern verwenden. Diese URL-Liste wird aktualisiert, sobald unterstützte Anwendungen in Evergreen aktualisiert werden.

Das folgende Beispiel verwendet `Invoke-RestMethod`, um die Liste der von Evergreen zum Ermitteln von Anwendungsversionen verwendeten URLs zurückzugeben:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Liste der zum Herunterladen von Anwendungsinstallern verwendeten URLs ausgeben

Diese URL-Liste wird beim Herunterladen der von Evergreen ermittelten Anwendungsinstaller verwendet. Sie sollte weitgehend unverändert bleiben, kann sich bei einigen Anwendungen jedoch ändern. Beispielsweise gibt `Get-EvergreenApp -Name "VideoLanVlcPlayer` eine Liste von Download-URLs zurück, die auf der von VLC gelieferten Spiegelliste basiert.

Das folgende Beispiel verwendet `Invoke-RestMethod`, um die Liste der URLs zurückzugeben, die Evergreen beim Herunterladen von Anwendungsinstallern mit `Save-EvergreenApp` verwendet:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/downloads" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Ausgabe

Die Ausgabe beider Endpunkte liegt im JSON-Format vor. Zurückgegeben werden der Anwendungsname (eine Zeichenfolge) und die Endpunkte für diese Anwendung (ein Array). Hier sehen Sie eine nach Microsoft Edge gefilterte Beispielausgabe:

```json
{
    "Application": "MicrosoftEdge",
    "Endpoints": [
        "msedge.sf.dl.delivery.mp.microsoft.com"
    ],
    "Ports": [
        "443"
    ]
}
```

Wenn Sie PowerShell verwenden, können Sie mit `Invoke-RestMethod` ein Objekt mit Anwendungen und Endpunkten zurückgeben:

```powershell
$Endpoints = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Endpoints | Where-Object { $_.Application -eq "MicrosoftEdge" }

Application   Endpoints                                      Ports
-----------   ---------                                      -----
MicrosoftEdge {edgeupdates.microsoft.com, www.microsoft.com} {443}
```
