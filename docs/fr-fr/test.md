---
layout: doc
---
# Tester les programmes d’installation

`Test-EvergreenApp` vérifie si les URL des programmes d’installation renvoyées par `Get-EvergreenApp` sont accessibles. La fonction envoie d’abord une requête `HEAD` et, en cas d’échec, réessaie avec une requête `GET` avec plage. La sortie comprend l’URI, un résultat booléen et, si disponible, le code d’état HTTP.

Dans cet exemple, les URL renvoyées pour Microsoft OneDrive sont vérifiées :

```powershell
Get-EvergreenApp -Name "MicrosoftOneDrive" |
    Where-Object { $_.Type -eq "exe" } |
    Test-EvergreenApp
```

Sortie :

```text
Result StatusCode URI
------ ---------- ---
  True        200 https://example.com/installer.exe
```

## Paramètres

### InputObject

Objet d’application doté d’une propriété `URI` non vide. Les objets dépourvus d’URI valide génèrent un avertissement et un résultat `False`.

### Options de requête

`-ConnectionTimeoutSeconds` définit le délai d’expiration de la requête (30 secondes par défaut). `-UserAgent` remplace l’agent utilisateur par défaut. Utilisez `-Proxy` pour spécifier un serveur proxy ; `-ProxyCredential` permet de fournir des informations d’identification et nécessite `-Proxy`.

### NoProgress

Par défaut, la progression est masquée. Avec `-Verbose`, la progression des requêtes s’affiche, sauf si `-NoProgress` est également spécifié. Utilisez `-Verbose` pour voir l’URI testé.

## Alias

`Test-EvergreenApp` possède l’alias `tea`, qui simplifie le test des applications. Exemple :

```powershell
PS /Users/aaron> gea MicrosoftTeams | tea
```
