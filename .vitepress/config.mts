import { defineConfig, type DefaultTheme } from 'vitepress'

const docsSections: { key: string; pages: [string, string][] }[] = [
  {
    key: 'introduction',
    pages: [
      ['about', 'about'],
      ['how', 'how'],
      ['install', 'install'],
      ['apps', 'apps']
    ]
  },
  {
    key: 'using',
    pages: [
      ['updateapps', 'updateapps'],
      ['find', 'find'],
      ['use', 'use'],
      ['filter', 'filter'],
      ['save', 'save'],
      ['test', 'test'],
      ['export', 'export'],
      ['github', 'github'],
      ['examples', 'examples']
    ]
  },
  {
    key: 'libraries',
    pages: [
      ['newlibrary', 'newlibrary'],
      ['updatelibrary', 'updatelibrary'],
      ['getlibrary', 'getlibrary'],
      ['getlibraryapp', 'getlibraryapp']
    ]
  },
  {
    key: 'workbench',
    pages: [
      ['workbench', 'workbench'],
      ['workbench-web', 'workbenchWeb'],
      ['workbench-install', 'workbenchInstall'],
      ['workbench-desktop', 'workbenchDesktop']
    ]
  },
  {
    key: 'api',
    pages: [
      ['api', 'api'],
      ['endpoints', 'endpoints'],
      ['api-usage', 'apiUsage']
    ]
  },
  {
    key: 'resources',
    pages: [
      ['under', 'under'],
      ['troubleshoot', 'troubleshoot'],
      ['issues', 'issues']
    ]
  },
  {
    key: 'moduleHelp',
    pages: [
      ['about_Evergreen', 'about_Evergreen'],
      ['Find-EvergreenApp', 'Find-EvergreenApp'],
      ['Get-EvergreenApp', 'Get-EvergreenApp'],
      ['Get-EvergreenAppFromApi', 'Get-EvergreenAppFromApi'],
      ['Get-EvergreenAppFromLibrary', 'Get-EvergreenAppFromLibrary'],
      ['Get-EvergreenAppsPath', 'Get-EvergreenAppsPath'],
      ['Get-EvergreenAppsVersion', 'Get-EvergreenAppsVersion'],
      ['Get-EvergreenEndpointFromApi', 'Get-EvergreenEndpointFromApi'],
      ['Get-EvergreenLibrary', 'Get-EvergreenLibrary'],
      ['New-EvergreenLibrary', 'New-EvergreenLibrary'],
      ['Export-EvergreenApp', 'Export-EvergreenApp'],
      ['Export-EvergreenManifest', 'Export-EvergreenManifest'],
      ['Remove-EvergreenLibraryAppVersion', 'Remove-EvergreenLibraryAppVersion'],
      ['Save-EvergreenApp', 'Save-EvergreenApp'],
      ['Start-EvergreenLibraryUpdate', 'Start-EvergreenLibraryUpdate'],
      ['Test-EvergreenApp', 'Test-EvergreenApp'],
      ['Update-Evergreen', 'Update-Evergreen'],
      ['ConvertTo-DotNetVersionClass', 'ConvertTo-DotNetVersionClass']
    ]
  }
]

const sidebarLabels: Record<string, Record<string, string>> = {
  'fr-fr': {
    introduction: 'Introduction',
    about: 'À propos d’Evergreen',
    how: 'Fonctionnement',
    install: 'Installation',
    apps: 'Applications prises en charge',
    using: 'Utilisation',
    updateapps: 'Mise à jour des applications',
    find: 'Recherche des applications',
    use: 'Détails des applications',
    filter: 'Filtrage des détails',
    save: 'Téléchargement des installateurs',
    test: 'Test des URL',
    export: 'Exportation des versions',
    github: 'Limites de débit GitHub',
    examples: 'Exemples',
    libraries: 'Bibliothèques',
    newlibrary: 'Création d’une bibliothèque',
    updatelibrary: 'Mise à jour d’une bibliothèque',
    getlibrary: 'Détails d’une bibliothèque',
    getlibraryapp: 'Installation depuis une bibliothèque',
    workbench: 'Workbench',
    workbenchWeb: 'Workbench Web',
    workbenchInstall: 'Installation du Workbench Desktop',
    workbenchDesktop: 'Utilisation du Workbench Desktop',
    api: 'API Evergreen',
    endpoints: 'Points de terminaison',
    apiUsage: 'Utilisation de l’API',
    resources: 'Ressources',
    under: 'Fonctionnement interne',
    troubleshoot: 'Dépannage',
    issues: 'Problèmes connus',
    moduleHelp: 'Aide du module'
  },
  'de-de': {
    introduction: 'Einführung',
    about: 'Über Evergreen',
    how: 'Funktionsweise',
    install: 'Installation',
    apps: 'Unterstützte Anwendungen',
    using: 'Verwendung',
    updateapps: 'Unterstützte Anwendungen aktualisieren',
    find: 'Unterstützte Anwendungen suchen',
    use: 'Anwendungsdetails abrufen',
    filter: 'Anwendungsdetails filtern',
    save: 'Installationsdateien herunterladen',
    test: 'URLs testen',
    export: 'Versionsinformationen exportieren',
    github: 'GitHub-Ratenbegrenzungen',
    examples: 'Beispiele',
    libraries: 'Bibliotheken',
    newlibrary: 'Bibliothek erstellen',
    updatelibrary: 'Bibliothek aktualisieren',
    getlibrary: 'Bibliotheksdetails abrufen',
    getlibraryapp: 'Anwendung aus einer Bibliothek installieren',
    workbench: 'Workbench',
    workbenchWeb: 'Web-Workbench',
    workbenchInstall: 'Desktop-Workbench installieren',
    workbenchDesktop: 'Desktop-Workbench verwenden',
    api: 'Evergreen-API',
    endpoints: 'Endpunkte',
    apiUsage: 'API-Verwendung',
    resources: 'Ressourcen',
    under: 'Hinter den Kulissen',
    troubleshoot: 'Problembehandlung',
    issues: 'Bekannte Probleme',
    moduleHelp: 'Modulhilfe'
  },
  'es-es': {
    introduction: 'Introducción',
    about: 'Acerca de Evergreen',
    how: 'Funcionamiento',
    install: 'Instalación',
    apps: 'Aplicaciones compatibles',
    using: 'Uso',
    updateapps: 'Actualizar aplicaciones compatibles',
    find: 'Buscar aplicaciones compatibles',
    use: 'Consultar detalles de aplicaciones',
    filter: 'Filtrar detalles de aplicaciones',
    save: 'Descargar instaladores',
    test: 'Probar URL',
    export: 'Exportar información de versiones',
    github: 'Límites de velocidad de GitHub',
    examples: 'Ejemplos',
    libraries: 'Bibliotecas',
    newlibrary: 'Crear una biblioteca',
    updatelibrary: 'Actualizar una biblioteca',
    getlibrary: 'Consultar detalles de una biblioteca',
    getlibraryapp: 'Instalar una aplicación desde una biblioteca',
    workbench: 'Workbench',
    workbenchWeb: 'Workbench web',
    workbenchInstall: 'Instalar Workbench de escritorio',
    workbenchDesktop: 'Usar Workbench de escritorio',
    api: 'API de Evergreen',
    endpoints: 'Puntos de conexión',
    apiUsage: 'Uso de la API',
    resources: 'Recursos',
    under: 'Funcionamiento interno',
    troubleshoot: 'Solución de problemas',
    issues: 'Problemas conocidos',
    moduleHelp: 'Ayuda del módulo'
  },
  'ja-jp': {
    introduction: 'はじめに',
    about: 'Evergreen について',
    how: '仕組み',
    install: 'インストール',
    apps: 'サポート対象のアプリ',
    using: '使い方',
    updateapps: 'サポート対象アプリの更新',
    find: 'サポート対象アプリの検索',
    use: 'アプリの詳細を取得',
    filter: 'アプリの詳細をフィルター',
    save: 'インストーラーのダウンロード',
    test: 'URL のテスト',
    export: 'バージョン情報のエクスポート',
    github: 'GitHub のレート制限',
    examples: '使用例',
    libraries: 'ライブラリ',
    newlibrary: 'ライブラリの作成',
    updatelibrary: 'ライブラリの更新',
    getlibrary: 'ライブラリの詳細を取得',
    getlibraryapp: 'ライブラリからアプリをインストール',
    workbench: 'Workbench',
    workbenchWeb: 'Web Workbench の使用',
    workbenchInstall: 'デスクトップ Workbench のインストール',
    workbenchDesktop: 'デスクトップ Workbench の使用',
    api: 'Evergreen API',
    endpoints: 'エンドポイント',
    apiUsage: 'API の使用方法',
    resources: 'リソース',
    under: '内部の仕組み',
    troubleshoot: 'トラブルシューティング',
    issues: '既知の問題',
    moduleHelp: 'モジュールのヘルプ'
  }
}

function createLocaleSidebar(locale: string) {
  const labels = sidebarLabels[locale]

  return docsSections.map(({ key, pages }) => ({
    text: labels[key],
    collapsed: false,
    items: pages.map(([page, label]) => ({
      text: labels[label],
      link: key === 'moduleHelp'
        ? `/help/${locale}/${page}`
        : `/${locale}/${page}`
    }))
  }))
}

const navLabels: Record<string, Record<string, string>> = {
  'fr-fr': {
    home: 'Accueil',
    about: 'À propos',
    gettingStarted: 'Bien démarrer',
    workbench: 'Workbench',
    help: 'Aide PowerShell',
    solutions: 'Solutions',
    nerdio: 'Applications Shell Nerdio Manager'
  },
  'de-de': {
    home: 'Startseite',
    about: 'Über Evergreen',
    gettingStarted: 'Erste Schritte',
    workbench: 'Workbench',
    help: 'PowerShell-Hilfe',
    solutions: 'Lösungen',
    nerdio: 'Nerdio Manager Shell-Apps'
  },
  'es-es': {
    home: 'Inicio',
    about: 'Acerca de Evergreen',
    gettingStarted: 'Primeros pasos',
    workbench: 'Workbench',
    help: 'Ayuda de PowerShell',
    solutions: 'Soluciones',
    nerdio: 'Aplicaciones Shell de Nerdio Manager'
  },
  'ja-jp': {
    home: 'ホーム',
    about: 'Evergreen について',
    gettingStarted: 'はじめに',
    workbench: 'Workbench',
    help: 'PowerShell ヘルプ',
    solutions: 'ソリューション',
    nerdio: 'Nerdio Manager Shell Apps'
  }
}

function createLocaleNav(locale: string) {
  const labels = navLabels[locale]

  return [
    { text: labels.home, link: `/${locale}/` },
    { text: labels.about, link: `/${locale}/about` },
    { text: labels.gettingStarted, link: `/${locale}/install` },
    { text: labels.workbench, link: `/${locale}/workbench` },
    { text: labels.help, link: `/help/${locale}/about_Evergreen` },
    {
      text: labels.solutions,
      items: [
        { text: 'PSPackagefactory', link: 'https://stealthpuppy.com/packagefactory/' },
        { text: labels.nerdio, link: 'https://stealthpuppy.com/nerdio-shell-apps-p1/' },
        { text: 'Rimo3', link: 'https://stealthpuppy.com/rimo3-evergreen/' }
      ]
    }
  ]
}

const resolveLocalePage: DefaultTheme.I18nRouting = (data, route, targetLocale) => {
  const targetLocaleLink = data.site.value.locales[targetLocale]?.link
    || (targetLocale === 'root' ? '/' : `/${targetLocale}/`)

  if (route.data.relativePath === 'index.md' || route.data.relativePath.endsWith('/index.md')) {
    return `${targetLocaleLink}${route.query}${route.hash}`
  }

  const helpPage = route.data.relativePath.match(
    /^help\/(?:en-us|fr-fr|de-de|es-es|ja-jp)\/(.+?)(?:\.md)?$/
  )

  if (helpPage) {
    const helpLocale = targetLocale === 'root' ? 'en-us' : targetLocale
    return `/help/${helpLocale}/${helpPage[1]}${route.query}${route.hash}`
  }

  const currentLocaleLink = data.site.value.locales[data.localeIndex.value]?.link
    || (data.localeIndex.value === 'root' ? '/' : `/${data.localeIndex.value}/`)
  const pagePath = route.data.relativePath
    .slice(currentLocaleLink.length - 1)
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return `${targetLocaleLink}${pagePath}${route.query}${route.hash}`
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './docs',
  title: "Evergreen",
  description: "Enterprise automation for Windows applications and image management.",
  head: [['link', { rel: 'icon', href: '/evergreen/favicon.ico' }]],
  lastUpdated: true,
  base: '/evergreen/',
  sitemap: {
    hostname: 'https://eucpilots.github.io/evergreen/'
  },
  cleanUrls: true,
  // ignoreDeadLinks: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    'fr-fr': {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr-fr/',
      title: 'Evergreen',
      description: 'Automatisation d’entreprise pour les applications Windows et la gestion des images.',
      themeConfig: {
        sidebar: createLocaleSidebar('fr-fr'),
        nav: createLocaleNav('fr-fr')
      }
    },
    'de-de': {
      label: 'Deutsch',
      lang: 'de-DE',
      link: '/de-de/',
      title: 'Evergreen',
      description: 'Unternehmensautomatisierung für Windows-Anwendungen und Imageverwaltung.',
      themeConfig: {
        sidebar: createLocaleSidebar('de-de'),
        nav: createLocaleNav('de-de')
      }
    },
    'es-es': {
      label: 'Español',
      lang: 'es-ES',
      link: '/es-es/',
      title: 'Evergreen',
      description: 'Automatización empresarial para aplicaciones de Windows y administración de imágenes.',
      themeConfig: {
        sidebar: createLocaleSidebar('es-es'),
        nav: createLocaleNav('es-es')
      }
    },
    'ja-jp': {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja-jp/',
      title: 'Evergreen',
      description: 'Windows アプリケーションとイメージ管理のためのエンタープライズ自動化。',
      themeConfig: {
        sidebar: createLocaleSidebar('ja-jp'),
        nav: createLocaleNav('ja-jp')
      }
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: resolveLocalePage,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Getting started', link: '/install' },
      { text: 'Workbench', link: '/workbench' },
      { text: 'Solutions',
        items: [
          { text: 'PSPackagefactory', link: 'https://stealthpuppy.com/packagefactory/' },
          { text: 'Nerdio Manager Shell Apps', link: 'https://stealthpuppy.com/nerdio-shell-apps-p1/' },
          { text: 'Rimo3', link: 'https://stealthpuppy.com/rimo3-evergreen/' }
        ]
      }
    ],

    logo: '/img/evergreenbulb.png',
    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'About Evergreen', link: '/about' },
          { text: 'How Evergreen works', link: '/how' },
          { text: 'Installing Evergreen', link: '/install' },
          { text: 'Supported apps', link: '/apps' },
        ]
      },
      {
        text: 'Using Evergreen',
        collapsed: false,
        items: [
          { text: 'Update supported apps', link: '/updateapps' },
          { text: 'Find supported apps', link: '/find' },
          { text: 'Return app details', link: '/use' },
          { text: 'Filter app details', link: '/filter' },
          { text: 'Download installers', link: '/save' },
          { text: 'Test URLs', link: '/test' },
          { text: 'Export version information', link: '/export' },
          { text: 'Working with GitHub rate limits', link: '/github' },
          { text: 'Example usage', link: '/examples' }
        ]
      },
      {
        text: 'Libraries',
        collapsed: false,
        items: [
          { text: 'Create a library', link: '/newlibrary' },
          { text: 'Update a library', link: '/updatelibrary' },
          { text: 'Retrieve details from an Evergreen library', link: '/getlibrary' },
          { text: 'Install an application from a library', link: '/getlibraryapp' }
        ]
      },
      {
        text: 'Workbench',
        collapsed: false,
        items: [
          { text: 'About the Workbench', link: '/workbench' },
          { text: 'Using the Web Workbench', link: '/workbench-web' },
          { text: 'Installing the Desktop Workbench', link: '/workbench-install' },
          { text: 'Using the Desktop Workbench', link: '/workbench-desktop' }
        ]
      },
      {
        text: 'Evergreen API',
        collapsed: false,
        items: [
          { text: 'How to use the Evergreen API', link: '/api' },
          { text: 'List endpoints used by Evergreen', link: '/endpoints' },
          { text: 'API usage', link: '/api-usage' },
        ]
      },
      {
        text: 'Resources',
        collapsed: false,
        items: [
          { text: 'Under the hood', link: '/under' },
          { text: 'Troubleshooting', link: '/troubleshoot' },
          { text: 'Known issues', link: '/issues' },
          { text: 'Change log', link: 'https://github.com/EUCPilots/evergreen-module/blob/main/CHANGELOG.md' },
          { text: 'PowerShell Gallery', link: 'https://www.powershellgallery.com/packages/Evergreen/' }
        ]
      },
      {
        text: 'Module help',
        collapsed: true,
        items: [
          { text: 'about_Evergreen', link: '/help/en-us/about_Evergreen' },
          { text: 'Find-EvergreenApp', link: '/help/en-us/Find-EvergreenApp' },
          { text: 'Get-EvergreenApp', link: '/help/en-us/Get-EvergreenApp' },
          { text: 'Save-EvergreenApp', link: '/help/en-us/Save-EvergreenApp' },
          { text: 'Test-EvergreenApp', link: '/help/en-us/Test-EvergreenApp' },
          { text: 'New-EvergreenLibrary', link: '/help/en-us/New-EvergreenLibrary' },
          { text: 'Start-EvergreenLibraryUpdate', link: '/help/en-us/Start-EvergreenLibraryUpdate' },
          { text: 'Get-EvergreenLibrary', link: '/help/en-us/Get-EvergreenLibrary' },
          { text: 'Get-EvergreenAppFromLibrary', link: '/help/en-us/Get-EvergreenAppFromLibrary' },
          { text: 'Export-EvergreenApp', link: '/help/en-us/Export-EvergreenApp' },
          { text: 'Export-EvergreenManifest', link: '/help/en-us/Export-EvergreenManifest' },
          { text: 'Get-EvergreenAppFromApi', link: '/help/en-us/Get-EvergreenAppFromApi' },
          { text: 'Get-EvergreenEndpointFromApi', link: '/help/en-us/Get-EvergreenEndpointFromApi' },
          { text: 'Get-EvergreenAppsPath', link: '/help/en-us/Get-EvergreenAppsPath' },
          { text: 'Get-EvergreenAppsVersion', link: '/help/en-us/Get-EvergreenAppsVersion' },
          { text: 'Remove-EvergreenLibraryAppVersion', link: '/help/en-us/Remove-EvergreenLibraryAppVersion' },
          { text: 'Update-Evergreen', link: '/help/en-us/Update-Evergreen' },
          { text: 'ConvertTo-DotNetVersionClass', link: '/help/en-us/ConvertTo-DotNetVersionClass' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eucpilots/evergreen-module' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/stealthpuppy.com' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/aaronedwardparker/' },
    ],

    footer: {
      message: 'A stealthpuppy project.',
      copyright: 'Copyright &copy; 2026 Aaron Parker. <a target="_blank" href="https://icons8.com/icon/tI2IB1EJFmdP/greentech">Greentech</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
    },

    editLink: {
      pattern: 'https://github.com/EUCPilots/evergreen/edit/main/:path'
    }
  }
})
