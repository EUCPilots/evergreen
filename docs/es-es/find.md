---
layout: doc
---
# Buscar aplicaciones compatibles

## Uso de Find-EvergreenApp

`Find-EvergreenApp` se usa para obtener una lista de las aplicaciones compatibles con Evergreen. Por ejemplo, vamos a comprobar si Evergreen admite el agente Microsoft FSLogix Apps:

```powershell
Find-EvergreenApp -Name "FSLogix"
```

Evergreen admite el agente Microsoft FSLogix Apps, por lo que se devuelve una salida como esta:

```powershell
Name        : MicrosoftFSLogixApps
Application : Microsoft FSLogix Apps
Link        : https://docs.microsoft.com/fslogix/
```

El valor de la propiedad `Name` se puede usar con `Get-EvergreenApp` para obtener la versión más reciente del agente Microsoft FSLogix Apps:

```powershell
Get-EvergreenApp -Name "MicrosoftFSLogixApps"
```

También se puede pasar directamente la salida de `Find-EvergreenApp` a `Get-EvergreenApp`:

```powershell
Find-EvergreenApp -Name "FSLogix" | Get-EvergreenApp
```

La salida de `Find-EvergreenApp` se puede paginar para revisar toda la lista de aplicaciones compatibles con el siguiente comando:

```powershell
Find-EvergreenApp | Out-Host -Paging
```

## Salida

`Find-EvergreenApp` genera tres propiedades:

* `Name`: identificador de la aplicación compatible. Este nombre coincide con el que se usa en el manifiesto de la aplicación
* `Application`: el manifiesto de la aplicación incluye su nombre completo
* `Link`: cada manifiesto de aplicación incluye una URL a la página principal de la aplicación

La salida de `Find-EvergreenApp` será similar a la del siguiente ejemplo:

```powershell
Name                 Application             Link
----                 -----------             ----
1Password            1Password               https://1password.com/
7zip                 7zip                    https://www.7-zip.org/
AdobeAcrobat         Adobe Acrobat           https://helpx.adobe.com/au/enterprise/using/deploying-acrobat.html
AdobeAcrobatReaderDC Adobe Acrobat Reader DC https://acrobat.adobe.com/us/en/acrobat/pdf-reader.html
AdobeBrackets        Adobe Brackets          http://brackets.io/
```

## Parámetros

### Name

El parámetro `-Name` especifica el nombre de la aplicación cuyos detalles se quieren obtener. Es un parámetro obligatorio. Para ver la lista de aplicaciones compatibles, use `Find-EvergreenApp`.

## Alias

`Find-EvergreenApp` tiene el alias `fea`, que simplifica la búsqueda de aplicaciones compatibles. Por ejemplo:

```powershell
PS /Users/aaron> fea

Name      Application   Link
----      -----------   ----
1Password 1Password     https://1password.com/
7zip      7zip          https://www.7-zip.org/
```
