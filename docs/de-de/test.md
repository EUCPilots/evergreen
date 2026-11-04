---
layout: doc
---
# Installer testen

`Test-EvergreenApp` prüft, ob die von `Get-EvergreenApp` zurückgegebenen Installer-URLs erreichbar sind. Zuerst wird eine `HEAD`-Anforderung gesendet. Bei einem Fehler wird die Anforderung mit einem Bereichs-`GET` wiederholt. Die Ausgabe enthält die URI, ein boolesches Ergebnis und, sofern verfügbar, den HTTP-Statuscode.

In diesem Beispiel werden die von Microsoft OneDrive zurückgegebenen URLs überprüft:

```powershell
Get-EvergreenApp -Name "MicrosoftOneDrive" |
    Where-Object { $_.Type -eq "exe" } |
    Test-EvergreenApp
```

Ausgabe:

```text
Result StatusCode URI
------ ---------- ---
  True        200 https://example.com/installer.exe
```

## Parameter

### InputObject

Ein Anwendungsobjekt mit einer nicht leeren Eigenschaft `URI`. Objekte ohne gültige URI erzeugen eine Warnung und das Ergebnis `False`.

### Anforderungsoptionen

`-ConnectionTimeoutSeconds` legt das Anforderungs-Timeout fest (standardmäßig 30 Sekunden). `-UserAgent` überschreibt den Standard-User-Agent. Geben Sie mit `-Proxy` einen Proxyserver an. Mit `-ProxyCredential` können Sie Anmeldeinformationen übergeben; dafür ist `-Proxy` erforderlich.

### NoProgress

Der Fortschritt wird standardmäßig unterdrückt. Bei Verwendung von `-Verbose` wird der Anforderungsfortschritt angezeigt, sofern nicht zusätzlich `-NoProgress` angegeben wird. Verwenden Sie `-Verbose`, um zu sehen, welche URI getestet wird.

## Alias

`Test-EvergreenApp` verfügt über den Alias `tea`, der das Testen von Anwendungen vereinfacht. Beispiel:

```powershell
PS /Users/aaron> gea MicrosoftTeams | tea
```
