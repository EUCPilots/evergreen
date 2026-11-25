---
layout: doc
---
# Publishing to Nerdio Manager

::: warning Validation recommended
Validate API permissions, definition mappings and post-publish behaviour in your environment before production use.
:::

The **Nerdio** view connects to Azure and the Nerdio Manager API, compares Shell App definitions with Nerdio Manager, publishes new Shell Apps or versions, and prunes old versions. It has three tabs: **Settings**, **Shell Apps** and **Microsoft 365 Apps** (see [Microsoft 365 Apps packages](/workbench-m365)).

## Settings tab - connections

Connect in two stages.

**Azure storage setup**

1. Enter the **Azure tenant ID** and **Azure subscription ID**, then choose **Connect Azure**.
2. Select the **Resource group**, **Storage account** and **Blob container** that will hold the packages.

**Nerdio API setup**

Enter the **Nerdio HTTPS host**, **Application client ID**, **API scope**, an optional **OAuth token URL** and the **Client secret (not saved)**, then choose **Connect Nerdio API**.

Use **Save setup** to persist the non-secret values. The client secret is cleared from the form on connect and is never saved. Choose **Disconnect Azure and Nerdio** to end both sessions; this does not change an unrelated Azure context.

**API only (Microsoft 365 build only)** authenticates to Nerdio without Azure storage. A full connection with Azure storage is required for any Nerdio publishing.

Required modules are `Az.Accounts`, `Az.Resources` and `Az.Storage`; they load only when needed.

## Shell Apps tab

Enter or browse to the **Shell App definitions folder** (containing `Definition.json` files and scripts), choose **Save setup**, then **Load and compare**. The comparison table shows each **Local app**, its matched **Nerdio app**, versions and status.

Only valid Evergreen-backed definitions can be published:

- Unmatched definitions create a new Shell App (**New Shell App name**).
- Unambiguous matches with a newer version add a version to the existing app.
- Current apps, duplicate matches and unsupported sources are blocked.

The resolved installer is uploaded directly to blob storage. Local definitions are not changed.

### Publishing

**Publish selected** shows one confirmation with versions, operations and the Azure and Nerdio destination. Files, sources and matches are rechecked before any write. **Cancel batch** takes effect between items; the current provider operation finishes first. Results keep known blob, app and job IDs.

### Recovery

Pending or unknown outcomes stop the batch and block further Nerdio publishing until inspected. The Workbench records unresolved operations and pruning offers in `%APPDATA%\EvergreenWorkbench\nerdio-recovery.json`. Tokens and secrets are never stored. Recovery requires reconnecting to the same tenant, subscription, Nerdio host and storage destination.

Select an unresolved result and choose **Review outcome**:

- **Yes** - only after confirming in Nerdio that it succeeded
- **No** - only after confirming that it failed
- **Cancel** - leave it unresolved

A claimed success is not accepted until the Workbench refreshes the Shell App and verifies that the published version is uniquely newest. Nothing is retried, rolled back or removed automatically.

### Pruning old versions

After a successful publish, **Preview published apps** shows saved pruning offers. No app is selected by default and one version is retained by default (including the new one). You can change the retention count and apps, and must confirm the exact deletion list. Duplicate, unorderable or non-newest versions are skipped. A pending or unknown delete stops pruning and blocks publishing to that Shell App until reviewed. Postponed offers persist across restarts.

To prune without publishing, select one matched Shell App and choose **Prune selected app**. Unmatched rows and multiple selections cannot start this action, and unresolved Nerdio outcomes block it. The destination and version snapshot are rechecked before deleting, then the comparison refreshes.

## Commands

`Connect-EwAzure`, `Connect-EwNerdio`, `Get-EwAzureResourceGroup`, `Get-EwAzureStorageAccount`, `Get-EwAzureStorageContainer`, `Get-EwNerdioDefinition`, `Get-EwNerdioShellApp`, `Get-EwNerdioShellAppVersion`, `Compare-EwNerdioShellApp`, `Get-EwNerdioPublishPlan`, `Publish-EwNerdioApp`, `Publish-EwNerdioBatch`, `Get-EwNerdioShellAppVersionPrunePlan` and `Remove-EwNerdioShellAppVersion`. See the [command reference](/workbench-commands).

`Publish-EwNerdioApp -ShellAppId` adds a version to an existing Shell App and downloads from the definition source if `-PackagePath` is omitted. `Remove-EwNerdioShellAppVersion` accepts `-ExpectedVersionNames` and `-ExpectedRemovalVersions` to reject a stale preview.
