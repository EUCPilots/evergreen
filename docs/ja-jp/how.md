---
layout: doc
---
# Evergreen の仕組み

::: tip 注
アプリケーションのバージョンとダウンロード情報は、公式のベンダー ソース（ベンダーの Web サイト、ベンダーが管理するアプリケーション更新 API、GitHub や SourceForge 上のベンダー公式リポジトリなど）からのみ取得され、サードパーティから取得されることはありません。
:::

Evergreen は、アプリケーションのバージョン番号とダウンロード URI を少なくともプログラムで返す方法を採用しています。そのため Evergreen 関数を実行するたびに、最新バージョンとダウンロード リンクが返されるはずです。

Evergreen はソフトウェアの最新バージョンを返すために、次の複数の方法を使用します。

1. アプリケーション更新 API - アプリケーション自身と同じ方法を使うことで、Evergreen は最新バージョン番号とダウンロード URI を一貫して返せます。例: [Microsoft Edge](https://github.com/eucpilots/evergreen-module/Evergreen/Public/Get-MicrosoftEdge.ps1)、[Mozilla Firefox](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MozillaFirefox.ps1)、[Microsoft OneDrive](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftOneDrive.ps1)。アプリケーションが更新を確認する際の問い合わせ先を見つけるには、[Fiddler](https://www.telerik.com/fiddler) が役立つことがあります
2. リポジトリ API - GitHub や SourceForge などのリポジトリ ホストが提供する API を照会し、アプリケーションのバージョンとダウンロード リンクを取得します。例: [Audacity](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Audacity.ps1)、[Notepad++](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-NotepadPlusPlus.ps1)、[WinMerge](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-WinMerge.ps1)
3. Web ページへの問い合わせ - ベンダーのダウンロード ページが、バージョンやダウンロード リンクの一覧を取得する JSON クエリを提供していることがあります。この方法ならページのスクレイピングを避けられます。Evergreen はこの方法を模倣してアプリケーションのダウンロード URL を返せますが、ベンダーがページの仕組みを変更すると動作しなくなる可能性があります。例: [Adobe Acrobat Reader DC](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-AdobeAcrobatReaderDC.ps1)
4. 静的 URL - ベンダーによっては、アプリケーション インストーラー用の静的 URL や常に最新バージョンを指す URL を提供しています。この URL に含まれる追加情報からアプリケーションのバージョンを判定でき、実際の URL に解決できます。例: [Microsoft FSLogix Apps](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftFSLogixApps.ps1)、[Zoom](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Zoom.ps1)

## Evergreen が行わないこと

::: info **Evergreen は HTML をスクレイピングしません**
Web ページをスクレイピングしてテキストを解析し、バージョン文字列やダウンロード URL を判定する方法は、ページ内のテキストが変更されたり、ページが古くなったりすると問題が起きることがあります。一部のアプリケーションでは正規表現を使ってアプリケーションのプロパティ（特にバージョン番号）を判定しますが、可能な限りこの方法は使用しません。
:::

Web ページのスクレイピングを使う Evergreen プロジェクトへのプルリクエストはクローズされます。スクレイピング以外に方法がないアプリケーションについては、[Nevergreen](https://github.com/DanGough/Nevergreen) プロジェクトを参照してください。

::: info **Evergreen はベンダー以外のソースを照会しません**
アプリケーション自身が更新を確認する際に使う仕組みを使用することを意図しています。それができない場合、Evergreen はベンダーのダウンロード ページで使われているデータ ソース（例: `AdobeAcrobatReaderDC` の JSON や XML）や、ベンダーが管理する別のソース（例: 公式 GitHub リポジトリ）を使用することがあります。
:::
