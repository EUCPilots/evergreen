---
layout: doc
---
# Mettre à jour les applications prises en charge

## Utiliser Update-Evergreen

Après l’installation du module Evergreen, téléchargez les fonctions des applications prises en charge avec `Update-Evergreen`. Cette fonction affiche un état lisible, adapté aussi bien aux sessions interactives qu’aux déploiements CI non interactifs (par exemple Azure Pipelines et GitHub Workflows).

::: warning
Le module Evergreen a besoin des fonctions d’application et des manifestes pour fonctionner. Veillez à exécuter `Update-Evergreen` dès que vous avez installé Evergreen.
:::

`Update-Evergreen` télécharge la dernière version des applications et manifestes Evergreen depuis le dépôt [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps), décompresse les fichiers et les stocke localement.

![Première exécution d’Update-Evergreen](/img/update-evergreen.gif)

Cette fonction prend en charge le paramètre `-Force`, qui force le téléchargement des fonctions propres aux applications de la dernière version, même si elles sont déjà présentes localement. Cela permet à l’administrateur de mettre à jour Evergreen lorsque les copies des fonctions dans le cache local sont éventuellement endommagées.

![Exécution d’Update-Evergreen avec le paramètre -Force](/img/update-evergreen-force.gif)

Si le cache local est obsolète lors de l’importation d’Evergreen, une invite vous proposera de le mettre à jour :

![Importation d’Evergreen avec une invite à exécuter Update-Evergreen](/img/import-evergreen.gif)

### Mettre à jour vers une version spécifique

Par défaut, `Update-Evergreen` installe la dernière version du dépôt [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps). Vous pouvez toutefois avoir besoin de télécharger une version précise plutôt que la plus récente. 

`Update-Evergreen` prend en charge le paramètre `-Release`, qui accepte une balise de version telle que `v25.10.02.22`. Le paramètre `-Force` est obligatoire pour spécifier une version :

```powershell
Update-Evergreen -Release "v25.10.02.22" -Force
```

## Comportement des mises à jour

Lors de la mise à jour du cache, Evergreen applique les règles suivantes :

* Lors de l’importation du module Evergreen, une vérification de la dernière version est effectuée et l’administrateur est averti si le cache local est obsolète.
* Vous devez exécuter `Update-Evergreen` : le cache local n’est pas automatiquement mis à jour lors de l’importation du module.
* Lorsque vous exécutez `Update-Evergreen`, si le cache local est obsolète, il est automatiquement mis à jour vers la dernière version.
* Si la version du cache local correspond à la dernière version, `Update-Evergreen` compare les fichiers mis en cache aux sommes de contrôle SHA-256 de la version publiée. La fonction signale les fichiers manquants ou modifiés sans les remplacer automatiquement ; exécutez `Update-Evergreen -Force` pour resynchroniser le cache.
* Avant d’installer les fichiers d’une version téléchargée, `Update-Evergreen` vérifie leurs sommes de contrôle SHA-256. Si la vérification échoue, les applications et manifestes locaux ne sont pas remplacés.
* Si vous téléchargez une version spécifique des applications Evergreen, le cache local sera considéré comme obsolète. Si vous exécutez de nouveau `Update-Evergreen`, il sera mis à jour vers la dernière version.

## Emplacement du cache

Evergreen stocke les fonctions d’application et les manifestes aux emplacements suivants :

* Windows – `%LocalAppData%\Evergreen`
* macOS et Linux – `~\.evergreen`

`Get-EvergreenAppsPath` permet de connaître l’emplacement actuel du cache :

```powershell
PS C:\> Get-EvergreenAppsPath
C:\Users\aaron\AppData\Local\Evergreen
```

## Définir un emplacement personnalisé pour le cache

Vous pouvez définir un emplacement de cache personnalisé à l’aide de la variable d’environnement `EVERGREEN_APPS_PATH`. Configurez cette variable dans le contexte utilisateur ou système et vérifiez qu’elle pointe vers un chemin valide.

![Définition de EVERGREEN_APPS_PATH sous Windows](/img/environment-variable.png)
