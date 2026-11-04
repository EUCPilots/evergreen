---
layout: doc
---
# GitHub のレート制限への対応

Evergreen がサポートするアプリケーションのうち 150 以上は、GitHub リポジトリでホストされるか、最新バージョンを判定するために GitHub リポジトリからデータを取得します。Evergreen は、これらのアプリケーションの詳細を照会する際に GitHub REST API を使用します。

`Get-EvergreenApp` と `Update-Evergreen` は、どちらも GitHub REST API にリクエストを送信します。

- `Get-EvergreenApp` は、GitHub でホストされているアプリケーションのリリースとタグを照会し、バージョンとダウンロード情報を返します
- `Update-Evergreen` は、[eucpilots/evergreen-apps](https://github.com/eucpilots/evergreen-apps) リポジトリから最新のアプリケーション関数とマニフェストをダウンロードします

GitHub API は認証されていないリクエストにレート制限を設けており、1 つの IP アドレスあたり 1 時間に 60 件までです。Evergreen を頻繁に実行する環境や複数のセッションで実行する環境では、この制限にすぐ達する可能性があります。詳細は[REST API のレート制限](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)を参照してください。

パーソナル アクセス トークンでリクエストを認証すると、制限は 1 時間あたり 5,000 件に引き上げられます。

## パーソナル アクセス トークンの作成

Evergreen は[パーソナル アクセス トークン](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)による認証済みリクエストをサポートしています。[Fine-grained パーソナル アクセス トークン](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)を推奨します。

パブリック リポジトリへの読み取り専用アクセス権を持つトークンで十分です。追加のスコープや権限は必要ありません。パブリック リポジトリの読み取りだけが必要なので、有効期限を長めに設定しても問題ありませんが、トークンは安全に管理してください。

![Fine-grained パーソナル アクセス トークン](/img/github-pat.png)

## GITHUB_TOKEN 環境変数の設定

Evergreen は `GITHUB_TOKEN` または `GH_TOKEN` 環境変数を読み取ります。いずれかの変数にパーソナル アクセス トークンを設定すると、Evergreen は GitHub API へのリクエストを自動的に認証します。`Get-EvergreenApp` と `Update-Evergreen` は、追加設定なしでトークンを使用します。

### Windows

現在のユーザー用に変数を永続的に設定する（セッションや再起動後も保持する）には、次のようにします。

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "User")
```

コンピューターのすべてのユーザー用に設定するには（管理者権限が必要）、次のようにします。

```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "<your-token>", "Machine")
```

Windows UI の **システムのプロパティ > 詳細設定 > 環境変数** から設定することもできます。

現在の PowerShell セッションだけに設定するには、次のようにします。

```powershell
$env:GITHUB_TOKEN = "<your-token>"
```

### macOS と Linux

変数を永続的に設定するには、次の行をシェル プロファイル（Zsh の場合は `~/.zshrc`、Bash の場合は `~/.bashrc` または `~/.bash_profile`）に追加します。

```bash
export GITHUB_TOKEN="<your-token>"
```

保存したら、プロファイルを再読み込みします。

```bash
source ~/.zshrc  # or source ~/.bashrc
```

現在のシェル セッションだけに設定するには、次のようにします。

```bash
export GITHUB_TOKEN="<your-token>"
```

## GitHub Actions

Evergreen を GitHub Actions ワークフローで実行する場合、`GITHUB_TOKEN` シークレットが自動的に利用可能になるため、別途パーソナル アクセス トークンを用意する必要はありません。詳細は[ワークフローで GITHUB_TOKEN を認証に使用する](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)を参照してください。

トークンを環境変数として利用できるようにするには、ワークフロー ファイルの先頭に次の内容を追加します。

```yaml
# Environment variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

ワークフローの実行時に Evergreen が変数を自動的に取得します。

## レート制限の状態を確認する

GitHub をソースとして使用するアプリケーションに対して `Get-EvergreenApp` を実行するとき、`-Verbose` を渡すと API リクエストの残数が出力されます。

```powershell
Get-EvergreenApp -Name "MicrosoftBicep" -Verbose
```

詳細出力には、次のような行が含まれます。

```
VERBOSE: Get-GitHubRateLimit: Remaining requests to the GitHub API: 58 of 60
```

レート制限に達すると、Evergreen は `RateLimited` バージョン オブジェクトを返し、警告を出力します。Evergreen を実行する前に `GITHUB_TOKEN` または `GH_TOKEN` を設定すると解消できます。
