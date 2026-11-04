---
layout: doc
---
# À propos

Evergreen est un module PowerShell qui fournit la dernière version et les liens de téléchargement d’un ensemble d’applications Windows courantes.

::: tip Confiance
L’objectif de ce projet est d’inspirer confiance. Evergreen s’exécute dans votre environnement et interroge uniquement les sources des éditeurs d’applications. Pour trouver les versions, Evergreen interroge les mêmes API de mise à jour que l’application utilise pour rechercher des mises à jour, ou une source appartenant à l’éditeur. Vous pouvez donc faire confiance aux résultats d’Evergreen : aucun intermédiaire n’intervient.
:::

## Pourquoi

Evergreen aide à relever plusieurs défis, notamment :

* Trouver la dernière version d’une application afin de la comparer à une version déjà installée ou téléchargée
* Trouver l’URL du programme d’installation le plus récent afin de le télécharger pour une installation locale (par script ou dans une image de référence) ou un déploiement sur des machines cibles (par exemple avec Intune ou ConfigMgr)

Evergreen aide à automatiser les déploiements de logiciels, par exemple :

* Création d’images de référence avec Hashicorp Packer : les images peuvent intégrer les dernières versions d’un ensemble d’applications
* Importation d’applications dans Microsoft Deployment Toolkit, Configuration Manager ou [Microsoft Intune](https://github.com/aaronparker/packagefactory) afin de disposer des versions les plus récentes
* Validation ou audit des versions d’applications installées sur une image ou une machine Windows
* Création d’une [bibliothèque de programmes d’installation](https://stealthpuppy.com/apptracker) : exécutez régulièrement les fonctions Evergreen pour récupérer et télécharger la version actuelle d’une application et la stocker en vue d’une utilisation ultérieure
* Envoi de manifestes à `Winget`, `Chocolatey` ou à des outils similaires : Evergreen peut renvoyer un objet contenant un numéro de version et une URL de téléchargement, utilisables pour créer des manifestes des versions les plus récentes

Il existe déjà plusieurs solutions communautaires et commerciales de gestion du déploiement et des mises à jour d’applications. Ce module n’a pas vocation à leur faire concurrence, ni à constituer un gestionnaire de paquets Windows complet. Evergreen peut compléter les solutions tierces.

## Fonctions

Les principales fonctions d’Evergreen sont :

* `Find-EvergreenApp` – répertorie les applications prises en charge par le module
* `Get-EvergreenApp` – récupère directement auprès des éditeurs les versions des applications et les détails de téléchargement dans votre environnement
* `Get-EvergreenAppFromApi` – récupère les détails des applications depuis l’API Evergreen
* `Get-EvergreenEndpointFromApi` – répertorie les points de terminaison utilisés pour récupérer les informations de version et télécharger les programmes d’installation
* `Save-EvergreenApp` – télécharge les programmes d’installation renvoyés par Evergreen
* `Test-EvergreenApp` – vérifie si les URI des programmes d’installation sont accessibles
* `Export-EvergreenApp` – exporte les informations de version d’une application dans un fichier JSON
* `Export-EvergreenManifest` – renvoie le manifeste Evergreen d’une application sous forme de table de hachage
* `New-EvergreenLibrary` – crée une configuration de bibliothèque destinée au stockage des programmes d’installation
* `Start-EvergreenLibraryUpdate` – télécharge les programmes d’installation configurés et met à jour l’inventaire de la bibliothèque
* `Get-EvergreenLibrary` – lit une bibliothèque locale ou distante et son inventaire d’applications
* `Get-EvergreenAppFromLibrary` – récupère les versions des applications stockées dans une bibliothèque
* `Remove-EvergreenLibraryAppVersion` – supprime les anciennes versions de programmes d’installation d’une bibliothèque
* `Update-Evergreen` – télécharge ou met à jour les fonctions et manifestes locaux des applications
* `Get-EvergreenAppsPath` – renvoie le chemin du cache local des applications
* `Get-EvergreenAppsVersion` – renvoie la dernière version publiée du dépôt d’applications Evergreen
* `ConvertTo-DotNetVersionClass` – convertit une chaîne de version en objet .NET `System.Version`
