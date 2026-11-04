---
layout: doc
---
# Récupérer les points de terminaison utilisés par Evergreen

L’API Evergreen peut renvoyer les URL des points de terminaison qu’Evergreen utilise pour récupérer les versions et les détails de téléchargement des applications, ainsi que les URL nécessaires au téléchargement des programmes d’installation.

La liste des points de terminaison peut être importée dans les systèmes de pare-feu ou de serveur proxy qui exigent une liste d’autorisations avant qu’Evergreen puisse télécharger des programmes d’installation. Tous les points de terminaison sont accessibles via TCP sur les ports 80 ou 443.

## Get-EvergreenEndpointFromApi

La fonction `Get-EvergreenEndpointFromApi` simplifie l’utilisation de l’API en renvoyant dans un seul objet tous les points de terminaison utilisés par Evergreen. Appelée sans paramètre, elle renvoie la liste complète des points de terminaison et des ports de toutes les applications.

```powershell
PS C:\> Get-EvergreenEndpointFromApi

Application          Endpoints                                                                              Ports
-----------          ---------                                                                              -----
1Password            {1password.com, app-updates.agilebits.com, downloads.1password.com, cdn.agilebits.com} {443}
1Password7           {1password.com, c.1password.com}                                                       {443}
1PasswordCLI         {app-updates.agilebits.com, cache.agilebits.com, developer.1password.com}              {443}
7zip                 {nchc.dl.sourceforge.net, sourceforge.net, www.7-zip.org, versaweb.dl.sourceforge.net} {443}
7ZipZS               {api.github.com, mcmilk.de, github.com}                                                {443}
AdobeAcrobat         {ardownload2.adobe.com, armmf.adobe.com, helpx.adobe.com}                              {443}
AdobeAcrobatDC       {ardownload2.adobe.com, rdc.adobe.io, www.adobe.com}                                   {443}
AdobeAcrobatProStdDC {helpx.adobe.com, rdc.adobe.io, trials.adobe.com}                                      {443}
AdobeAcrobatReaderDC {acrobat.adobe.com, rdc.adobe.io, ardownload2.adobe.com}                               {443}
AdobeBrackets        {brackets.io, api.github.com, github.com}                                              {80, 443}
```

Le paramètre `-Name` permet à `Get-EvergreenEndpointFromApi` de renvoyer les points de terminaison d’une seule application ou d’un tableau d’applications. Dans l’exemple ci-dessous, la fonction renvoie les points de terminaison et les ports de Microsoft Teams et Microsoft Edge.

```powershell
PS C:\> Get-EvergreenEndpointFromApi -Name "MicrosoftTeams", "MicrosoftEdge"

Application    Endpoints                                                                              Ports
-----------    ---------                                                                              -----
MicrosoftEdge  {edgeupdates.microsoft.com, www.microsoft.com, msedge.sf.dl.delivery.mp.microsoft.com} {443}
MicrosoftTeams {config.teams.microsoft.com, www.microsoft.com, statics.teams.cdn.office.net}          {443}
```

### Renvoyer une liste simple de tous les points de terminaison

La sortie de `Get-EvergreenEndpointFromApi` peut être filtrée pour créer une liste simple de toutes les URL de points de terminaison uniques. La commande ci-dessous génère un tableau d’URL qui peut servir de liste d’autorisations regroupant tous les points de terminaison nécessaires à Evergreen.

```powershell
PS C:\> Get-EvergreenEndpointFromApi | Select-Object -ExpandProperty "Endpoints" -Unique
```

### Convertir la sortie au format CSV

Le code ci-dessous convertit la sortie de `Get-EvergreenEndpointFromApi` en fichier CSV. Celui-ci contient le nom de l’application, les URL de ses points de terminaison séparées par des virgules et les ports séparés par des virgules.

```powershell
$Path = "./Endpoints.csv"
Get-EvergreenEndpointFromApi | ForEach-Object {
    [PSCustomObject]@{
        Application = $_.Application
        Endpoints   = $_.Endpoints -join ","
        Ports       = $_.Ports -join ","
    }
} | Export-Csv -Path $Path -NoTypeInformation -Encoding "Utf8" -Append
```

## Utilisation de l’API

L’API fournit deux listes de points de terminaison : les URL qu’Evergreen utilise pour déterminer les versions des applications et les téléchargements, et celles utilisées pour télécharger les programmes d’installation.

::: warning **Un agent utilisateur personnalisé est obligatoire**.
Les agents utilisateur par défaut de la plupart des outils seront bloqués afin de limiter les abus de l’API. Lorsque vous utilisez PowerShell, wget, curl ou d’autres outils, indiquez un agent utilisateur personnalisé. Choisissez-en un qui facilite le dépannage et identifie l’utilisateur de l’API (les données de journalisation ne sont pas publiques), par exemple sous la forme « nom de l’entreprise/emplacement ».
:::

### Renvoyer la liste des URL utilisées pour déterminer les versions des applications

La liste des URL utilisées pour déterminer les versions des applications est exploitée par le module PowerShell Evergreen. Ces informations sont déjà hébergées dans l’API Evergreen et ne sont pas nécessaires si vous utilisez le point de terminaison `/app/{appName}` pour trouver les versions et les programmes d’installation. Cette liste évolue à mesure que les applications prises en charge par Evergreen sont mises à jour.

Voici un exemple d’utilisation de `Invoke-RestMethod` pour récupérer la liste des URL qu’Evergreen utilise afin de déterminer les versions des applications :

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Renvoyer la liste des URL utilisées pour télécharger les programmes d’installation

Cette liste d’URL est utilisée pour télécharger les programmes d’installation identifiés par Evergreen. Elle devrait rester relativement stable, mais peut changer pour certaines applications. Par exemple, `Get-EvergreenApp -Name "VideoLanVlcPlayer` renvoie une liste d’URL de téléchargement fondée sur les miroirs fournis par VLC.

Voici un exemple d’utilisation de `Invoke-RestMethod` pour récupérer la liste des URL qu’Evergreen utilise lors du téléchargement des programmes d’installation avec `Save-EvergreenApp` :

```powershell
PS C:\> Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/downloads" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
```

### Sortie

La sortie de ces deux points de terminaison est au format JSON : elle contient le nom de l’application (une chaîne) et ses points de terminaison (un tableau). Voici un exemple filtré pour Microsoft Edge :

```json
{
    "Application": "MicrosoftEdge",
    "Endpoints": [
        "msedge.sf.dl.delivery.mp.microsoft.com"
    ],
    "Ports": [
        "443"
    ]
}
```

Si vous utilisez PowerShell, faites appel à `Invoke-RestMethod` pour renvoyer un objet contenant les applications et leurs points de terminaison :

```powershell
$Endpoints = Invoke-RestMethod -Uri "https://evergreen-api.stealthpuppy.com/endpoints/versions" -UserAgent "App-Pipeline/1.0.0 (Contoso; https://contoso.com)"
$Endpoints | Where-Object { $_.Application -eq "MicrosoftEdge" }

Application   Endpoints                                      Ports
-----------   ---------                                      -----
MicrosoftEdge {edgeupdates.microsoft.com, www.microsoft.com} {443}
```
