---
layout: doc
---
# Versionsinformationen exportieren

Mit `Export-EvergreenApp` können von `Get-EvergreenApp` zurückgegebene Anwendungsversionsinformationen als JSON exportiert und in einer Datei gespeichert werden. Dies kann hilfreich sein, um Anwendungsversionen in einer Softwarebibliothek nachzuverfolgen.

Das folgende Beispiel zeigt, wie Sie Versionsinformationen zu Microsoft OneDrive abrufen, die OneDrive-Installer in einem Zielverzeichnis speichern und die Versionsinformationen in einer JSON-Datei ablegen.

```powershell
$OneDrive = Get-EvergreenApp -Name "MicrosoftOneDrive"
Save-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive"
Export-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json"
```

Wenn für den Parameter `-Path` von `Export-EvergreenApp` eine vorhandene JSON-Datei angegeben wird, werden die neuen Anwendungsversionsinformationen zur Datei hinzugefügt und Duplikate entfernt. Die Datei enthält dann JSON-Daten ähnlich den folgenden:

```json
[
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "jjiooBnk6w0tEt20O1IWzT63jvuFUxpZgJDoJdpkDgg=",
    "Ring": "Enterprise",
    "Architecture": "x86"
  },
  {
    "Version": "22.077.0410.0007",
    "URI": "https://oneclient.sfx.ms/Win/Enterprise/22.077.0410.0007/amd64/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "JjoeTY78Krp49KXJEyjtE1O9WSuFmFoNKECtVwKGDW8=",
    "Ring": "Enterprise",
    "Architecture": "AMD64"
  },
  {
    "Version": "22.131.0619.0001",
    "URI": "https://oneclient.sfx.ms/Win/Prod/22.131.0619.0001/OneDriveSetup.exe",
    "Type": "exe",
    "Sha256": "ObZEdqfd8gn9RhzR4SkuVS+Xu4R0vye5OnAaUgRl9E4=",
    "Ring": "Production",
    "Architecture": "x86"
  }
]
```

::: tip
`Export-EvergreenApp` kürzt die Daten in der exportierten Datei nicht. Wenn die Datei wächst, müssen Sie die Daten mit einem separaten Prozess verwalten.
:::

Mit `ConvertFrom-Json` kann die JSON-Datei wieder in ein Objekt eingelesen werden:

```powershell
Get-Content -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json" | ConvertFrom-Json
```
