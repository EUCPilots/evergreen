---
layout: doc
---
# Publier dans Nerdio Manager

::: warning Validation recommandée
Validez les autorisations d’API, les correspondances de définitions et le comportement après publication dans votre environnement avant toute utilisation en production.
:::

La vue **Nerdio** se connecte à Azure et à l’API Nerdio Manager, compare les définitions Shell App avec Nerdio Manager, publie de nouvelles Shell Apps ou versions et supprime les anciennes versions. Elle comporte trois onglets : **Settings**, **Shell Apps** et **Microsoft 365 Apps** (voir [Packages Microsoft 365 Apps](/fr-fr/workbench-m365)).

## Onglet Settings - connexions

La connexion s’effectue en deux étapes.

**Configuration du stockage Azure**

1. Entrez l’**Azure tenant ID** et l’**Azure subscription ID**, puis choisissez **Connect Azure**.
2. Sélectionnez le **Resource group**, le **Storage account** et le **Blob container** destinés aux packages.

**Configuration de l’API Nerdio**

Entrez le **Nerdio HTTPS host**, l’**Application client ID**, l’**API scope**, une **OAuth token URL** facultative et le **Client secret (not saved)**, puis choisissez **Connect Nerdio API**.

Utilisez **Save setup** pour enregistrer les valeurs non secrètes. Le secret client est effacé du formulaire lors de la connexion et n’est jamais enregistré. **Disconnect Azure and Nerdio** ferme les deux sessions sans modifier un contexte Azure sans rapport.

**API only (Microsoft 365 build only)** permet de s’authentifier auprès de Nerdio sans stockage Azure. La publication vers Nerdio requiert une connexion complète avec stockage Azure.

Les modules requis sont `Az.Accounts`, `Az.Resources` et `Az.Storage` ; ils ne sont chargés qu’en cas de besoin.

## Onglet Shell Apps

Saisissez ou parcourez le **Shell App definitions folder** (qui contient les fichiers `Definition.json` et les scripts), choisissez **Save setup**, puis **Load and compare**. Le tableau compare chaque **Local app** à l’application **Nerdio** correspondante, avec ses versions et son état.

Seules les définitions Evergreen valides peuvent être publiées :

- Une définition sans correspondance crée une Shell App (**New Shell App name**).
- Une correspondance non ambiguë avec une version plus récente ajoute une version à l’application existante.
- Les applications à jour, les correspondances en double et les sources non prises en charge sont bloquées.

L’installateur résolu est téléversé directement vers le stockage Blob. Les définitions locales ne sont pas modifiées.

### Publication

**Publish selected** présente une confirmation unique avec les versions, les opérations et les destinations Azure et Nerdio. Les fichiers, sources et correspondances sont vérifiés à nouveau avant toute écriture. **Cancel batch** prend effet entre les éléments ; l’opération du fournisseur en cours se termine d’abord. Les résultats conservent les ID connus des blobs, applications et travaux.

### Récupération

Les résultats en attente ou inconnus interrompent le lot et bloquent les publications Nerdio suivantes jusqu’à leur examen. Workbench enregistre les opérations non résolues et les propositions de nettoyage dans `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json`. Aucun jeton ni secret n’y est stocké. La récupération exige de se reconnecter au même locataire, abonnement, hôte Nerdio et destination de stockage.

Sélectionnez un résultat non résolu et choisissez **Review outcome** :

- **Yes** - uniquement après avoir confirmé la réussite dans Nerdio
- **No** - uniquement après avoir confirmé l’échec
- **Cancel** - laisser le résultat non résolu

Une réussite déclarée n’est acceptée qu’après actualisation de la Shell App par Workbench et vérification que la version publiée est bien l’unique version la plus récente. Aucune opération n’est automatiquement relancée, annulée ou supprimée.

### Nettoyer les anciennes versions

Après une publication réussie, **Preview published apps** affiche les propositions de nettoyage enregistrées. Aucune application n’est sélectionnée par défaut et une version est conservée par défaut (y compris la nouvelle). Vous pouvez modifier le nombre de versions conservées et les applications, puis confirmer la liste exacte des suppressions. Les versions en double, impossibles à ordonner ou non les plus récentes sont ignorées. Une suppression en attente ou dont l’issue est inconnue interrompt le nettoyage et bloque la publication dans cette Shell App jusqu’à examen. Les propositions reportées sont conservées après le redémarrage.

Pour supprimer des versions sans publier, sélectionnez une Shell App correspondante et choisissez **Prune selected app**. Les lignes sans correspondance et les sélections multiples ne permettent pas cette action ; les résultats Nerdio non résolus la bloquent. La destination et l’instantané des versions sont vérifiés avant suppression, puis la comparaison est actualisée.

## Commandes

`Connect-EwAzure`, `Connect-EwNerdio`, `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer`, `Get-EwNerdioDefinition`, `Get-EwNerdioShellApp`, `Get-EwNerdioShellAppVersion`, `Compare-EwNerdioShellApp`, `Get-EwNerdioPublishPlan`, `Publish-EwNerdioApp`, `Publish-EwNerdioBatch`, `Get-EwNerdioShellAppVersionPrunePlan` et `Remove-EwNerdioShellAppVersion`. Consultez la [référence des commandes](/fr-fr/workbench-commands).

`Publish-EwNerdioApp -ShellAppId` ajoute une version à une Shell App existante et télécharge la source de la définition si `-PackagePath` est omis. `Remove-EwNerdioShellAppVersion` accepte `-ExpectedVersionNames` et `-ExpectedRemovalVersions` pour refuser un aperçu obsolète.
