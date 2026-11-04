---
layout: doc
---
# Instalar Evergreen

## Compatibilidad con PowerShell

Evergreen es compatible con Windows PowerShell 5.1 y PowerShell 7.0 o posterior. Debería funcionar con PowerShell Core 6.x, pero no se prueba activamente en esa versión, por lo que no se puede garantizar la compatibilidad.

## Instalar desde PowerShell Gallery

El módulo Evergreen se publica en PowerShell Gallery y está disponible aquí: [Evergreen](https://www.powershellgallery.com/packages/Evergreen/).

::: info
La forma recomendada de instalar el módulo es desde PowerShell Gallery.
:::

El módulo se puede instalar desde la galería con:

```powershell
Install-Module -Name Evergreen
Import-Module -Name Evergreen
```

### Actualizar el módulo

Si instaló una versión anterior del módulo desde la galería, puede instalar la actualización más reciente con `Update-Module` y el parámetro `-Force`:

```powershell
Update-Module -Name Evergreen -Force
```

### Instalación avanzada

En instalaciones con scripts (por ejemplo, durante la implementación de un sistema operativo), puede que quiera marcar PowerShell Gallery como de confianza antes de intentar instalar el módulo:

```powershell
if (Get-PSRepository | Where-Object { $_.Name -eq "PSGallery" -and $_.InstallationPolicy -ne "Trusted" }) {
    Install-PackageProvider -Name "NuGet" -MinimumVersion 2.8.5.208 -Force
    Set-PSRepository -Name "PSGallery" -InstallationPolicy "Trusted"
}
```

A continuación, podemos instalar o actualizar Evergreen según si el módulo ya está instalado y si está actualizado:

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

## Instalación manual desde el repositorio

El módulo se puede descargar desde el [repositorio de código fuente de GitHub](https://github.com/eucpilots/evergreen-module), que incluye el módulo en la carpeta `Evergreen`. Esta carpeta debe copiarse a una de las rutas de módulos de PowerShell. Para ver todas las rutas de módulos de PowerShell disponibles, ejecute `$env:PSModulePath.split(';')` en una consola de PowerShell.

Entre las rutas habituales de los módulos de PowerShell se incluyen:

* Usuario actual: `%USERPROFILE%\Documents\WindowsPowerShell\Modules\`
* Todos los usuarios: `%ProgramFiles%\WindowsPowerShell\Modules\`
* OneDrive: `$env:OneDrive\Documents\WindowsPowerShell\Modules\`

Para instalar desde el repositorio:

1. Descargue la `main branch` en la estación de trabajo.
2. Copie el contenido de la carpeta Evergreen en la ruta deseada de módulos de PowerShell de la estación de trabajo.
3. Abra una consola de PowerShell con la opción Ejecutar como administrador.
4. Ejecute `Set-ExecutionPolicy` con el parámetro `RemoteSigned` o `Bypass`.
5. Desbloquee los archivos con `Get-ChildItem -Path <path to module> -Recurse | Unblock-File`.

Una vez finalizada la instalación, puede comprobar que el módulo existe ejecutando `Get-Module -ListAvailable Evergreen`. Para usarlo, cárguelo con:

```powershell
Import-Module Evergreen
```
