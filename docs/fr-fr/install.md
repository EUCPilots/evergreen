---
layout: doc
---
# Installer Evergreen

## Prise en charge de PowerShell

Evergreen prend en charge Windows PowerShell 5.1 et PowerShell 7.0 ou version ultérieure. Le module devrait fonctionner avec PowerShell Core 6.x ; toutefois, cette version n’est pas activement testée et sa prise en charge ne peut donc pas être garantie.

## Installer depuis PowerShell Gallery

Le module Evergreen est publié dans PowerShell Gallery : [Evergreen](https://www.powershellgallery.com/packages/Evergreen/).

::: info
L’installation d’Evergreen depuis PowerShell Gallery est la méthode recommandée.
:::

Installez le module depuis la galerie avec :

```powershell
Install-Module -Name Evergreen
Import-Module -Name Evergreen
```

### Mettre à jour le module

Si vous avez installé une version précédente du module depuis la galerie, vous pouvez installer la dernière mise à jour avec `Update-Module` et le paramètre `-Force` :

```powershell
Update-Module -Name Evergreen -Force
```

### Installation avancée

Dans le cadre d’installations par script (par exemple le déploiement d’un système d’exploitation), vous pouvez vous assurer que PowerShell Gallery est approuvée avant d’installer le module :

```powershell
if (Get-PSRepository | Where-Object { $_.Name -eq "PSGallery" -and $_.InstallationPolicy -ne "Trusted" }) {
    Install-PackageProvider -Name "NuGet" -MinimumVersion 2.8.5.208 -Force
    Set-PSRepository -Name "PSGallery" -InstallationPolicy "Trusted"
}
```

Vous pouvez ensuite installer ou mettre à jour Evergreen selon que le module est déjà installé ou obsolète :

```powershell
$Installed = Get-Module -Name "Evergreen" -ListAvailable | `
    Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | `
    Select-Object -First 1
$Published = Find-Module -Name "Evergreen"
if ($Null -eq $Installed) {
    Install-Module -Name "Evergreen"
}
elseif ([System.Version]$Published.Version -gt [System.Version]$Installed.Version) {
    Update-Module -Name "Evergreen"
}
```

## Installation manuelle depuis le dépôt

Vous pouvez télécharger le module depuis le [dépôt source GitHub](https://github.com/eucpilots/evergreen-module), où il se trouve dans le dossier `Evergreen`. Copiez ce dossier dans l’un des chemins de modules PowerShell. Pour afficher tous les chemins de modules disponibles, exécutez `$env:PSModulePath.split(';')` dans une console PowerShell.

Les chemins de modules PowerShell courants incluent :

* Utilisateur actuel : `%USERPROFILE%\Documents\WindowsPowerShell\Modules\`
* Tous les utilisateurs : `%ProgramFiles%\WindowsPowerShell\Modules\`
* OneDrive : `$env:OneDrive\Documents\WindowsPowerShell\Modules\`

Pour installer depuis le dépôt

1. Téléchargez la branche `main` sur votre poste de travail
2. Copiez le contenu du dossier Evergreen dans le chemin de modules PowerShell souhaité sur votre poste de travail
3. Ouvrez une console PowerShell avec l’option Exécuter en tant qu’administrateur
4. Exécutez `Set-ExecutionPolicy` avec le paramètre `RemoteSigned` ou `Bypass`
5. Débloquez les fichiers avec `Get-ChildItem -Path <path to module> -Recurse | Unblock-File`

Une fois l’installation terminée, vérifiez que le module est présent en exécutant `Get-Module -ListAvailable Evergreen`. Pour utiliser le module, chargez-le avec :

```powershell
Import-Module Evergreen
```
