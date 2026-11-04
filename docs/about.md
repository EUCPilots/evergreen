---
layout: doc
---
# About

Evergreen is a PowerShell module that returns the latest version and download links for a set of common Windows applications.

::: tip Trust
The goal of this project is to provide trust. Evergreen executes in your environment and queries application vendor sources only. To find application versions, Evergreen queries the same update APIs used by the application to find new updates or a source owned by the vendor. This means that you can trust what Evergreen returns because there is no middle man.
:::

## Why

Evergreen helps solve several challenges including:

* Finding the latest version of an application to compare against a version already installed or downloaded
* Finding the URL for the latest application installer to download it for local installation (via scripted install or in a gold image) or deployment to target machines (e.g. Intune or ConfigMgr)

Evergreen helps to automate software deployments. These could be:

* Gold image creation with Hashicorp Packer - images can be created with the latest version of a set of applications
* Import applications into the Microsoft Deployment Toolkit, Configuration Manager or [Microsoft Intune](https://github.com/aaronparker/packagefactory) - stay current with the latest versions of applications
* Validating or auditing a Windows image or machine for installed application versions
* Create a [library of application installers](https://stealthpuppy.com/apptracker) - by regularly running Evergreen functions, you can retrieve and download the current version of an application and store it for later use
* Submitting manifests to `Winget` or `Chocolatey` or similar - Evergreen can return an object with a version number and download URL that can be used to construct manifests for the most recent versions

There are several community and commercial solutions that manage application deployment and updates already. This module isn't intended to compete against those, and Evergreen isn't intended to be a fully featured package manager for Windows. Evergreen can be complementary to 3rd party solutions

## Functions

Primary functions in Evergreen are:

* `Find-EvergreenApp` - lists applications supported by the module
* `Get-EvergreenApp` - retrieves application version and download details directly from vendor sources in your environment
* `Get-EvergreenAppFromApi` - retrieves application details from the Evergreen API
* `Get-EvergreenEndpointFromApi` - lists the endpoints used to retrieve version information and download installers
* `Save-EvergreenApp` - downloads installers returned by Evergreen
* `Test-EvergreenApp` - checks whether installer URIs are accessible
* `Export-EvergreenApp` - exports application version information to a JSON file
* `Export-EvergreenManifest` - returns an application's Evergreen manifest as a hashtable
* `New-EvergreenLibrary` - creates a library configuration for storing application installers
* `Start-EvergreenLibraryUpdate` - downloads configured installers and updates the library inventory
* `Get-EvergreenLibrary` - reads a local or remote library and its application inventory
* `Get-EvergreenAppFromLibrary` - retrieves application versions stored in a library
* `Remove-EvergreenLibraryAppVersion` - prunes older installer versions from a library
* `Update-Evergreen` - downloads or updates the local application functions and manifests
* `Get-EvergreenAppsPath` - returns the local application cache path
* `Get-EvergreenAppsVersion` - returns the latest release version of the Evergreen apps repository
* `ConvertTo-DotNetVersionClass` - converts a version string to a .NET `System.Version`
