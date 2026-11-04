---
layout: doc
---
# Dépannage

## Attendre et réessayer

Les problèmes les plus courants sont temporaires : Evergreen récupère les mises à jour au moment où vous exécutez `Get-EvergreenApp`, et les résultats peuvent être affectés par tout incident entre vous et la source de données de l’éditeur. Un problème peut être dû au réseau, au DNS ou, souvent, à une modification effectuée par l’éditeur.

Si vous rencontrez un problème, attendez une heure puis réessayez.

## Erreurs de fonction

Si une erreur survient lors de la récupération des détails d’une application existante, réexécutez `Get-EvergreenApp` avec le paramètre `-Verbose`. Des détails supplémentaires s’afficheront et devraient indiquer à quel niveau la requête échoue.

Dans la plupart des cas, la source de l’éditeur est temporairement indisponible (la situation devrait se rétablir) ou a changé, ce qui peut nécessiter une mise à jour du module.

### Exemple – MicrosoftWvdInfraAgent

Dans cet exemple, l’appel à `MicrosoftWvdInfraAgent` renvoie une erreur HTTP 503. L’exécution de la commande plus tard dans la journée a réussi. Le problème touchait la source de l’éditeur et s’est résolu sans intervention.

```powershell
Get-EvergreenApp -Name "MicrosoftWvdInfraAgent"

Invoke-EvergreenWebRequest : Invoke-EvergreenWebRequest: The remote server returned an error: (503) Server Unavailable..
At C:\projects\evergreen\Evergreen\Apps\Get-MicrosoftWvdInfraAgent.ps1:25 char:16
+     $Content = Invoke-EvergreenWebRequest @params
+                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Write-Error], WriteErrorException
    + FullyQualifiedErrorId : Microsoft.PowerShell.Commands.WriteErrorException,Invoke-EvergreenWebRequest
```

### Exemple – MicrosoftWvdMultimediaRedirection

Dans cet exemple, nous obtenons de nouveau une erreur HTTP 503 ; la source est donc probablement indisponible.

```powershell
Get-EvergreenApp -Name "MicrosoftWvdMultimediaRedirection"

WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1:25
Line |
  25 |      $Content = Invoke-EvergreenWebRequest @params
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: Response status code does not indicate success: 503 (Service Unavailable)..

WARNING: Get-MicrosoftWvdMultimediaRedirection: Failed to return a header from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
Exception: /Users/aaron/projects/evergreen/Evergreen/Public/Get-EvergreenApp.ps1:80
Line |
  80 |                  throw "Failed to capture output from: Get-$Name."
     |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Failed to capture output from: Get-MicrosoftWvdMultimediaRedirection.
```

Si nous exécutons la même commande avec le paramètre `-Verbose`, des détails supplémentaires seront affichés.

```powershell
Get-EvergreenApp -Name "MicrosoftWvdMultimediaRedirection" -Verbose

VERBOSE: Function path: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1
VERBOSE: Function exists: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1.
VERBOSE: Dot sourcing: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1.
VERBOSE: Get-FunctionResource: read application resource strings from [/Users/aaron/projects/evergreen/Evergreen/Manifests/MicrosoftWvdMultimediaRedirection.json]
VERBOSE: Calling: Get-MicrosoftWvdMultimediaRedirection.
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [Method: Head].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [UserAgent: Mozilla/5.0 (Macintosh; Darwin 21.5.0 Darwin Kernel Version 21.5.0: Tue Apr 26 21:08:29 PDT 2022; root:xnu-8020.121.3~4/RELEASE_ARM64_T8101; en-AU) AppleWebKit/534.6 (KHTML, like Gecko) Chrome/7.0.500.0 Safari/534.6].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [UseBasicParsing: True].
VERBOSE: Invoke-EvergreenWebRequest: Invoke-WebRequest parameter: [Uri: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF].
VERBOSE: HEAD with 0-byte payload
VERBOSE: received 175-byte response of content type text/html
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
Write-Error: /Users/aaron/projects/evergreen/Evergreen/Apps/Get-MicrosoftWvdMultimediaRedirection.ps1:25
Line |
  25 |      $Content = Invoke-EvergreenWebRequest @params
     |                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Invoke-EvergreenWebRequest: Response status code does not indicate success: 503 (Service Unavailable)..

WARNING: Get-MicrosoftWvdMultimediaRedirection: Failed to return a header from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4QWrF.
Exception: /Users/aaron/projects/evergreen/Evergreen/Public/Get-EvergreenApp.ps1:80
Line |
  80 |                  throw "Failed to capture output from: Get-$Name."
     |                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Failed to capture output from: Get-MicrosoftWvdMultimediaRedirection.
```

### Exemple – Zoom

Dans l’exemple ci-dessous, récupérons les détails de `Zoom` avec le paramètre `-Verbose`, qui indique les opérations effectuées par Evergreen pour récupérer ces informations :

```powershell
Get-EvergreenApp -Name "Zoom" -Verbose

VERBOSE: Get-EvergreenApp: Function exists: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
VERBOSE: Get-EvergreenApp: Dot sourcing: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
VERBOSE: Get-EvergreenApp: Calling: Get-Zoom.
VERBOSE: Get-FunctionResource: read application resource strings from [/Users/aaron/Projects/evergreen/Evergreen/Manifests/Zoom.json]
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomCitrixHDXMediaPlugin.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomCitrixHDXMediaPlugin.msi?_x_zm_rtaid=1ntgQ-l3TsyzTXmWzDs59w.1625872867055.20bd6639bacc03053f5e85d49d21fc77&_x_zm_rhtaid=731].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomInstaller.exe.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.1.543/ZoomInstaller.exe].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomOutlookPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.0.64/ZoomOutlookPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomNotesPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.0.65/ZoomNotesPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomInstallerFull.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.7.1.543/ZoomInstallerFull.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomRooms.exe.
WARNING: Resolve-SystemNetWebRequest: Error at URI: https://zoom.us/client/latest/ZoomRooms.exe.
WARNING: Resolve-SystemNetWebRequest: Response:  -
WARNING: Resolve-SystemNetWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
VERBOSE: Get-Zoom: Setting fallback URL to: https://eucpilots.com/evergreen/issues/.
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/client/latest/ZoomLyncPluginSetup.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/5.2.44882.0827/ZoomLyncPluginSetup.msi].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomVmwareMediaPlugin.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomVmwareMediaPlugin.msi?_x_zm_rtaid=kow6DBRDQhO8sS9-JyHTDQ.1625872876745.f65b9ac6613cb7a22686fc40291be0bf&_x_zm_rhtaid=705].
VERBOSE: Resolve-SystemNetWebRequest: Attempting to resolve: https://zoom.us/download/vdi/ZoomInstallerVDI.msi.
VERBOSE: Resolve-SystemNetWebRequest: Response: [OK].
VERBOSE: Resolve-SystemNetWebRequest: Resolved to: [https://cdn.zoom.us/prod/vdi/ZoomInstallerVDI.msi?_x_zm_rtaid=EiXK_i85Qnyxl0PnXE6ITg.1625872878653.8a666f93edfe18920e810d72dadd4246&_x_zm_rhtaid=751].
VERBOSE: Get-EvergreenApp: Output result from: /Users/aaron/Projects/evergreen/Evergreen/Apps/Get-Zoom.ps1.
```

Dans cette requête, nous constatons un problème avec `https://zoom.us/client/latest/ZoomRooms.exe`. La vérification de cette URL dans un navigateur ou avec `Invoke-WebRequest` montre que la source est indisponible. L’éditeur l’a peut-être déplacée temporairement ; Evergreen fonctionnera de nouveau lorsqu’elle sera accessible. Si l’emplacement a changé définitivement, Evergreen devra être mis à jour pour utiliser les nouvelles sources.

## Erreurs de sortie

### Masquer les erreurs et les avertissements

Certaines fonctions peuvent afficher des erreurs et des avertissements tout en renvoyant les informations de version de l’application. Dans l’exemple ci-dessous, `MicrosoftWvdRemoteDesktop` renvoie des données, mais affiche plusieurs avertissements :

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop"

WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9.
WARNING: Invoke-EvergreenWebRequest: Error at URI: https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
WARNING: Invoke-EvergreenWebRequest: Error encountered: Response status code does not indicate success: 503 (Service Unavailable)..
WARNING: Invoke-EvergreenWebRequest: For troubleshooting steps see: https://eucpilots.com/evergreen/troubleshoot/.
WARNING: Get-MicrosoftWvdRemoteDesktop: Unable to retrieve headers from https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7.
```

Ces avertissements peuvent être masqués avec le paramètre `-WarningAction` :

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" -ErrorAction "SilentlyContinue" -WarningAction "SilentlyContinue"
```

### Sortie inattendue

Si la sortie d’une fonction est manifestement incorrecte, vous pouvez [signaler un problème](https://github.com/eucpilots/evergreen-module/issues).

Il est plus fréquent que la sortie soit mal filtrée et que le résultat attendu ne soit pas obtenu. Voici un exemple de sortie de `MicrosoftWvdRemoteDesktop`, qui propose plusieurs versions avec de nombreuses propriétés. Sans filtrage, toutes les versions et toutes les propriétés sont affichées :

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" | Format-Table

Version    Architecture Channel Date      Filename                           URI
-------    ------------ ------- ----      --------                           ---
1.2.3401.0 ARM64        Insider Unknown   RemoteDesktop_1.2.3401.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9
1.2.3401.0 x64          Insider 19/7/2022 RemoteDesktop_1.2.3401.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy5
1.2.3401.0 x86          Insider Unknown   RemoteDesktop_1.2.3401.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7
1.2.3401.0 ARM64        Dogfood Unknown   RemoteDesktop_1.2.3401.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51od9
1.2.3401.0 x64          Dogfood 19/7/2022 RemoteDesktop_1.2.3401.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy5
1.2.3401.0 x86          Dogfood Unknown   RemoteDesktop_1.2.3401.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE51gy7
1.2.3317.0 ARM64        Public  13/7/2022 RemoteDesktop_1.2.3317.0_ARM64.msi https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50W7e
1.2.3317.0 x64          Public  13/7/2022 RemoteDesktop_1.2.3317.0_x64.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE518ld
1.2.3317.0 x86          Public  13/7/2022 RemoteDesktop_1.2.3317.0_x86.msi   https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE50W7f
```

Pour obtenir une seule version, nous pouvons filtrer la sortie avec `Where-Object`. La syntaxe doit être correcte et chaque propriété du filtre doit recevoir la valeur attendue :

```powershell
Get-EvergreenApp -Name "MicrosoftWvdRemoteDesktop" | Where-Object { $_.Architecture -eq "x64" -and $_.Channel -eq "Public" }

Version      : 1.2.3317.0
Architecture : x64
Channel      : Public
Date         : 13/7/2022
Filename     : RemoteDesktop_1.2.3317.0_x64.msi
URI          : https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE518ld
```
