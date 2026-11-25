---
layout: doc
---
# Packages, definitions and local install

::: warning Pre-release
The Windows Workbench (EvergreenUI) is currently in pre-release. Features and commands may change before the stable release.
:::

The **Packages** view works with `App.json` definitions. A definition describes an application, how to find its latest installer with Evergreen, and how to detect it on a machine. The same definitions drive local installation and Intune publishing.

Definitions are available from the [evergreen-packages](https://github.com/EUCPilots/evergreen-packages) repository.

::: info
Validate package definitions before use. The long-term intention is a single unified definition for Intune Win32 apps and Nerdio Manager Shell Apps.
:::

The view has two tabs. **Definitions** is the default. A saved start-up view of Install opens Packages with the Install tab selected; the tab selection itself is not saved.

## Definitions tab

Enter or **Browse** to the Packages definitions folder, then choose **Load definitions** (or **Reload definitions**). Use **Save path** to remember the folder. A **Package output folder** setting controls where Intune package builds are written.

The table lists each definition's Application, Publisher, Version, Architecture and Status.

**Update definitions** resolves the latest Evergreen artifact for each definition and updates the `App.json` version, setup-file metadata and detection rules in place. Stored `Application.Filter` expressions are parsed by a constrained evaluator rather than executed as PowerShell. Only supported Evergreen queries (`Get-EvergreenApp` and `Get-VcList`) and `Where-Object` predicates are resolved. The list reloads when the update completes, and failures for individual definitions are preserved and reported.

## Install tab

Install tests the installer resolved from a definition on the local machine. It is not a deployment package and is not a gate for publishing to Intune or Nerdio.

When you open Install, the Workbench refreshes definitions and local detection. Old latest-version and architecture assessments are discarded, while selections for definitions that still exist are kept. If another operation is running, the refresh waits and install actions stay disabled until fresh results arrive.

| Column | Meaning |
|---|---|
| **Application** / **Publisher** | From the definition |
| **Required architecture** | The architecture the definition requires |
| **Artifact architecture** | The architecture of the resolved installer |
| **Architecture status** | Whether the installer is compatible with this machine |
| **Installed** | Version found by the definition's detection rules |
| **Latest** | Latest version, populated by **Find latest versions** |
| **Status** | Installed, update available, not installed or latest not checked |

Use **Find latest versions** to query the Evergreen catalog on request, select rows, then choose **Install selected**. A single confirmation covers the batch, and each application reports its own result: `Installed`, `Failed`, `Blocked` or `Skipped`. Use **Hide incompatible** to hide blocked rows for the current session.

Detection rules support File, Registry and MSI types. If the Workbench is not elevated, installers may prompt for UAC.

### Architecture checks

The native Windows architecture is checked against the definition's requirement and the resolved installer.

- Incompatible combinations are **blocked**.
- A **missing requirement**, or **x64 emulation on Arm64**, needs separate approval for each affected application. Declined or blocked applications are skipped.
- x86 installers are supported on x86, x64 and Arm64. Windows 10 on Arm does not support x64 emulation.
- If the definition or artifact metadata changes while you confirm, it is reviewed again, with at most two re-confirmations.

These checks do not hash the downloaded bytes or guarantee that an application will run.

For unattended use of `Install-EwPackage`, supply `-AllowMissingArchitectureRequirement` and/or `-AllowX64OnArm64` explicitly. `-Confirm:$false` alone does not approve these warnings, and a non-interactive call without the required opt-in throws. `-WhatIf` does not resolve or download an installer.

## Commands

| Task | Command |
|---|---|
| Read and validate definitions | `Get-EwDefinition` |
| Resolve the latest artifact | `Resolve-EwArtifact` |
| Update definitions | `Update-EwDefinition` |
| Check detection rules | `Test-EwDetection` |
| Install locally | `Install-EwPackage` |

See the [command reference](/workbench-commands).
