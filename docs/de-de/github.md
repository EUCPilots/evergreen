---
layout: doc
---
# Mit GitHub-Ratenbegrenzungen arbeiten

Mehr als 150 von Evergreen unterstützte Anwendungen werden in GitHub-Repositorys gehostet oder beziehen Daten aus einem GitHub-Repository, um die neueste Version zu ermitteln. Evergreen verwendet beim Abfragen von Details zu diesen Anwendungen die GitHub-REST-API.

Sowohl `Get-EvergreenApp` als auch `Update-Evergreen` senden Anforderungen an die GitHub-REST-API:

- `Get-EvergreenApp` fragt GitHub-Releases und -Tags ab, um Versions- und Downloadinformationen für auf GitHub gehostete Anwendungen zurückzugeben
- `Update-Evergreen` lädt die neuesten Anwendungsfunktionen und Manifeste aus dem Repository [eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps) herunter

GitHub begrenzt die API für nicht authentifizierte Anforderungen auf 60 Anforderungen pro Stunde und IP-Adresse. In Umgebungen, in denen Evergreen häufig oder in mehreren Sitzungen ausgeführt wird, kann dieses Limit schnell erreicht werden. Weitere Informationen finden Sie unter [Ratenbegrenzungen für die REST-API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

Durch Authentifizierung mit einem persönlichen Zugriffstoken steigt das Limit auf 5.000 Anforderungen pro Stunde.

## Persönliches Zugriffstoken erstellen

Evergreen unterstützt authentifizierte Anforderungen mit [persönlichen Zugriffstoken](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Empfohlen werden [persönliche Zugriffstoken mit differenzierten Berechtigungen](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

Ein Token mit Lesezugriff auf öffentliche Repositorys ist ausreichend. Weitere Bereiche oder Berechtigungen sind nicht erforderlich. Da das Token nur Lesezugriff auf öffentliche Repositorys benötigt, ist eine lange Ablaufzeit sinnvoll. Dennoch sollte das Token sicher verwaltet werden.

![Persönliches Zugriffstoken mit differenzierten Berechtigungen](/img/github-pat.png)

## Umgebungsvariable GITHUB_TOKEN festlegen

Evergreen liest die Umgebungsvariablen `GITHUB_TOKEN` und `GH_TOKEN`. Wenn Sie eine dieser Variablen auf den Wert des persönlichen Zugriffstokens setzen, kann Evergreen Anforderungen an die GitHub-API automatisch authentifizieren. Sowohl `Get-EvergreenApp` als auch `Update-Evergreen` verwenden das Token ohne zusätzliche Konfiguration.

### Windows

So legen Sie die Variable dauerhaft für den aktuellen Benutzer fest (sie bleibt über Sitzungen und Neustarts hinweg erhalten):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "User")
```

So legen Sie sie für alle Benutzer des Computers fest (Administratorrechte erforderlich):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "Machine")
```

Die Variable kann auch in der Windows-Benutzeroberfläche unter **Systemeigenschaften > Erweitert > Umgebungsvariablen** festgelegt werden.

So legen Sie sie nur für die aktuelle PowerShell-Sitzung fest:

```powershell
$env:GITHUB_TOKEN = "<your-token>"
```

### macOS und Linux

Fügen Sie die folgende Zeile zu Ihrem Shell-Profil hinzu (`~/.zshrc` für Zsh, `~/.bashrc` oder `~/.bash_profile` für Bash), um die Variable dauerhaft festzulegen:

```bash
export GITHUB_TOKEN="<your-token>"
```

Laden Sie das Profil nach dem Speichern erneut:

```bash
source ~/.zshrc  # or source ~/.bashrc
```

So legen Sie die Variable nur für die aktuelle Shell-Sitzung fest:

```bash
export GITHUB_TOKEN="<your-token>"
```

## GitHub Actions

Wenn Evergreen in einem GitHub-Actions-Workflow ausgeführt wird, ist das Secret `GITHUB_TOKEN` automatisch verfügbar; ein separates persönliches Zugriffstoken ist nicht erforderlich. Weitere Informationen finden Sie unter [GITHUB_TOKEN zur Authentifizierung in Workflows verwenden](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).

Fügen Sie Folgendes am Anfang Ihrer Workflowdatei ein, damit das Token als Umgebungsvariable verfügbar ist:

```yaml
# Environment variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Evergreen erkennt die Variable automatisch, wenn der Workflow ausgeführt wird.

## Status der Ratenbegrenzung prüfen

Wenn Sie `Get-EvergreenApp` für eine Anwendung ausführen, die GitHub als Quelle verwendet, gibt der Parameter `-Verbose` die aktuelle Anzahl der verbleibenden API-Anforderungen aus:

```powershell
Get-EvergreenApp -Name "MicrosoftBicep" -Verbose
```

Die ausführliche Ausgabe enthält eine Zeile ähnlich der folgenden:

```
VERBOSE: Get-GitHubRateLimit: Remaining requests to the GitHub API: 58 of 60
```

Wenn das Ratenlimit ausgeschöpft ist, gibt Evergreen ein Versionsobjekt vom Typ `RateLimited` zurück und zeigt eine Warnung an. Legen Sie vor der Ausführung von Evergreen `GITHUB_TOKEN` oder `GH_TOKEN` fest, um dies zu vermeiden.
