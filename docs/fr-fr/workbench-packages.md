---
layout: doc
---
# Packages, définitions et installation locale

::: warning Préversion
Windows Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

La vue **Packages** utilise des définitions `App.json`. Une définition décrit une application, la façon de trouver son dernier installateur avec Evergreen et la façon de la détecter sur un ordinateur. Les mêmes définitions servent à l’installation locale et à la publication dans Intune.

Les définitions sont disponibles dans le dépôt [evergreen-packages](https://github.com/EUCPilots/evergreen-packages).

::: info
Validez les définitions de packages avant de les utiliser. À terme, l’objectif est de disposer d’une définition unifiée pour les applications Win32 Intune et les Shell Apps Nerdio Manager.
:::

La vue comporte deux onglets : **Definitions**, affiché par défaut, et **Install**. Si la vue de démarrage enregistrée est Install, Packages s’ouvre sur cet onglet. La sélection de l’onglet n’est pas enregistrée.

## Onglet Definitions

Saisissez ou sélectionnez avec **Browse** le dossier de définitions Packages, puis choisissez **Load definitions** (ou **Reload definitions**). Utilisez **Save path** pour mémoriser le dossier. Le paramètre **Package output folder** détermine l’emplacement de création des packages Intune.

Le tableau répertorie Application, Publisher, Version, Architecture et Status pour chaque définition.

**Update definitions** résout l’artefact Evergreen le plus récent pour chaque définition et met à jour sur place la version `App.json`, les métadonnées des fichiers d’installation et les règles de détection. Les expressions `Application.Filter` enregistrées sont analysées par un évaluateur à capacités limitées ; elles ne sont pas exécutées comme PowerShell. Seules les requêtes Evergreen prises en charge (`Get-EvergreenApp` et `Get-VcList`) et les prédicats `Where-Object` sont résolus. La liste est rechargée à la fin ; les échecs de définitions individuelles sont conservés et signalés.

## Onglet Install

Install teste sur l’ordinateur local l’installateur résolu à partir d’une définition. Il ne s’agit pas d’un package de déploiement ni d’une condition préalable à la publication dans Intune ou Nerdio.

À l’ouverture de l’onglet, Workbench actualise les définitions et la détection locale. Les évaluations antérieures de la dernière version et de l’architecture sont supprimées, mais les définitions toujours présentes restent sélectionnées. Si une autre opération est en cours, l’actualisation attend et les actions d’installation restent désactivées jusqu’à l’arrivée des résultats.

| Colonne | Signification |
|---|---|
| **Application** / **Publisher** | Valeurs de la définition |
| **Required architecture** | Architecture exigée par la définition |
| **Artifact architecture** | Architecture de l’installateur résolu |
| **Architecture status** | Compatibilité de l’installateur avec cet ordinateur |
| **Installed** | Version détectée selon les règles de détection |
| **Latest** | Dernière version renseignée par **Find latest versions** |
| **Status** | Installé, mise à jour disponible, non installé ou dernière version non vérifiée |

Utilisez **Find latest versions** pour interroger le catalogue Evergreen à la demande, sélectionnez des lignes, puis choisissez **Install selected**. Une seule confirmation couvre le lot ; chaque application reçoit son propre résultat : `Installed`, `Failed`, `Blocked` ou `Skipped`. Utilisez **Hide incompatible** pour masquer les lignes bloquées pendant la session actuelle.

Les règles de détection prennent en charge les types File, Registry et MSI. Si Workbench n’est pas exécuté avec des privilèges élevés, les installateurs peuvent demander une élévation UAC.

### Vérifications d’architecture

L’architecture native de Windows est comparée aux exigences de la définition et à l’installateur résolu.

- Les combinaisons incompatibles sont **bloquées**.
- Une **exigence manquante** ou une **émulation x64 sur Arm64** nécessite une autorisation distincte pour chaque application concernée. Les applications refusées ou bloquées sont ignorées.
- Les installateurs x86 sont pris en charge sur x86, x64 et Arm64. Windows 10 sur Arm ne prend pas en charge l’émulation x64.
- Si les métadonnées de la définition ou de l’artefact changent pendant la confirmation, elles sont réévaluées, avec au plus deux nouvelles confirmations.

Ces vérifications ne calculent pas l’empreinte des octets téléchargés et ne garantissent pas qu’une application fonctionnera.

Pour utiliser `Install-EwPackage` sans interaction, fournissez explicitement `-AllowMissingArchitectureRequirement` et/ou `-AllowX64OnArm64`. `-Confirm:$false` seul n’autorise pas ces avertissements ; un appel non interactif sans l’option requise échoue. `-WhatIf` ne résout ni ne télécharge d’installateur.

## Commandes

| Tâche | Commande |
|---|---|
| Lire et valider les définitions | `Get-EwDefinition` |
| Résoudre l’artefact le plus récent | `Resolve-EwArtifact` |
| Mettre à jour les définitions | `Update-EwDefinition` |
| Vérifier les règles de détection | `Test-EwDetection` |
| Installer localement | `Install-EwPackage` |

Consultez la [référence des commandes](/fr-fr/workbench-commands).
