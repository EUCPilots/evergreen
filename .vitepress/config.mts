import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './docs',
  title: "Evergreen",
  description: "Enterprise automation for Windows applications and image management.",
  head: [['link', { rel: 'icon', href: '/evergreen-docs/favicon.ico' }]],
  lastUpdated: true,
  base: '/evergreen-docs/',
  sitemap: {
    hostname: 'https://eucpilots.github.io/evergreen-docs/'
  },
  cleanUrls: true,
  // ignoreDeadLinks: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Getting started', link: '/install' },
      { text: 'Workbench', link: '/workbench' },
      { text: 'Solutions',
        items: [
          { text: 'App Tracker', link: 'https://stealthpuppy.com/apptracker/' },
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
        text: 'Evergreen API',
        collapsed: false,
        items: [
          { text: 'How to use the Evergreen API', link: '/api' },
          { text: 'List endpoints used by Evergreen', link: '/endpoints' },
          { text: 'API usage', link: '/api-usage' },
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
        text: 'Resources',
        collapsed: false,
        items: [
          { text: 'Under the hood', link: '/under' },
          { text: 'Troubleshooting', link: '/troubleshoot' },
          { text: 'Known issues', link: '/issues' },
          { text: 'Change log', link: '/changelog' },
          { text: 'PowerShell Gallery', link: 'https://www.powershellgallery.com/packages/Evergreen/' }
        ]
      },
      {
        text: 'Module help',
        collapsed: true,
        items: [
          { text: 'about_Evergreen', link: '/help/en-US/about_Evergreen' },
          { text: 'Find-EvergreenApp', link: '/help/en-US/Find-EvergreenApp' },
          { text: 'Get-EvergreenApp', link: '/help/en-US/Get-EvergreenApp' },
          { text: 'Save-EvergreenApp', link: '/help/en-US/Save-EvergreenApp' },
          { text: 'Test-EvergreenApp', link: '/help/en-US/Test-EvergreenApp' },
          { text: 'New-EvergreenLibrary', link: '/help/en-US/New-EvergreenLibrary' },
          { text: 'Start-EvergreenLibraryUpdate', link: '/help/en-US/Start-EvergreenLibraryUpdate' },
          { text: 'Get-EvergreenLibrary', link: '/help/en-US/Get-EvergreenLibrary' },
          { text: 'Get-EvergreenAppFromLibrary', link: '/help/en-US/Get-EvergreenAppFromLibrary' },
          { text: 'Export-EvergreenApp', link: '/help/en-US/Export-EvergreenApp' },
          { text: 'Export-EvergreenManifest', link: '/help/en-US/Export-EvergreenManifest' },
          { text: 'Get-EvergreenAppFromApi', link: '/help/en-US/Get-EvergreenAppFromApi' },
          { text: 'Get-EvergreenEndpointFromApi', link: '/help/en-US/Get-EvergreenEndpointFromApi' },
          { text: 'Get-EvergreenAppsPath', link: '/help/en-US/Get-EvergreenAppsPath' },
          { text: 'Update-Evergreen', link: '/help/en-US/Update-Evergreen' },
          { text: 'ConvertTo-DotNetVersionClass', link: '/help/en-US/ConvertTo-DotNetVersionClass' }
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
      pattern: 'https://github.com/EUCPilots/evergreen-docs/edit/main/:path'
    }
  }
})
