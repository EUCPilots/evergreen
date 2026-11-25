---
layout: doc
---
# Publier dans Microsoft Intune

::: warning Validation recommandée
La publication crée de véritables applications dans votre locataire. Validez l’empaquetage, la détection et le comportement des affectations dans un locataire de test avant toute utilisation en production.
:::

La vue **Intune** compare les [définitions](/fr-fr/workbench-packages) `App.json` enregistrées aux applications Win32 de Microsoft Intune, puis crée et publie celles que vous sélectionnez. Elle comporte deux onglets : **Win32 apps** et **Microsoft 365 Apps** (voir [Packages Microsoft 365 Apps](/fr-fr/workbench-m365)).

## Prérequis

Les flux Intune nécessitent les modules facultatifs suivants, chargés uniquement lors de leur utilisation :

- `IntuneWin32App` - crée les packages `.intunewin`
- `Microsoft.Graph.Authentication` - se connecte à Microsoft Graph

La connexion utilise `Connect-EwIntune`. Vous pouvez fournir un **Tenant ID** facultatif. Les jetons restent en mémoire et ne sont pas enregistrés.

## Applications Win32

1. Sélectionnez le **Definitions folder** et chargez-le, ou réutilisez celui enregistré dans [Packages](/fr-fr/workbench-packages).
2. Choisissez **Connect** pour vous connecter. L’UPN connecté s’affiche à côté du bouton **Connect/Disconnect**.
3. Choisissez **Load matching Intune apps** / **Compare definitions**. Le tableau affiche Publisher, la version **Saved**, la version **Intune** et le **Status** de correspondance. L’éditeur apparaît à côté de chaque définition.
4. Sélectionnez les lignes admissibles et choisissez **Build and publish selected**.

Les correspondances Intune ambiguës sont distinguées des chaînes de supersédence liées ; les GUID de définition en double sont signalés afin de pouvoir les corriger dans la définition.

### Mettre à jour des applications et gérer la supersédence

- Les applications existantes correspondantes sont **remplacées** par la nouvelle version au moyen de la supersédence.
- **Update app** (case à cocher par ligne, désactivée par défaut) publie l’application comme mise à jour, affectée en tant que **required** à **All Devices**.

### Publier un lot

Une confirmation unique couvre tout le lot. La publication est séquentielle, peut mettre à jour les fichiers de définition, s’arrête entre les applications si vous choisissez **Cancel batch** et consigne les modifications locales et Intune partielles dans le tableau **Batch results** (Definition, Result, New app ID, Previous app ID, Details). Les ID d’application partiels sont conservés. En cas d’échec de la supersédence, utilisez **Retry selected link** pendant la même session Workbench.

Les packages sont créés à partir du dossier de téléchargement des installateurs, y compris les sous-dossiers de channel, version ou architecture, puis écrits dans le dossier de sortie des packages.

## Commandes

`Connect-EwIntune`, `Disconnect-EwIntune`, `Get-EwIntuneApp`, `Compare-EwIntuneApp`, `Publish-EwIntuneApp`, `Publish-EwIntuneBatch` et `Set-EwIntuneSupersedence`. Consultez la [référence des commandes](/fr-fr/workbench-commands).

```powershell
Connect-EwIntune
Compare-EwIntuneApp -DefinitionPath C:\Packages
```
