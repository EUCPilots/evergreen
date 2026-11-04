---
layout: doc
---
# アプリケーションの詳細を絞り込む

## Where-Object で絞り込む

アプリケーションがパイプラインに複数のオブジェクトを返す場合、`Where-Object` を使って出力を絞り込むことができます。たとえば、`Get-EvergreenApp -Name MicrosoftTeams` は Microsoft Teams インストーラーの **Consumer** および **Enterprise** リリース リングについて、`x86`、`x64`、`ARM64` の各バージョンを返します。Teams の 64 ビット Enterprise 版だけを返すには、次のように出力を絞り込みます。

```powershell
Get-EvergreenApp -Name "MicrosoftTeams" | Where-Object { $_.Architecture -eq "x64" -and $_.Release -eq "Enterprise" }
```

これにより、スクリプトで使用できる 64 ビット Microsoft Teams インストーラーの詳細が返されます。

```powershell
Version      : 25275.2601.4002.2815
Release      : Enterprise
Architecture : x64
Type         : msix
URI          : https://installer.teams.static.microsoft/production-windows-x64/25275.2601.4002.2815/MSTeams-x64.msix
```

Teams の x64 版と ARM64 版を取得するには、`Where-Object` フィルターを次のように変更します。

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

## 自動絞り込み

Evergreen は、Evergreen apps キャッシュ ディレクトリに出力フィルターを追加することで、`Get-EvergreenApp` および `Get-EvergreenAppFromApi` の出力を自動的に絞り込めます。フィルター ファイルが存在すると、出力は常に同じオブジェクトに自動的に絞り込まれます。

フィルターは、キャッシュされた `Apps` および `Manifests` ディレクトリと並ぶ `/Evergreen/Filters` ディレクトリに追加します。たとえば、次の内容を `%LocalAppData%\Evergreen\Filters\MicrosoftTeams.json` として保存すると、`Where-Object` を直接指定した場合と同様に `Get-EvergreenApp` の出力が絞り込まれます。

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

この JSON は、次の指定と同じです。`Where-Object { $_.Architecture -in "x64", "arm64" -and $_.Release -eq "Enterprise" }`

::: tip
フィルター ファイルは有効な JSON であり、アプリケーション関数と同じ名前で `/Evergreen/Filters` ディレクトリに保存する必要があります。例: `/Evergreen/Filters/MicrosoftTeams.json`。
:::

### フィルター JSON の形式

フィルター構成ファイルでは、Evergreen アプリケーション データに対する複雑な絞り込みロジックを定義できます。JSON 構造では、複数のフィルター条件を論理演算子（AND/OR）で組み合わせられます。

### JSON の構造

#### ルート オブジェクト

ルート JSON オブジェクトには、次のプロパティが必要です。

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `filters` | 配列 | はい | 適用する条件を定義するフィルター オブジェクトの配列 |
| `logicalOperator` | 文字列 | いいえ | 複数のフィルターを結合する方法: `"and"` または `"or"`（既定値は `"and"`） |

#### フィルター オブジェクト

`filters` 配列内の各フィルター オブジェクトには、次のプロパティが必要です。

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `property` | 文字列 | はい | 絞り込み対象のプロパティ名（例: "Version"、"Architecture"、"Release"） |
| `operator` | 文字列 | はい | 使用する比較演算子（[サポートされる演算子](#サポートされる演算子)を参照） |
| `value` | 文字列、数値、配列、またはブール値 | はい | 比較対象の値（型は演算子によって異なります） |

### サポートされる演算子

| 演算子 | 説明 | 値の型 | 例 |
|----------|------|------------|---------|
| `eq` | 等しい | 文字列、数値、ブール値 | `"Enterprise"`、`1.0`、`true` |
| `ne` | 等しくない | 文字列、数値、ブール値 | `"Professional"`、`2.0`、`false` |
| `like` | ワイルドカード一致（PowerShell の `-like`） | 文字列 | `"*Enterprise*"`、`"Win*"` |
| `match` | 正規表現一致 | 文字列（正規表現パターン） | `"^2\\..*"`、`"[0-9]+"` |
| `in` | 値が配列に含まれる | 配列 | `["x64", "ARM64"]`、`["Stable", "Beta"]` |
| `gt` | より大きい | 数値、文字列 | `30`、`"2.0.0"` |
| `lt` | より小さい | 数値、文字列 | `100`、`"3.0.0"` |
| `ge` | 以上 | 数値、文字列 | `18`、`"1.5.0"` |
| `le` | 以下 | 数値、文字列 | `65`、`"2.5.0"` |

**注:** 不明な演算子が指定された場合、既定値として `eq`（等しい）が使用されます。

### 論理演算子

`logicalOperator` プロパティは、複数のフィルターを組み合わせる方法を指定します。

- **`"and"`**（既定値）: 項目が一致するには、すべてのフィルター条件を満たす必要があります
- **`"or"`**: 項目が一致するには、少なくとも 1 つのフィルター条件を満たす必要があります

### 例

#### 例 1: シンプルな AND フィルター

Enterprise リリースのうち、アーキテクチャが x64 または ARM64 のものを絞り込みます。

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

次の条件を満たす項目が一致します。
- Release が **"Enterprise" と等しい**、かつ
- Architecture が **配列 ["x64", "ARM64"] に含まれる**

#### 例 2: ワイルドカードを使った OR フィルター

Stable チャネルの項目、または名前に "Enterprise" を含む項目を絞り込みます。

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

**注:** `logicalOperator` は省略可能です。省略した場合は既定値 `"and"` が使用されます。

#### 例 3: 正規表現による一致

正規表現を使って、"2." で始まるバージョンを絞り込みます。

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

**注:** JSON 文字列内では、バックスラッシュを `\` ではなく `\\` としてエスケープしてください。

#### 例 4: 特定の値を除外する

x86 アーキテクチャを除外するフィルターです。

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

#### 例 5: 複数条件を組み合わせたフィルター

指定したアーキテクチャの現行 Stable Enterprise リリースのうち、バージョン 2.0 以上を絞り込みます。

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

### ベスト プラクティス

1. **わかりやすいファイル名を使う**: フィルター ファイルには内容が明確にわかる名前を付けます（例: `enterprise-x64-stable.json`）。

2. **適切な演算子を使う**:
   - 候補値が複数ある場合は `in` を使います
   - 文字列の一部一致には `like` を使います
   - 複雑なパターン一致には `match` を使います
   - 数値やバージョンの比較には比較演算子（`gt`、`lt` など）を使います

3. **プロパティ名が正確であることを確認する**: プロパティ名がデータ内の名前と完全に一致すること（大文字と小文字を区別）を確認します。

4. **値の型を一致させる**: 値の型をデータに合わせます。
   - 文字列: `"value"`
   - 数値: `123`（引用符なし）
   - 配列: `["value1", "value2"]`
   - ブール値: `true` または `false`

5. **正規表現**: JSON 文字列内の特殊文字をエスケープしてください。

6. **論理演算子**: いずれかの条件が一致すればよい場合は `"or"`、すべての条件に一致する必要がある場合は `"and"`（または省略）を使います。

### よく使われるパターン

#### 複数のアーキテクチャで絞り込む
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

#### Stable または Beta チャネルで絞り込む
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

#### プレビュー リリースを除外する
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

### トラブルシューティング

#### フィルター結果がない

- プロパティ名が完全に一致すること（大文字と小文字を含む）を確認します
- 値がオブジェクト内のデータ型と一致することを確認します
- 詳細出力でテストします: `Get-FilteredData -FilterPath "filter.json" -InputObject $data -Verbose`
- 問題を特定するため、フィルターを 1 つに絞って試します

#### フィルター結果が多すぎる

- `logicalOperator` が正しく設定されていること（`"and"` または `"or"`）を確認します
- 演算子の使い方を確認します（完全一致が必要なら `like` ではなく `eq` を使います）
- 結果をさらに絞るフィルター条件を追加します

#### JSON の解析エラー

- JSON バリデーターを使って構文を検証します
- すべての文字列が正しく引用符で囲まれていることを確認します
- 末尾のカンマがないことを確認します（JSON では使用できません）
- 配列とオブジェクトが正しく入れ子になっていることを確認します
