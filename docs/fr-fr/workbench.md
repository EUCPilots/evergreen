---
layout: doc
---
# À propos d’Evergreen Workbench

Evergreen Workbench est une interface graphique qui permet d’explorer les données de version des applications du module PowerShell [Evergreen](/fr-fr/about). Il existe en deux éditions : **Desktop Workbench** pour Windows et **Web Workbench**, qui s’exécute dans tout navigateur moderne.

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **1.0.21**.
:::

## Comparaison des éditions Desktop et Web

| | Desktop Workbench | Web Workbench |
|---|---|---|
| **Plateforme** | Windows (WPF) | Tout navigateur moderne |
| **Installation** | Module PowerShell ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | Aucune installation – hébergé sur [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Parcourir les applications** | Oui | Oui |
| **Rechercher et filtrer** | Oui | Oui |
| **Tableau de bord** | - | Oui |
| **Télécharger les programmes d’installation** | Oui | - |
| **Gérer les bibliothèques** | Oui | - |
| **Installer / mettre à jour des applications** | Oui (préversion) | - |
| **Importer dans Intune / Nerdio / Microsoft 365 Apps** | Oui (préversion) | - |
| **Exporter au format CSV** | Oui | Oui |
| **Flux RSS** | - | Oui (par application) |
| **Installation PWA** | - | Oui |
| **Thème** | Clair / Sombre | Clair / Sombre |

## Desktop Workbench

::: warning Bêta
Desktop Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

Desktop Workbench est une interface graphique WPF distribuée sous forme de module PowerShell `EvergreenUI`. Elle regroupe les mêmes applets de commande que vous utilisez déjà (`Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate`, etc.) dans une interface de bureau Windows interactive.

![Vue Applications de Desktop Workbench](/img/ui/evergreen-workbench-apps.png)

Fonctionnalités principales :

- **Parcourir et filtrer** toutes les applications prises en charge par Evergreen à l’aide de panneaux de filtre dynamiques
- **Télécharger** les programmes d’installation avec un gestionnaire de téléchargements en file d’attente
- **Gérer les bibliothèques** – créer, parcourir et mettre à jour les bibliothèques Evergreen sur disque
- **Installer et mettre à jour** des applications directement à partir de définitions de packages *(flux de travail en préversion)*
- **Importer** des packages d’applications dans Microsoft Intune (applications Win32), Nerdio Manager (Shell Apps) et les flux de travail Microsoft 365 Apps *(flux de travail en préversion)*
- **Paramètres** des chemins de téléchargement, des thèmes, du niveau de détail des journaux et de la configuration des fournisseurs

Pour en savoir plus, consultez [Installer Desktop Workbench](/fr-fr/workbench-install) et [Utiliser Desktop Workbench](/fr-fr/workbench-desktop).

## Web Workbench

Web Workbench est une application Web accessible à l’adresse [eucpilots.com/workbench](https://eucpilots.com/workbench). Elle offre une vue en lecture seule de toutes les applications suivies par Evergreen ; PowerShell et Windows ne sont pas nécessaires.

![Tableau de bord de Web Workbench](/img/webui/webworkbench-dashboard.jpeg)

Fonctionnalités principales :

- **Tableau de bord** avec statistiques récapitulatives, graphiques des architectures et types de fichiers, recherche d’URI et activité récente
- **Parcourir et filtrer** toutes les applications prises en charge par Evergreen avec des colonnes triables et des filtres par colonne
- **Rechercher** parmi toutes les applications et les URI de téléchargement à l’aide de la recherche globale superposée
- **Exporter** les résultats filtrés au format CSV
- **Flux RSS** pour chaque application
- **Installer comme PWA** pour utiliser l’application de manière autonome sur toute plateforme

Pour en savoir plus, consultez [Utiliser Web Workbench](/fr-fr/workbench-web).
