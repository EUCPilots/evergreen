---
layout: doc
---
# Publishing to Microsoft Intune

::: warning Validation recommended
Publishing creates real apps in your tenant. Validate packaging, detection and assignment behaviour in a test tenant before production use.
:::

The **Intune** view compares saved `App.json` [definitions](/workbench-packages) with the Win32 apps in Microsoft Intune, then builds and publishes the ones you select. It has two tabs: **Win32 apps** and **Microsoft 365 Apps** (see [Microsoft 365 Apps packages](/workbench-m365)).

## Requirements

Intune workflows need these optional modules, which load only when used:

- `IntuneWin32App` - builds `.intunewin` packages
- `Microsoft.Graph.Authentication` - signs in to Microsoft Graph

Sign-in uses `Connect-EwIntune`. An optional **Tenant ID** can be supplied. Tokens stay in process memory and are not saved.

## Win32 apps

1. Select the **Definitions folder** and load it, or reuse the folder saved in [Packages](/workbench-packages).
2. Choose **Connect** to sign in. The signed-in UPN is shown beside the **Connect/Disconnect** button.
3. Choose **Load matching Intune apps** / **Compare definitions**. The table shows each definition's Publisher, **Saved** version, **Intune** version and match **Status**. The publisher appears beside each definition.
4. Select eligible rows and choose **Build and publish selected**.

Ambiguous Intune matches are distinguished from linked supersedence chains, and duplicate definition GUIDs are flagged so they can be fixed in the definition.

### Update apps and supersedence

- Existing matched apps are **superseded** by the new version.
- **Update app** (a check box per row, off by default) publishes the app as an *update* app that is assigned as **required** to **All Devices**.

### Publishing a batch

One confirmation covers the whole batch. Publishing is sequential, can update definition files, stops between applications if you choose **Cancel batch**, and reports partial local and Intune changes in the **Batch results** table (Definition, Result, New app ID, Previous app ID, Details). Partial app IDs are preserved. If supersedence fails, use **Retry selected link** during the same Workbench session.

Packages are built from the installer's download folder, including channel, version or architecture subfolders, and are written to the package output folder.

## Commands

`Connect-EwIntune`, `Disconnect-EwIntune`, `Get-EwIntuneApp`, `Compare-EwIntuneApp`, `Publish-EwIntuneApp`, `Publish-EwIntuneBatch` and `Set-EwIntuneSupersedence`. See the [command reference](/workbench-commands).

```powershell
Connect-EwIntune
Compare-EwIntuneApp -DefinitionPath C:\Packages
```
