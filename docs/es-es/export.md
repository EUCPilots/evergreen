---
layout: doc
---
# Exportar información de versiones

Se puede usar `Export-EvergreenApp` para exportar a JSON la información de versiones de aplicaciones devuelta por `Get-EvergreenApp` y almacenarla en un archivo. Esto puede resultar útil para hacer un seguimiento de las versiones de las aplicaciones en una biblioteca de software.

En el ejemplo siguiente se recopila la información de versiones de Microsoft OneDrive, se guardan sus instaladores en un directorio de destino y se almacena la información de versiones en un archivo JSON.

```powershell
$OneDrive = Get-EvergreenApp -Name "MicrosoftOneDrive"
Save-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive"
Export-EvergreenApp -InputObject $OneDrive -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json"
```

Si se especifica un archivo JSON existente en el parámetro `-Path` de `Export-EvergreenApp`, se agregará al archivo la información de versiones de la nueva aplicación y se quitarán los duplicados. El archivo contendrá datos JSON similares a los siguientes:

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
`Export-EvergreenApp` no trunca la fecha en el archivo exportado. Tendrá que administrar los datos mediante un proceso independiente a medida que crezca el archivo.
:::

El archivo JSON se puede volver a leer en un objeto con `ConvertFrom-Json`:

```powershell
Get-Content -Path "C:\Evergreen\OneDrive\MicrosoftOneDrive.json" | ConvertFrom-Json
```
