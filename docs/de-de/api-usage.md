---
layout: doc
---
# Evergreen-API – Verwendung

Diese Seite erläutert den Aufruf der Evergreen-API (OpenAPI 3.0, Version 1.6.0). Sie fasst die Basis-URL, Authentifizierung, erforderliche Header, gängige Endpunkte, Beispielanforderungen (curl, PowerShell und Node), typische Antworten und Hinweise zur Verwendung zusammen.

**💡 Zur interaktiven Erkundung der API finden Sie hier die [vollständige API-Dokumentation mit Swagger UI](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).**

## Basis-URLs

- Primär: `https://evergreen-api.stealthpuppy.com/`

Alle Endpunkte in dieser Dokumentation beziehen sich auf die Basis-URL.

## Authentifizierung und Header

Eine Authentifizierung ist nicht erforderlich. Jede Anforderung muss einen benutzerdefinierten `User-Agent`-Header enthalten, der die aufrufende Anwendung oder Organisation identifiziert. Beispiel: `App-Pipeline/1.0.0 (Contoso; https://contoso.com)`.

## Inhaltstypen

- Anforderungen: Verwenden Sie, sofern zutreffend, `application/json`.
- Antworten: Für die aufgeführten Endpunkte gibt diese API JSON zurück.

## Nützliche Endpunkte (Übersicht)

- `GET /apps` – Listet alle unterstützten Anwendungen auf
- `GET /app/{appId}` – Gibt Details zur angegebenen Anwendung zurück (ersetzen Sie `{appId}` durch den Anwendungsbezeichner)
- `GET /endpoints/versions` – Gibt die Hostnamen zurück, die Evergreen beim Abrufen von Versionsnummern und Downloads verwendet
- `GET /endpoints/downloads` – Gibt die Hostnamen zurück, die Evergreen beim Herunterladen von Anwendungsinstallern verwendet
- `GET /health` – Gibt den API-Status und Diagnoseinformationen zurück

Dies sind die am häufigsten verwendeten Endpunkte.

### Beispiel: Unterstützte Anwendungen auflisten (GET /apps)

Anforderung (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/apps"
```

Beispielantwort (200):

```json
[
  {
    "Name": "MicrosoftEdge",
    "Application": "Microsoft Edge",
    "Link": "https://www.microsoft.com/edge"
  },
  {
    "Name": "MozillaFirefox",
    "Application": "Mozilla Firefox",
    "Link": "https://www.mozilla.org/firefox"
  }
]
```

PowerShell (Invoke-RestMethod):

```powershell
Invoke-RestMethod -Uri 'https://evergreen-api.stealthpuppy.com/apps' -Method Get -Headers @{'User-Agent' = 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
```

Node (fetch):

```js
const fetch = require('node-fetch');
async function listApps(){
  const res = await fetch('https://evergreen-api.stealthpuppy.com/apps', {
    headers: {
      'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'
    }
  });
  const json = await res.json();
  console.log(json);
}
listApps();
```

Python (requests):

```python
import requests

headers = {'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
resp = requests.get('https://evergreen-api.stealthpuppy.com/apps', headers=headers)
resp.raise_for_status()
data = resp.json()
print(data)
```

### Beispiel: Anwendungsdetails abrufen (GET /app/{appId})

Anforderung (curl) – ersetzen Sie `MicrosoftEdge` durch den Wert der Eigenschaft Name aus `/apps`:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

Beispielantwort (200):

```json
{
  "Version": "138.0.3351.109",
  "URI": "https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/.../MicrosoftEdgeEnterpriseX64.msi",
  "Size": 157286400,
  "Architecture": "x64",
  "Type": "msi",
  "Language": "en-US"
}
```

Hinweise:
- Die Antwort ist ein Objekt mit den erforderlichen Feldern `Version` und `URI`. `Size`, `Architecture`, `Type` und `Language` sind enthalten, sofern verfügbar.

### Beispiel: Endpunktlisten

GET `/endpoints/versions` und GET `/endpoints/downloads` geben Arrays mit Objekten zurück. Jedes Objekt bezeichnet eine Anwendung und enthält ein `Endpoints`-Array mit Hostnamen. Verwenden Sie diese Listen, wenn Sie den Datenverkehr zu Evergreen-Hosts zulassen müssen (Firewallregeln oder Proxys).

Beispielaufruf (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

Beispielantwort (200):

```json
[
  {
    "Application": "Microsoft Edge",
    "Endpoints": ["edgeupdates.microsoft.com", "www.microsoft.com"]
  }
]
```

### Beispiel: Integritätsprüfung (GET /health)

Der Integritätsendpunkt meldet den Gesamtstatus, die Verfügbarkeit der Bindungen und die Umgebung. Außerdem kann er Cache- und KV-Diagnosen enthalten.

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/health"
```

Beispielantwort (200):

```json
{
  "status": "ok",
  "timestamp": "2025-10-12T10:30:00.000Z",
  "bindings": {
    "evergreen": true,
    "logsBucket": true
  },
  "environment": "production",
  "kvTest": {
    "accessible": true,
    "hasAllapps": true,
    "allappsType": "object"
  }
}
```

## Fehlerbehandlung

- Die API verwendet standardmäßige HTTP-Statuscodes. Eine Antwort außerhalb des 2xx-Bereichs weist auf einen Fehler hin.
- Bei einem fehlenden oder ungültigen `User-Agent`-Header wird `400` zurückgegeben; bei einer unbekannten Anwendung `404`.
- Fehlerantworten enthalten eine lesbare `message` und möglicherweise eine `documentation`-URL.
- Prüfen Sie bei Clientfehlern (4xx) die Anforderung (Parameter, URL-Kodierung). Versuchen Sie es bei Serverfehlern (5xx) später erneut oder wenden Sie sich an den API-Betreiber.

## Tipps

- Fügen Sie Skripten bei vorübergehenden Netzwerkfehlern eine kurze Wiederholungslogik mit wachsender Wartezeit hinzu.
- Verwenden Sie die [interaktive API-Dokumentation](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/), um alle verfügbaren Endpunkte zu erkunden.

## Herkunft dieser Dokumentation

Dieser Leitfaden basiert auf der OpenAPI-3.0-Spezifikation (Version 1.6.0). Die vollständige Spezifikation mit allen Endpunkten, Parametern und Antwortschemas finden Sie in der [API-Dokumentation](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).
