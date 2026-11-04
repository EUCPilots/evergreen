---
layout: doc
---
# Utiliser Web Workbench

Evergreen Web Workbench est une application accessible depuis un navigateur, qui permet d’explorer les données de version suivies par le module [Evergreen](/fr-fr/about). Elle est disponible sur toutes les plateformes : ouvrez-la à l’adresse suivante :

**[eucpilots.com/workbench](https://eucpilots.com/workbench)**

::: tip
Web Workbench peut être installée comme application Web progressive (PWA) afin de fonctionner de manière autonome. Utilisez l’option d’installation de votre navigateur pour l’ajouter au bureau ou à l’écran d’accueil.
:::

## Tableau de bord

Le tableau de bord présente une vue d’ensemble de toutes les applications suivies par Evergreen.

![Tableau de bord Web Workbench avec statistiques récapitulatives, graphiques et activité récente](/img/webui/webworkbench-dashboard.jpeg)

### Statistiques récapitulatives

La rangée supérieure affiche les indicateurs clés :

| Indicateur | Description |
|---|---|
| Applications suivies | Nombre total d’applications suivies par Evergreen |
| Entrées de version | Nombre total d’enregistrements de version pour toutes les applications |
| Architectures | Nombre d’architectures de processeur distinctes (x64, x86, ARM64, etc.) |
| Types de fichiers | Nombre de formats de programmes d’installation distincts (exe, msi, msix, zip, etc.) |
| Mises à jour récentes | Applications dont les données ont été mises à jour au cours des 48 dernières heures |

### Graphiques

Deux histogrammes horizontaux illustrent la répartition des entrées de version :

- **Architecture** – répartition par architecture de processeur (x64, x86, ARM64, aarch64, etc.)
- **Type de fichier** – répartition par format de programme d’installation (exe, msi, msix, zip, cab, etc.)

### Recherche d’URI

Collez une URL de téléchargement dans le champ de recherche d’URI pour trouver l’application Evergreen correspondante.

### Activité récente

Liste des applications dont les données ont été mises à jour récemment, avec le nom de l’application et la date de sa dernière mise à jour.

## Vue Applications

La vue Applications affiche dans une barre latérale à gauche toutes les applications prises en charge par Evergreen et, à droite, les détails de leurs versions. Sélectionnez une application pour afficher ses entrées de version.

![Vue Applications présentant Adobe Acrobat Reader DC avec les colonnes version, langue, taille, architecture et URI](/img/webui/webworkbench-apps.jpeg)

La barre latérale affiche :

- **Nombre d’applications** – total et nombre de filtres actifs
- **Champ de recherche** – saisissez du texte pour filtrer les applications par nom
- **Icône étoile** – les applications récemment mises à jour sont mises en évidence
- **Filtre Récent** – limite la barre latérale aux applications mises à jour au cours des dernières 24 h, 48 h, 72 h ou de la dernière semaine

Le tableau des détails de version comporte les colonnes suivantes :

| Colonne | Description |
|---|---|
| Version | Chaîne de version de l’application |
| Langue | Langue ou paramètres régionaux du programme d’installation |
| Taille | Taille du fichier d’installation en Mo |
| Architecture | Architecture du processeur (x64, x86, ARM64, etc.) |
| URI | URL de téléchargement direct du programme d’installation |

Selon l’application, des colonnes supplémentaires (Channel, Release, Date, Expiry, SHA256, Type) sont disponibles. Utilisez le bouton **Colonnes** pour afficher ou masquer des colonnes.

### Filtres d’architecture et de type

En haut du volet de détails, des cases à cocher permettent d’affiner les résultats selon l’architecture (par exemple x64, x86) et le type de fichier (par exemple exe, msi). Le nombre de résultats correspondants est actualisé à chaque modification des filtres.

### Barre d’outils

La barre d’outils au-dessus du tableau des versions propose :

- **Commande Get-EvergreenApp** – bouton permettant de copier la commande PowerShell qui récupère les mêmes données (par exemple `Get-EvergreenApp -Name AdobeAcrobatReaderDC`)
- **RSS** – lien vers le flux RSS de l’application sélectionnée
- **Date de mise à jour** – indique la dernière actualisation des données de l’application
- **Effacer la recherche** – efface le texte de recherche dans la barre latérale
- **Effacer les filtres** – réinitialise tous les filtres de colonne, d’architecture et de type
- **Colonnes** – affiche ou masque les colonnes du tableau
- **Exporter au format CSV** – télécharge la vue filtrée actuelle dans un fichier CSV

## Filtrage

Chaque colonne du tableau de détails des versions comporte un champ de filtre textuel sous son en-tête. Saisissez une valeur dans un champ pour limiter les résultats aux lignes correspondantes.

![Vue Applications filtrée sur la colonne Langue pour n’afficher que les résultats en anglais](/img/webui/webworkbench-filter.jpeg)

Les filtres de colonne fonctionnent de concert avec les cases à cocher d’architecture et de type. Par exemple, cochez x64 et saisissez « English » dans le filtre Langue pour afficher uniquement les programmes d’installation x64 en anglais.

Cliquez sur **Effacer les filtres** pour réinitialiser tous les filtres de colonne, ou sur **Effacer la recherche** pour réinitialiser la recherche dans la barre latérale.

## Recherche

### Recherche dans la barre latérale

Le champ de recherche en haut de la barre latérale filtre la liste au fur et à mesure de la saisie. Seuls les noms des applications sont pris en compte.

![Vue Applications avec la barre latérale filtrée pour n’afficher que les applications Microsoft Edge](/img/webui/webworkbench-searchapps.jpeg)

### Recherche globale

Appuyez sur **Ctrl+K** (ou cliquez sur l’icône de recherche dans la barre supérieure) pour ouvrir la recherche globale. Celle-ci recherche dans tous les noms d’applications et URI de téléchargement.

![Recherche globale affichant les résultats dans les noms d’applications et les URI](/img/webui/webworkbench-search.jpeg)

Utilisez les touches fléchées pour parcourir les résultats et appuyez sur **Entrée** pour sélectionner un élément. Appuyez sur **Échap** pour fermer la recherche.

## Fonctionnalités supplémentaires

### Installer comme PWA

Web Workbench est une application Web progressive. Utilisez l’option d’installation de votre navigateur (généralement dans la barre d’adresse ou le menu du navigateur) pour l’installer comme application autonome sur Windows, macOS, Linux ou un appareil mobile.

### Thème

Basculez entre les thèmes clair et sombre avec le bouton de thème (icône lune/soleil) dans le coin supérieur droit de la page.

### Flux RSS

Chaque application dispose d’un flux RSS accessible via le lien **RSS** de la barre d’outils. Abonnez-vous au flux d’une application pour être averti de la disponibilité de nouvelles données de version.

### Raccourcis clavier

Appuyez sur **?** pour afficher les raccourcis clavier disponibles. Parmi eux :

- **Ctrl+K** – ouvrir la recherche globale
- **?** – afficher les raccourcis clavier
