---
layout: doc
---
# Funcionamiento interno

Evergreen es un módulo de PowerShell autónomo que, una vez instalado, no requiere acceso a ningún contenido adicional aparte de las fuentes oficiales de los proveedores que se usan para recuperar los detalles de una aplicación especificada.

El método que usa Evergreen para encontrar la versión más reciente y la URL de descarga de una aplicación requiere código personalizado para la mayoría de las aplicaciones. Algunas usan una fuente común, como GitHub (que ofrece una API de publicaciones), pero la mayoría requiere consultar una API o un sitio específico de la aplicación para devolver sus detalles.

## Estructura del módulo

Evergreen incluye la siguiente estructura de directorios:

* `<ModuleBase>/Public`: funciones públicas, como `Get-EvergreenApp`, `Find-EvergreenApp` y `Save-EvergreenApp`
* `<ModuleBase>/Apps`: funciones internas específicas de cada aplicación, que contienen la lógica para recuperar los detalles de la aplicación. A menudo son únicas para cada aplicación
* `<ModuleBase>/Shared`: funciones internas que usan aplicaciones específicas para reducir la repetición de código
* `<ModuleBase>/Manifests`: cada aplicación tiene un manifiesto JSON con detalles específicos que usan las funciones correspondientes. Estos describen, entre otras cosas, las URL que se usan para determinar la versión más reciente de la aplicación
* `<ModuleBase>/Private`: funciones internas con código reutilizable

### Public

La carpeta `Public` contiene todas las funciones que exporta Evergreen:

* `ConvertTo-DotNetVersionClass.ps1`
* `Export-EvergreenApp.ps1`
* `Export-EvergreenManifest.ps1`
* `Find-EvergreenApp.ps1`
* `Get-EvergreenApp.ps1`
* `Get-EvergreenAppFromApi.ps1`
* `Get-EvergreenAppFromLibrary.ps1`
* `Get-EvergreenEndpointFromApi.ps1`
* `Get-EvergreenLibrary.ps1`
* `New-EvergreenLibrary.ps1`
* `Save-EvergreenApp.ps1`
* `Start-EvergreenLibraryUpdate.ps1`
* `Test-EvergreenApp.ps1`

### Apps

La carpeta `Apps` contiene funciones específicas de cada aplicación, que realizan el trabajo de determinar los detalles de la aplicación de destino.

Por ejemplo, `Get-MicrosoftEdge` consulta la lista oficial de versiones de Edge, alojada en `https://edgeupdates.microsoft.com/api/products`. Así, la función puede usar el mismo proceso que Edge para determinar su versión más reciente y la URL desde la que descargar el instalador. Al ejecutar `Get-EvergreenApp -Name MicrosoftEdge`, `Get-EvergreenApp` llama a `Get-MicrosoftEdge` y pasa su resultado a la canalización.

Aunque la mayoría de las funciones incluyen código específico de cada aplicación, algunas aplicaciones usan GitHub o SourceForge como fuente para determinar versiones y actualizaciones, por lo que estas funciones pueden compartir más código que otras.

### Manifests

Cada aplicación incluye un manifiesto JSON con detalles que usa la función interna correspondiente para recuperar la versión y el URI de descarga. La estructura del manifiesto incluye tres propiedades principales: `Name` (el proveedor y el nombre de la aplicación), `Source` (un vínculo a un sitio oficial) y `Get`, que define elementos como la URL para buscar actualizaciones de la aplicación. La estructura básica del manifiesto es similar a la siguiente:

```json
{
    "Name": "Vendor Application name",
    "Source": "https://www.vendorwebsite.com/product",
    "Get": {
        "Update": {
            "Uri": "https://update.vendorwebsite.com/api/product"
        }
    },
    "Download": {
            "Uri": "https://download.vendorwebsite.com/files"
    },
}
```

Además, cada manifiesto define la propiedad `Install`, que incluye detalles sobre la instalación de la aplicación. Sin embargo, aunque aparezca en muchos manifiestos, no pretende proporcionar un método definitivo para instalar aplicaciones.

### Private

La carpeta `Private` incluye código reutilizable que utilizan muchas funciones de aplicaciones. Algunas funciones importantes:

* `Get-GitHubRepoRelease`: devuelve las publicaciones de un repositorio de GitHub de destino
* `Get-SourceForgeRepoRelease`: devuelve las publicaciones de un repositorio de SourceForge de destino
* `Invoke-EvergreenRestMethod`: proporciona lógica para usar `Invoke-RestMethod` y devolver contenido de una API de actualización
* `Invoke-EvergreenWebRequest`: proporciona lógica para usar `Invoke-WebRequest` y devolver contenido de un URI de destino
