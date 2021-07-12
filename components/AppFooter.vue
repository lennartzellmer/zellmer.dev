<template>
  <footer class="flex justify-center py-12 mx-auto max-w-7xl">
    <nav>
      <AppLink
        v-for="linkObject in footerNavigation"
        :key="linkObject.link.id"
        class="p-3 font-mono text-slate-9 hover:text-slate-5 transition"
        :link="linkObject"
      />
    </nav>
  </footer>
</template>

<script type="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const footerNavigation = ref(null)
    const { $prismic } = useContext()

    useFetch(async () => {
      const response = await $prismic.api.getSingle('footer_navigation')
      footerNavigation.value = response.data.menu_links
    })

    return { footerNavigation }
  },
})
</script>
