---
layout: doc
---
# Rechercher les applications prises en charge

## Utiliser Find-EvergreenApp

`Find-EvergreenApp` renvoie la liste des applications prises en charge par Evergreen. Par exemple, vérifions si l’agent Microsoft FSLogix Apps est pris en charge :

```powershell
Find-EvergreenApp -Name "FSLogix"
```

L’agent Microsoft FSLogix Apps est pris en charge par Evergreen ; la commande renvoie donc une sortie semblable à celle-ci :

```powershell
Name        : MicrosoftFSLogixApps
Application : Microsoft FSLogix Apps
Link        : https://docs.microsoft.com/fslogix/
```

La valeur de la propriété `Name` peut être utilisée avec `Get-EvergreenApp` pour obtenir la dernière version de l’agent Microsoft FSLogix Apps :

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

Vous pouvez également transmettre directement la sortie de `Find-EvergreenApp` à `Get-EvergreenApp` :

```powershell
Find-EvergreenApp -Name "FSLogix" | Get-EvergreenApp
```

La sortie de `Find-EvergreenApp` peut être paginée pour consulter la liste complète des applications prises en charge à l’aide de la commande suivante :

```powershell
Find-EvergreenApp | Out-Host -Paging
```

## Sortie

`Find-EvergreenApp` renvoie trois propriétés :

* `Name` – identifiant de l’application prise en charge. Ce nom correspond à celui utilisé dans le manifeste de l’application
* `Application` – le manifeste de l’application contient son nom complet
* `Link` – chaque manifeste contient l’URL du site principal de l’application

La sortie de `Find-EvergreenApp` ressemble à l’exemple suivant :

```powershell
Name                 Application             Link
----                 -----------             ----
1Password            1Password               https://1password.com/
7zip                 7zip                    https://www.7-zip.org/
AdobeAcrobat         Adobe Acrobat           https://helpx.adobe.com/au/enterprise/using/deploying-acrobat.html
AdobeAcrobatReaderDC Adobe Acrobat Reader DC https://acrobat.adobe.com/us/en/acrobat/pdf-reader.html
AdobeBrackets        Adobe Brackets          http://brackets.io/
```

## Paramètres

### Name

Le paramètre `-Name` indique l’application dont vous souhaitez obtenir les détails. Il est obligatoire. La liste des applications prises en charge est disponible avec `Find-EvergreenApp`.

## Alias

`Find-EvergreenApp` possède l’alias `fea`, qui permet de rechercher plus simplement les applications prises en charge. Exemple :

```powershell
PS /Users/aaron> fea

Name      Application   Link
----      -----------   ----
1Password 1Password     https://1password.com/
7zip      7zip          https://www.7-zip.org/
```
