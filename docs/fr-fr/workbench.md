---
layout: doc
---
# À propos d’Evergreen Workbench

Evergreen Workbench est une interface graphique qui permet d’explorer les données de version des applications du module PowerShell [Evergreen](/fr-fr/about). Il existe en deux éditions : **Windows Workbench** pour Windows et **Web Workbench**, qui s’exécute dans tout navigateur moderne.

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **2.0.1-preview**.
:::

## Windows Workbench et Web Workbench

| | Windows Workbench | Web Workbench |
|---|---|---|
| **Plateforme** | Windows (WPF, PowerShell 7.6+) | Tout navigateur moderne |
| **Installation** | Module PowerShell ([EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/)) | Aucune installation – hébergé sur [eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Parcourir les applications** | Oui | Oui |
| **Rechercher et filtrer** | Oui | Oui |
| **Tableau de bord** | - | Oui |
| **Télécharger les programmes d’installation** | Oui | - |
| **Gérer les bibliothèques** | Oui | - |
| **Définitions et installation locale** | Oui (préversion) | - |
| **Publier dans Intune / Nerdio Manager** | Oui (préversion) | - |
| **Packages Microsoft 365 Apps** | Oui (préversion) | - |
| **Commandes scriptables** | Oui (`Ew`) | - |
| **Exporter au format CSV** | Oui | Oui |
| **Flux RSS** | - | Oui (par application) |
| **Installation PWA** | - | Oui |
| **Thème** | Clair / Sombre | Clair / Sombre |

## Windows Workbench

::: warning Bêta
Windows Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

Windows Workbench est une interface graphique WPF distribuée sous forme de module PowerShell `EvergreenUI`. Elle expose les mêmes applets de commande que vous utilisez déjà (`Get-EvergreenApp`, `Save-EvergreenApp`, `Update-EvergreenLibrary`, etc.) dans une interface Windows interactive.

Fonctionnalités principales :

- **Applications** - parcourir et filtrer chaque application Evergreen, choisir les colonnes visibles, exporter au format CSV et mettre des téléchargements en file d’attente
- **Bibliothèque** - lire, mettre à jour et supprimer sélectivement des applications ou des versions
- **Packages** - charger et mettre à jour les définitions `App.json` et tester l’installation locale
- **Intune** - comparer les définitions aux applications Win32, puis créer et publier les packages
- **Nerdio** - comparer les applications Shell, publier des applications et des versions, puis supprimer les anciennes versions
- **Microsoft 365 Apps** - créer et publier des packages Office vers Intune ou Nerdio Manager
- **Commandes headless** - utiliser les mêmes fonctions via des commandes `Ew` scriptables
- **Paramètres et À propos** - dossiers enregistrés, thème et état des dépendances

Pour en savoir plus :

- [Installer Windows Workbench](/fr-fr/workbench-install)
- [Utiliser Windows Workbench](/fr-fr/workbench-desktop)
- [Packages, définitions et installation locale](/fr-fr/workbench-packages)
- [Publier dans Microsoft Intune](/fr-fr/workbench-intune)
- [Publier dans Nerdio Manager](/fr-fr/workbench-nerdio)
- [Packages Microsoft 365 Apps](/fr-fr/workbench-m365)
- [Référence des commandes Windows Workbench](/fr-fr/workbench-commands)

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
