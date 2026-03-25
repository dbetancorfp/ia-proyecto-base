import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'IA Proyecto Base',
  description: 'Plantilla base para desarrollo web asistido por IA con Nuxt 4, Vue 3, Pinia y PrimeVue.',

  base: '/ia-proyecto-base/',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guía', link: '/guide/getting-started' },
      { text: 'Estándares', link: '/standards/' },
      { text: 'Comandos', link: '/commands/' },
      {
        text: 'GitHub',
        link: 'https://github.com/dbetancorfp/ia-proyecto-base',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introducción',
          items: [
            { text: 'Primeros pasos', link: '/guide/getting-started' },
            { text: 'Flujo de trabajo', link: '/guide/workflow' },
            { text: 'Roles de IA', link: '/guide/roles' },
          ],
        },
        {
          text: 'Día a día',
          items: [
            { text: 'GitHub Issues', link: '/guide/github-issues' },
            { text: 'Handoffs de sesión', link: '/guide/handoffs' },
          ],
        },
      ],

      '/standards/': [
        {
          text: 'Estándares',
          items: [
            { text: 'Resumen', link: '/standards/' },
            { text: 'Backend — Nuxt Server', link: '/standards/backend' },
            { text: 'Frontend — Vue + Pinia + PrimeVue', link: '/standards/frontend' },
            { text: 'Documentación', link: '/standards/documentation' },
          ],
        },
      ],

      '/commands/': [
        {
          text: 'Slash Commands',
          items: [
            { text: 'Resumen', link: '/commands/' },
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
      text: 'Editar esta página en GitHub',
    },
  },
})
