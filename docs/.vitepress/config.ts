import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'IA Proyecto Base',
  description: 'Base project for AI-assisted web development with Nuxt 4, Vue 3, Pinia and PrimeVue.',

  base: '/ia-proyecto-base/',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Standards', link: '/standards/' },
      { text: 'Commands', link: '/commands/' },
      {
        text: 'GitHub',
        link: 'https://github.com/dbetancorfp/ia-proyecto-base',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Workflow Overview', link: '/guide/workflow' },
            { text: 'AI Roles', link: '/guide/roles' },
          ],
        },
        {
          text: 'Day-to-day',
          items: [
            { text: 'Working with GitHub Issues', link: '/guide/github-issues' },
            { text: 'Session Handoffs', link: '/guide/handoffs' },
          ],
        },
      ],

      '/standards/': [
        {
          text: 'Standards',
          items: [
            { text: 'Overview', link: '/standards/' },
            { text: 'Backend — Nuxt Server', link: '/standards/backend' },
            { text: 'Frontend — Vue + Pinia + PrimeVue', link: '/standards/frontend' },
            { text: 'Documentation', link: '/standards/documentation' },
          ],
        },
      ],

      '/commands/': [
        {
          text: 'Slash Commands',
          items: [
            { text: 'Overview', link: '/commands/' },
            { text: '/enrich-us', link: '/commands/enrich-us' },
            { text: '/plan-backend-ticket', link: '/commands/plan-backend-ticket' },
            { text: '/plan-frontend-ticket', link: '/commands/plan-frontend-ticket' },
            { text: '/develop-backend', link: '/commands/develop-backend' },
            { text: '/develop-frontend', link: '/commands/develop-frontend' },
            { text: '/review-pr', link: '/commands/review-pr' },
            { text: '/commit', link: '/commands/commit' },
            { text: '/deploy', link: '/commands/deploy' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbetancorfp/ia-proyecto-base' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 LIDR.co',
    },

    editLink: {
      pattern: 'https://github.com/dbetancorfp/ia-proyecto-base/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
