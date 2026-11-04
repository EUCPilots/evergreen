---
layout: doc
---
# Anwendungsdetails abrufen

## Get-EvergreenApp verwenden

Mit `Get-EvergreenApp` werden Anwendungsdetails abgerufen, indem eine Anwendung mit dem Parameter `-Name` angegeben wird.

Finden wir beispielsweise die neueste Version des Microsoft-FSLogix-Apps-Agents:

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

Damit wird eine ähnliche Ausgabe wie die folgende zurückgegeben, die Versionsnummer und Download-URL der Anwendung enthält. Die Ausgabe dieser Anwendung umfasst außerdem das Veröffentlichungsdatum:

```powershell
Version : 2.9.7979.62170
Date    : 9/11/2021
Channel : Production
URI     : https://download.microsoft.com/download/3/f/7/3f755dbd-debe-46d4-811c-3e7c87bc4408/FSLogix_Apps_2.9.7979.62170.zip
```

Alle Ausgabeeigenschaften sind Zeichenfolgen, die mit anderen Funktionen und Cmdlets verarbeitet werden können. Dazu gehört auch das Filtern der Ausgabe mit `Where-Object`.

## Ausgabe

Jede Evergreen-Anwendung gibt mindestens zwei Eigenschaften im Objekt zurück, das sie an die Pipeline sendet:

* `Version` – eine Zeichenfolgeneigenschaft mit der Versionsnummer der Anwendung. Wenn Sie ein Versionsobjekt benötigen, wandeln Sie den Wert mit `[System.Version]` um.
* `URI` – eine Zeichenfolgeneigenschaft mit dem Downloadspeicherort der neuesten Anwendungsversion. Die Speicherorte sind öffentlich zugänglich und stellen Installer üblicherweise in Windows-Installerformaten wie `exe` oder `msi` bereit. Einige Downloads können andere Formate wie `zip` verwenden, die vor der Installation entpackt werden müssen.

::: tip Ausgabe verstehen
Da es kein standardisiertes Ausgabeformat der Hersteller gibt – nicht einmal unbedingt für Anwendungen desselben Herstellers –, kann Evergreen nicht für alle Anwendungen dieselben Daten zurückgeben. Die zurückgegebenen Daten können daher variieren.
:::

Einige Anwendungen enthalten möglicherweise zusätzliche Eigenschaften in ihrer Ausgabe, die häufig eine Filterung erforderlich machen. Dazu gehören:

* `Architecture` – die Prozessorarchitektur des Installers
* `Type` – eine Anwendung kann Installer-Downloads in Formaten wie `exe`, `msi` oder `zip` zurückgeben. In einigen Fällen kann `Type` leicht abweichende Daten enthalten.
* `Ring`, `Channel` und/oder `Release` – einige Anwendungen umfassen verschiedene Release-Rings oder Kanäle für die Unternehmensnutzung. Der Wert dieser Eigenschaft ist häufig anwendungsspezifisch.
* `Language` – einige Anwendungsinstaller unterstützen bestimmte Sprachen.
* `Date` – in einigen Fällen kann Evergreen das Veröffentlichungsdatum der zurückgegebenen Version angeben.

## Ausgabe verwenden

Mit der Ausgabe können wir die neueste Version von Microsoft Teams herunterladen, bevor wir sie an einen Zielort kopieren oder direkt auf dem aktuellen System installieren. Die folgenden Befehle filtern `Get-EvergreenApp -Name MicrosoftTeams`, um die neueste Version und den Download abzurufen. Anschließend wird der Installer mit `Save-EvergreenApp` heruntergeladen und Teams schließlich mit `msiexec` in einer VDI-unterstützten Konfiguration installiert:

```powershell
$Teams = Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Ring -eq "General" -and $_.Type -eq "msi" }
$TeamsInstaller = $Teams | Save-EvergreenApp -Path "C:\Temp\Teams"
& "$env:SystemRoot\System32\msiexec.exe" "/package $($TeamsInstaller.FullName) ALLUSER=1 ALLUSERS=1 /quiet"
```

## Parameter

### Name

Mit dem Parameter `-Name` wird der Name der Anwendung angegeben, für die Details zurückgegeben werden sollen. Dieser Parameter ist erforderlich. Die Liste der unterstützten Anwendungen erhalten Sie mit `Find-EvergreenApp`.

### Verbose

Der Parameter `-Verbose` kann hilfreich sein, um zu beobachten, aus welcher Quelle die Anwendungsdetails abgerufen werden (z. B. die URL für Anwendungsupdates) und um Probleme zu beheben, wenn die erwarteten Anwendungsdetails nicht zurückgegeben werden.

## Alias

`Get-EvergreenApp` verfügt über den Alias `gea`, der das Abrufen von Anwendungsdetails vereinfacht. Beispiel:

```powershell
PS /Users/aaron> gea Slack

Version      : 4.14.0
Platform     : PerMachine
Architecture : x64
URI          : https://downloads.slack-edge.com/releases/windows/4.14.0/prod/x64/slack-standalone-4.14.0.0.msi
```
