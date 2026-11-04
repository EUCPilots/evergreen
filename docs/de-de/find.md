---
layout: doc
---
# Unterstützte Anwendungen suchen

## Find-EvergreenApp verwenden

Mit `Find-EvergreenApp` wird eine Liste der von Evergreen unterstützten Anwendungen zurückgegeben. Finden wir beispielsweise heraus, ob der Microsoft-FSLogix-Apps-Agent von Evergreen unterstützt wird:

```powershell
Find-EvergreenApp -Name "FSLogix"
```

Der Microsoft-FSLogix-Apps-Agent wird von Evergreen unterstützt. Daher wird eine ähnliche Ausgabe wie die folgende zurückgegeben:

```powershell
Name        : MicrosoftFSLogixApps
Application : Microsoft FSLogix Apps
Link        : https://docs.microsoft.com/fslogix/
```

Der Wert der Eigenschaft `Name` kann mit `Get-EvergreenApp` verwendet werden, um die neueste Version des Microsoft-FSLogix-Apps-Agents abzurufen:

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

Alternativ können wir die Ausgabe von `Find-EvergreenApp` direkt an `Get-EvergreenApp` übergeben:

```powershell
Find-EvergreenApp -Name "FSLogix" | Get-EvergreenApp
```

Die Ausgabe von `Find-EvergreenApp` kann mit dem folgenden Befehl seitenweise durchlaufen werden, um die vollständige Liste der unterstützten Anwendungen zu überprüfen:

```powershell
Find-EvergreenApp | Out-Host -Paging
```

## Ausgabe

`Find-EvergreenApp` gibt drei Eigenschaften aus:

* `Name` – der Bezeichner der unterstützten Anwendung. Dieser Name entspricht dem Namen im Anwendungsmanifest.
* `Application` – das Anwendungsmanifest enthält den vollständigen Anwendungsnamen.
* `Link` – jedes Anwendungsmanifest enthält eine URL zur primären Homepage der Anwendung.

Die Ausgabe von `Find-EvergreenApp` sieht ähnlich wie im folgenden Beispiel aus:

```powershell
Name                 Application             Link
----                 -----------             ----
1Password            1Password               https://1password.com/
7zip                 7zip                    https://www.7-zip.org/
AdobeAcrobat         Adobe Acrobat           https://helpx.adobe.com/au/enterprise/using/deploying-acrobat.html
AdobeAcrobatReaderDC Adobe Acrobat Reader DC https://acrobat.adobe.com/us/en/acrobat/pdf-reader.html
AdobeBrackets        Adobe Brackets          http://brackets.io/
```

## Parameter

### Name

Mit dem Parameter `-Name` wird der Name der Anwendung angegeben, für die Details zurückgegeben werden sollen. Dieser Parameter ist erforderlich. Die Liste der unterstützten Anwendungen erhalten Sie mit `Find-EvergreenApp`.

## Alias

`Find-EvergreenApp` verfügt über den Alias `fea`, der das Abrufen unterstützter Anwendungen vereinfacht. Beispiel:

```powershell
PS /Users/aaron> fea

Name      Application   Link
----      -----------   ----
1Password 1Password     https://1password.com/
7zip      7zip          https://www.7-zip.org/
```
