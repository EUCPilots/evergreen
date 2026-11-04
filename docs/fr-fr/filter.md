---
layout: doc
---
# Filtrer les détails des applications

## Filtrer avec Where-Object

Lorsqu’une application renvoie plusieurs objets dans le pipeline, vous pouvez filtrer la sortie avec `Where-Object`. Par exemple, `Get-EvergreenApp -Name MicrosoftTeams` renvoie les versions `x86`, `x64` et `ARM64` des programmes d’installation Microsoft Teams des anneaux **Consumer** et **Enterprise**. Pour obtenir uniquement la version 64 bits Enterprise de Teams, vous pouvez filtrer la sortie avec `Where-Object` :

```powershell
Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
```

Cette commande renvoie les détails du programme d’installation Microsoft Teams 64 bits que nous pouvons utiliser dans un script.

```powershell
Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : x64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-x64/25275.2601.4002.2815/MSTeams-x64.msix
```

Pour obtenir les versions x64 et ARM64 de Teams, nous pouvons modifier le filtre `Where-Object` :

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

## Filtrage automatique

Evergreen prend en charge le filtrage automatique des sorties de `Get-EvergreenApp` et `Get-EvergreenAppFromApi` grâce à des filtres placés dans le répertoire de cache des applications Evergreen. Si le fichier de filtre existe, la sortie renverra automatiquement les mêmes objets filtrés à chaque fois.

Ajoutez les filtres au répertoire `/Evergreen/Filters`, à côté des répertoires de cache `Apps` et `Manifests`. Par exemple, la création du fichier `%LocalAppData%\Evergreen\Filters\MicrosoftTeams.json` avec le contenu suivant filtrera la sortie de `Get-EvergreenApp` comme si vous aviez spécifié directement `Where-Object` :

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

Ce fichier JSON équivaut à spécifier : `Where-Object { $_.Architecture -in "x64", "arm64" -and $_.Release -eq "Enterprise" }`.

::: tip
Le fichier de filtre doit être un JSON valide et être enregistré dans le répertoire `/Evergreen/Filters` sous le même nom que la fonction de l’application, par exemple `/Evergreen/Filters/MicrosoftTeams.json`.
:::

### Format JSON des filtres

Les fichiers de configuration des filtres permettent de définir une logique de filtrage complexe pour les données d’applications Evergreen. La structure JSON prend en charge plusieurs conditions combinées à l’aide d’opérateurs logiques (AND/OR).

### Structure JSON

#### Objet racine

L’objet JSON racine doit contenir les propriétés suivantes :

| Propriété | Type | Obligatoire | Description |
|----------|------|----------|-------------|
| `filters` | Array | Oui | Tableau d’objets de filtre définissant les conditions à appliquer |
| `logicalOperator` | String | Non | Mode de combinaison de plusieurs filtres : `"and"` ou `"or"` (valeur par défaut : `"and"`) |

#### Objet de filtre

Chaque objet de filtre du tableau `filters` doit contenir :

| Propriété | Type | Obligatoire | Description |
|----------|------|----------|-------------|
| `property` | String | Oui | Nom de la propriété à filtrer (par exemple « Version », « Architecture », « Release ») |
| `operator` | String | Oui | Opérateur de comparaison à utiliser (voir [Opérateurs pris en charge](#supported-operators)) |
| `value` | String, Number, Array ou Boolean | Oui | Valeur de comparaison (le type dépend de l’opérateur) |

### Opérateurs pris en charge

| Opérateur | Description | Type de valeur | Exemple |
|----------|-------------|------------|---------|
| `eq` | Égal à | String, Number, Boolean | `"Enterprise"`, `1.0`, `true` |
| `ne` | Différent de | String, Number, Boolean | `"Professional"`, `2.0`, `false` |
| `like` | Correspondance avec caractères génériques (PowerShell `-like`) | String | `"*Enterprise*"`, `"Win*"` |
| `match` | Regular expression match | String (regex pattern) | `"^2\\..*"`, `"[0-9]+"` |
| `in` | La valeur figure dans le tableau | Array | `["x64", "ARM64"]`, `["Stable", "Beta"]` |
| `gt` | Supérieur à | Number, String | `30`, `"2.0.0"` |
| `lt` | Inférieur à | Number, String | `100`, `"3.0.0"` |
| `ge` | Supérieur ou égal à | Number, String | `18`, `"1.5.0"` |
| `le` | Inférieur ou égal à | Number, String | `65`, `"2.5.0"` |

**Remarque :** si un opérateur inconnu est spécifié, `eq` (égal à) est utilisé par défaut.

### Opérateurs logiques

La propriété `logicalOperator` détermine comment combiner plusieurs filtres :

- **`"and"`** (par défaut) : toutes les conditions de filtre doivent être vraies pour qu’un élément corresponde
- **`"or"`** : au moins une condition de filtre doit être vraie pour qu’un élément corresponde

### Exemples

#### Exemple 1 : filtre AND simple

Filtrer les versions Enterprise d’architecture x64 ou ARM64 :

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

Cette configuration sélectionne les éléments pour lesquels :
- Release **est égal à** « Enterprise » **ET**
- Architecture **figure dans** le tableau ["x64", "ARM64"]

#### Exemple 2 : filtre OR avec caractères génériques

Filtrer les éléments du canal Stable **ou** dont le nom contient « Enterprise » :

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

**Remarque :** `logicalOperator` est facultatif et vaut `"and"` par défaut s’il est omis.

#### Exemple 3 : correspondance par expression régulière

Filtrer les versions commençant par « 2. » à l’aide d’une expression régulière :

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

**Remarque :** pensez à échapper les barres obliques inverses dans les chaînes JSON (`\\` au lieu de `\`).

#### Exemple 4 : exclure certaines valeurs

Filtrer pour exclure l’architecture x86 :

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

#### Exemple 5 : filtre complexe à plusieurs conditions

Filtrer les versions Enterprise stables actuelles, d’architectures précises et de version 2.0 ou ultérieure :

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

### Bonnes pratiques

1. **Choisissez des noms de fichiers descriptifs** : nommez clairement vos fichiers de filtre (par exemple `enterprise-x64-stable.json`).

2. **Utilisez les opérateurs adaptés** :
   - Utilisez `in` pour plusieurs valeurs possibles
   - Utilisez `like` pour rechercher une partie d’une chaîne
   - Utilisez `match` pour les motifs complexes
   - Utilisez les opérateurs de comparaison (`gt`, `lt`, etc.) pour comparer des nombres ou des versions

3. **Exactitude des noms de propriétés** : vérifiez que les noms correspondent exactement aux propriétés de vos données (respect de la casse).

4. **Types de valeurs** : adaptez le type des valeurs à vos données :
   - Chaînes : `"value"`
   - Nombres : `123` (sans guillemets)
   - Tableaux : `["value1", "value2"]`
   - Booléens : `true` ou `false`

5. **Expressions régulières** : pensez à échapper les caractères spéciaux dans les chaînes JSON.

6. **Opérateurs logiques** : utilisez `"or"` si une seule condition suffit ; utilisez `"and"` (ou omettez la propriété) si toutes les conditions doivent correspondre.

### Modèles courants

#### Filtrer par architectures multiples
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

#### Filtrer les canaux Stable ou Beta
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

#### Exclure les versions Preview
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

### Dépannage

#### Le filtre ne renvoie aucun résultat

- Vérifiez que les noms de propriétés correspondent exactement (casse comprise)
- Vérifiez que les valeurs correspondent au type de données de vos objets
- Testez avec la sortie détaillée : `Get-FilteredData -FilterPath "filter.json" -InputObject $data -Verbose`
- Réduisez le filtre à une seule condition pour isoler le problème

#### Le filtre renvoie trop de résultats

- Vérifiez que `logicalOperator` est correctement défini (`"and"` ou `"or"`)
- Vérifiez l’opérateur utilisé (employez `eq` plutôt que `like` pour une correspondance exacte)
- Ajoutez des conditions pour affiner les résultats

#### Erreurs d’analyse JSON

- Vérifiez la syntaxe JSON à l’aide d’un validateur JSON
- Vérifiez que toutes les chaînes sont correctement placées entre guillemets
- Recherchez les virgules finales (interdites en JSON)
- Vérifiez l’imbrication correcte des tableaux et des objets
