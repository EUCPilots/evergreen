---
layout: doc
---
# Cómo funciona Evergreen

::: tip Nota
La información sobre las versiones y descargas de las aplicaciones solo se obtiene de fuentes oficiales de los proveedores (sitios web, API de actualización de aplicaciones mantenidas por el proveedor, repositorios oficiales del proveedor en GitHub o SourceForge, etc.), nunca de terceros.
:::

Evergreen usa un método que devuelve, como mínimo, el número de versión y el URI de descarga de las aplicaciones mediante programación; por tanto, cada vez que se ejecuta una función de Evergreen, debería devolver la versión más reciente y el vínculo de descarga.

Evergreen usa varias estrategias para devolver la versión más reciente del software:

1. API de actualización de aplicaciones: al usar el mismo método que la propia aplicación, Evergreen puede devolver de forma coherente el número de versión más reciente y el URI de descarga; por ejemplo, [Microsoft Edge](https://github.com/eucpilots/evergreen-module/Evergreen/Public/Get-MicrosoftEdge.ps1), [Mozilla Firefox](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MozillaFirefox.ps1) o [Microsoft OneDrive](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftOneDrive.ps1). A menudo se puede usar [Fiddler](https://www.telerik.com/fiddler) para averiguar dónde busca actualizaciones una aplicación.
2. API de repositorios: los servicios de alojamiento de repositorios, como GitHub y SourceForge, ofrecen API que se pueden consultar para obtener las versiones y los vínculos de descarga de las aplicaciones; por ejemplo, [Audacity](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Audacity.ps1), [Notepad++](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-NotepadPlusPlus.ps1) o [WinMerge](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-WinMerge.ps1).
3. Consultas de páginas web: a menudo, las páginas de descarga de los proveedores incluyen consultas que devuelven JSON al mostrar versiones y vínculos de descarga, lo que evita extraer datos de las páginas. Evergreen puede imitar este método para devolver las URL de descarga de las aplicaciones; sin embargo, es probable que deje de funcionar si el proveedor cambia sus páginas; por ejemplo, [Adobe Acrobat Reader DC](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-AdobeAcrobatReaderDC.ps1).
4. URL estáticas: algunos proveedores ofrecen URL estáticas o permanentes para los instaladores de sus aplicaciones. Estas URL suelen incluir información adicional que permite determinar la versión de la aplicación y pueden resolverse a la URL de destino real; por ejemplo, [Microsoft FSLogix Apps](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftFSLogixApps.ps1) o [Zoom](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Zoom.ps1).

## Lo que Evergreen no hace

::: info **Evergreen no extrae datos de HTML**
Extraer datos de páginas web para analizar el texto y determinar cadenas de versión y URL de descarga puede dar problemas si cambia el texto de la página o si esta no está actualizada. Aunque algunas aplicaciones usan expresiones regulares para determinar propiedades (especialmente los números de versión), siempre que sea posible se prefiere evitar este método.
:::

Las solicitudes de incorporación de cambios al proyecto Evergreen que extraigan datos de páginas web se cerrarán. Para otras aplicaciones en las que esa sea la única opción, consulte el proyecto [Nevergreen](https://github.com/DanGough/Nevergreen).

::: info **Evergreen no consulta fuentes ajenas al proveedor**
La intención es usar los mismos mecanismos de actualización que utiliza una aplicación para encontrar actualizaciones. Si esto no es posible, Evergreen puede usar fuentes de datos (por ejemplo, JSON o XML) de la página de descarga del proveedor, como `AdobeAcrobatReaderDC`, u otra fuente mantenida por el proveedor, como un repositorio oficial de GitHub.
:::
