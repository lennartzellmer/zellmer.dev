<template>
  <footer
    class="flex justify-center py-12 mx-auto max-w-7xl font-mono text-slate-9"
  >
    <nuxt-link class="p-3 hover:text-slate-5 transition" to="/">
      Impressum
    </nuxt-link>
    <nuxt-link class="p-3 hover:text-slate-5 transition" to="/">
      Kontakt
    </nuxt-link>
  </footer>
</template>

<script type="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
