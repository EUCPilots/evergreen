---
layout: doc
---
# Packages Microsoft 365 Apps

::: warning Validation recommandée
Validez votre configuration XML, les résultats de l’empaquetage et les autorisations du locataire avant toute utilisation en production.
:::

Les vues **Intune** et **Nerdio** comportent chacune un onglet **Microsoft 365 Apps** qui crée un package Microsoft 365 Apps à partir d’un fichier XML de configuration Office Deployment Tool (ODT) et peut éventuellement le publier.

## Flux de travail

1. Connectez-vous au fournisseur concerné ([Intune](/fr-fr/workbench-intune) ou [Nerdio](/fr-fr/workbench-nerdio)).
2. Indiquez le **Configuration folder**, puis choisissez **Load configurations**. Ce dossier est partagé par Intune et Nerdio. Chaque configuration doit avoir un ID valide et non vide.
3. Sélectionnez une configuration et choisissez le **Channel**, le **Company name** et le **Session type**.
4. Choisissez **Preview build** ou **Preview publishing**, puis **Build only** ou **Build and publish**.
5. Utilisez **Save shared settings** pour enregistrer les sélections non secrètes.

La création seule dans Nerdio peut utiliser la connexion **API only**. La publication dans Nerdio nécessite également le locataire, l’abonnement et la destination de stockage Azure connectés.

## Fichiers requis

- `Uninstall-Microsoft365Apps.xml` avec un élément `Configuration.Remove`. Il est requis pour la création de packages Nerdio et la publication dans Intune. La création seule dans Intune peut s’en passer, mais la publication nécessite une nouvelle création avec ce fichier, car la commande de désinstallation le référence.
- Pour Nerdio, un dossier `shell-app` situé à côté du XML et contenant `Definition.json`, `Detect.ps1`, `Install.ps1` et `Uninstall.ps1`.

Les fichiers XML et scripts source ne sont jamais modifiés.

## Versions et création

L’aperçu affiche séparément la version résolue **Office channel version** et la version de téléchargement **ODT download version**. L’archive ODT signée est extraite à l’aide de `tar.exe` sous Windows ; l’exécutable téléchargé n’est pas exécuté. La configuration créée utilise un canal évolutif et ne peut pas utiliser `DownloadPath`, qui exige une version fixe.

Une version d’Office installée peut être plus récente que celle de l’aperçu ; la détection Intune accepte donc la version affichée ou une version ultérieure.

::: info
La propriété `TenantId` et la valeur `AppSettings\Setup Name="Company"` de l’entreprise sont écrites dans la configuration, mais Microsoft ne les documente pas comme association au locataire ou configuration d’entreprise. Le locataire connecté ne prouve pas qu’Office y est associé. [`TenantAssociationKey`](https://learn.microsoft.com/microsoft-365-apps/deploy/office-deployment-tool-configuration-options#tenantassociationkey-property-part-of-property-element) de Microsoft est une valeur différente.
:::

## Publication

Une confirmation est demandée avant la création.

- **Intune** crée une application et affiche les correspondances existantes par ID de configuration. Vous pouvez éventuellement remplacer une application au moyen de **Optional app to supersede** (relation de mise à jour sans la désinstaller).
- **Nerdio** peut créer une Shell App ou ajouter une version à **Existing Shell App for add version**. Pour ajouter une version déjà présente, cochez *I confirm the configuration changed if this Office version already exists*. Nerdio ne peut pas comparer la configuration distante et peut tout de même refuser l’opération.

Les entrées et les destinations des fournisseurs sont vérifiées avant les écritures, mais pas de manière atomique. Un package existant n’est remplacé qu’avec autorisation explicite. Les créations conservent les sources et outils intermédiaires dans `<application>\Builds\<GUID>` du dossier de sortie ; supprimez-les manuellement lorsque vous n’en avez plus besoin. L’annulation prend effet entre les étapes et n’interrompt pas une création, un téléversement ou une requête en cours.

## Récupération

Les résultats Intune inconnus sont stockés sans secrets et bloquent les écritures pour cette configuration jusqu’à leur examen. Utilisez la section **Recovery** de l’onglet Intune : **Load recovery records**, inspectez l’application dans Intune, puis **Acknowledge reviewed outcome**. Les résultats Nerdio en attente ou inconnus utilisent les commandes de récupération [Shell Apps](/fr-fr/workbench-nerdio). Rien n’est automatiquement relancé, annulé ou nettoyé.

## Commandes

`Get-EwM365Configuration`, `Get-EwM365BuildPlan`, `New-EwPackage`, `Get-EwM365IntunePublishPlan`, `Publish-EwM365IntuneApp`, `Get-EwM365IntuneRecovery`, `Clear-EwM365IntuneRecovery`, `Get-EwM365NerdioPublishPlan` et `Publish-EwM365NerdioApp`. Un appel à `New-EwPackage` pour Microsoft 365 sans aperçu en crée un automatiquement et nécessite toujours la session fournisseur.
