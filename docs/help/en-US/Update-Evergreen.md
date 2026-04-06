---
external help file: Evergreen-help.xml
Module Name: Evergreen
online version: https://eucpilots.com/evergreen/help/en-US/Update-Evergreen/
schema: 2.0.0
---

# Update-Evergreen

## SYNOPSIS

Downloads and synchronizes the Evergreen Apps functions and Manifests from the eucpilots/evergreen-apps GitHub repository.

## SYNTAX

```
Update-Evergreen [-Force] [<CommonParameters>]
```

## DESCRIPTION

Enables separation of the core Evergreen module from app-specific code and manifests. Downloads the latest versions of /Apps and /Manifests from the [eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps) GitHub repository to a user-writable location (no admin required). By default, the local cache is downloaded to %LocalAppData%\Evergreen on Windows, and ~/.evergreen on macOS and Linux.

`Update-Evergreen` queries the GitHub REST API to check for and download updates. In environments where it is run frequently, GitHub's unauthenticated API rate limit of 60 requests per hour may be reached. Set the `GITHUB_TOKEN` or `GH_TOKEN` environment variable to a personal access token to authenticate requests and raise the limit to 5,000 requests per hour.

## EXAMPLES

### EXAMPLE 1

```powershell
Update-Evergreen
```

Description:
Downloads and synchronizes the Evergreen Apps functions and Manifests from the eucpilots/evergreen-apps GitHub repository. If updates are required, an update of the local cache is performed. If no update is required, no update is performed.

### EXAMPLE 2

```powershell
Update-Evergreen -Force
```

Description:
Forces a full download and synchronization of the Evergreen Apps functions and Manifests from the eucpilots/evergreen-apps GitHub repository, regardless of the state of the local cache.

## PARAMETERS

### -Force

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters

This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### System.Management.Automation.PSObject

Update-Evergreen accepts the output from Get-EvergreenApp.

## OUTPUTS

## NOTES

Site: https://eucpilots.com/evergreen

Author: Aaron Parker

`Update-Evergreen` uses the GitHub REST API to check for and download updates from the eucpilots/evergreen-apps repository. Set the `GITHUB_TOKEN` or `GH_TOKEN` environment variable to a personal access token to authenticate these requests. See [Working with GitHub rate limits](https://eucpilots.com/evergreen/github/) for details.

## RELATED LINKS

[Working with GitHub rate limits](https://eucpilots.com/evergreen/github/)
