---
layout: doc
---
# Paquetes, definiciones e instalación local

::: warning Versión preliminar
Windows Workbench (EvergreenUI) está actualmente en versión preliminar. Las características y los comandos pueden cambiar antes de la versión estable.
:::

La vista **Packages** trabaja con definiciones `App.json`. Una definición describe una aplicación, cómo encontrar su instalador más reciente con Evergreen y cómo detectarla en un equipo. Las mismas definiciones sirven para la instalación local y la publicación en Intune.

Las definiciones están disponibles en el repositorio [evergreen-packages](https://github.com/EUCPilots/evergreen-packages).

::: info
Valide las definiciones de paquetes antes de utilizarlas. El objetivo a largo plazo es disponer de una única definición para las aplicaciones Win32 de Intune y las Shell Apps de Nerdio Manager.
:::

La vista tiene dos pestañas. **Definitions** es la predeterminada. Si la vista de inicio guardada es Install, Packages se abre con la pestaña Install seleccionada; la pestaña elegida no se guarda.

## Pestaña Definitions

Escriba o use **Browse** para elegir la carpeta de definiciones de Packages y, a continuación, seleccione **Load definitions** (o **Reload definitions**). Use **Save path** para guardar la ruta. El ajuste **Package output folder** controla dónde se escriben los paquetes de Intune.

La tabla muestra Application, Publisher, Version, Architecture y Status para cada definición.

**Update definitions** resuelve el artefacto más reciente de Evergreen para cada definición y actualiza directamente la versión de `App.json`, los metadatos de los archivos de instalación y las reglas de detección. Las expresiones `Application.Filter` guardadas se analizan con un evaluador restringido, no se ejecutan como PowerShell. Solo se resuelven las consultas compatibles de Evergreen (`Get-EvergreenApp` y `Get-VcList`) y los predicados `Where-Object`. Al finalizar, se vuelve a cargar la lista; los errores de definiciones individuales se conservan y se notifican.

## Pestaña Install

Install prueba en el equipo local el instalador resuelto a partir de una definición. No es un paquete de implementación ni un requisito para publicar en Intune o Nerdio.

Al abrir Install, Workbench actualiza las definiciones y la detección local. Se descartan las evaluaciones anteriores de la última versión y la arquitectura, pero se mantienen las selecciones de las definiciones que aún existan. Si hay otra operación en curso, la actualización espera y las acciones de instalación permanecen deshabilitadas hasta que lleguen resultados recientes.

| Columna | Significado |
|---|---|
| **Application** / **Publisher** | Proceden de la definición |
| **Required architecture** | Arquitectura necesaria según la definición |
| **Artifact architecture** | Arquitectura del instalador resuelto |
| **Architecture status** | Compatibilidad del instalador con este equipo |
| **Installed** | Versión detectada por las reglas de detección |
| **Latest** | Última versión, rellenada con **Find latest versions** |
| **Status** | Instalada, actualización disponible, no instalada o última versión sin comprobar |

Use **Find latest versions** para consultar el catálogo de Evergreen cuando lo necesite, seleccione filas y elija **Install selected**. Una confirmación abarca todo el lote y cada aplicación informa su propio resultado: `Installed`, `Failed`, `Blocked` o `Skipped`. Use **Hide incompatible** para ocultar las filas bloqueadas durante la sesión actual.

Las reglas de detección admiten los tipos File, Registry y MSI. Si Workbench no se ejecuta con privilegios elevados, los instaladores pueden solicitar UAC.

### Comprobaciones de arquitectura

La arquitectura nativa de Windows se compara con el requisito de la definición y el instalador resuelto.

- Las combinaciones incompatibles se **bloquean**.
- La **falta de un requisito** o la **emulación x64 en Arm64** necesita aprobación por separado para cada aplicación afectada. Las aplicaciones rechazadas o bloqueadas se omiten.
- Los instaladores x86 son compatibles con x86, x64 y Arm64. Windows 10 en Arm no admite la emulación x64.
- Si cambian los metadatos de la definición o del artefacto durante la confirmación, se vuelven a revisar, con un máximo de dos confirmaciones adicionales.

Estas comprobaciones no calculan el hash de los bytes descargados ni garantizan que la aplicación vaya a funcionar.

Para usar `Install-EwPackage` sin interacción, especifique explícitamente `-AllowMissingArchitectureRequirement` o `-AllowX64OnArm64`, o ambos. `-Confirm:$false` por sí solo no aprueba estas advertencias y una llamada no interactiva sin la opción necesaria produce un error. `-WhatIf` no resuelve ni descarga ningún instalador.

## Comandos

| Tarea | Comando |
|---|---|
| Leer y validar definiciones | `Get-EwDefinition` |
| Resolver el artefacto más reciente | `Resolve-EwArtifact` |
| Actualizar definiciones | `Update-EwDefinition` |
| Comprobar reglas de detección | `Test-EwDetection` |
| Instalar localmente | `Install-EwPackage` |

Consulte la [referencia de comandos](/es-es/workbench-commands).
