---
layout: doc
---
# Download installers

Evergreen includes the function `Save-EvergreenApp` that simplifies downloading application installers that are returned from `Get-EvergreenApp`.

All applications return at least a `Version` and `URI` property, and many return additional properties such as `Architecture`, `Language`, `Type`, `Ring`, `Channel`, and `Release`. The installer file name is typically determined dynamically from the `URI` property.

To retrieve and download an application installer without `Save-EvergreenApp`, filter the output for the required download, determine the file name, and use `Invoke-WebRequest`:

```powershell
$Teams = Get-EvergreenApp -Name MicrosoftTeams | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
$TeamsInstaller = Split-Path -Path $Teams.Uri -Leaf
Invoke-WebRequest -Uri $Teams.Uri -OutFile ".\$TeamsInstaller" -UseBasicParsing
```

This is a simple example, but applications with additional properties and output values may require more complex filtering. For example, Microsoft Edge includes several properties in its returned object:

```powershell
Version      : 89.0.774.68
Platform     : Windows
Channel      : Stable
Release      : Enterprise
Architecture : x64
Date         : 1/4/2021 7:29:00 pm
Hash         : 6E1856B2972688D109F550B0A62C264E9829FF1F392E3BE0FC308900AEFD3455
URI          : https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/a67b9c83-1671-45ab-982f-e02318eeffc9/MicrosoftEdgeEnterpriseX64.msi
```

`Save-EvergreenApp` accepts the output from each application and simplifies downloading the installers included in an application object by determining the target file name, and constructing a target directory path based on the properties in the application output.

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive | Save-EvergreenApp -Path "C:\Apps\OneDrive"
```

With `-Path`, `Save-EvergreenApp` creates a folder structure below the specified path using whichever of these properties are present on each application object, in this order: `Product`, `Track`, `Channel`, `Release`, `Ring`, `Version`, `Language`, and `Architecture`.

`Save-EvergreenApp` returns the path to each downloaded file, which can be passed to other functions in a script.

In the example using `MicrosoftOneDrive` above, `Save-EvergreenApp` returns output similar to this:

```powershell
Path
----
C:\Apps\OneDrive\Enterprise\20.169.0823.0008\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.030.0211.0002\OneDriveSetup.exe
C:\Apps\OneDrive\Production\21.052.0314.0001\OneDriveSetup.exe
C:\Apps\OneDrive\Insider\21.056.0318.0001\OneDriveSetup.exe
```

To download application installers into a single directory, the `-CustomPath` parameter can be used. Note that an application object can return multiple versions or channels of an application with the same installer name - when using `-CustomPath`, the first installer will be saved and subsequent installers with the same file name will be skipped.

::: tip
Save-EvergreenApp will only download the first installer passed to the function where the object includes multiple installers with the same file name.
:::

Therefore, when using `-CustomPath`, it is best to filter the output from `Get-EvergreenApp` before passing it to `Save-EvergreenApp`. For example:

```powershell
Get-EvergreenApp -Name MicrosoftOneDrive |
    Where-Object { $_.Ring -eq "Enterprise" -and $_.Architecture -eq "AMD64" -and $_.Type -eq "exe" } |
    Save-EvergreenApp -CustomPath "C:\Apps\OneDrive"
```

## Parameters

### InputObject

An application object with a `URI` property. When using `-Path`, the object must also include a `Version` property.

### Path

The parent directory under which a directory structure will be created and application installers saved. Use either `-Path` or `-CustomPath`, not both.

### CustomPath

The directory into which installers will be saved directly, without subdirectories. Use either `-CustomPath` or `-Path`, not both.

### NoProgress

`Save-EvergreenApp` uses `Invoke-WebRequest` to download target application installers. Download progress is suppressed by default for faster downloads; however, when `-Verbose` is used, download progress will be displayed. Use `-NoProgress` with `-Verbose` to suppress download progress while also displaying verbose output.

### -Force

Forces this function to download the target application installers from the URI property even if they already exist in the target directory.

### -VerifyChecksum

Validates any `SHA1`, `SHA256`, and `SHA512` checksum properties on the input object against the downloaded or existing file. Files with mismatched checksums are not returned.

### Retry options

Downloads are retried for transient network failures and retryable HTTP responses. The defaults are three retries after the initial attempt (`-RetryCount 3`), a two-second initial delay (`-RetryDelaySeconds 2`), and a maximum delay of 300 seconds (`-MaximumRetryDelaySeconds 300`). Retry delays increase exponentially, and a server's `Retry-After` header is honored up to the maximum delay.

### Timeout options

`-ConnectionTimeoutSeconds` sets the connection timeout and defaults to 30 seconds. `-OperationTimeoutSeconds` sets the timeout between data reads and defaults to 300 seconds; it is supported by `Invoke-WebRequest` in PowerShell 7.4 and later.

## Alias

`Save-EvergreenApp` has an alias of `sea` to simplify downloading applications, for example:

```powershell
PS /Users/aaron> gea Slack | sea -Path /Users/aaron/Temp/Slack
```
