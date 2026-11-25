---
layout: doc
---
# Referencia de comandos de Windows Workbench

::: warning Versión preliminar
Windows Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

Al importar el módulo EvergreenUI, se carga una API de PowerShell sin interfaz gráfica y sin cargar WPF. La ventana de Workbench utiliza los mismos comandos públicos, por lo que todas sus funciones se pueden ejecutar mediante scripts. Use `Get-Help <command> -Full` para consultar los parámetros y ejemplos.

```powershell
Import-Module EvergreenUI
$artifacts = Get-EwApp -Name MicrosoftEdge
Get-EwFilterableProperty -Artifact $artifacts
$artifacts |
    Where-Object Architecture -eq 'x64' |
    Select-Object -First 1 |
    Save-EwArtifact -AppName MicrosoftEdge
Get-EwLibrary
Update-EwLibrary -WhatIf
```

Los comandos que modifican datos admiten `-WhatIf` y `-Confirm` cuando así se indica en su ayuda.

## Aplicaciones y descargas

| Comando | Descripción |
|---|---|
| `Get-EwApp` | Enumerar aplicaciones de Evergreen o resolver los artefactos de una aplicación |
| `Get-EwFilterableProperty` | Describir las propiedades de artefacto adecuadas para filtrar |
| `Save-EwArtifact` | Descargar un artefacto resuelto |
| `Add-EwFavouriteApp` / `Remove-EwFavouriteApp` | Administrar aplicaciones favoritas |

## Library

| Comando | Descripción |
|---|---|
| `Get-EwLibrary` | Leer aplicaciones y versiones de una biblioteca (de forma predeterminada usa la ruta guardada) |
| `Update-EwLibrary` | Actualizar una biblioteca inicializada |
| `Remove-EwLibraryApp` | Quitar una aplicación o las filas de artefacto seleccionadas |

`Remove-EwLibraryApp` admite `-WhatIf` y `-Confirm`. Para quitar filas con comprobación de instantánea, indique los números de fila del manifiesto basados en cero con `-Index` y pase `ManifestHash` y `LibraryHash` de `Get-EwLibrary` como `-ExpectedManifestHash` y `-ExpectedLibraryHash`. Si omite `-Index`, se quita toda la aplicación.

## Definiciones e instalación local

| Comando | Descripción |
|---|---|
| `Get-EwDefinition` | Leer y validar definiciones `App.json` |
| `Resolve-EwArtifact` | Resolver el artefacto más reciente de una definición |
| `Update-EwDefinition` | Actualizar la versión de la definición y los metadatos de los archivos de instalación |
| `Test-EwDetection` | Evaluar reglas de detección File, Registry y MSI |
| `Install-EwPackage` | Descargar e instalar una definición localmente (`ShouldProcess`) |

## Empaquetado y publicación

| Comando | Descripción |
|---|---|
| `New-EwPackage` | Crear un paquete Win32 de Intune o de Microsoft 365 Apps |
| `Get-EwM365Configuration` | Enumerar archivos de configuración de Microsoft 365 Apps |
| `Get-EwM365BuildPlan` | Obtener una vista previa de las entradas de creación y de la identidad del proveedor |
| `Connect-EwIntune` / `Disconnect-EwIntune` | Administrar la sesión de Microsoft Graph |
| `Get-EwIntuneApp` / `Compare-EwIntuneApp` | Enumerar y comparar aplicaciones Win32 de Intune |
| `Publish-EwIntuneApp` / `Publish-EwIntuneBatch` | Publicar aplicaciones Win32 |
| `Set-EwIntuneSupersedence` | Establecer una relación de supersedencia |
| `Get-EwM365IntunePublishPlan` / `Publish-EwM365IntuneApp` | Obtener una vista previa y publicar una aplicación de Microsoft 365 en Intune |
| `Get-EwM365IntuneRecovery` / `Clear-EwM365IntuneRecovery` | Enumerar y confirmar resultados sin resolver |

## Azure y Nerdio

| Comando | Descripción |
|---|---|
| `Connect-EwAzure` / `Disconnect-EwAzure` | Iniciar sesión en Azure para buscar destinos de almacenamiento |
| `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer` | Enumerar destinos de almacenamiento |
| `Connect-EwNerdio` / `Disconnect-EwNerdio` | Administrar la sesión de Nerdio; `-ApiOnly` omite el almacenamiento de Azure |
| `Get-EwNerdioDefinition` | Leer definiciones de Shell Apps |
| `Get-EwNerdioShellApp` / `Get-EwNerdioShellAppVersion` | Enumerar Shell Apps y versiones |
| `Compare-EwNerdioShellApp` | Comparar definiciones con Nerdio Manager |
| `Get-EwNerdioPublishPlan` / `Publish-EwNerdioBatch` | Planificar y publicar secuencialmente las selecciones confirmadas |
| `Publish-EwNerdioApp` | Publicar una Shell App o agregar una versión (`-ShellAppId`) |
| `Get-EwNerdioShellAppVersionPrunePlan` / `Remove-EwNerdioShellAppVersion` | Obtener una vista previa y quitar versiones antiguas |
| `Get-EwM365NerdioPublishPlan` / `Publish-EwM365NerdioApp` | Obtener una vista previa y publicar un paquete de Microsoft 365 en Nerdio |

Las sesiones de Nerdio se comparten en memoria entre los procesos de trabajo del módulo. Si caducan, se desconectan o cambia la configuración del proveedor, es necesario volver a conectarse. Los tokens y secretos nunca se guardan.

## Configuración, caché y dependencias

| Comando | Descripción |
|---|---|
| `Get-EwSetting` / `Set-EwSetting` / `Reset-EwSetting` | Leer y cambiar la configuración de Workbench |
| `Clear-EwCache` | Borrar las cachés del catálogo, las versiones y los artefactos de definición (`-WhatIf`, `-Confirm`, `-CachePath`) |
| `Get-EwDependency` | Informar del estado de las dependencias de módulos |
| `Update-EwEvergreen` | Actualizar los datos de aplicaciones de Evergreen |

Un `-CachePath` explícito en `Clear-EwCache` apunta a esa caché de definiciones y también invalida las cachés del catálogo; no se buscan otros directorios personalizados. La invalidación se aplica a los procesos y runspaces de Workbench que comparten la caché.

## Trabajos en segundo plano

| Comando | Descripción |
|---|---|
| `Start-EwJob` | Ejecutar un bloque de script en el grupo compartido (hasta cuatro procesos de trabajo) |
| `Get-EwJob` | Informar del estado, progreso, información, errores y salida |
| `Stop-EwJob` | Solicitar la cancelación |
| `Remove-EwJob` | Liberar un trabajo completado |

Los bloques de script de los trabajos se recrean en el proceso de trabajo y no capturan variables del proceso que los llama; pase las entradas con `-ArgumentList`. Use `-NoModuleImport` para trabajos que no necesiten comandos de Workbench, aunque un proceso reutilizado puede conservar módulos cargados por trabajos anteriores.

```powershell
$job = Start-EwJob -Name 'Edge lookup' -ScriptBlock { Get-EwApp -Name MicrosoftEdge }
do {
    Start-Sleep -Seconds 1
    $snapshot = Get-EwJob -Id $job.Id
} while ($snapshot.State -in 'NotStarted', 'Running', 'Stopping')
$snapshot.Output
Remove-EwJob -Id $job.Id -Confirm:$false
```

## Settings

La configuración se guarda en `%APPDATA%\EvergreenWorkbench\settings.json`. Los valores que acepta `Set-EwSetting -Name` son: `Theme`, `OutputPath`, `LibraryPath`, `PackageOutputPath`, `IntuneDefinitionsPath`, `IntuneTenantId`, `NerdioDefinitionsPath`, `NerdioTenantId`, `NmeHost`, `NmeClientId`, `NmeApiScope`, `NmeOAuthTokenUrl`, `NmeSubscriptionId`, `NmeResourceGroup`, `NmeStorageAccount`, `NmeContainer`, `M365DefinitionsPath`, `M365Channel`, `M365CompanyName`, `M365ImportFor`, `StartupView`, `LastAppName`, `WindowWidth`, `WindowHeight`, `DownloadTrayHeight`, `AppsListWidth`, `ArtifactHiddenColumns` y `WindowMaximized`.
