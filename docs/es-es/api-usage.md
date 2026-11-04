---
layout: doc
---
# Guía de uso de la API de Evergreen

Esta página explica cómo llamar a la API de Evergreen (OpenAPI 3.0, versión 1.6.0). Resume la URL base, la autenticación, los encabezados obligatorios, los puntos de conexión habituales, ejemplos de solicitudes (curl, PowerShell y Node), las respuestas más comunes y algunos consejos de uso.

**💡 Para explorar la API de forma interactiva, consulte la [documentación completa de la API con Swagger UI](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).**

## URL base

- Principal: `https://evergreen-api.stealthpuppy.com/`

Todos los puntos de conexión de esta documentación son relativos a la URL base.

## Autenticación y encabezados

No se requiere autenticación. Todas las solicitudes deben incluir un encabezado `User-Agent` personalizado que identifique la aplicación u organización que realiza la llamada. Por ejemplo: `App-Pipeline/1.0.0 (Contoso; https://contoso.com)`.

## Tipos de contenido

- Solicitudes: cuando corresponda, use `application/json`.
- Respuestas: la API devuelve JSON para los puntos de conexión enumerados.

## Puntos de conexión útiles (resumen)

- `GET /apps`: enumera todas las aplicaciones compatibles
- `GET /app/{appId}`: obtiene los detalles de la aplicación indicada (reemplace `{appId}` por el identificador de la aplicación)
- `GET /endpoints/versions`: devuelve los nombres de host que usa Evergreen para proporcionar números de versión y descargas
- `GET /endpoints/downloads`: devuelve los nombres de host que usa Evergreen para descargar instaladores de aplicaciones
- `GET /health`: devuelve el estado de la API y la información de diagnóstico

Estos son los puntos de conexión más utilizados.

### Ejemplo: enumerar las aplicaciones compatibles (GET /apps)

Solicitud (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/apps"
```

Respuesta de ejemplo (200):

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

PowerShell (`Invoke-RestMethod`):

```powershell
Invoke-RestMethod -Uri 'https://evergreen-api.stealthpuppy.com/apps' -Method Get -Headers @{'User-Agent' = 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
```

Node (`fetch`):

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

Python (`requests`):

```python
import requests

headers = {'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
resp = requests.get('https://evergreen-api.stealthpuppy.com/apps', headers=headers)
resp.raise_for_status()
data = resp.json()
print(data)
```

### Ejemplo: obtener los detalles de una aplicación (GET /app/{appId})

Solicitud (curl): reemplace `MicrosoftEdge` por el valor `Name` obtenido de `/apps`:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

Respuesta de ejemplo (200):

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

Notas:
- La respuesta es un objeto con los campos obligatorios `Version` y `URI`. Cuando están disponibles, también se incluyen `Size`, `Architecture`, `Type` y `Language`.

### Ejemplo: listas de puntos de conexión

GET `/endpoints/versions` y GET `/endpoints/downloads` devuelven matrices de objetos. Cada objeto identifica una aplicación e incluye una matriz `Endpoints` con nombres de host. Use estas listas cuando necesite permitir el tráfico hacia los hosts de Evergreen (reglas de firewall o servidores proxy).

Llamada de ejemplo (curl):

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

Respuesta de ejemplo (200):

```json
[
  {
    "Application": "Microsoft Edge",
    "Endpoints": ["edgeupdates.microsoft.com", "www.microsoft.com"]
  }
]
```

### Ejemplo: comprobación del estado (GET /health)

El punto de conexión de estado informa del estado general, la disponibilidad de los enlaces y el entorno. También puede incluir diagnósticos de caché y KV.

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/health"
```

Respuesta de ejemplo (200):

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

## Gestión de errores

- La API sigue los códigos de estado HTTP estándar. Una respuesta que no sea 2xx indica un error.
- Si el encabezado `User-Agent` falta o no es válido, se devuelve `400`; si la aplicación no se reconoce, se devuelve `404`.
- Las respuestas de error contienen un `message` legible y pueden incluir una URL de `documentation`.
- Ante errores de cliente (4xx), compruebe la solicitud (parámetros y codificación de URL). Ante errores del servidor (5xx), vuelva a intentarlo más tarde o póngase en contacto con el operador de la API.

## Consejos

- Al crear scripts, incluya una lógica sencilla de reintento y espera progresiva para los errores de red transitorios.
- Use la [documentación interactiva de la API](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/) para explorar todos los puntos de conexión disponibles.

## Origen de esta documentación

Esta guía de uso se deriva de la especificación OpenAPI 3.0 (versión 1.6.0). Para consultar la especificación completa, con todos los puntos de conexión, parámetros y esquemas de respuesta, visite la [documentación de la API](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).
