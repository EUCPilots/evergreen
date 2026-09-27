---
layout: doc
---
# Evergreen API - Usage Guide

This page explains how to call the Evergreen API (OpenAPI 3.0, version 1.6.0). It summarises the base URL, authentication, required headers, common endpoints, example requests (curl, PowerShell, and Node), common responses, and tips for use.

**💡 For interactive API exploration, see the [complete API documentation with Swagger UI](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).**

## Base URLs

- Primary: `https://evergreen-api.stealthpuppy.com/`

All endpoints in this documentation are relative to the base URL.

## Authentication and headers

No authentication is required. Every request must include a custom `User-Agent` header identifying the calling application or organization. For example: `App-Pipeline/1.0.0 (Contoso; https://contoso.com)`.

## Content types

- Requests: where applicable use `application/json`.
- Responses: this API returns JSON for listed endpoints.

## Useful endpoints (summary)

- `GET /apps` - List all supported applications
- `GET /app/{appId}` - Get details for the named application (replace `{appId}` with the application identifier)
- `GET /endpoints/versions` - Returns hostnames used by Evergreen when returning version numbers and downloads
- `GET /endpoints/downloads` - Returns hostnames used by Evergreen when downloading application installers
- `GET /health` - Returns API health and diagnostic information

These are the most commonly used endpoints.

### Example: List supported applications (GET /apps)

Request (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/apps"
```

Sample response (200):

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

### Example: Get application details (GET /app/{appId})

Request (curl) - replace `MicrosoftEdge` with the Name value from `/apps`:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

Sample response (200):

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

Notes:
- The response is an object with required `Version` and `URI` fields. `Size`, `Architecture`, `Type`, and `Language` are included when available.

### Example: Endpoints lists

GET `/endpoints/versions` and GET `/endpoints/downloads` return arrays of objects. Each object identifies an application and contains an `Endpoints` array of hostnames. Use these lists when you need to allow traffic to Evergreen hosts (firewall rules or proxies).

Sample call (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

Sample response (200):

```json
[
  {
    "Application": "Microsoft Edge",
    "Endpoints": ["edgeupdates.microsoft.com", "www.microsoft.com"]
  }
]
```

### Example: Health check (GET /health)

The health endpoint reports the overall status, binding availability, and environment. It can also include cache and KV diagnostics.

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/health"
```

Sample response (200):

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

## Error handling

- The API follows standard HTTP status codes. A non-2xx response indicates an error.
- A missing or invalid `User-Agent` header returns `400`; an unknown application returns `404`.
- Error responses contain a human-readable `message` and may include a `documentation` URL.
- For client errors (4xx) check the request (parameters, URL encoding). For server errors (5xx) retry later or contact the API operator.

For detailed error response schemas, see the [interactive API documentation](/api-docs.html).

## Tips

- When scripting, include small retry/backoff logic for transient network errors.
- Use the [interactive API documentation](/api-docs.html) to explore all available endpoints.

## Where this doc came from

This usage guide is derived from the OpenAPI 3.0 spec (version 1.6.0). For the complete specification with all endpoints, parameters, and response schemas, visit the [API documentation](/api-docs.html).
