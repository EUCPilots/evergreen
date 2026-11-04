---
layout: doc
---
# Gérer les limites de débit de GitHub

Plus de 150 applications prises en charge par Evergreen sont hébergées dans des dépôts GitHub ou utilisent les données d’un dépôt GitHub pour déterminer la dernière version. Evergreen interroge l’API REST GitHub pour obtenir les détails de ces applications.

`Get-EvergreenApp` et `Update-Evergreen` envoient toutes deux des requêtes à l’API REST GitHub :

- `Get-EvergreenApp` interroge les versions et les balises GitHub pour obtenir les détails de version et de téléchargement des applications hébergées sur GitHub
- `Update-Evergreen` télécharge les fonctions d’application et les manifestes les plus récents depuis le dépôt [eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps)

GitHub applique des limites aux requêtes API non authentifiées : 60 requêtes par heure et par adresse IP. Dans les environnements où Evergreen est exécuté fréquemment ou dans plusieurs sessions, cette limite peut être atteinte rapidement. Consultez [Limites de débit de l’API REST](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) pour en savoir plus.

L’authentification des requêtes avec un jeton d’accès personnel porte cette limite à 5 000 requêtes par heure.

## Créer un jeton d’accès personnel

Evergreen prend en charge les requêtes authentifiées avec des [jetons d’accès personnels](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Il est recommandé d’utiliser des [jetons d’accès personnels à autorisations granulaires](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

Un jeton disposant d’un accès en lecture seule aux dépôts publics suffit. Aucune portée ni autorisation supplémentaire n’est requise. Comme le jeton ne nécessite qu’un accès en lecture aux dépôts publics, une longue durée de validité est raisonnable ; il reste toutefois recommandé de le gérer de manière sécurisée.

![Jeton d’accès personnel à autorisations granulaires](/img/github-pat.png)

## Définir la variable d’environnement GITHUB_TOKEN

Evergreen lit les variables d’environnement `GITHUB_TOKEN` et `GH_TOKEN`. Définissez l’une d’elles avec la valeur du jeton d’accès personnel pour qu’Evergreen authentifie automatiquement ses requêtes à l’API GitHub. `Get-EvergreenApp` et `Update-Evergreen` utiliseront alors le jeton sans configuration supplémentaire.

### Windows

Pour définir durablement la variable pour l’utilisateur actuel (elle sera conservée entre les sessions et après les redémarrages) :

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "User")
```

Pour la définir pour tous les utilisateurs de la machine (droits d’administrateur requis) :

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "Machine")
```

La variable peut également être définie dans l’interface Windows, sous **Propriétés système > Avancé > Variables d’environnement**.

Pour la définir uniquement pour la session PowerShell actuelle :

```powershell
$env:GITHUB_TOKEN = "<your-token>"
```

### macOS et Linux

Pour définir durablement la variable, ajoutez la ligne suivante au profil de votre shell (`~/.zshrc` pour Zsh, `~/.bashrc` ou `~/.bash_profile` pour Bash) :

```bash
export GITHUB_TOKEN="<your-token>"
```

Rechargez le profil après l’avoir enregistré :

```bash
source ~/.zshrc  # or source ~/.bashrc
```

Pour la définir uniquement pour la session shell actuelle :

```bash
export GITHUB_TOKEN="<your-token>"
```

## GitHub Actions

Lorsqu’Evergreen s’exécute dans un workflow GitHub Actions, le secret `GITHUB_TOKEN` est automatiquement disponible et aucun jeton d’accès personnel distinct n’est nécessaire. Consultez [Utiliser GITHUB_TOKEN pour l’authentification dans les workflows](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).

Ajoutez les lignes suivantes au début de votre fichier de workflow pour rendre le jeton disponible en tant que variable d’environnement :

```yaml
# Environment variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Evergreen détectera automatiquement la variable lors de l’exécution du workflow.

## Vérifier l’état de la limite de débit

Lors de l’exécution de `Get-EvergreenApp` pour une application dont la source est GitHub, le paramètre `-Verbose` affiche le nombre de requêtes API restantes :

```powershell
Get-EvergreenApp -Name "MicrosoftBicep" -Verbose
```

La sortie détaillée comprend une ligne semblable à celle-ci :

```
VERBOSE: Get-GitHubRateLimit: Remaining requests to the GitHub API: 58 of 60
```

Lorsque la limite de débit est épuisée, Evergreen renvoie un objet de version `RateLimited` et affiche un avertissement. Définir `GITHUB_TOKEN` ou `GH_TOKEN` avant d’exécuter Evergreen résout ce problème.
