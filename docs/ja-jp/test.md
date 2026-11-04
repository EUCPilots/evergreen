---
layout: doc
---
# インストーラーをテストする

`Test-EvergreenApp` は、`Get-EvergreenApp` が返すインストーラー URL にアクセスできるか確認します。最初に `HEAD` リクエストを送信し、失敗した場合は範囲指定した `GET` で再試行します。出力には URI、ブール値の結果、および利用可能な場合は HTTP ステータス コードが含まれます。

次の例では、Microsoft OneDrive が返す URL を確認します。

```powershell
Get-EvergreenApp -Name "MicrosoftOneDrive" |
    Where-Object { $_.Type -eq "exe" } |
    Test-EvergreenApp
```

出力:

```text
Result StatusCode URI
------ ---------- ---
  True        200 https://example.com/installer.exe
```

## パラメーター

### InputObject

空でない `URI` プロパティを持つアプリケーション オブジェクトです。有効な URI がないオブジェクトに対しては、警告と `False` の結果が返されます。

### リクエスト オプション

`-ConnectionTimeoutSeconds` はリクエストのタイムアウトを設定します（既定値は 30 秒）。`-UserAgent` は既定のユーザー エージェントを上書きします。`-Proxy` でプロキシ サーバーを指定できます。`-ProxyCredential` で資格情報を渡す場合は `-Proxy` が必要です。

### NoProgress

既定では進行状況が抑制されます。`-Verbose` を使うと、`-NoProgress` も指定しない限り、リクエストの進行状況が表示されます。テスト中の URI を確認するには `-Verbose` を使います。

## エイリアス

アプリケーションのテストを簡単に行えるように、`Test-EvergreenApp` には `tea` エイリアスがあります。例:

```powershell
PS /Users/aaron> gea MicrosoftTeams | tea
```
