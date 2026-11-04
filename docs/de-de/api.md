---
layout: doc
---
# Verwendung der Evergreen-API

::: warning **Die Evergreen-API wird kostenlos bereitgestellt – bitte missbrauchen Sie sie nicht.**
Die API wird im kostenlosen Tarif von Cloudflare Workers bereitgestellt, der bis zu 100.000 Anforderungen pro Tag erlaubt. Nutzen Sie die API rücksichtsvoll, damit das Kontingent nicht ausgeschöpft wird und sie allen zur Verfügung steht.
:::

Der Unterschied von Evergreen zu anderen Methoden zum Suchen und Installieren von Anwendungen besteht darin, dass Evergreen bei Verwendung von `Get-EvergreenApp` ausschließlich offizielle Herstellerquellen abfragt. Dadurch sind die zurückgegebenen Informationen vertrauenswürdig, weil sie vom Hersteller und nicht aus einer Crowdsourcing-Quelle stammen.

Evergreen bietet [eine API](https://evergreen-api.stealthpuppy.com/), die dieselben Anwendungsversionsinformationen wie `Get-EvergreenApp` zurückgibt. Die API unterstützt dieselben Anwendungen wie das Evergreen-Modul, da die Daten über das Modul bezogen werden. Die API wird auf Cloudflare Workers ausgeführt; die Daten werden alle 24 Stunden aktualisiert.

Die von der Evergreen-API zurückgegebenen Daten können im [Evergreen App Tracker](https://eucpilots.com/workbench/) angezeigt werden.

::: info **Wichtige Hinweise zur API**
* Die API-Daten werden einmal alle 24 Stunden aktualisiert. Bei zu häufigen Anforderungen an Endpunkte kann die Datenübertragung gedrosselt werden.
* Die API ist nur für Entwicklungszwecke vorgesehen und nicht zur Verwendung auf verteilten Endgeräten (z. B. physischen PCs, die lokal nach Anwendungsupdates suchen).
* Verwenden Sie bei Problemen oder wenn die Daten ausschließlich aus der Herstellerquelle stammen sollen `Get-EvergreenApp`.
:::

Die vollständige API-Dokumentation finden Sie hier: [evergreen-api](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/). Wenn Sie mit `Get-EvergreenApp` im Evergreen-Modul vertraut sind, sollte die API jedoch einfach zu verwenden sein.

## Get-EvergreenAppFromApi

Evergreen enthält die Funktion `Get-EvergreenAppFromApi`, die ähnlich wie `Get-EvergreenApp` verwendet wird. Sie ist einfacher als die Verwendung von `Invoke-RestMethod` und filtert automatisch nach verfügbaren Anwendungen. Verwenden Sie beispielsweise folgenden Befehl, um Anwendungsdaten für Microsoft Edge über die API abzufragen:

```powershell
PS C:\> Get-EvergreenAppFromApi -Name "MicrosoftEdge"

Version      : 89.0.774.76
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 12/4/2021
Hash         : 9E7A29B4BE6E1CD707F80B4B79008F19D2D5DD5C774D317A493EC6DE5BE0B7D7
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/4d12f620-174c-4259-85e6-8a80ea45ff10/MicrosoftEdgeEnterpriseX64.msi
```

Damit werden die aktuelle Version und die Download-URLs für Microsoft Edge über die offizielle Microsoft-Edge-Update-API unter [https://edgeupdates.microsoft.com/api/products](https://edgeupdates.microsoft.com/api/products) abgerufen.

Wie bei `Get-EvergreenApp` lässt sich die Ausgabe mit `Where-Object` nach einem bestimmten Anwendungsinstaller filtern. Das folgende Beispiel gibt die aktuelle Version und Download-URL für den Stable-Kanal des 64-Bit-Enterprise-Rings von Microsoft Edge zurück.

```powershell
Get-EvergreenAppFromApi -Name "MicrosoftEdge" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" }
```

## API-Verwendung

In der aktuellen Version verfügt die API nur über vier Endpunkte, die GET-Aufrufe unterstützen und Daten im JSON-Format zurückgeben:

* `/apps` – gibt die Liste der unterstützten Anwendungen zurück
* `/app/{appName}` – gibt Details zu einer angegebenen Anwendung zurück
* `endpoints/versions` – gibt die URL-Endpunkte zurück, die Evergreen beim Verbinden mit Herstellerquellen zum Abrufen von Anwendungsdetails verwendet (z. B. mit `Get-EvergreenApp`)
* `/endpoints/downloads` – gibt die URL-Endpunkte zurück, von denen Evergreen Binärdateien herunterlädt (z. B. mit `Save-EvergreenApp`)

In PowerShell kann die API mit `Invoke-RestMethod` abgefragt werden.

::: warning **Ein benutzerdefinierter User-Agent ist erforderlich.**
Die Standard-User-Agents der meisten Tools werden blockiert, um Missbrauch der API zu minimieren. Geben Sie bei der Verwendung von PowerShell, wget, curl oder ähnlichen Tools einen eigenen User-Agent an. Verwenden Sie einen User-Agent, der bei der Problembehandlung hilft und erkennen lässt, wer die API nutzt (Protokolldaten werden nicht veröffentlicht). Geben Sie beispielsweise einen User-Agent im Format „Application/Version (Company/URL)“ an, z. B. „App-Pipeline/1.0.0 (Contoso; https://contoso.com)“.
:::

Geben Sie die Liste der unterstützten Anwendungen aus `/apps` zurück – dies entspricht der Ausführung von `Find-EvergreenApp`:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/apps" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

Details zu einer bestimmten Anwendung werden zusammen mit dem Namen der unterstützten Anwendung vom Endpunkt `/app/{appName}` zurückgegeben.

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

Von der API zurückgegebene Daten können gefiltert und zum Herunterladen von Binärdateien an `Save-EvergreenApp` übergeben werden:

```powershell
$Edge = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Edge | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Stable" -and $_.Release -eq "Enterprise" } | Save-EvergreenApp -Path "C:\Apps"
```

Wird dem Endpunkt `/app` eine unbekannte Anwendung übergeben, wird ein Fehler zurückgegeben:

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/app/UnsupportedApp" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
Invoke-RestMethod:                                                                                                      
{
  "message": "Application not found. Call /apps for a list of available applications.",
  "documentation": "https://eucpilots.com/evergreen/api/"
}
```
