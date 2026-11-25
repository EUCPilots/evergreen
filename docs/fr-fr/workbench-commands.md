---
layout: doc
---
# Référence des commandes Windows Workbench

::: warning Préversion
Windows Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

L’importation du module EvergreenUI expose une API PowerShell sans interface graphique, sans charger WPF. La fenêtre Workbench appelle les mêmes commandes publiques ; toutes ses fonctions peuvent donc être scriptées. Utilisez `Get-Help <command> -Full` pour consulter les paramètres et les exemples.

```powershell
Import-Module EvergreenUI
$artifacts = Get-EwApp -Name MicrosoftEdge
Get-EwFilterableProperty -Artifact $artifacts
$artifacts |
    Where-Object Architecture -eq 'x64' |
    Select-Object -First 1 |
    Save-EwArtifact -AppName MicrosoftEdge
Get-EwLibrary
Update-EwLibrary -WhatIf
```

Les commandes qui modifient des données prennent en charge `-WhatIf` et `-Confirm` lorsque l’aide le précise.

## Applications et téléchargements

| Commande | Description |
|---|---|
| `Get-EwApp` | Répertorier les applications Evergreen ou résoudre les artefacts d’une application |
| `Get-EwFilterableProperty` | Décrire les propriétés d’artefact utilisables pour filtrer |
| `Save-EwArtifact` | Télécharger un artefact résolu |
| `Add-EwFavouriteApp` / `Remove-EwFavouriteApp` | Gérer les applications favorites |

## Library

| Commande | Description |
|---|---|
| `Get-EwLibrary` | Lire les applications et versions d’une bibliothèque (utilise par défaut le chemin enregistré) |
| `Update-EwLibrary` | Mettre à jour une bibliothèque initialisée |
| `Remove-EwLibraryApp` | Supprimer une application ou les lignes d’artefact sélectionnées |

`Remove-EwLibraryApp` prend en charge `-WhatIf` et `-Confirm`. Pour supprimer des lignes en vérifiant l’instantané, fournissez les index de ligne du manifeste (base zéro) avec `-Index`, ainsi que les valeurs `ManifestHash` et `LibraryHash` obtenues avec `Get-EwLibrary` sous `-ExpectedManifestHash` et `-ExpectedLibraryHash`. Sans `-Index`, toute l’application est supprimée.

## Définitions et installation locale

| Commande | Description |
|---|---|
| `Get-EwDefinition` | Lire et valider les définitions `App.json` |
| `Resolve-EwArtifact` | Résoudre le dernier artefact d’une définition |
| `Update-EwDefinition` | Mettre à jour la version et les métadonnées des fichiers d’installation |
| `Test-EwDetection` | Évaluer les règles de détection File, Registry et MSI |
| `Install-EwPackage` | Télécharger et installer localement une définition (`ShouldProcess`) |

## Empaquetage et publication

| Commande | Description |
|---|---|
| `New-EwPackage` | Créer un package Win32 Intune ou Microsoft 365 Apps |
| `Get-EwM365Configuration` | Répertorier les fichiers de configuration Microsoft 365 Apps |
| `Get-EwM365BuildPlan` | Prévisualiser les entrées de création et l’identité du fournisseur |
| `Connect-EwIntune` / `Disconnect-EwIntune` | Gérer la session Microsoft Graph |
| `Get-EwIntuneApp` / `Compare-EwIntuneApp` | Répertorier et comparer les applications Win32 Intune |
| `Publish-EwIntuneApp` / `Publish-EwIntuneBatch` | Publier des applications Win32 |
| `Set-EwIntuneSupersedence` | Définir une relation de supersédence |
| `Get-EwM365IntunePublishPlan` / `Publish-EwM365IntuneApp` | Prévisualiser et publier une application Microsoft 365 dans Intune |
| `Get-EwM365IntuneRecovery` / `Clear-EwM365IntuneRecovery` | Répertorier les résultats non résolus et les acquitter |

## Azure et Nerdio

| Commande | Description |
|---|---|
| `Connect-EwAzure` / `Disconnect-EwAzure` | Se connecter à Azure pour rechercher des destinations de stockage |
| `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer` | Répertorier les destinations de stockage |
| `Connect-EwNerdio` / `Disconnect-EwNerdio` | Gérer la session Nerdio ; `-ApiOnly` ignore le stockage Azure |
| `Get-EwNerdioDefinition` | Lire les définitions Shell App |
| `Get-EwNerdioShellApp` / `Get-EwNerdioShellAppVersion` | Répertorier les Shell Apps et leurs versions |
| `Compare-EwNerdioShellApp` | Comparer les définitions à Nerdio Manager |
| `Get-EwNerdioPublishPlan` / `Publish-EwNerdioBatch` | Planifier et publier séquentiellement les sélections confirmées |
| `Publish-EwNerdioApp` | Publier une Shell App ou ajouter une version (`-ShellAppId`) |
| `Get-EwNerdioShellAppVersionPrunePlan` / `Remove-EwNerdioShellAppVersion` | Prévisualiser et supprimer les anciennes versions |
| `Get-EwM365NerdioPublishPlan` / `Publish-EwM365NerdioApp` | Prévisualiser et publier un package Microsoft 365 dans Nerdio |

Les sessions Nerdio sont partagées en mémoire entre les workers du module. L’expiration, la déconnexion et les changements de configuration du fournisseur nécessitent une nouvelle connexion. Les jetons et secrets ne sont jamais enregistrés.

## Paramètres, cache et dépendances

| Commande | Description |
|---|---|
| `Get-EwSetting` / `Set-EwSetting` / `Reset-EwSetting` | Lire et modifier les paramètres Workbench |
| `Clear-EwCache` | Vider les caches du catalogue, des versions et des artefacts de définition (`-WhatIf`, `-Confirm`, `-CachePath`) |
| `Get-EwDependency` | Signaler l’état des dépendances des modules |
| `Update-EwEvergreen` | Mettre à jour les données d’applications Evergreen |

`-CachePath` explicite avec `Clear-EwCache` cible le cache des définitions et invalide également les caches du catalogue ; aucun autre répertoire personnalisé n’est recherché. L’invalidation s’applique aux runspaces et processus Workbench qui partagent le cache.

## Travaux en arrière-plan

| Commande | Description |
|---|---|
| `Start-EwJob` | Exécuter un bloc de script dans le pool partagé (jusqu’à quatre workers) |
| `Get-EwJob` | Afficher l’état, la progression, les informations, les erreurs et la sortie |
| `Stop-EwJob` | Demander l’annulation |
| `Remove-EwJob` | Libérer un travail terminé |

Les blocs de script des travaux sont recréés dans le worker et ne capturent pas les variables de l’appelant ; transmettez les entrées avec `-ArgumentList`. Utilisez `-NoModuleImport` si le travail n’a pas besoin des commandes Workbench, même si un worker réutilisé peut conserver les modules chargés par des travaux antérieurs.

```powershell
$job = Start-EwJob -Name 'Edge lookup' -ScriptBlock { Get-EwApp -Name MicrosoftEdge }
do {
    Start-Sleep -Seconds 1
    $snapshot = Get-EwJob -Id $job.Id
} while ($snapshot.State -in 'NotStarted', 'Running', 'Stopping')
$snapshot.Output
Remove-EwJob -Id $job.Id -Confirm:$false
```

## Settings

Les paramètres sont stockés dans `%APPDATA%\EvergreenWorkbench\settings.json`. Les valeurs acceptées par `Set-EwSetting -Name` sont : `Theme`, `OutputPath`, `LibraryPath`, `PackageOutputPath`, `IntuneDefinitionsPath`, `IntuneTenantId`, `NerdioDefinitionsPath`, `NerdioTenantId`, `NmeHost`, `NmeClientId`, `NmeApiScope`, `NmeOAuthTokenUrl`, `NmeSubscriptionId`, `NmeResourceGroup`, `NmeStorageAccount`, `NmeContainer`, `M365DefinitionsPath`, `M365Channel`, `M365CompanyName`, `M365ImportFor`, `StartupView`, `LastAppName`, `WindowWidth`, `WindowHeight`, `DownloadTrayHeight`, `AppsListWidth`, `ArtifactHiddenColumns` et `WindowMaximized`.
