---
layout: doc
---
# Filtrar detalles de aplicaciones

## Filtrar con Where-Object

Si una aplicación devuelve más de un objeto a la canalización, puede filtrar la salida con `Where-Object`. Por ejemplo, `Get-EvergreenApp -Name MicrosoftTeams` devuelve las versiones `x86`, `x64` y `ARM64` de los anillos de versión **Consumer** y **Enterprise** del instalador de Microsoft Teams. Para obtener solo la versión de 64 bits Enterprise de Teams, podemos filtrar la salida con `Where-Object`:

```powershell
Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
```

Esto devolverá los detalles del instalador de Microsoft Teams de 64 bits, que podemos usar en un script.

```powershell
Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : x64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-x64/25275.2601.4002.2815/MSTeams-x64.msix
```

Si, en cambio, queremos las versiones x64 y ARM64 de Teams, podemos cambiar el filtro `Where-Object`:

```powershell
Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -in "x64", "arm64" -and $_.Release -eq "Enterprise" }

Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : arm64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-arm64/25275.2601.4002.2815/MSTeams-arm64.msix

Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : x64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-x64/25275.2601.4002.2815/MSTeams-x64.msix
```

## Filtrado automático

Evergreen permite filtrar automáticamente la salida de `Get-EvergreenApp` y `Get-EvergreenAppFromApi` agregando filtros de salida al directorio de caché de aplicaciones de Evergreen. Si existe el archivo de filtro, la salida siempre devolverá automáticamente los mismos objetos filtrados.

Los filtros se agregan al directorio `/Evergreen/Filters`, junto a los directorios en caché `Apps` y `Manifests`. Por ejemplo, si crea `%LocalAppData%\Evergreen\Filters\MicrosoftTeams.json` con el siguiente contenido, filtrará la salida de `Get-EvergreenApp` igual que si se especificara directamente `Where-Object`:

```json
{
    "filters": [
        {
            "property": "Release",
            "operator": "eq",
            "value": "Enterprise"
        },
        {
            "property": "Architecture",
            "operator": "in",
            "value": ["x64", "ARM64"]
        }
    ],
    "logicalOperator": "and"
}
```

Este JSON equivale a especificar: `Where-Object { $_.Architecture -in "x64", "arm64" -and $_.Release -eq "Enterprise" }`.

::: tip
El archivo de filtro debe ser JSON válido y guardarse en el directorio `/Evergreen/Filters` con el mismo nombre que la función de la aplicación; por ejemplo, `/Evergreen/Filters/MicrosoftTeams.json`.
:::

### Formato JSON de filtro

Los archivos de configuración de filtros permiten definir una lógica de filtrado compleja para los datos de aplicaciones de Evergreen. La estructura JSON admite varias condiciones de filtro combinadas mediante operadores lógicos (AND/OR).

### Estructura JSON

#### Objeto raíz

El objeto JSON raíz debe contener las siguientes propiedades:

| Propiedad | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `filters` | Matriz | Sí | Matriz de objetos de filtro que define las condiciones que se aplicarán |
| `logicalOperator` | Cadena | No | Cómo combinar varios filtros: `"and"` o `"or"` (el valor predeterminado es `"and"`) |

#### Objeto de filtro

Cada objeto de filtro de la matriz `filters` debe contener:

| Propiedad | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `property` | Cadena | Sí | Nombre de la propiedad que se filtrará (por ejemplo, "Version", "Architecture" o "Release") |
| `operator` | Cadena | Sí | Operador de comparación que se usará (consulte [Operadores compatibles](#operadores-compatibles)) |
| `value` | Cadena, número, matriz o booleano | Sí | Valor con el que se comparará (el tipo depende del operador) |

### Operadores compatibles

| Operador | Descripción | Tipo de valor | Ejemplo |
|----------|-------------|---------------|---------|
| `eq` | Igual a | Cadena, número, booleano | `"Enterprise"`, `1.0`, `true` |
| `ne` | Distinto de | Cadena, número, booleano | `"Professional"`, `2.0`, `false` |
| `like` | Coincidencia con comodines (PowerShell `-like`) | Cadena | `"*Enterprise*"`, `"Win*"` |
| `match` | Coincidencia con expresión regular | Cadena (patrón regex) | `"^2\\..*"`, `"[0-9]+"` |
| `in` | El valor está en la matriz | Matriz | `["x64", "ARM64"]`, `["Stable", "Beta"]` |
| `gt` | Mayor que | Número, cadena | `30`, `"2.0.0"` |
| `lt` | Menor que | Número, cadena | `100`, `"3.0.0"` |
| `ge` | Mayor o igual que | Número, cadena | `18`, `"1.5.0"` |
| `le` | Menor o igual que | Número, cadena | `65`, `"2.5.0"` |

**Nota:** si se especifica un operador desconocido, se usará `eq` (igual a) de forma predeterminada.

### Operadores lógicos

La propiedad `logicalOperator` determina cómo se combinan varios filtros:

- **`"and"`** (predeterminado): todas las condiciones del filtro deben ser verdaderas para que un elemento coincida.
- **`"or"`**: al menos una condición debe ser verdadera para que un elemento coincida.

### Ejemplos

#### Ejemplo 1: filtro AND sencillo

Filtrar las versiones Enterprise con arquitectura x64 o ARM64:

```json
{
    "filters": [
        {
            "property": "Release",
            "operator": "eq",
            "value": "Enterprise"
        },
        {
            "property": "Architecture",
            "operator": "in",
            "value": ["x64", "ARM64"]
        }
    ],
    "logicalOperator": "and"
}
```

Esto selecciona los elementos donde:
- `Release` **es igual a** "Enterprise" **Y**
- `Architecture` está **en** la matriz ["x64", "ARM64"]

#### Ejemplo 2: filtro OR con comodines

Filtrar los elementos que estén en el canal Stable o que incluyan "Enterprise" en el nombre:

```json
{
    "filters": [
        {
            "property": "Channel",
            "operator": "eq",
            "value": "Stable"
        },
        {
            "property": "Release",
            "operator": "like",
            "value": "*Enterprise*"
        }
    ],
    "logicalOperator": "or"
}
```

**Nota:** `logicalOperator` es opcional y, si se omite, su valor predeterminado es `"and"`.

#### Ejemplo 3: coincidencia con una expresión regular

Filtrar las versiones que empiecen por "2." mediante una expresión regular:

```json
{
    "filters": [
        {
            "property": "Version",
            "operator": "match",
            "value": "^2\\."
        },
        {
            "property": "Channel",
            "operator": "eq",
            "value": "Stable"
        }
    ],
    "logicalOperator": "and"
}
```

**Nota:** recuerde escapar las barras invertidas en las cadenas JSON (`\\` en lugar de `\`).

#### Ejemplo 4: excluir valores específicos

Excluir la arquitectura x86:

```json
{
    "filters": [
        {
            "property": "Architecture",
            "operator": "ne",
            "value": "x86"
        }
    ]
}
```

#### Ejemplo 5: filtro complejo con varias condiciones

Filtrar las versiones Enterprise estables actuales para arquitecturas específicas y con versión 2.0 o posterior:

```json
{
    "filters": [
        {
            "property": "Release",
            "operator": "eq",
            "value": "Enterprise"
        },
        {
            "property": "Channel",
            "operator": "eq",
            "value": "Stable"
        },
        {
            "property": "Track",
            "operator": "eq",
            "value": "Current"
        },
        {
            "property": "Architecture",
            "operator": "in",
            "value": ["x64", "ARM64"]
        }
    ],
    "logicalOperator": "and"
}
```

### Prácticas recomendadas

1. **Use nombres de archivo descriptivos**: asigne nombres claros a los archivos de filtro (por ejemplo, `enterprise-x64-stable.json`).

2. **Use operadores adecuados**:
   - Use `in` para varios valores posibles.
   - Use `like` para coincidencias parciales de cadenas.
   - Use `match` para patrones complejos.
   - Use operadores de comparación (`gt`, `lt`, etc.) para comparar números o versiones.

3. **Precisión de los nombres de propiedad**: asegúrese de que los nombres coincidan exactamente con las propiedades de los datos (se distingue entre mayúsculas y minúsculas).

4. **Tipos de valores**: haga coincidir los tipos de valores con los de los datos:
   - Cadenas: `"value"`
   - Números: `123` (sin comillas)
   - Matrices: `["value1", "value2"]`
   - Booleanos: `true` o `false`

5. **Expresiones regulares**: recuerde escapar los caracteres especiales en las cadenas JSON.

6. **Operadores lógicos**: use `"or"` cuando pueda coincidir cualquier condición; use `"and"` (o no lo especifique) cuando deban coincidir todas.

### Patrones comunes

#### Filtrar por varias arquitecturas

```json
{
    "filters": [
        {
            "property": "Architecture",
            "operator": "in",
            "value": ["x64", "ARM64"]
        }
    ]
}
```

#### Filtrar los canales Stable o Beta

```json
{
    "filters": [
        {
            "property": "Channel",
            "operator": "in",
            "value": ["Stable", "Beta"]
        }
    ]
}
```

#### Excluir versiones preliminares

```json
{
    "filters": [
        {
            "property": "Ring",
            "operator": "ne",
            "value": "Preview"
        }
    ]
}
```

### Solución de problemas

#### El filtro no devuelve resultados

- Compruebe que los nombres de las propiedades coincidan exactamente (incluidas las mayúsculas y minúsculas).
- Compruebe que los valores coincidan con el tipo de datos de los objetos.
- Pruebe con una salida detallada: `Get-FilteredData -FilterPath "filter.json" -InputObject $data -Verbose`.
- Simplifique el filtro a una sola condición para aislar el problema.

#### El filtro devuelve demasiados resultados

- Compruebe que `logicalOperator` esté configurado correctamente (`"and"` frente a `"or"`).
- Compruebe el uso de los operadores (use `eq` en lugar de `like` si necesita una coincidencia exacta).
- Agregue más condiciones de filtro para restringir los resultados.

#### Errores de análisis de JSON

- Valide la sintaxis JSON con un validador de JSON.
- Asegúrese de que todas las cadenas estén entre comillas correctamente.
- Compruebe que no haya comas finales (no están permitidas en JSON).
- Compruebe que las matrices y los objetos estén anidados correctamente.
