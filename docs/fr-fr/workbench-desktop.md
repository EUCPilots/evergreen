---
layout: doc
---
# Utiliser Desktop Workbench

::: warning Bêta
Desktop Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **1.0.21**.
:::

## Lancer Workbench

Importez le module et exécutez `Start-EvergreenWorkbench` pour ouvrir la fenêtre Evergreen Workbench :

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

À sa réouverture, Workbench restaure la dernière vue utilisée. Si cette vue enregistrée est désactivée, l’application revient à la vue Applications.

Utilisez le bouton de la barre de navigation pour passer de la navigation développée à la navigation compacte.

![Vue Applications présentant des applications Microsoft avec les filtres canal, version, architecture et type](/img/ui/evergreen-workbench-collapsed.png)

## Vue Applications

La vue Applications affiche dans une grille de données consultable plus de 500 applications prises en charge par le module Evergreen. Sélectionnez une application dans la liste de gauche pour afficher les métadonnées de version et de téléchargement renvoyées par `Get-EvergreenApp`.

![Vue Applications présentant des applications Microsoft avec les filtres canal, version, architecture et type](/img/ui/evergreen-workbench-apps.png)

Utilisez le champ de recherche situé en haut de la liste des applications pour filtrer par nom. La grille de données à droite affiche les détails de version, notamment Version, Date, Channel, Release, Architecture, Type et URI.

Vous pouvez marquer d’une étoile les applications fréquemment utilisées dans la liste de gauche. Les favoris sont épinglés en haut de la liste et enregistrés dans les paramètres locaux de Workbench.

L’en-tête des détails de l’application affiche également l’horodatage de la **Dernière actualisation** lorsque des données en cache existent pour l’application sélectionnée. L’illustration ci-dessous montre les favoris épinglés en haut de la liste et l’horodatage de la dernière actualisation dans l’en-tête des détails.

![Vue Applications présentant des applications Microsoft avec les filtres canal, version, architecture et type](/img/ui/evergreen-workbench-collapsed.png)

### Filtres dynamiques

Lorsque vous sélectionnez une application, le panneau de filtre s’adapte automatiquement aux propriétés qu’elle renvoie. Par exemple, la sélection d’Adobe Acrobat Reader DC affiche les filtres Language, Architecture et Type.

![Filtres dynamiques d’Adobe Acrobat Reader DC avec les contrôles Langue, Architecture et Type](/img/ui/evergreen-workbench-apps-filter.png)

Les propriétés de filtre disponibles varient selon l’application et peuvent inclure :

| Propriété | Exemples de valeurs |
|---|---|
| Architecture | x64, x86, ARM64 |
| Channel | Stable, Beta, Dev |
| Ring | Production, Enterprise |
| Language | English, English (UK) |
| Type | exe, msi, msix, zip |
| Release | General, Enterprise |

Sélectionnez des valeurs dans le panneau de filtre pour affiner les résultats. Utilisez **Effacer les filtres** pour réinitialiser les filtres, ou **Exporter au format CSV** pour enregistrer les résultats filtrés.

La grille des versions permet le tri par colonne. Cliquez sur un en-tête pour trier dans l’ordre croissant, puis cliquez de nouveau pour inverser l’ordre.

Vous pouvez également cliquer avec le bouton droit sur un en-tête pour afficher ou masquer les colonnes facultatives. Les colonnes essentielles, comme Version et URI, restent visibles.

![Vue Applications montrant les options du menu contextuel des en-têtes de tableau](/img/ui/evergreen-workbench-rightclick.png)

## Vue Téléchargements

Pour télécharger des programmes d’installation, sélectionnez des versions dans la vue Applications et cliquez sur **Ajouter à la file d’attente de téléchargement**. Passez à la vue Téléchargements pour gérer et lancer les téléchargements.

![Vue Téléchargements avec un téléchargement Adobe Acrobat Reader DC en attente](/img/ui/evergreen-workbench-download.png)

La vue Téléchargements affiche la file d’attente avec les colonnes Status, App, Version, Architecture, URI et Path. La colonne Path est renseignée une fois le téléchargement terminé. La barre d’outils permet de :

- **Supprimer la sélection** – retirer des éléments de la file d’attente
- **Vider la file d’attente** – supprimer tous les éléments
- **Ouvrir le dossier** – ouvrir le dossier de destination des téléchargements
- **Tout télécharger** – télécharger séquentiellement tous les éléments en attente

Une barre de progression en bas suit le téléchargement en cours. Les téléchargements sont traités séquentiellement, dans l’ordre de la file d’attente. La grille de téléchargement permet le tri par colonne.

![Vue Téléchargements affichant les chemins locaux des fichiers téléchargés](/img/ui/evergreen-workbench-download-path.png)

## Vue Bibliothèque

Si vous disposez déjà d’une [bibliothèque Evergreen](/fr-fr/newlibrary), la vue Bibliothèque fournit une interface graphique pour la parcourir et la mettre à jour. Saisissez ou recherchez le chemin d’accès à la bibliothèque pour en charger le contenu.

![Vue Bibliothèque affichant son contenu et les détails des versions de Microsoft Edge](/img/ui/evergreen-workbench-library.png)

La vue Bibliothèque affiche :

- **Contenu de la bibliothèque** – tableau des applications de la bibliothèque, avec leur nom, le nombre de versions et le chemin d’accès
- **Détails de l’application sélectionnée** – version, URI, type, taille, hachage SHA256, version publiée et chemin du fichier pour chaque version de l’application sélectionnée

La barre d’outils permet de :

- **Parcourir** – sélectionner le chemin d’accès à une bibliothèque
- **Ouvrir le dossier** – ouvrir le répertoire de la bibliothèque
- **Nouvelle bibliothèque** – créer une bibliothèque Evergreen (`New-EvergreenLibrary`)
- **Actualiser la bibliothèque** – recharger son contenu (`Get-EvergreenLibrary`)
- **Mettre à jour la bibliothèque** – télécharger les dernières versions dans la bibliothèque (`Start-EvergreenLibraryUpdate`)

## Vue Installation

La vue Installation charge les définitions de packages d’un répertoire, compare les versions d’application définies à celles qui sont installées sur la machine et permet d’installer ou de mettre à jour directement les applications.

![Vue Installation comparant les versions installées aux versions les plus récentes](/img/ui/evergreen-workbench-install.png)

Chaque ligne affiche :

- **Application** – nom et architecture de l’application
- **Éditeur** – éditeur de l’application
- **Installée** – version actuellement installée sur la machine (le cas échéant)
- **Dernière** – dernière version disponible dans Evergreen
- **État** – indique si l’application est installée et à jour, installée (mise à jour requise), installée (dernière version non vérifiée) ou non installée
- **Action** – action disponible : Installer, Mettre à jour ou aucune

La barre d’outils permet de :

- **Parcourir** – sélectionner le répertoire contenant les définitions de packages
- **Charger les définitions** – charger ou recharger les fichiers de définition des packages
- **Rechercher les dernières versions** – interroger Evergreen pour obtenir la dernière version de chaque application définie
- **Installer la sélection** – installer ou mettre à jour les applications sélectionnées

::: info
Si Workbench n’est pas exécuté avec des privilèges élevés, les programmes d’installation peuvent demander une élévation via UAC.
:::

## Onglet Importation

L’onglet Importation propose des flux de travail permettant d’importer des packages d’applications dans des plateformes externes. Il comporte quatre sous-onglets : **Applications Win32 Microsoft Intune**, **Applications Shell Nerdio Manager**, **Microsoft 365 Apps** et **Authentification**.

Les modules nécessaires à l’importation sont chargés à la première ouverture de l’onglet. Les opérations de connexion et d’importation restent désactivées tant que les modules requis ne sont pas chargés.

### Applications Win32 Microsoft Intune

::: warning Validation recommandée
Les flux d’importation sont disponibles, mais les méthodes de création de packages et d’affectation propres à votre locataire doivent être validées dans votre environnement avant tout déploiement en production.
:::

Accédez à un répertoire contenant les définitions de packages Intune, chargez-les et comparez-les aux applications Win32 présentes dans votre locataire Intune.

![Onglet Importation présentant les applications Win32 Microsoft Intune, les définitions de packages et leur état d’importation](/img/ui/evergreen-workbench-import-intune.png)

La grille de données affiche les lignes de rapprochement avec les colonnes suivantes : App, Publisher, Intune Version, Latest, Status et Action.

Les valeurs d’Action indiquent la prochaine étape :

- **Importer une nouvelle application** – la définition n’existe pas encore dans Intune
- **Importer une nouvelle version et remplacer l’existante** – l’application existe dans Intune et doit être mise à jour
- **Corriger la définition** – GUID de définition dupliqué ou autre problème de définition
- **-** – aucune action requise

Utilisez la barre d’action pour gérer les définitions et les importations :

- **Recharger les définitions** – recharger depuis le disque la liste des définitions
- **Mettre à jour les définitions** – rechercher la dernière version Evergreen de chaque définition et mettre à jour `App.json` et les règles de détection sur place ; la liste est automatiquement rechargée à la fin
- **Comparer avec Microsoft Intune** – établir la liste de rapprochement
- **Importer une application Win32** – traiter les lignes sélectionnées qui nécessitent une action

### Applications Shell Nerdio Manager

::: warning Validation recommandée
Les flux d’importation Nerdio sont disponibles, mais vous devez valider dans votre environnement les autorisations API, les correspondances de définition et le comportement après importation.
:::

Accédez à un répertoire contenant les définitions d’applications Shell Nerdio Manager, chargez-les et comparez-les aux applications Shell de votre environnement Nerdio Manager.

![Onglet Importation présentant les applications Shell Nerdio Manager et la comparaison des versions](/img/ui/evergreen-workbench-import-nerdio.png)

La grille de données indique l’état de chaque définition : correspondance avec une application Shell existante, disponibilité d’une mise à jour et comparaison des versions Evergreen actuelle et la plus récente. La barre d’état récapitule les résultats.

Utilisez **Comparer avec Nerdio Manager** pour établir la liste de rapprochement. Pour la ligne sélectionnée, utilisez ensuite **Ajouter une nouvelle version à l’application Shell existante** ou **Importer une nouvelle application**.

### Microsoft 365 Apps

::: warning Validation recommandée
Le flux de travail Microsoft 365 Apps est disponible pour Intune et Nerdio Manager. Avant toute utilisation en production, validez votre configuration XML, les fichiers de package générés et les autorisations du locataire.
:::

Accédez à un dossier contenant les fichiers de configuration XML de l’Office Deployment Tool, puis cliquez sur **Charger les configurations**.

![Onglet Importation présentant les configurations de packages Microsoft 365 Apps et les actions d’importation](/img/ui/evergreen-workbench-import-m365.png)

La grille affiche les informations de chaque configuration :

- **Nom du fichier** – nom du fichier XML
- **Nom d’affichage** – nom d’affichage généré pour l’application
- **Produits** – produits analysés et détails de la cible
- **État** – résultat de validation de la configuration (par exemple Valid, No ID ou Invalid XML)

Utilisez la barre d’action pour configurer la création des packages et l’importation :

- **Canal** – sélectionne le canal de mise à jour Microsoft 365 utilisé pour générer le package
- **Nom de l’entreprise** – valeur obligatoire insérée dans les métadonnées du package
- **Importer l’application Shell Nerdio Manager** – crée le package et l’importe dans Nerdio Manager
- **Importer l’application Win32 Microsoft Intune** – crée le package et l’importe dans Intune

Pour le flux Nerdio d’EvergreenUI 1.0.20, Workbench lit les fichiers de définition d’application Shell dans le sous-répertoire `shell-app`, à côté des configurations XML, vérifie la présence des fichiers requis (`Definition.json`, `Detect.ps1`, `Install.ps1`, `Uninstall.ps1`), puis crée l’application Shell à partir de cette définition. Ce flux ne dépend plus de `IntuneWin32App` pour les importations Nerdio.

Les indicateurs de connexion de cet onglet affichent l’état d’authentification de Microsoft Intune et Nerdio Manager.

### Définitions de packages

Les définitions de packages utilisées par les fonctions Installation et Importation sont disponibles ici : [https://github.com/EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages).

::: info
Ces définitions de packages doivent être validées avant utilisation. À terme, l’objectif est de créer une définition de package unifiée pour les applications Win32 Intune et les applications Shell Nerdio Manager.
:::

### Authentification

Le sous-onglet Authentification gère les connexions à Entra ID, à l’API Nerdio Manager et à Azure Storage. Ces connexions sont nécessaires aux flux d’importation Intune, Nerdio Manager et Microsoft 365 Apps.

![Sous-onglet Authentification présentant les connexions à Entra ID, à l’API Nerdio Manager et à Azure Storage](/img/ui/evergreen-workbench-import-auth.png)

Configurez les éléments suivants :

- **Entra ID** – saisissez éventuellement un ID de locataire, puis utilisez **Se connecter** pour vous connecter à Microsoft Intune
- **API Nerdio Manager** – indiquez l’hôte NME, l’ID client, la portée API, l’URL du jeton OAuth, le secret client et l’ID de locataire pour vous connecter à Nerdio Manager
- **Azure Storage pour les applications Shell Nerdio Manager** – configurez éventuellement un ID d’abonnement, un groupe de ressources, un compte de stockage et un conteneur pour stocker les packages d’applications

## Vue Mise à jour

La vue Mise à jour exécute `Update-Evergreen` depuis l’interface graphique pour synchroniser le cache local des définitions d’applications avec la dernière version du dépôt [evergreen-apps](https://github.com/EUCPilots/evergreen-apps).

![Vue Mise à jour affichant la sortie d’Update-Evergreen, la validation des hachages et la progression de la synchronisation](/img/ui/evergreen-workbench-update.png)

Cliquez sur **Exécuter Update-Evergreen** pour lancer la mise à jour. Le panneau de sortie affiche des messages de journal horodatés indiquant la vérification du cache, le téléchargement, la validation des hachages et la progression de la synchronisation.

## Vue À propos

La vue À propos affiche les métadonnées du module EvergreenUI chargé, notamment son nom, sa version, son indicateur de préversion, l’URI du projet et sa description.

![Vue À propos affichant les métadonnées du module et les modules requis](/img/ui/evergreen-workbench-about.png)

Elle comprend également une section **Modules requis**, qui répertorie les dépendances des flux d’importation et indique si chaque module est installé.

## Paramètres

La vue Paramètres permet de configurer les préférences générales et les options propres aux fournisseurs.

![Vue Paramètres présentant la configuration générale, Microsoft Intune et les journaux](/img/ui/evergreen-workbench-settings.png)

### Général

- **Chemin de sortie des téléchargements** – répertoire par défaut des programmes d’installation téléchargés
- **Chemin des applications Evergreen** – chemin d’accès au cache local des définitions (lecture seule, valeur renvoyée par `Get-EvergreenAppsPath`)
- **Thème** – basculer entre les thèmes clair et sombre
- **Afficher l’onglet Importation** / **Afficher l’onglet Installation** – afficher ou masquer les vues Importation et Installation
- **Cache des versions d’applications** – les données de version sont stockées localement et chargées lors de la sélection d’une application ; utilisez **Effacer le cache** pour forcer une nouvelle requête à la prochaine sélection
- **Ouvrir le dossier du cache** – ouvrir le dossier local du cache des versions

### Microsoft Intune

- **Module IntuneWin32App** – indicateur signalant si le module IntuneWin32App est chargé ; utilisez **Recharger** pour le réimporter
- **Chemin de sortie des packages** – répertoire des fichiers de package Intune Win32

### Journaux

- **Ouvrir le dossier des journaux** – ouvrir le répertoire local des journaux EvergreenUI
- **Effacer les journaux** – supprimer les fichiers `.log` locaux du répertoire des journaux EvergreenUI

## Panneau de journal

Le panneau de journal, en bas de la fenêtre, affiche des messages horodatés de trois niveaux :

- **Info** – progression et messages d’état
- **Avertissement** – problèmes non critiques (par exemple, une URL de téléchargement a renvoyé une redirection)
- **Erreur** – échecs lors de la recherche de versions, des téléchargements ou des mises à jour de bibliothèques

![Panneau de journal de progression affichant les détails des opérations](/img/ui/evergreen-workbench-progresslog.png)

Utilisez **Copier le journal**, **Enregistrer le journal**, **Afficher le journal de progression** ou **Masquer le journal de progression** pour gérer la sortie du journal. Les messages sont générés en temps réel par des espaces d’exécution en arrière-plan pendant les opérations.
