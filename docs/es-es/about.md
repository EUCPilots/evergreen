---
layout: doc
---
# Acerca de

Evergreen es un módulo de PowerShell que devuelve la versión más reciente y los vínculos de descarga de un conjunto de aplicaciones comunes de Windows.

::: tip Confianza
El objetivo de este proyecto es ofrecer confianza. Evergreen se ejecuta en su entorno y solo consulta las fuentes de los proveedores de aplicaciones. Para encontrar las versiones de las aplicaciones, Evergreen consulta las mismas API de actualización que estas usan para buscar actualizaciones o una fuente propiedad del proveedor. Esto significa que puede confiar en los resultados de Evergreen, ya que no hay intermediarios.
:::

## Motivo

Evergreen ayuda a resolver varios problemas, entre ellos:

* Encontrar la versión más reciente de una aplicación para compararla con una versión ya instalada o descargada
* Encontrar la URL del instalador más reciente para descargarlo e instalarlo localmente (mediante una instalación con scripts o en una imagen de referencia) o implementarlo en equipos de destino (por ejemplo, con Intune o ConfigMgr)

Evergreen ayuda a automatizar las implementaciones de software. Algunos ejemplos:

* Crear imágenes de referencia con Hashicorp Packer, que pueden incluir las versiones más recientes de un conjunto de aplicaciones
* Importar aplicaciones en Microsoft Deployment Toolkit, Configuration Manager o [Microsoft Intune](https://github.com/aaronparker/packagefactory) para mantenerlas al día con las versiones más recientes
* Validar o auditar las versiones de las aplicaciones instaladas en una imagen o equipo Windows
* Crear una [biblioteca de instaladores de aplicaciones](https://stealthpuppy.com/apptracker): al ejecutar periódicamente las funciones de Evergreen, puede recuperar y descargar la versión actual de una aplicación y almacenarla para usarla más adelante
* Enviar manifiestos a `Winget`, `Chocolatey` o herramientas similares: Evergreen puede devolver un objeto con un número de versión y una URL de descarga que se pueden usar para crear manifiestos de las versiones más recientes

Ya existen varias soluciones comunitarias y comerciales que administran las implementaciones y actualizaciones de aplicaciones. Este módulo no pretende competir con ellas, ni Evergreen pretende ser un administrador de paquetes de Windows con todas las funciones. El módulo puede complementar las soluciones de terceros.

## Funciones

Las funciones principales de Evergreen son:

* `Find-EvergreenApp`: enumera las aplicaciones compatibles con el módulo
* `Get-EvergreenApp`: recupera la versión y los detalles de descarga de una aplicación directamente de las fuentes del proveedor en su entorno
* `Get-EvergreenAppFromApi`: recupera los detalles de una aplicación desde la API de Evergreen
* `Get-EvergreenEndpointFromApi`: enumera los puntos de conexión usados para recuperar información de versiones y descargar instaladores
* `Save-EvergreenApp`: descarga los instaladores devueltos por Evergreen
* `Test-EvergreenApp`: comprueba si se puede acceder a los URI de los instaladores
* `Export-EvergreenApp`: exporta la información de versiones de una aplicación a un archivo JSON
* `Export-EvergreenManifest`: devuelve el manifiesto Evergreen de una aplicación como una tabla hash
* `New-EvergreenLibrary`: crea una configuración de biblioteca para almacenar instaladores de aplicaciones
* `Start-EvergreenLibraryUpdate`: descarga los instaladores configurados y actualiza el inventario de la biblioteca
* `Get-EvergreenLibrary`: lee una biblioteca local o remota y su inventario de aplicaciones
* `Get-EvergreenAppFromLibrary`: recupera las versiones de las aplicaciones almacenadas en una biblioteca
* `Remove-EvergreenLibraryAppVersion`: elimina de una biblioteca las versiones antiguas de los instaladores
* `Update-Evergreen`: descarga o actualiza las funciones y los manifiestos de aplicaciones locales
* `Get-EvergreenAppsPath`: devuelve la ruta de la caché local de aplicaciones
* `Get-EvergreenAppsVersion`: devuelve la versión de la última publicación del repositorio de aplicaciones de Evergreen
* `ConvertTo-DotNetVersionClass`: convierte una cadena de versión en un `System.Version` de .NET
