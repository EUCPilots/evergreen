---
layout: doc
---
# Installer herunterladen

Evergreen enthält die Funktion `Save-EvergreenApp`, mit der sich von `Get-EvergreenApp` zurückgegebene Anwendungsinstaller einfach herunterladen lassen.

Alle Anwendungen geben mindestens die Eigenschaften `Version` und `URI` zurück. Viele liefern außerdem Eigenschaften wie `Architecture`, `Language`, `Type`, `Ring`, `Channel` und `Release`. Der Dateiname des Installers wird üblicherweise dynamisch aus der Eigenschaft `URI` ermittelt.

Um einen Anwendungsinstaller ohne `Save-EvergreenApp` abzurufen und herunterzuladen, filtern Sie die Ausgabe nach dem gewünschten Download, ermitteln Sie den Dateinamen und verwenden Sie `Invoke-WebRequest`:

```powershell
$Teams = Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
$TeamsInstaller = Split-Path -Path $Teams.Uri -Leaf
Invoke-WebRequest -Uri $Teams.Uri -OutFile ".\$TeamsInstaller" -UseBasicParsing
```

Dies ist ein einfaches Beispiel. Bei Anwendungen mit zusätzlichen Eigenschaften und Ausgabewerten kann eine komplexere Filterung erforderlich sein. Microsoft Edge gibt beispielsweise mehrere Eigenschaften im zurückgegebenen Objekt aus:

```powershell
Version      : 89.0.774.68
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 1/4/2021 7:29:00 pm
Hash         : 6E1856B2972688D109F550B0A62C264E9829FF1F392E3BE0FC308900AEFD3455
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/a67b9c83-1671-45ab-982f-e02318eeffc9/MicrosoftEdgeEnterpriseX64.msi
```

`Save-EvergreenApp` akzeptiert die Ausgabe jeder Anwendung und vereinfacht das Herunterladen der in einem Anwendungsobjekt enthaltenen Installer. Dazu ermittelt die Funktion den Zieldateinamen und erstellt anhand der Eigenschaften in der Anwendungsausgabe einen Zielverzeichnispfad.

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive | Save-EvergreenApp -Path "C:\Apps\OneDrive"
```

Mit `-Path` erstellt `Save-EvergreenApp` unterhalb des angegebenen Pfads eine Ordnerstruktur. Dafür verwendet die Funktion alle im jeweiligen Anwendungsobjekt vorhandenen Eigenschaften in dieser Reihenfolge: `Product`, `Track`, `Channel`, `Release`, `Ring`, `Version`, `Language` und `Architecture`.

`Save-EvergreenApp` gibt den Pfad jeder heruntergeladenen Datei zurück, der an andere Funktionen in einem Skript übergeben werden kann.

Im obigen Beispiel mit `MicrosoftOneDrive` gibt `Save-EvergreenApp` eine ähnliche Ausgabe wie die folgende zurück:

```powershell
Path
----
C:\Apps\OneDrive\Enterprise\20.169.0823.0008\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.030.0211.0002\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.052.0314.0001\OneDriveSetup.exe
C:\Apps\OneDrive\Insider\21.056.0318.0001\OneDriveSetup.exe
```

Mit dem Parameter `-CustomPath` können Anwendungsinstaller in ein einzelnes Verzeichnis heruntergeladen werden. Beachten Sie, dass ein Anwendungsobjekt mehrere Versionen oder Kanäle einer Anwendung mit demselben Installernamen zurückgeben kann. Bei Verwendung von `-CustomPath` wird der erste Installer gespeichert; weitere Installer mit demselben Dateinamen werden übersprungen.

::: tip
Wenn das Objekt mehrere Installer mit demselben Dateinamen enthält, lädt Save-EvergreenApp nur den ersten an die Funktion übergebenen Installer herunter.
:::

Daher empfiehlt es sich bei Verwendung von `-CustomPath`, die Ausgabe von `Get-EvergreenApp` zu filtern, bevor sie an `Save-EvergreenApp` übergeben wird. Beispiel:

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive |
    Where-Object { $_.Ring -eq "Enterprise" -and $_.Architecture -eq "AMD64" -and $_.Type -eq "exe" } |
    Save-EvergreenApp -CustomPath "C:\Apps\OneDrive"
```

## Parameter

### InputObject

Ein Anwendungsobjekt mit einer Eigenschaft `URI`. Bei Verwendung von `-Path` muss das Objekt außerdem eine Eigenschaft `Version` enthalten.

### Path

Das übergeordnete Verzeichnis, unter dem eine Ordnerstruktur erstellt und Anwendungsinstaller gespeichert werden. Verwenden Sie entweder `-Path` oder `-CustomPath`, nicht beide.

### CustomPath

Das Verzeichnis, in dem Installer direkt und ohne Unterverzeichnisse gespeichert werden. Verwenden Sie entweder `-CustomPath` oder `-Path`, nicht beide.

### NoProgress

`Save-EvergreenApp` verwendet `Invoke-WebRequest`, um Anwendungsinstaller herunterzuladen. Der Downloadfortschritt wird standardmäßig unterdrückt, damit Downloads schneller ablaufen. Bei Verwendung von `-Verbose` wird der Fortschritt jedoch angezeigt. Verwenden Sie `-NoProgress` zusammen mit `-Verbose`, um den Fortschritt auszublenden und gleichzeitig ausführliche Ausgaben anzuzeigen.

### -Force

Erzwingt den Download der Anwendungsinstaller von der URI-Eigenschaft, selbst wenn sie bereits im Zielverzeichnis vorhanden sind.

### -VerifyChecksum

Vergleicht im Eingabeobjekt vorhandene Prüfsummentypen `SHA1`, `SHA256` und `SHA512` mit der heruntergeladenen oder vorhandenen Datei. Dateien mit abweichenden Prüfsummen werden nicht zurückgegeben.

### Retry options

Bei vorübergehenden Netzwerkfehlern und wiederholbaren HTTP-Antworten werden Downloads erneut versucht. Standardmäßig gibt es nach dem ersten Versuch drei Wiederholungen (`-RetryCount 3`), eine anfängliche Verzögerung von zwei Sekunden (`-RetryDelaySeconds 2`) und eine maximale Verzögerung von 300 Sekunden (`-MaximumRetryDelaySeconds 300`). Die Wartezeiten steigen exponentiell an; der `Retry-After`-Header des Servers wird bis zur maximalen Verzögerung berücksichtigt.

### Timeout options

`-ConnectionTimeoutSeconds` legt das Verbindungstimeout fest (Standard: 30 Sekunden). `-OperationTimeoutSeconds` legt das Timeout zwischen Datenlesevorgängen fest (Standard: 300 Sekunden). Dieser Parameter wird von `Invoke-WebRequest` in PowerShell 7.4 und höher unterstützt.

## Alias

`Save-EvergreenApp` verfügt über den Alias `sea`, der das Herunterladen von Anwendungen vereinfacht. Beispiel:

```powershell
PS /Users/aaron> gea Slack | sea -Path /Users/aaron/Temp/Slack
```
