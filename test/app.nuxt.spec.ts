import { it, expect } from 'vitest'
// ---cut---
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('can also mount an app', async () => {
  const component = await mountSuspended(App, { route: '/test' })
  expect(component.html()).toMatchInlineSnapshot(`
      "<div>This is an auto-imported component</div>
      <div> I am a global component </div>
      <div>/</div>
      <a href="/test"> Test link </a>"
    `)
})
