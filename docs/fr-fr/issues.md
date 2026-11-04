---
layout: doc
---
# Problèmes connus

## Général

Si la source d’une application est indisponible, la propriété `URI` renvoyée peut avoir pour valeur `https://eucpilots.com/evergreen/issues/`. Dans ce cas, suivez les [étapes de dépannage](https://eucpilots.com/evergreen/troubleshooting/).

## Fonctions publiques

### Get-EvergreenApp

`Get-EvergreenApp` ne prend pas encore entièrement en charge les serveurs proxy. Ce problème sera corrigé dans une prochaine version.

## Fonctions privées

### Resolve-DnsNameWrapper

Prise en charge de Windows uniquement : cette fonction encapsule `Resolve-DnsName`, qui n’est pas disponible dans PowerShell 6 et versions ultérieures sur macOS ou Linux. Les fonctions d’application qui utilisent cette fonction privée renvoient une erreur sur les plateformes non Windows.

### Get-GitHubRepoRelease

`Get-GitHubRepoRelease` interroge les versions publiées dans un dépôt GitHub donné pour renvoyer les versions et les fichiers binaires, ou récupère le numéro de version de certaines applications. Par défaut, les requêtes à l’API REST GitHub ne sont pas authentifiées et sont limitées à 60 par heure. Pour les applications qui utilisent GitHub comme source, le paramètre `-Verbose` de `Get-EvergreenApp` affiche le nombre de requêtes API restantes.

Les requêtes authentifiées sont prises en charge au moyen des variables d’environnement `GITHUB_TOKEN` ou `GH_TOKEN`, qui portent la limite à 5 000 requêtes par heure. Consultez [Gérer les limites de débit de GitHub](/fr-fr/github) pour savoir comment les configurer.

## Fonctions d’application

### AdobeAcrobat

Si Adobe publie une mise à jour d’Acrobat/Reader DC pour Windows avant macOS, la version de correctif actuelle peut ne pas être renvoyée. Adobe synchronise généralement les deux plateformes ; cette situation devrait donc être rare.

Pour déterminer la version de mise à jour actuelle d’`AdobeAcrobat`, la [URL des mises à jour macOS](https://armmf.adobe.com/arm-manifests/win/AcrobatDC/acrobat/current_version.txt) est utilisée. Elle fournit simplement le numéro de la dernière version sous forme de texte.

::: info
La version Windows d’Adobe Acrobat et Reader utilise une URL de mise à jour telle que `https://armmf.adobe.com/arm-manifests/win/AcrobatDCManifest3.msi`, qui nécessiterait de décompresser et d’analyser le fichier MSI. Un exemple de code permettant d’interroger la base de données MSI est disponible ici : [Liens de téléchargement AdobeReader non valides](https://github.com/eucpilots/evergreen-module/issues/312#issuecomment-1103712904). Cette méthode ne fonctionne toutefois que sur un hôte Windows et ne prend pas en charge macOS ni Linux.
:::

Autre solution : `AdobeAcrobatDC` et `AdobeAcrobatReaderDC` interrogent une API Web pour déterminer les versions actuelles d’Adobe Acrobat Reader DC, Acrobat Standard DC et Acrobat Pro DC. Les versions antérieures d’Acrobat restent concernées par ce problème.

### AdobeAcrobatReaderDC

`AdobeAcrobatReaderDC` peut ne pas renvoyer de programme d’installation contenant la [dernière mise à jour](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html). Cette application détermine les programmes d’installation disponibles à partir de la [page de téléchargement d’Adobe Acrobat Reader](https://get.adobe.com/reader/) ; Adobe ne rend pas toujours immédiatement la dernière mise à jour disponible dans le programme d’installation téléchargeable actuel.

Vérifiez si `AdobeAcrobat` renvoie la dernière version de mise à jour.

### CitrixWorkspaceApp

Citrix modifie parfois le flux de mise à jour de Citrix Workspace, ce qui peut entraîner le renvoi d’un numéro de version ou d’un URI de programme d’installation incorrect. Ce problème pourrait être lié à la limitation par Citrix des mises à jour de Citrix Workspace. Il est généralement corrigé dans les 72 heures.

Lorsque les données renvoyées sont incorrectes, Evergreen produit une sortie similaire à celle ci-dessous.

```powershell
Version : 24.2.0.172
Title   : Citrix Workspace - LTSR
Size    : 380803896
Hash    : 7efe56e0f177cf9de336fa48daa8b6461080909fd37f7d550fd4f313221091b8
Date    : 10/4/2024
Stream  : LTSR
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.2.0.172.exe

Version : 0.0.0.0
Title   : Citrix Workspace - Current Release
Size    : 382956344
Hash    : 5c369d1c127b14a8530b7441a6d3ec49c681fe672e8447c63ecf453cf8b87237
Date    : 25/4/2024
Stream  : Current
URI     : https://downloadplugins.citrix.com/ReceiverUpdates/Prod/Receiver/Win/CitrixWorkspaceApp24.3.0.93.exe
```

#### Erreur 404

Il arrive que `Get-EvergreenApp -Name "CitrixWorkspaceApp"` échoue avec l’erreur suivante :

```powershell
WARNING: Invoke-EvergreenRestMethod: Error at URI: https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml.
WARNING: Invoke-EvergreenRestMethod: Error encountered: Response status code does not indicate success: 404 (Not Found)..
WARNING: Invoke-EvergreenRestMethod: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
```

Cela se produit généralement juste après la publication d’une nouvelle version de Workspace et peut durer quelque temps. Après une nouvelle publication, Citrix rend souvent le fichier XML de mise à jour indisponible afin que les clients ne se mettent pas à jour immédiatement. Il faut parfois attendre que Citrix rétablisse l’URL pour que cette fonction fonctionne.

#### Flux de mise à jour obsolète

Il arrive que `Get-EvergreenApp -Name "CitrixWorkspaceApp"` ne renvoie pas la dernière version de Citrix Workspace. Cela est dû aux modifications apportées par Citrix au flux de mise à jour `https://downloadplugins.citrix.com/ReceiverUpdates/Prod/catalog_win.xml` afin de limiter ou d’empêcher le déploiement automatique de la dernière version de Workspace. La seule solution consiste à attendre que Citrix corrige le flux pour y inclure de nouveau la dernière version.

### GhislerTotalCommander

Cette fonction d’application fonctionne sous Windows sans prérequis supplémentaire, mais nécessite l’installation du module PowerShell `DnsClient-PS` sur macOS ou Linux.

### GoogleChrome

Le programme d’installation MSI du canal Stable ne correspond pas au numéro de version renvoyé pour ce canal. Le numéro de version du fichier MSI correspond en revanche à celui du programme d’installation renvoyé pour le canal Extended. Le fichier MSI des canaux Stable et Extended est identique, même si les URL diffèrent.

### LibreOffice

`LibreOffice` interroge l’hôte de mise à jour `https://update.libreoffice.org/check.php` pour déterminer la version disponible. La Document Foundation ne configure pas immédiatement cet hôte pour renvoyer la toute dernière version au moment de sa publication. Si l’hôte ne renvoie pas la version la plus récente et que la TDF a retiré les téléchargements de la version qu’il renvoie, `LibreOffice` ne peut pas créer de liens de téléchargement valides.

Pour l’instant, la seule solution consiste à attendre que la TDF configure l’hôte de mise à jour pour renvoyer la dernière version. Voir également [Version de LibreOffice](https://github.com/eucpilots/evergreen-module/issues/218).

### Microsoft365Apps

`Microsoft365Apps` ne renvoie que les canaux documentés publiquement. L’API de mise à jour Microsoft 365 Apps peut proposer d’autres canaux, mais ceux-ci peuvent ne pas correspondre aux canaux décrits sur microsoft.com ; ils ne sont donc pas inclus dans cette fonction.

Les propriétés de canal sont répertoriées dans les articles suivants : [Configuration options for the Office Deployment Tool](https://docs.microsoft.com/en-us/deployoffice/office-deployment-tool-configuration-options#channel-attribute-part-of-add-element), [Update channel for Office LTSC 2021](https://docs.microsoft.com/en-us/deployoffice/ltsc2021/update#update-channel-for-office-ltsc-2021), [Update channel for Office 2019](https://docs.microsoft.com/en-us/deployoffice/office2019/update#update-channel-for-office-2019).

La liste complète des noms de canal est disponible ici : [Update history for Microsoft 365 Apps](https://docs.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date).

### MicrosoftWvdRemoteDesktop

`MicrosoftWvdRemoteDesktop` peut renvoyer une erreur HTTP 503 pour certaines URL (voir l’exemple ci-dessous). Ce comportement est intermittent, mais la fonction devrait tout de même fournir des données utilisables. Supprimez cet avertissement avec `-WarningAction "SilentlyContinue"`.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50Mp8.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50t3P.
```

### MozillaFirefox

#### Prise en charge des langues

Vous pouvez transmettre à `MozillaFirefox` n’importe quelle langue prise en charge en passant une table de hachage à `-AppParams`. Par exemple, `Get-EvergreenApp -Name "MozillaFirefox" -AppParams @{Language="en-GB", "es-ES"}` renvoie les programmes d’installation Firefox en anglais (Royaume-Uni) et en espagnol.

La plupart des [langues prises en charge](https://www.mozilla.org/en-US/firefox/all/#product-desktop-release) peuvent être transmises à la fonction sous forme de code court. La liste des langues figure dans le manifeste [MozillaFirefox](https://github.com/eucpilots/evergreen-module/blob/main/Evergreen/Manifests/MozillaFirefox.json).

### OBSStudio

La récupération de la dernière version et du téléchargement d’OBS Studio peut échouer lorsque l’OBS Project modifie la disponibilité du manifeste de mise à jour à l’adresse `https://obsproject.com/update_studio/manifest.json`. `Get-EvergreenApp -Name OBSStudio` renvoie alors une erreur 404. La seule solution consiste à attendre que l’OBS Project rende de nouveau le manifeste accessible.

Evergreen pourrait interroger les versions du dépôt GitHub ; toutefois, l’OBS Project ne maintient pas systématiquement ses versions publiées dans ce dépôt. Certaines versions d’OBS Studio peuvent ne corriger qu’un problème de la version macOS ; dans ce cas, `OBSStudio` ne renverrait aucun résultat.

Voir également [Get-EvergreenApp : OBSStudio ne fonctionne pas en raison d’erreurs 404](https://github.com/eucpilots/evergreen-module/issues/184).

### OmnissaHorizonClient

`OmnissaHorizonClient` ne renvoie pas toujours la version actuelle : la propriété de version majeure dans les données de mise à jour de VMware Horizon Client n’utilise pas un format facilement triable. Ce problème sera peut-être corrigé dans une prochaine version. Voir également [VMware Horizon Client signale une version obsolète](https://github.com/eucpilots/evergreen-module/issues/161).

### PaintDotNet

Sous PowerShell sur Linux, `Get-EvergreenApp -Name PaintDotNet` génère l’erreur suivante. En guise de solution de contournement, utilisez plutôt `Get-EvergreenApp -Name PaintDotNetOfflineInstaller`.

```powershell
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://www.getpaint.net/updates/versions.8.1000.0.x64.en.txt.
WARNING: Invoke-EvergreenWebRequest: Error encountered: The SSL connection could not be established, see inner exception..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /home/aaron/.local/share/powershell/Modules/Evergreen/2205.561/Apps/Get-PaintDotNet.ps1:20
Line |
  20 |      $Content = Invoke-EvergreenWebRequest -Uri $res.Get.Uri
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: The SSL connection could not be established, see inner exception.
```

### VideoLanVlcPlayer

`VideoLanVlcPlayer` ne renvoie pas toujours la dernière version disponible : la version renvoyée par le flux de mise à jour du lecteur VLC peut différer de la version actuellement téléchargeable sur le site [videolan.org](https://www.videolan.org/vlc/), en raison des données du flux de mise à jour.

Le code source du site de mise à jour est disponible ici : [Organisation VideoLAN > update.videolan.org > Dépôt](https://code.videolan.org/VideoLAN.org/update.videolan.org/-/tree/master/vlc).
