---
layout: doc
---
# Microsoft 365 Apps packages

::: warning Validation recommended
Validate your XML configuration, packaging output and tenant permissions before production use.
:::

The **Intune** and **Nerdio** views each have a **Microsoft 365 Apps** tab that builds a Microsoft 365 Apps package from Office Deployment Tool (ODT) configuration XML and, optionally, publishes it.

## Workflow

1. Sign in to the matching provider ([Intune](/workbench-intune) or [Nerdio](/workbench-nerdio)).
2. Enter the **Configuration folder** and choose **Load configurations**. The folder is shared by Intune and Nerdio. Each configuration needs a valid, non-empty ID.
3. Select one configuration and choose the **Channel**, **Company name** and **Session type**.
4. Choose **Preview build** or **Preview publishing**, then **Build only** or **Build and publish**.
5. Use **Save shared settings** to persist the non-secret selections.

Nerdio build-only can use **API only** sign-in. Nerdio publishing also needs the connected Azure tenant, subscription and storage destination.

## Required files

- `Uninstall-Microsoft365Apps.xml` with a `Configuration.Remove` element. Required for Nerdio builds and Intune publishing; Intune build-only can run without it, but publishing requires rebuilding with it because the uninstall command references the file.
- For Nerdio, a `shell-app` folder next to the XML containing `Definition.json`, `Detect.ps1`, `Install.ps1` and `Uninstall.ps1`.

Source XML and scripts are never modified.

## Versions and the build

The preview shows the resolved **Office channel version** separately from the **ODT download version**. The signed ODT archive is extracted with Windows `tar.exe`; the downloaded executable is not run. The built configuration uses a rolling channel and cannot use `DownloadPath`, which requires a pinned version.

An installed Office version may be newer than the preview, so Intune detection accepts the previewed version or newer.

::: info
The `TenantId` property and the company `AppSettings\Setup Name="Company"` value are written to the configuration, but Microsoft does not document them as tenant association or company configuration. The signed-in tenant is not proof that Office is associated with it. Microsoft's [`TenantAssociationKey`](https://learn.microsoft.com/microsoft-365-apps/deploy/office-deployment-tool-configuration-options#tenantassociationkey-property-part-of-property-element) is a different value.
:::

## Publishing

Publishing confirms before building.

- **Intune** creates a new app, shows existing matches by configuration ID, and can optionally supersede one (an update relationship, without uninstalling it) using **Optional app to supersede**.
- **Nerdio** can create a Shell App or add a version to the **Existing Shell App for add version**. Adding a version that already exists requires ticking *I confirm the configuration changed if this Office version already exists*; Nerdio cannot compare the remote configuration and may still reject it.

If Nerdio completes creation of a Microsoft 365 Shell App but omits its ID from the response, the Workbench attempts to resolve the new app. If the result is ambiguous, the operation remains blocked for review rather than being treated as a confirmed success.

Inputs and provider targets are rechecked before writes, but not atomically. Existing packages are replaced only with explicit approval. Builds keep the staged source and tool under `<application>\Builds\<GUID>` in the output folder; remove these manually when no longer needed. Cancellation takes effect between stages and does not interrupt an active build, upload or request.

## Recovery

Unknown Intune outcomes are stored without secrets and block writes for that configuration until reviewed. Use the **Recovery** expander on the Intune tab: **Load recovery records**, inspect the app in Intune, then **Acknowledge reviewed outcome**. Nerdio pending and unknown outcomes use the [Shell Apps recovery controls](/workbench-nerdio). Nothing is retried, rolled back or cleaned up automatically.

## Commands

`Get-EwM365Configuration`, `Get-EwM365BuildPlan`, `New-EwPackage`, `Get-EwM365IntunePublishPlan`, `Publish-EwM365IntuneApp`, `Get-EwM365IntuneRecovery`, `Clear-EwM365IntuneRecovery`, `Get-EwM365NerdioPublishPlan` and `Publish-EwM365NerdioApp`. A Microsoft 365 `New-EwPackage` call without a preview creates one automatically and still requires the provider session.
