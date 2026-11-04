---
layout: doc
---
# Test Installers

`Test-EvergreenApp` checks whether installer URLs returned by `Get-EvergreenApp` are accessible. It first sends a `HEAD` request and retries a failed request with a ranged `GET`. The output includes the URI, a Boolean result, and the HTTP status code when available.

In this example, the URLs returned by Microsoft OneDrive are checked:

```powershell
Get-EvergreenApp -Name "MicrosoftOneDrive" |
    Where-Object { $_.Type -eq "exe" } |
    Test-EvergreenApp
```

Output:

```text
Result StatusCode URI
------ ---------- ---
  True        200 https://example.com/installer.exe
```

## Parameters

### InputObject

An application object with a non-empty `URI` property. Objects without a valid URI produce a warning and a `False` result.

### Request options

`-ConnectionTimeoutSeconds` sets the request timeout (30 seconds by default). `-UserAgent` overrides the default user agent. Use `-Proxy` to specify a proxy server; `-ProxyCredential` can provide credentials and requires `-Proxy`.

### NoProgress

Progress is suppressed by default. When `-Verbose` is used, request progress is displayed unless `-NoProgress` is also specified. Use `-Verbose` to see which URI is being tested.

## Alias

`Test-EvergreenApp` has an alias of `tea` to simplify testing applications, for example:

```powershell
PS /Users/aaron> gea MicrosoftTeams | tea
```
