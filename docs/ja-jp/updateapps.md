---
layout: doc
---
# サポート対象アプリを更新する

## Update-Evergreen を使う

Evergreen モジュールをインストールした後、サポート対象アプリケーションの関数を `Update-Evergreen` でダウンロードする必要があります。この関数は、対話型セッションと非対話型 CI 展開（Azure Pipelines や GitHub Workflows など）の両方で読みやすい状態を表示します。

::: warning
Evergreen モジュールが動作するには、アプリケーション関数とマニフェストが必要です。Evergreen のインストール後、最初に必ず `Update-Evergreen` を実行してください。
:::

`Update-Evergreen` は [eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps) リポジトリから Evergreen apps とマニフェストの最新リリースをダウンロードし、ファイルを展開してローカルに保存します。

![Update-Evergreen を初めて実行する](/img/update-evergreen.gif)

この関数は `-Force` パラメーターをサポートしています。ローカルにすでにファイルがある場合でも、アプリケーションごとの関数の最新リリースを強制的にダウンロードできます。ローカルにキャッシュされた関数が破損している場合などに、管理者が Evergreen を更新できます。

![Update-Evergreen を -Force パラメーター付きで実行する](/img/update-evergreen-force.gif)

ローカル キャッシュが古い状態で Evergreen をインポートすると、更新を求めるメッセージが表示されます。

![Evergreen をインポートして Update-Evergreen の実行を求められる](/img/import-evergreen.gif)

### 特定のリリースへの更新

`Update-Evergreen` の既定の動作では、[eucpilots/evergreen-apps](https://github.com/EUCPilots/evergreen-apps) リポジトリから最新リリースに更新します。最新ではなく特定のリリースをダウンロードしたい場合もあります。

`Update-Evergreen` は `-Release` パラメーターをサポートしています。このパラメーターには `v25.10.02.22` のようなリリース タグを指定します。リリースを指定する場合は `-Force` パラメーターも必要です。

```powershell
Update-Evergreen -Release "v25.10.02.22" -Force
```

## 更新時の動作

Evergreen がキャッシュを更新するときは、次の動作とルールに従います。

* Evergreen モジュールをインポートすると、最新リリースが確認され、ローカル キャッシュが古い場合は管理者に通知されます。
* `Update-Evergreen` を実行する必要があります。モジュールのインポート時にローカル キャッシュが自動更新されることはありません。
* `Update-Evergreen` の実行時にローカル キャッシュが古い場合、キャッシュは最新リリースに自動更新されます。
* ローカル キャッシュのバージョンが最新リリースと一致する場合、`Update-Evergreen` はキャッシュ済みファイルの SHA-256 チェックサムをリリースと照合します。不足または変更されたファイルは報告されますが、自動的には置き換えられません。キャッシュを再同期するには `Update-Evergreen -Force` を実行します。
* ダウンロードしたリリースのファイルをインストールする前に、`Update-Evergreen` は SHA-256 チェックサムを検証します。検証に失敗した場合、ローカルのアプリケーションとマニフェストは置き換えられません。
* 特定の Evergreen apps リリースをダウンロードすると、ローカル キャッシュは古い状態になります。その後 `Update-Evergreen` を再度実行すると、ローカル キャッシュは最新リリースに更新されます。

## キャッシュの場所

Evergreen はアプリケーション関数とマニフェストを次の場所に保存します。

* Windows - `%LocalAppData%\Evergreen`
* macOS と Linux - `~\.evergreen`

現在のキャッシュの場所は `Get-EvergreenAppsPath` で確認できます。

```powershell
PS C:\> Get-EvergreenAppsPath
C:\Users\aaron\AppData\Local\Evergreen
```

## カスタム キャッシュの場所を設定する

`EVERGREEN_APPS_PATH` 環境変数でカスタム キャッシュの場所を設定できます。この変数をユーザーまたはシステムのコンテキストで構成し、有効なパスを指定してください。

![Windows で EVERGREEN_APPS_PATH を設定する](/img/environment-variable.png)
