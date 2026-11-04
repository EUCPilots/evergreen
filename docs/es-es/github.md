---
layout: doc
---
# Trabajar con los límites de frecuencia de GitHub

Más de 150 aplicaciones compatibles con Evergreen se alojan en repositorios de GitHub o consultan datos de un repositorio de GitHub para determinar la versión más reciente. Evergreen usa la API REST de GitHub para consultar los detalles de estas aplicaciones.

Tanto `Get-EvergreenApp` como `Update-Evergreen` realizan solicitudes a la API REST de GitHub:

- `Get-EvergreenApp` consulta las publicaciones y etiquetas de GitHub para devolver detalles de versión y descarga de las aplicaciones alojadas en GitHub.
- `Update-Evergreen` descarga las funciones y los manifiestos de aplicaciones más recientes desde el repositorio [eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps).

GitHub limita las solicitudes no autenticadas a la API a 60 por hora y dirección IP. En entornos donde Evergreen se ejecuta con frecuencia o en varias sesiones, este límite puede alcanzarse rápidamente. Consulte [Límites de frecuencia de la API REST](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) para obtener más información.

La autenticación de las solicitudes con un token de acceso personal aumenta el límite a 5000 solicitudes por hora.

## Crear un token de acceso personal

Evergreen admite solicitudes autenticadas mediante [tokens de acceso personales](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Se recomiendan los [tokens de acceso personales de granularidad fina](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).

Basta con que el token tenga acceso de solo lectura a los repositorios públicos. No se requieren permisos ni ámbitos adicionales. Como solo necesita acceso de lectura a repositorios públicos, es razonable establecer un período de expiración prolongado; aun así, se recomienda administrar el token de forma segura.

![Token de acceso personal de granularidad fina](/img/github-pat.png)

## Definir la variable de entorno GITHUB_TOKEN

Evergreen lee las variables de entorno `GITHUB_TOKEN` o `GH_TOKEN`. Al definir cualquiera de ellas con el valor del token de acceso personal, Evergreen autentica automáticamente las solicitudes a la API de GitHub. Tanto `Get-EvergreenApp` como `Update-Evergreen` usarán el token sin necesidad de configuración adicional.

### Windows

Para definir la variable de forma persistente para el usuario actual (se conserva entre sesiones y reinicios):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "User")
```

Para definirla para todos los usuarios del equipo (se requieren permisos de administrador):

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "Machine")
```

También se puede definir la variable en **Propiedades del sistema > Opciones avanzadas > Variables de entorno** en la interfaz de Windows.

Para definirla solo en la sesión actual de PowerShell:

```powershell
$env:GITHUB_TOKEN = "<your-token>"
```

### macOS y Linux

Agregue la siguiente línea al perfil del shell (`~/.zshrc` para Zsh, `~/.bashrc` o `~/.bash_profile` para Bash) para definir la variable de forma persistente:

```bash
export GITHUB_TOKEN="<your-token>"
```

Vuelva a cargar el perfil después de guardarlo:

```bash
source ~/.zshrc  # or source ~/.bashrc
```

Para definirla solo en la sesión actual del shell:

```bash
export GITHUB_TOKEN="<your-token>"
```

## GitHub Actions

Al ejecutar Evergreen en un flujo de trabajo de GitHub Actions, el secreto `GITHUB_TOKEN` está disponible automáticamente y no se necesita un token de acceso personal independiente. Consulte [Usar GITHUB_TOKEN para la autenticación en flujos de trabajo](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).

Agregue lo siguiente al principio del archivo de flujo de trabajo para que el token esté disponible como variable de entorno:

```yaml
# Environment variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Evergreen detectará automáticamente la variable al ejecutarse el flujo de trabajo.

## Comprobar el estado del límite de frecuencia

Al ejecutar `Get-EvergreenApp` para una aplicación que use GitHub como fuente, el parámetro `-Verbose` muestra el número actual de solicitudes a la API que quedan disponibles:

```powershell
Get-EvergreenApp -Name "MicrosoftBicep" -Verbose
```

La salida detallada incluirá una línea similar a esta:

```
VERBOSE: Get-GitHubRateLimit: Remaining requests to the GitHub API: 58 of 60
```

Cuando se agota el límite de frecuencia, Evergreen devuelve un objeto de versión `RateLimited` y muestra una advertencia. Definir `GITHUB_TOKEN` o `GH_TOKEN` antes de ejecutar Evergreen resolverá el problema.
