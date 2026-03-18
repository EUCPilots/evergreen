---
external help file: Evergreen-help.xml
Module Name: Evergreen
online version: https://eucpilots.com/evergreen-docs/help/en-US/Get-EvergreenAppsPath/
schema: 2.0.0
---

# Get-EvergreenAppsPath

## SYNOPSIS

Returns the file system path to the local Evergreen application definitions cache.

## SYNTAX

```
Get-EvergreenAppsPath [<CommonParameters>]
```

## DESCRIPTION

Returns the directory path where Evergreen stores cached application definition scripts and manifests. Evergreen uses this path to locate the application functions used by `Get-EvergreenApp` and other cmdlets.

The path is determined by the following logic:

1. If the `EVERGREEN_APPS_PATH` environment variable is set and points to a valid directory, that path is returned.
2. If `EVERGREEN_APPS_PATH` is set but does not point to a valid directory, a warning is displayed and the raw environment variable value is returned.
3. If `EVERGREEN_APPS_PATH` is not set, the default platform-specific path is returned:
   - **Windows:** `%LocalAppData%\Evergreen`
   - **macOS / Linux:** `~/.evergreen`

## EXAMPLES

### EXAMPLE 1

```powershell
Get-EvergreenAppsPath

C:\Users\Aaron\AppData\Local\Evergreen
```

Description:
Returns the default application definitions cache path on Windows when the `EVERGREEN_APPS_PATH` environment variable is not set.

### EXAMPLE 2

```powershell
$env:EVERGREEN_APPS_PATH = "C:\EvergreenDev\evergreen-apps"
Get-EvergreenAppsPath

C:\EvergreenDev\evergreen-apps
```

Description:
Returns the custom path specified by the `EVERGREEN_APPS_PATH` environment variable. This is useful for local development and testing of application definitions from a cloned copy of the [evergreen-apps](https://github.com/EUCPilots/evergreen-apps) repository.

### EXAMPLE 3

```powershell
Get-EvergreenAppsPath

/Users/aaron/.evergreen
```

Description:
Returns the default application definitions cache path on macOS when the `EVERGREEN_APPS_PATH` environment variable is not set.

## PARAMETERS

### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### System.String

Returns the resolved file system path to the Evergreen application definitions directory.

## NOTES

Site: https://eucpilots.com/evergreen-docs

Author: Aaron Parker

## RELATED LINKS

[Update-Evergreen](/help/en-US/Update-Evergreen)
