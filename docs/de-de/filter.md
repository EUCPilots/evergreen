---
layout: doc
---
# Anwendungsdetails filtern

## Mit Where-Object filtern

Wenn eine Anwendung mehrere Objekte an die Pipeline zurückgibt, möchten Sie die Ausgabe möglicherweise mit `Where-Object` filtern. Beispielsweise gibt `Get-EvergreenApp -Name MicrosoftTeams` die `x86`-, `x64`- und `ARM64`-Versionen der **Consumer**- und **Enterprise**-Release-Rings des Microsoft-Teams-Installers zurück. Um nur die 64-Bit-Enterprise-Version von Teams abzurufen, können wir die Ausgabe mit `Where-Object` filtern:

```powershell
Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
```

Dadurch werden Details zum 64-Bit-Microsoft-Teams-Installer zurückgegeben, die wir in einem Skript verwenden können.

```powershell
Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : x64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-x64/25275.2601.4002.2815/MSTeams-x64.msix
```

Wenn wir die x64- und ARM64-Version von Teams möchten, können wir den Filter für `Where-Object` ändern:

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

## Automatische Filterung

Evergreen unterstützt die automatische Filterung der Ausgabe von `Get-EvergreenApp` und `Get-EvergreenAppFromApi`, indem Ausgabefilter zum Evergreen-Apps-Cacheverzeichnis hinzugefügt werden. Wenn die Filterdatei vorhanden ist, werden automatisch immer dieselben gefilterten Objekte zurückgegeben.

Die Filter werden dem Verzeichnis `/Evergreen/Filters` neben den Cacheverzeichnissen `Apps` und `Manifests` hinzugefügt. Wenn Sie beispielsweise `%LocalAppData%\Evergreen\Filters\MicrosoftTeams.json` mit folgendem Inhalt hinzufügen, wird die Ausgabe von `Get-EvergreenApp` ebenso gefiltert wie bei einer direkten Angabe von `Where-Object`:

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

Dieses JSON entspricht der Angabe von `Where-Object { $_.Architecture -in "x64", "arm64" -and $_.Release -eq "Enterprise" }`.

::: tip
Die Filterdatei muss gültiges JSON enthalten und unter demselben Namen wie die Anwendungsfunktion im Verzeichnis `/Evergreen/Filters` gespeichert werden, z. B. `/Evergreen/Filters/MicrosoftTeams.json`.
:::

### JSON-Format für Filter

Mit Filterkonfigurationsdateien können Sie komplexe Filterlogik für Evergreen-Anwendungsdaten festlegen. Die JSON-Struktur unterstützt mehrere Filterbedingungen, die mit logischen Operatoren (AND/OR) kombiniert werden.

### JSON-Struktur

#### Stammobjekt

Das JSON-Stammobjekt muss die folgenden Eigenschaften enthalten:

| Eigenschaft | Typ | Erforderlich | Beschreibung |
|----------|------|----------|-------------|
| `filters` | Array | Ja | Array von Filterobjekten, die die anzuwendenden Bedingungen definieren |
| `logicalOperator` | Zeichenfolge | Nein | Legt fest, wie mehrere Filter kombiniert werden: `"and"` oder `"or"` (Standard: `"and"`) |

#### Filterobjekt

Jedes Filterobjekt im `filters`-Array muss Folgendes enthalten:

| Eigenschaft | Typ | Erforderlich | Beschreibung |
|----------|------|----------|-------------|
| `property` | Zeichenfolge | Ja | Name der Eigenschaft, nach der gefiltert werden soll (z. B. „Version“, „Architecture“, „Release“) |
| `operator` | Zeichenfolge | Ja | Zu verwendender Vergleichsoperator (siehe [Unterstützte Operatoren](#unterstützte-operatoren)) |
| `value` | Zeichenfolge, Zahl, Array oder Boolean | Ja | Vergleichswert (der Typ hängt vom Operator ab) |

### Unterstützte Operatoren

| Operator | Beschreibung | Werttyp | Beispiel |
|----------|-------------|------------|---------|
| `eq` | Gleich | Zeichenfolge, Zahl, Boolean | `"Enterprise"`, `1.0`, `true` |
| `ne` | Ungleich | Zeichenfolge, Zahl, Boolean | `"Professional"`, `2.0`, `false` |
| `like` | Platzhaltermuster (PowerShell `-like`) | Zeichenfolge | `"*Enterprise*"`, `"Win*"` |
| `match` | Übereinstimmung mit regulärem Ausdruck | Zeichenfolge (Regex-Muster) | `"^2\\..*"`, `"[0-9]+"` |
| `in` | Wert ist im Array enthalten | Array | `["x64", "ARM64"]`, `["Stable", "Beta"]` |
| `gt` | Größer als | Zahl, Zeichenfolge | `30`, `"2.0.0"` |
| `lt` | Kleiner als | Zahl, Zeichenfolge | `100`, `"3.0.0"` |
| `ge` | Größer oder gleich | Zahl, Zeichenfolge | `18`, `"1.5.0"` |
| `le` | Kleiner oder gleich | Zahl, Zeichenfolge | `65`, `"2.5.0"` |

**Hinweis:** Wenn ein unbekannter Operator angegeben wird, wird standardmäßig `eq` (gleich) verwendet.

### Logische Operatoren

Die Eigenschaft `logicalOperator` bestimmt, wie mehrere Filter kombiniert werden:

- **`"and"`** (Standard): Alle Filterbedingungen müssen erfüllt sein, damit ein Element übereinstimmt.
- **`"or"`**: Mindestens eine Filterbedingung muss erfüllt sein, damit ein Element übereinstimmt.

### Beispiele

#### Beispiel 1: Einfacher AND-Filter

Nach Enterprise-Releases mit x64- oder ARM64-Architektur filtern:

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

Dies entspricht Elementen, bei denen:
- Release **gleich** „Enterprise“ **UND**
- Architecture **im** Array ["x64", "ARM64"] **enthalten** ist

#### Beispiel 2: OR-Filter mit Platzhaltern

Nach Elementen filtern, die entweder zum Stable-Kanal gehören ODER „Enterprise“ im Namen enthalten:

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

**Hinweis:** `logicalOperator` ist optional und hat bei Auslassung den Standardwert `"and"`.

#### Beispiel 3: Übereinstimmung mit regulärem Ausdruck

Mit Regex nach Versionen filtern, die mit „2.“ beginnen:

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

**Hinweis:** Denken Sie daran, Backslashes in JSON-Zeichenfolgen zu maskieren (`\\` statt `\`).

#### Beispiel 4: Bestimmte Werte ausschließen

Nach Elementen filtern, um die x86-Architektur auszuschließen:

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

#### Beispiel 5: Komplexer Filter mit mehreren Bedingungen

Nach aktuellen stabilen Enterprise-Releases mit bestimmten Architekturen und Version 2.0 oder höher filtern:

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

### Bewährte Vorgehensweisen

1. **Aussagekräftige Dateinamen verwenden**: Benennen Sie Ihre Filterdateien eindeutig (z. B. `enterprise-x64-stable.json`).

2. **Geeignete Operatoren verwenden**:
   - Verwenden Sie `in` für mehrere mögliche Werte.
   - Verwenden Sie `like` für teilweise Übereinstimmungen von Zeichenfolgen.
   - Verwenden Sie `match` für komplexe Mustervergleiche.
   - Verwenden Sie Vergleichsoperatoren (`gt`, `lt` usw.) für numerische Vergleiche oder Versionsvergleiche.

3. **Eigenschaftsnamen korrekt angeben**: Achten Sie darauf, dass die Eigenschaftsnamen genau mit den Eigenschaften in Ihren Daten übereinstimmen (Groß-/Kleinschreibung beachten).

4. **Werttypen**: Passen Sie die Werttypen an Ihre Daten an:
   - Zeichenfolgen: `"value"`
   - Zahlen: `123` (ohne Anführungszeichen)
   - Arrays: `["value1", "value2"]`
   - Boolean-Werte: `true` oder `false`

5. **Reguläre Ausdrücke**: Denken Sie daran, Sonderzeichen in JSON-Zeichenfolgen zu maskieren.

6. **Logische Operatoren**: Verwenden Sie `"or"`, wenn eine beliebige Bedingung übereinstimmen kann, und `"and"` (oder lassen Sie den Wert weg), wenn alle Bedingungen erfüllt sein müssen.

### Häufige Muster

#### Nach mehreren Architekturen filtern
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

#### Stable- oder Beta-Kanäle filtern
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

#### Vorschau-Releases ausschließen
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

### Problembehandlung

#### Der Filter gibt keine Ergebnisse zurück

- Prüfen Sie, ob die Eigenschaftsnamen exakt übereinstimmen (einschließlich Groß-/Kleinschreibung).
- Überprüfen Sie, ob die Werte dem Datentyp in Ihren Objekten entsprechen.
- Testen Sie die ausführliche Ausgabe: `Get-FilteredData -FilterPath "filter.json" -InputObject $data -Verbose`
- Beschränken Sie den Filter auf eine Bedingung, um das Problem einzugrenzen.

#### Der Filter gibt zu viele Ergebnisse zurück

- Prüfen Sie, ob `logicalOperator` korrekt gesetzt ist (`"and"` oder `"or"`).
- Überprüfen Sie die Verwendung der Operatoren (verwenden Sie bei einer exakten Übereinstimmung `eq` statt `like`).
- Fügen Sie weitere Filterbedingungen hinzu, um die Ergebnisse einzugrenzen.

#### JSON-Analysefehler

- Überprüfen Sie die JSON-Syntax mit einem JSON-Validator.
- Achten Sie darauf, dass alle Zeichenfolgen korrekt in Anführungszeichen gesetzt sind.
- Prüfen Sie auf nachgestellte Kommas (diese sind in JSON nicht zulässig).
- Überprüfen Sie die korrekte Verschachtelung von Arrays und Objekten.
