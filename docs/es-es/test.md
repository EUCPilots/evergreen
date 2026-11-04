---
layout: doc
---
# Probar instaladores

`Test-EvergreenApp` comprueba si se puede acceder a las URL de los instaladores devueltas por `Get-EvergreenApp`. Primero envía una solicitud `HEAD` y, si esta falla, vuelve a intentarlo con una solicitud `GET` con intervalo. La salida incluye el URI, un resultado booleano y, si está disponible, el código de estado HTTP.

En este ejemplo se comprueban las URL devueltas por Microsoft OneDrive:

```powershell
Get-EvergreenApp -Name "MicrosoftOneDrive" |
    Where-Object { $_.Type -eq "exe" } |
    Test-EvergreenApp
```

Salida:

```text
Result StatusCode URI
------ ---------- ---
  True        200 https://example.com/installer.exe
```

## Parámetros

### InputObject

Objeto de aplicación con una propiedad `URI` no vacía. Los objetos que no tienen un URI válido generan una advertencia y un resultado `False`.

### Opciones de solicitud

`-ConnectionTimeoutSeconds` establece el tiempo de espera de la solicitud (30 segundos de forma predeterminada). `-UserAgent` reemplaza el agente de usuario predeterminado. Use `-Proxy` para especificar un servidor proxy; `-ProxyCredential` permite proporcionar credenciales y requiere `-Proxy`.

### NoProgress

De forma predeterminada, se oculta el progreso. Si se usa `-Verbose`, se muestra el progreso de la solicitud, a menos que también se especifique `-NoProgress`. Use `-Verbose` para ver qué URI se está probando.

## Alias

`Test-EvergreenApp` tiene el alias `tea`, que simplifica las pruebas de aplicaciones. Por ejemplo:

```powershell
PS /Users/aaron> gea MicrosoftTeams | tea
```
