---
layout: doc
---
# So funktioniert Evergreen

::: tip Hinweis
Anwendungsversionen und Downloadinformationen werden ausschließlich aus offiziellen Herstellerquellen (Herstellerwebsite, vom Hersteller betriebene Update-API, offizielle Repositorys des Herstellers auf GitHub oder SourceForge usw.) und niemals von Drittanbietern abgerufen.
:::

Evergreen ermittelt Anwendungsversionen programmgesteuert und gibt mindestens die Versionsnummer und Download-URI zurück. Daher sollte bei jedem Aufruf einer Evergreen-Funktion die neueste Version samt Downloadlink zurückgegeben werden.

Evergreen verwendet verschiedene Strategien, um die neueste Softwareversion zurückzugeben:

1. Anwendungsupdate-APIs – durch dieselbe Vorgehensweise wie die Anwendung selbst kann Evergreen zuverlässig die neueste Versionsnummer und Download-URI zurückgeben, z. B. für [Microsoft Edge](https://github.com/eucpilots/evergreen-module/Evergreen/Public/Get-MicrosoftEdge.ps1), [Mozilla Firefox](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MozillaFirefox.ps1) oder [Microsoft OneDrive](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftOneDrive.ps1). Mit [Fiddler](https://www.telerik.com/fiddler) lässt sich häufig ermitteln, wo eine Anwendung nach Updates sucht.
2. Repository-APIs – Repository-Hosts wie GitHub und SourceForge stellen APIs bereit, über die Anwendungsversionen und Downloadlinks abgerufen werden können, z. B. für [Audacity](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Audacity.ps1), [Notepad++](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-NotepadPlusPlus.ps1) oder [WinMerge](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-WinMerge.ps1).
3. Webseitenabfragen – Downloadseiten von Herstellern enthalten häufig eine Abfrage, die beim Auflisten von Versionen und Downloadlinks JSON zurückgibt. So lässt sich das Scraping der Seite vermeiden. Evergreen kann diese Methode nachbilden, um Download-URLs für Anwendungen zurückzugeben. Sie kann jedoch fehlschlagen, wenn der Hersteller die Funktionsweise seiner Seiten ändert, z. B. bei [Adobe Acrobat Reader DC](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-AdobeAcrobatReaderDC.ps1).
4. Statische URLs – einige Hersteller stellen statische oder Evergreen-URLs für Anwendungsinstaller bereit. Diese URLs enthalten häufig zusätzliche Informationen, anhand derer sich die Anwendungsversion ermitteln lässt, und können zur tatsächlichen Ziel-URL aufgelöst werden, z. B. bei [Microsoft FSLogix Apps](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-MicrosoftFSLogixApps.ps1) oder [Zoom](https://github.com/eucpilots/evergreen-module/Evergreen/Apps/Get-Zoom.ps1).

## Was Evergreen nicht tut

::: info **Evergreen scrapt kein HTML**
Das Scraping von Webseiten zum Analysieren von Text und Ermitteln von Versionszeichenfolgen und Download-URLs kann problematisch sein, wenn sich der Seitentext ändert oder die Seite veraltet ist. Für einige Anwendungen wird zwar RegEx zum Ermitteln von Anwendungseigenschaften (insbesondere Versionsnummern) verwendet, doch sollte diese Vorgehensweise nach Möglichkeit vermieden werden.
:::

Pull Requests für das Evergreen-Projekt, die Webseitenscraping verwenden, werden geschlossen. Für weitere Anwendungen, bei denen Webseitenscraping die einzige Möglichkeit ist, siehe das Projekt [Nevergreen](https://github.com/DanGough/Nevergreen).

::: info **Evergreen fragt keine Nicht-Herstellerquellen ab**
Es sollen dieselben Update-Mechanismen verwendet werden, die auch eine Anwendung zur Suche nach Updates nutzt. Ist dies nicht möglich, kann Evergreen Datenquellen (z. B. JSON oder XML) verwenden, die von der Downloadseite eines Herstellers genutzt werden (z. B. `AdobeAcrobatReaderDC`), oder eine andere vom Hersteller gepflegte Quelle (z. B. ein offizielles GitHub-Repository).
:::
