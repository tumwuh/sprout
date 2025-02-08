import { defineVitestConfig } from '@nuxt/test-utils/config'
export default defineVitestConfig({
    test: {
        environment: 'nuxt', // Use 'jsdom' if you prefer
        globals: true, // Enable global APIs like `describe`, `it`, etc.
        include: ['test/**/*.test.ts'],
        coverage: {
            reporter: ['text', 'html'], // Generate coverage reports
        }
    },
})