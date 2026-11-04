---
layout: doc
---
# API Evergreen – Guide d’utilisation

Cette page explique comment appeler l’API Evergreen (OpenAPI 3.0, version 1.6.0). Elle présente l’URL de base, l’authentification, les en-têtes requis, les principaux points de terminaison, des exemples de requêtes (curl, PowerShell et Node), les réponses courantes et quelques conseils d’utilisation.

**💡 Pour explorer l’API de manière interactive, consultez la [documentation complète de l’API avec Swagger UI](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).**

## URL de base

- Principale : `https://evergreen-api.stealthpuppy.com/`

Tous les points de terminaison de cette documentation sont relatifs à l’URL de base.

## Authentification et en-têtes

Aucune authentification n’est nécessaire. Chaque requête doit inclure un en-tête `User-Agent` personnalisé qui identifie l’application ou l’organisation appelante. Exemple : `App-Pipeline/1.0.0 (Contoso; https://contoso.com)`.

## Types de contenu

- Requêtes : utilisez `application/json` lorsque cela s’applique.
- Réponses : cette API renvoie du JSON pour les points de terminaison répertoriés.

## Points de terminaison utiles (résumé)

- `GET /apps` – répertorie toutes les applications prises en charge
- `GET /app/{appId}` – renvoie les détails de l’application indiquée (remplacez `{appId}` par l’identifiant de l’application)
- `GET /endpoints/versions` – renvoie les noms d’hôte utilisés par Evergreen pour récupérer les numéros de version et les téléchargements
- `GET /endpoints/downloads` – renvoie les noms d’hôte utilisés par Evergreen lors du téléchargement des programmes d’installation
- `GET /health` – renvoie l’état de santé de l’API et des informations de diagnostic

Voici les points de terminaison les plus fréquemment utilisés.

### Exemple : répertorier les applications prises en charge (GET /apps)

Requête (curl) :

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/apps"
```

Exemple de réponse (200) :

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

PowerShell (Invoke-RestMethod) :

```powershell
Invoke-RestMethod -Uri 'https://evergreen-api.stealthpuppy.com/apps' -Method Get -Headers @{'User-Agent' = 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
```

Node (fetch) :

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

Python (requests) :

```python
import requests

headers = {'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
resp = requests.get('https://evergreen-api.stealthpuppy.com/apps', headers=headers)
resp.raise_for_status()
data = resp.json()
print(data)
```

### Exemple : obtenir les détails d’une application (GET /app/{appId})

Requête (curl) – remplacez `MicrosoftEdge` par la valeur Name renvoyée par `/apps` :

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

Exemple de réponse (200) :

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

Remarques :
- La réponse est un objet qui comporte les champs obligatoires `Version` et `URI`. Les champs `Size`, `Architecture`, `Type` et `Language` sont inclus lorsqu’ils sont disponibles.

### Exemple : listes de points de terminaison

GET `/endpoints/versions` et GET `/endpoints/downloads` renvoient des tableaux d’objets. Chaque objet identifie une application et contient un tableau `Endpoints` de noms d’hôte. Utilisez ces listes pour autoriser le trafic vers les hôtes Evergreen (règles de pare-feu ou proxys).

Exemple d’appel (curl) :

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

Exemple de réponse (200) :

```json
[
  {
    "Application": "Microsoft Edge",
    "Endpoints": ["edgeupdates.microsoft.com", "www.microsoft.com"]
  }
]
```

### Exemple : contrôle d’intégrité (GET /health)

Le point de terminaison d’intégrité indique l’état général, la disponibilité des liaisons et l’environnement. Il peut également inclure des diagnostics du cache et de KV.

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/health"
```

Exemple de réponse (200) :

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

## Gestion des erreurs

- L’API utilise les codes d’état HTTP standard. Une réponse autre que 2xx indique une erreur.
- Un en-tête `User-Agent` absent ou incorrect renvoie `400` ; une application inconnue renvoie `404`.
- Les réponses d’erreur contiennent un champ `message` lisible et peuvent inclure une URL `documentation`.
- En cas d’erreur client (4xx), vérifiez la requête (paramètres, encodage de l’URL). En cas d’erreur serveur (5xx), réessayez plus tard ou contactez l’opérateur de l’API.

## Conseils

- Dans vos scripts, prévoyez quelques nouvelles tentatives avec un délai progressif en cas d’erreur réseau temporaire.
- Utilisez la [documentation interactive de l’API](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/) pour explorer tous les points de terminaison disponibles.

## Origine de cette documentation

Ce guide d’utilisation est dérivé de la spécification OpenAPI 3.0 (version 1.6.0). Pour consulter la spécification complète, avec tous les points de terminaison, paramètres et schémas de réponse, visitez la [documentation de l’API](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/).
