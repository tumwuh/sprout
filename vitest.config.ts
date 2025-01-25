import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        setupFiles: './test/setupTests.ts',
        include: ['test/**/*.test.ts'],
        exclude: ['e2e/**/*.spec.ts'],
        // you can optionally set Nuxt-specific environment options
        // environmentOptions: {
        //   nuxt: {
        //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        //     overrides: {
        //       // other Nuxt config you want to pass
        //     }
        //   }
        // }
    }
})