import { it, expect } from 'vitest'
// ---cut---
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/pages/index.vue'

it('can also mount an app', async () => {
  expect(1+1).toBe(2)
})
