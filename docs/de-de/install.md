---
layout: doc
---
# Evergreen installieren

## PowerShell-Unterstützung

Evergreen unterstützt Windows PowerShell 5.1 und PowerShell 7.0+. Evergreen sollte mit PowerShell Core 6.x funktionieren. Diese PowerShell-Version wird jedoch nicht aktiv getestet, daher kann die Unterstützung nicht garantiert werden.

## Installation aus der PowerShell Gallery

Das Evergreen-Modul wird in der PowerShell Gallery veröffentlicht und ist hier verfügbar: [Evergreen](https://www.powershellgallery.com/packages/Evergreen/).

::: info
Die Installation von Evergreen aus der PowerShell Gallery ist die empfohlene Installationsmethode.
:::

Das Modul kann mit folgendem Befehl aus der Gallery installiert werden:

```powershell
Install-Module -Name Evergreen
Import-Module -Name Evergreen
```

### Modul aktualisieren

Wenn Sie eine ältere Version des Moduls aus der Gallery installiert haben, können Sie mit `Update-Module` und dem Parameter `-Force` das neueste Update installieren:

```powershell
Update-Module -Name Evergreen -Force
```

### Erweiterte Installation

Bei skriptgesteuerten Installationen (z. B. Betriebssystembereitstellungen) sollten Sie möglicherweise zunächst sicherstellen, dass der PowerShell Gallery vertraut wird, bevor Sie versuchen, das Modul zu installieren:

```powershell
if (Get-PSRepository | Where-Object { $_.Name -eq "PSGallery" -and $_.InstallationPolicy -ne "Trusted" }) {
    Install-PackageProvider -Name "NuGet" -MinimumVersion 2.8.5.208 -Force
    Set-PSRepository -Name "PSGallery" -InstallationPolicy "Trusted"
}
```

Anschließend können wir Evergreen installieren oder aktualisieren, je nachdem, ob das Modul bereits installiert oder veraltet ist:

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

## Manuelle Installation aus dem Repository

Das Modul kann aus dem [GitHub-Quellrepository](https://github.com/eucpilots/evergreen-module) heruntergeladen werden. Es befindet sich dort im Ordner `Evergreen`. Kopieren Sie den Ordner in einen Ihrer PowerShell-Modulpfade. Um alle verfügbaren PowerShell-Modulpfade anzuzeigen, führen Sie in einer PowerShell-Konsole `$env:PSModulePath.split(';')` aus.

Zu den üblichen PowerShell-Modulpfaden gehören:

* Aktueller Benutzer: `%USERPROFILE%\Documents\WindowsPowerShell\Modules\`
* Alle Benutzer: `%ProgramFiles%\WindowsPowerShell\Modules\`
* OneDrive: `$env:OneDrive\Documents\WindowsPowerShell\Modules\`

Gehen Sie für die Installation aus dem Repository wie folgt vor:

1. Laden Sie den `main branch` auf Ihre Arbeitsstation herunter.
2. Kopieren Sie den Inhalt des Evergreen-Ordners auf Ihre Arbeitsstation in den gewünschten PowerShell-Modulpfad.
3. Öffnen Sie eine PowerShell-Konsole mit der Option „Als Administrator ausführen“.
4. Führen Sie `Set-ExecutionPolicy` mit dem Parameter `RemoteSigned` oder `Bypass` aus.
5. Heben Sie die Blockierung der Dateien mit `Get-ChildItem -Path <path to module> -Recurse | Unblock-File` auf.

Nach Abschluss der Installation können Sie mit `Get-Module -ListAvailable Evergreen` überprüfen, ob das Modul vorhanden ist. Laden Sie das Modul zur Verwendung mit folgendem Befehl:

```powershell
Import-Module Evergreen
```
