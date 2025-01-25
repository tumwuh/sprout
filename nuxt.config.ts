// https://nuxt.com/docs/api/configuration/nuxt-config
import type {TournamentResponse} from "~/types/tournament";

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    nitro: {
        compressPublicAssets: true,
        preset: 'bun',
        prerender: {
            routes: ['/'],
        },
    },
    routeRules: {
        '/admin': {redirect: '/admin/dashboard', robots: false},
        '/tournament/**': {robots: true},
    },
    app: {
        head: {
            htmlAttrs: {
                lang: "id"
            },
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'Content-Type', content: 'text/html; charset=utf-8'},
                {name: 'apple-mobile-web-app-title', content: 'Tumwuh'},
                {
                    name: 'keywords',
                    content: 'Kompetisi Olahraga, Kompetisi Esport, Jadwal Kompetisi, Aturan Kompetisi, Hadiah Kompetisi, Daftar Kompetisi, Ranking Board, Tim Kompetisi, Peserta Kompetisi, Platform Kompetisi, Komunitas Kompetisi, Juara Kompetisi, Berita Kompetisi, Skill Kompetisi, Turnamen Esport'
                },
                {name: 'og:title', content: "Tumwuh | Turnamen Olahraha"},
                {name: 'og:url', content: "https://tumwuh.com"},
                {name: 'og:site_name', content: 'Tumwuh'},
                {name: 'og:type', content: 'business.business'},
                {name: 'og:image', content: '/favicon-96x96.png'},
                {name: 'twitter:title', content: "Tumwuh | Sport Tournament"},
                {name: 'twitter:card', content: "summary_large_image"},
                {name: 'twitter:url', content: "https://tumwuh.com"},
                {name: 'twitter:image', content: 'https://tumwuh.twic.pics/public/android-chrome-192x192.png'},
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon-96x96.png',
                    sizes: '96x96'
                },
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/favicon.svg'
                },
                {
                    rel: 'shortcut icon',
                    href: '/favicon.ico'
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png'
                },
                {
                    rel: 'manifest',
                    href: '/site.webmanifest'
                },
                { rel: 'canonical', href: process.env.WEB_URL },
            ]
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        sessionPassword: process.env.SESSION_PASSWORD,
        public: {
            baseApiUrl: process.env.BASE_API_URL,
            webUrl: process.env.WEB_URL
        }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/test-utils/module',
        '@vueform/nuxt',
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxtjs/seo',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
    ],
    site: {
        url: process.env.WEB_URL,
        name: 'Tumwuh',
        defaultLocale: 'id',
    },
    sitemap: {
        autoLastmod: true,
        gzip: true,
        exclude: [
            '/admin/**',
        ],
        sources: [
            // static
            '/',
            // dynamic
            async () => {
                const posts = await $fetch<TournamentResponse>(`${process.env.BASE_API_URL}/api/collections/tournaments/records`)
                return posts.items.map(post => ({
                    loc: `/tournament/${post.slug}`,
                    lastmod: post.updated,
                    priority: 0.3,
                    changefreq: 'never'
                }))
            }
        ],
    },
    robots: {
        blockAiBots: true,
        blockNonSeoBots: true,
        // Disallow all robots on non-production environments
        disallow: process.env.NODE_ENV !== 'production' ? ['*'] : [],

        // Allow all robots on production
        allow: process.env.NODE_ENV === 'production' ? ['*'] : [],

        // Specific crawler rules
        rules: [
            {
                userAgent: '*',
                disallow: ['/admin/', '/my/']
            }
        ]
    },
    image: {
        providers: {
            pocketbase: {
                name: 'pocketbase',
                provider: '~/providers/pocketbase.ts',
                options: {
                    baseURL: process.env.BASE_API_URL + '/api/files',
                }
            },
        }
    },
})