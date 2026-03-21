---
layout: doc
---
# Working with GitHub rate limits

Over 150 applications supported by Evergreen are hosted on GitHub repositories or pull data from a GitHub repository to determine the latest version. Evergreen uses the GitHub REST API when querying details for these applications.

Both `Get-EvergreenApp` and `Update-Evergreen` make requests to the GitHub REST API:

- `Get-EvergreenApp` queries GitHub releases and tags to return version and download details for applications hosted on GitHub
- `Update-Evergreen` downloads the latest application functions and manifests from the [eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps) repository

GitHub implements rate limits on the API for unauthenticated requests, allowing only 60 requests per hour per IP address. In environments where Evergreen is run frequently or across multiple sessions, this limit can be reached quickly. See [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) for details.

Authenticating requests with a personal access token raises the limit to 5,000 requests per hour.

## Creating a personal access token

Evergreen supports authenticated requests using [personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). [Fine-grained personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) are recommended.

A token with read-only access to public repositories is sufficient. No additional scopes or permissions are required. Because the token only needs read access to public repositories, a long expiry period is reasonable; however, secure management of the token is still recommended.

![Fine-grained personal access token](/img/github-pat.png)

## Setting the GITHUB_TOKEN environment variable

Evergreen reads the `GITHUB_TOKEN` or `GH_TOKEN` environment variables. Setting either variable with the value of the personal access token enables Evergreen to authenticate requests to the GitHub API automatically. Both `Get-EvergreenApp` and `Update-Evergreen` will use the token without any additional configuration.

### Windows

To set the variable for the current user persistently (survives across sessions and reboots):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "User")
```

To set it for all users on the machine (requires administrator):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "Machine")
```

The variable can also be set via **System Properties > Advanced > Environment Variables** in the Windows UI.

To set it only for the current PowerShell session:

```powershell
$env:GITHUB_TOKEN = "<your-token>"
```

### macOS and Linux

Add the following line to your shell profile (`~/.zshrc` for Zsh, `~/.bashrc` or `~/.bash_profile` for Bash) to set the variable persistently:

```bash
export GITHUB_TOKEN="<your-token>"
```

Reload the profile after saving:

```bash
source ~/.zshrc  # or source ~/.bashrc
```

To set it only for the current shell session:

```bash
export GITHUB_TOKEN="<your-token>"
```

## GitHub Actions

When running Evergreen in a GitHub Actions workflow, the `GITHUB_TOKEN` secret is automatically available and does not require a separate personal access token. See [Use GITHUB_TOKEN for authentication in workflows](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).

Add the following to the top of your workflow file to make the token available as an environment variable:

```yaml
# Environment variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Evergreen will pick up the variable automatically when the workflow runs.

## Checking the rate limit status

When running `Get-EvergreenApp` for an application that uses GitHub as its source, passing `-Verbose` will output the current number of remaining API requests:

```powershell
Get-EvergreenApp -Name "MicrosoftBicep" -Verbose
```

The verbose output will include a line similar to:

```
VERBOSE: Get-GitHubRateLimit: Remaining requests to the GitHub API: 58 of 60
```

When the rate limit is exhausted, Evergreen returns a `RateLimited` version object and outputs a warning. Setting `GITHUB_TOKEN` or `GH_TOKEN` before running Evergreen will resolve this.
