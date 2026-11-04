---
layout: doc
---
# Evergreen API - 使用ガイド

このページでは、Evergreen API（OpenAPI 3.0、バージョン 1.6.0）の呼び出し方法を説明します。ベース URL、認証、必須ヘッダー、一般的なエンドポイント、リクエスト例（curl、PowerShell、Node）、一般的なレスポンス、および使用上のヒントをまとめています。

**💡 API を対話形式で調べるには、[Swagger UI を使った完全な API ドキュメント](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/)を参照してください。**

## ベース URL

- プライマリ: `https://evergreen-api.stealthpuppy.com/`

このドキュメントのすべてのエンドポイントは、このベース URL からの相対パスです。

## 認証とヘッダー

認証は不要です。すべてのリクエストに、呼び出し元のアプリケーションまたは組織を識別するカスタム `User-Agent` ヘッダーを含める必要があります。例: `App-Pipeline/1.0.0 (Contoso; https://contoso.com)`。

## コンテンツ タイプ

- リクエスト: 該当する場合は `application/json` を使用します。
- レスポンス: この API の対象エンドポイントは JSON を返します。

## 便利なエンドポイント（概要）

- `GET /apps` - サポートされているすべてのアプリケーションを一覧表示します
- `GET /app/{appId}` - 指定したアプリケーションの詳細を取得します（`{appId}` はアプリケーション識別子に置き換えます）
- `GET /endpoints/versions` - Evergreen がバージョン番号とダウンロード情報を返す際に使用するホスト名を返します
- `GET /endpoints/downloads` - アプリケーション インストーラーのダウンロードに使用するホスト名を返します
- `GET /health` - API の正常性と診断情報を返します

これらは、最もよく使われるエンドポイントです。

### 例: サポートされているアプリケーションの一覧（GET /apps）

リクエスト（curl）:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/apps"
```

レスポンス例（200）:

```json
[
  {
    "Name": "MicrosoftEdge",
    "Application": "Microsoft Edge",
    "Link": "https://www.microsoft.com/edge"
  },
  {
    "Name": "MozillaFirefox",
    "Application": "Mozilla Firefox",
    "Link": "https://www.mozilla.org/firefox"
  }
]
```

PowerShell（Invoke-RestMethod）:

```powershell
Invoke-RestMethod -Uri 'https://evergreen-api.stealthpuppy.com/apps' -Method Get -Headers @{'User-Agent' = 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
```

Node（fetch）:

```js
const fetch = require('node-fetch');
async function listApps(){
  const res = await fetch('https://evergreen-api.stealthpuppy.com/apps', {
    headers: {
      'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'
    }
  });
  const json = await res.json();
  console.log(json);
}
listApps();
```

Python（requests）:

```python
import requests

headers = {'User-Agent': 'App-Pipeline/1.0.0 (Contoso; https://contoso.com)'}
resp = requests.get('https://evergreen-api.stealthpuppy.com/apps', headers=headers)
resp.raise_for_status()
data = resp.json()
print(data)
```

### 例: アプリケーションの詳細を取得（GET /app/{appId}）

リクエスト（curl）- `/apps` の Name 値である `MicrosoftEdge` に置き換えます:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/app/MicrosoftEdge"
```

レスポンス例（200）:

```json
{
  "Version": "138.0.3351.109",
  "URI": "https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/.../MicrosoftEdgeEnterpriseX64.msi",
  "Size": 157286400,
  "Architecture": "x64",
  "Type": "msi",
  "Language": "en-US"
}
```

注:
- レスポンスは必須の `Version` および `URI` フィールドを含むオブジェクトです。`Size`、`Architecture`、`Type`、`Language` は利用可能な場合に含まれます。

### 例: エンドポイントの一覧

GET `/endpoints/versions` と GET `/endpoints/downloads` は、オブジェクトの配列を返します。各オブジェクトはアプリケーションを識別し、ホスト名の `Endpoints` 配列を含みます。Evergreen のホストへの通信を許可する必要がある場合（ファイアウォール ルールやプロキシなど）に、これらの一覧を使用します。

呼び出し例（curl）:

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/endpoints/versions"
```

レスポンス例（200）:

```json
[
  {
    "Application": "Microsoft Edge",
    "Endpoints": ["edgeupdates.microsoft.com", "www.microsoft.com"]
  }
]
```

### 例: 正常性チェック（GET /health）

正常性エンドポイントは全体的な状態、バインディングの利用可否、環境を報告します。キャッシュおよび KV の診断情報が含まれる場合もあります。

```bash
curl -sS -H "User-Agent: App-Pipeline/1.0.0 (Contoso; https://contoso.com)" "https://evergreen-api.stealthpuppy.com/health"
```

レスポンス例（200）:

```json
{
  "status": "ok",
  "timestamp": "2025-10-12T10:30:00.000Z",
  "bindings": {
    "evergreen": true,
    "logsBucket": true
  },
  "environment": "production",
  "kvTest": {
    "accessible": true,
    "hasAllapps": true,
    "allappsType": "object"
  }
}
```

## エラー処理

- API は標準の HTTP ステータス コードに従います。2xx 以外のレスポンスはエラーを示します。
- `User-Agent` ヘッダーがない、または無効な場合は `400`、不明なアプリケーションの場合は `404` が返されます。
- エラー レスポンスには人が読める `message` が含まれ、`documentation` URL が含まれる場合もあります。
- クライアント エラー（4xx）の場合はリクエスト（パラメーターや URL エンコード）を確認します。サーバー エラー（5xx）の場合は、後でもう一度試すか API の運用者に問い合わせてください。

## ヒント

- スクリプトでは、一時的なネットワーク エラーに備えて短い再試行・バックオフ処理を含めてください。
- [対話型 API ドキュメント](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/)を使って、利用可能なすべてのエンドポイントを確認できます。

## このドキュメントについて

この使用ガイドは OpenAPI 3.0 仕様（バージョン 1.6.0）に基づいています。エンドポイント、パラメーター、レスポンス スキーマの完全な仕様については、[API ドキュメント](https://app.swaggerhub.com/apis/stealthpuppy/evergreen-api/)を参照してください。
