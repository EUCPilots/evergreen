import assert from 'node:assert/strict'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

test('built module help routes support lowercase and existing locale URLs', async () => {
  const source = 'docs/help'
  const output = '.vitepress/dist/help'
  const locales = (await readdir(source, { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
  const outputLocales = await readdir(output)

  assert.equal(locales.length, 5)

  for (const { name } of locales) {
    const locale = name.toLowerCase()
    const legacyLocale = `${locale.slice(0, 3)}${locale.slice(3).toUpperCase()}`
    assert.ok(outputLocales.includes(locale), `missing lowercase locale directory ${locale}`)
    const pages = (await readdir(path.join(source, name))).filter(page => page.endsWith('.md'))
    assert.ok(pages.length > 0)

    for (const page of pages) {
      const basename = page.slice(0, -3)
      const canonical = path.join(output, locale, `${basename}.html`)
      const html = await readFile(canonical, 'utf8')
      assert.match(html, /<!DOCTYPE html>/i)
      assert.ok(!html.includes('location.replace('), `${canonical} must contain the actual page`)

      const slashRedirect = await readFile(path.join(output, locale, basename, 'index.html'), 'utf8')
      assert.ok(slashRedirect.includes(`/evergreen/help/${locale}/${basename}.html`))
      assert.ok(slashRedirect.includes('location.search + location.hash'))

      const legacyDir = path.join(output, legacyLocale)
      const canonicalStat = await stat(path.join(output, locale))
      const legacyStat = await stat(legacyDir)
      if (canonicalStat.dev !== legacyStat.dev || canonicalStat.ino !== legacyStat.ino) {
        const legacyRedirect = await readFile(path.join(legacyDir, `${basename}.html`), 'utf8')
        assert.ok(legacyRedirect.includes(`/evergreen/help/${locale}/${basename}.html`))
        const legacySlashRedirect = await readFile(path.join(legacyDir, basename, 'index.html'), 'utf8')
        assert.ok(legacySlashRedirect.includes(`/evergreen/help/${locale}/${basename}.html`))
      }
    }
  }
})
