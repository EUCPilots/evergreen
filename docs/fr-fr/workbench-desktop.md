---
layout: doc
---
# Utiliser Windows Workbench

::: warning Préversion
Windows Workbench (EvergreenUI) est actuellement en préversion. Les fonctionnalités et les commandes peuvent changer avant la version stable.
:::

::: info
Cette page décrit les fonctionnalités d’EvergreenUI à partir de la version **2.0.1-preview**.
:::

## Lancer Workbench

Importez le module et exécutez `Start-EvergreenWorkbench` pour ouvrir la fenêtre :

```powershell
Import-Module EvergreenUI
Start-EvergreenWorkbench
```

`Start-EvergreenWorkbench` charge WPF à la demande. Si votre session PowerShell ne s’exécute pas en appartement à thread unique (STA), Workbench héberge la fenêtre dans un runspace STA dédié ; aucun paramètre de démarrage particulier n’est nécessaire. Workbench fonctionne uniquement sous Windows et nécessite PowerShell 7.6 ou ultérieur.

Au démarrage, Workbench restaure la taille et l’état maximisé de la fenêtre, la dernière page consultée, la dernière application sélectionnée, la largeur de la liste des applications et la hauteur de la file de téléchargement. Par défaut, il suit le thème clair ou sombre de Windows et utilise Mica sur les systèmes compatibles. Les paramètres de transparence et de contraste de Windows peuvent rendre l’arrière-plan opaque.

## Navigation

Le rail de navigation à gauche permet de passer d’une vue à l’autre. Utilisez le bouton en haut du rail pour choisir une navigation développée ou compacte (icônes uniquement).

| Vue | Fonction |
|---|---|
| **Apps** | Parcourir les applications, examiner et filtrer leurs versions, mettre en file et télécharger les installateurs et gérer les données Evergreen |
| **Library** | Lire, mettre à jour et supprimer le contenu d’une bibliothèque Evergreen locale |
| **Packages** | Gérer les définitions App.json et tester l’installation locale |
| **Intune** | Comparer, créer et publier des applications Win32 et Microsoft 365 Apps dans Microsoft Intune |
| **Nerdio** | Comparer et publier des Shell Apps et Microsoft 365 Apps dans Nerdio Manager |
| **Settings** | Dossiers enregistrés et apparence |
| **About** | Métadonnées de Workbench et état des dépendances |

Le **journal d’activité**, en bas de la fenêtre, enregistre les messages horodatés Info, Warning et Error de chaque vue. Faites glisser sa poignée (ou utilisez les flèches haut et bas) pour le redimensionner ; vous pouvez le réduire lorsque vous n’en avez pas besoin. Les opérations longues utilisent un pool partagé de quatre workers en arrière-plan maximum afin de garder la fenêtre réactive. Les vues désactivent les actions incompatibles pendant une opération ; la fenêtre ne peut pas être fermée pendant l’écriture de modifications de maintenance.

## Apps

La vue Apps répertorie toutes les applications du catalogue Evergreen. Sélectionnez une application pour résoudre ses versions avec `Get-EvergreenApp` et les afficher dans le tableau.

- **Search** - filtrer la liste par nom d’application.
- **Favourites** - cliquez sur l’étoile pour épingler une application en haut de la liste. Les favoris sont enregistrés dans les paramètres de Workbench.
- **Resize** - faites glisser le séparateur pour modifier la largeur de la liste ; cette largeur est mémorisée.

### Filtrer les versions

Le panneau de filtres s’adapte aux propriétés renvoyées pour l’application sélectionnée, par exemple Architecture, Channel, Language, Type ou Release. Chaque filtre est une liste déroulante à sélection multiple :

- Les valeurs d’une même propriété sont combinées avec **OR**.
- Les propriétés différentes sont combinées avec **AND**.
- Aucune sélection signifie **All**.

### Tableau des versions

Le tableau affiche toutes les propriétés renvoyées pour l’application sélectionnée, y compris celles présentes uniquement sur certaines lignes. Les colonnes courantes (Version, Date, Channel et Architecture, par exemple) apparaissent d’abord, puis les propriétés propres à l’application ; **URI** est toujours la dernière. Les valeurs manquantes restent vides.

- Cliquez sur un en-tête pour trier par ordre croissant, puis à nouveau pour trier par ordre décroissant.
- **Columns** affiche ou masque les colonnes facultatives. **Version** et **URI** ne peuvent pas être masquées. Le choix s’applique à toutes les applications et est mémorisé.
- **Export to CSV** enregistre les lignes filtrées et les colonnes visibles dans leur ordre actuel.
- Faites un clic droit sur une ligne pour **Copy URI** ou **Open URI**.

### Télécharger les installateurs

Sélectionnez une ou plusieurs lignes, puis choisissez **Add to queue**. La file regroupe les applications : vous pouvez donc préparer des téléchargements pour plusieurs applications. Utilisez **Show queue** pour afficher le panneau de file et faites glisser sa poignée pour le redimensionner.

Chaque ligne indique l’application, la Version, l’Architecture, le Status, l’URI et, après le téléchargement, le **Saved file**. Les actions de ligne permettent de télécharger un élément ou de le supprimer.

| Action | Résultat |
|---|---|
| **Download now** | Télécharger les éléments en file dans le dossier de téléchargement |
| **Clear completed** | Supprimer les lignes téléchargées ou en échec |
| **Clear queue** | Supprimer toutes les lignes (indisponible pendant un téléchargement) |
| **Open folder** | Ouvrir le dossier contenant un fichier téléchargé |
| **Change** | Modifier le dossier de téléchargement |

Le dossier de téléchargement est enregistré dans les paramètres et affiché à côté de la file. Une barre de progression suit le téléchargement actif.

### Maintenance

Le menu **Actions...** de la vue Apps contient les tâches de maintenance :

| Action | Fonction |
|---|---|
| **Refresh** | Recharger le catalogue des applications |
| **Reload selected app versions** | Ignorer le cache pour l’application sélectionnée |
| **Update Evergreen** | Mettre à jour les données d’applications Evergreen (`Update-Evergreen`). Le module PowerShell installé n’est pas mis à niveau |
| **Clear Workbench cache** | Après confirmation, effacer le catalogue et les versions en cache dans `%LOCALAPPDATA%\EvergreenWorkbench\Cache` |
| **Open cache folder** | Ouvrir le dossier du cache, en le créant si nécessaire |

Les résultats de `Get-EvergreenApp` sont mis en cache sous forme d’un fichier JSON par application pendant 24 heures. Vider le cache ne supprime pas les données Evergreen, les installateurs téléchargés, le contenu de Library, les paramètres ni les enregistrements de récupération du fournisseur. La maintenance s’exécute en arrière-plan, actualise ensuite Apps en conservant la sélection, la recherche, les filtres et les téléchargements en file, et signale les échecs partiels sans nouvelle tentative automatique.

## Library

La vue Library lit et gère une [bibliothèque Evergreen](/fr-fr/newlibrary) initialisée.

- **Library location** - liste déroulante des 10 derniers dossiers de bibliothèque enregistrés, avec **Browse** et **Save path**. Le dossier doit contenir `EvergreenLibrary.json`.
- **Load** - lire l’inventaire de la bibliothèque.
- **Update library** - télécharger les versions les plus récentes de chaque application (`Update-EvergreenLibrary`).
- **Open folder** - ouvrir le dossier de la bibliothèque dans l’Explorateur de fichiers.

Le tableau supérieur répertorie chaque application avec le nombre de **Versions** et son **Location**. Celui du bas affiche les versions de l’application sélectionnée : Version, Architecture, Type, **Location** de l’installateur local (survolez pour afficher le chemin complet) et URI. Faites un clic droit sur l’un des tableaux et choisissez **Open folder** pour ouvrir le dossier de l’application ou de l’installateur.

### Supprimer du contenu

La suppression est indépendante de la commande de rétention d’Evergreen :

- **Remove application** supprime l’application sélectionnée, ses installateurs enregistrés et son inscription dans la bibliothèque. Les mises à jour ultérieures ne la téléchargeront donc plus.
- **Remove versions** supprime uniquement les lignes sélectionnées dans le tableau des versions. Utilisez **Ctrl** ou **Shift** pour en sélectionner plusieurs. Les autres architectures ou types d’installateur portant le même numéro de version ne sont pas concernés.

Chaque action demande confirmation, avec **Cancel** comme choix par défaut. Seuls les fichiers d’installation enregistrés dans le dossier de l’application sont supprimés ; les fichiers référencés par l’inventaire conservé sont préservés et les fichiers non enregistrés ne sont pas touchés. Un chemin non sûr ou un manifeste modifié depuis son chargement annule l’opération. En cas d’échec, les opérations s’arrêtent, les changements partiels sont signalés et l’inventaire est rechargé ; aucune opération destructive n’est automatiquement relancée.

::: warning
La suppression est irréversible. Si elle s’arrête avant l’écriture du manifeste, des lignes peuvent rester affichées alors que certains installateurs ont été supprimés. Vérifiez les chemins signalés.
:::

## Packages

La vue Packages comprend deux onglets : **Definitions** et **Install**. Consultez [Packages, définitions et installation locale](/fr-fr/workbench-packages) pour en savoir plus.

## Intune

La vue Intune compare vos définitions App.json aux applications Win32 de Microsoft Intune, crée et publie des packages et gère la supersédence. Elle héberge aussi le flux Microsoft 365 Apps pour Intune. Consultez [Publier dans Microsoft Intune](/fr-fr/workbench-intune).

## Nerdio

La vue Nerdio se connecte à Azure et à l’API Nerdio Manager, compare les définitions Shell App, publie des applications et versions, et supprime les anciennes versions. Elle héberge également le flux Microsoft 365 Apps pour Nerdio. Consultez [Publier dans Nerdio Manager](/fr-fr/workbench-nerdio) et [Packages Microsoft 365 Apps](/fr-fr/workbench-m365).

## Settings

La vue Settings affiche les dossiers enregistrés pour chaque flux de travail et les options d’apparence.

**Dossiers enregistrés**

| Dossier | Utilisé par |
|---|---|
| **Download folder** | Téléchargements Apps |
| **Library folder** | Library |
| **Packages definitions folder** | Packages et Intune |
| **Package output folder** | Création de packages Intune |
| **Microsoft 365 Apps configurations folder** | Microsoft 365 Apps dans Intune et Nerdio (partagé) |
| **Nerdio Manager Shell Apps directory** | Shell Apps de Nerdio |

Utilisez **Browse** pour enregistrer un dossier ou les commandes de chaque flux. Modifier dans Settings l’un des trois dossiers de flux remplace toute modification non enregistrée dans ce flux. **Open folder** n’est disponible que si le dossier est accessible.

**Apparence**

- **Color theme** - choisissez **System**, **Light** ou **Dark**.

La configuration Azure et API de Nerdio se trouve dans l’onglet Settings de la vue Nerdio.

Les paramètres et l’état de l’interface sont stockés dans `%APPDATA%\EvergreenWorkbench\settings.json`. Les jetons d’authentification et secrets clients restent uniquement en mémoire et ne sont jamais enregistrés dans les paramètres.

## About

La vue About affiche les métadonnées de Workbench (nom, version, mention de préversion, URI du projet et description) et un tableau **Dependencies** indiquant le rôle de chaque module, sa version minimale, la version la plus élevée **Installed** détectée localement et la version **Loaded (window)** dans le runspace Workbench. Les versions chargées peuvent différer de celles de votre session ou d’un travail en arrière-plan.

L’état est actualisé à l’ouverture de About et à la demande. La vue n’installe, ne met à jour et n’importe jamais de dépendances facultatives. Si l’actualisation échoue, les résultats précédents restent visibles et sont marqués comme obsolètes.

## Utiliser les commandes sans fenêtre

Toutes les fonctions de Workbench sont accessibles par des commandes PowerShell, notamment les travaux en arrière-plan, les définitions, la publication et la maintenance du cache. Consultez la [référence des commandes Windows Workbench](/fr-fr/workbench-commands).
