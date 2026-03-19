---
layout: doc
---
# Evergreen API - Usage Guide

This page explains how to call the Evergreen API (OpenAPI 3.0, version 1.5.2). It summarises the base URL(s), authentication, common endpoints, example requests (curl, PowerShell, and Node), common responses, and tips for use.

**💡 For interactive API exploration, see the [complete API documentation with Swagger UI](/api-docs.html).**

## Base URLs

- Primary: `https://evergreen-api.stealthpuppy.com/`

All endpoints in this documentation are relative to the base URL.

## Content types

- Requests: where applicable use `application/json`.
- Responses: this API returns JSON for listed endpoints.

## Useful endpoints (summary)

- GET /apps - List all supported applications
- GET /app/{appId} - Get details for the named application (replace `{appId}` with the application identifier)
- GET /endpoints/versions - Returns hostnames used by Evergreen when returning version numbers and downloads
- GET /endpoints/downloads - Returns hostnames used by Evergreen when downloading application installers

These are the most commonly used endpoints. See the [interactive API documentation](/api-docs.html) for full details.

### Example: List supported applications (GET /apps)

Request (curl):

```bash
curl -sS -H "User-Agent: company/location" "https://evergreen-api.stealthpuppy.com/apps"
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
    "Name": "Firefox",
    "Application": "Mozilla Firefox",
    "Link": "https://www.mozilla.org/firefox"
  }
]
```

PowerShell (Invoke-RestMethod):

```powershell
Invoke-RestMethod -Uri 'https://evergreen-api.stealthpuppy.com/apps' -Method Get -Headers @{'User-Agent' = 'company/location'}
```

Node (fetch):

```js
const fetch = require('node-fetch');
async function listApps(){
  const res = await fetch('https://evergreen-api.stealthpuppy.com/apps', {
    headers: {
      'User-Agent': 'company/location'
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

headers = {'User-Agent': 'company/location'}
resp = requests.get('https://evergreen-api.stealthpuppy.com/apps', headers=headers)
resp.raise_for_status()
data = resp.json()
print(data)
```

### Example: Get application details (GET /app/{appId})

Request (curl) - replace `MicrosoftEdge` with the Name value from `/apps`:

```bash
curl -sS -H "User-Agent: company/location" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

Sample response (200):

```json
[
  {
    "Version": "138.0.3351.109",
    "URI": "https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/.../MicrosoftEdgeEnterpriseX64.msi"
  }
]
```

Notes:
- The response schema shows an array of `app` objects. Each object contains `Version` and `URI` fields (see OpenAPI components/schemas).

### Example: Endpoints lists

GET /endpoints/versions and GET /endpoints/downloads return arrays of hostnames (strings) used by Evergreen to serve version checks and downloads. Use these lists when you need to allow traffic to Evergreen hosts (firewall rules, proxies) or to build download URLs.

Sample call (curl):

```bash
curl -sS -H "User-Agent: company/location" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

Sample response (200):

```json
["evergreen-ms-edge.example.com","evergreen-others.example.net"]
```

## Error handling

- The API follows standard HTTP status codes. A non-2xx response indicates an error.
- For client errors (4xx) check the request (parameters, URL encoding). For server errors (5xx) retry later or contact the API operator.

For detailed error response schemas, see the [interactive API documentation](/api-docs.html).

## Tips

- When scripting, include small retry/backoff logic for transient network errors.
- Use the [interactive API documentation](/api-docs.html) to explore all available endpoints.

## Where this doc came from

This usage guide is derived from the OpenAPI 3.0 spec (version 1.5.2). For the complete specification with all endpoints, parameters, and response schemas, visit the [API documentation](/api-docs.html).
