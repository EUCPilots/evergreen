---
layout: doc
---
# Fonctionnement d’Evergreen

::: tip Remarque
Les informations de version et de téléchargement des applications proviennent uniquement des sources officielles des éditeurs (site Web de l’éditeur, API de mise à jour maintenue par l’éditeur, dépôts officiels de l’éditeur sur GitHub ou SourceForge, etc.), jamais d’un tiers.
:::

Evergreen utilise une méthode qui renvoie par programmation au minimum le numéro de version et l’URI de téléchargement des applications ; chaque exécution d’une fonction Evergreen devrait donc fournir la dernière version et son lien de téléchargement.

Evergreen utilise plusieurs méthodes pour renvoyer la dernière version d’un logiciel :

1. API de mise à jour des applications : en utilisant la même méthode que l’application elle-même, Evergreen peut renvoyer de manière fiable le dernier numéro de version et l’URI de téléchargement, par exemple pour [Microsoft Edge](https://github.com/eucpilots/evergreen-module/Evergreen/Public/Get-MicrosoftEdge.ps1), [Mozilla Firefox](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MozillaFirefox.ps1) ou [Microsoft OneDrive](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftOneDrive.ps1). [Fiddler](https://www.telerik.com/fiddler) permet souvent de trouver où une application recherche ses mises à jour.
2. API de dépôts : des hébergeurs tels que GitHub et SourceForge proposent des API qui renvoient les versions des applications et leurs liens de téléchargement, par exemple pour [Audacity](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Audacity.ps1), [Notepad++](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-NotepadPlusPlus.ps1) ou [WinMerge](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-WinMerge.ps1).
3. Requêtes de pages Web : les pages de téléchargement des éditeurs comportent souvent une requête qui renvoie du JSON contenant les versions et les liens de téléchargement, ce qui évite l’extraction de données de pages. Evergreen peut reproduire cette méthode pour renvoyer les URL de téléchargement, mais elle risque de ne plus fonctionner si l’éditeur modifie ses pages, par exemple pour [Adobe Acrobat Reader DC](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-AdobeAcrobatReaderDC.ps1).
4. URL statiques : certains éditeurs fournissent des URL statiques ou pérennes vers leurs programmes d’installation. Ces URL contiennent souvent des informations permettant de déterminer la version et peuvent être résolues vers l’URL cible réelle, par exemple pour [Microsoft FSLogix Apps](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftFSLogixApps.ps1) ou [Zoom](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Zoom.ps1).

## Ce qu’Evergreen ne fait pas

::: info **Evergreen n’extrait pas les données HTML**
L’extraction de texte depuis des pages Web pour déterminer les versions et les URL de téléchargement peut poser problème lorsque le texte change ou que la page n’est pas à jour. Certaines applications utilisent des expressions régulières (RegEx) pour déterminer leurs propriétés, notamment les numéros de version, mais cette méthode n’est pas privilégiée lorsqu’une autre solution est possible.
:::

Les demandes de fusion dans le projet Evergreen qui reposent sur l’extraction de pages Web seront fermées. Pour les applications supplémentaires pour lesquelles cette méthode est le seul recours, consultez le projet [Nevergreen](https://github.com/DanGough/Nevergreen).

::: info **Evergreen n’interroge pas les sources autres que celles des éditeurs**
L’objectif est d’utiliser les mêmes mécanismes de mise à jour que l’application. Si cela n’est pas possible, Evergreen peut utiliser les sources de données (par exemple JSON ou XML) utilisées par la page de téléchargement de l’éditeur (comme `AdobeAcrobatReaderDC`) ou une autre source maintenue par l’éditeur (par exemple un dépôt GitHub officiel).
:::
