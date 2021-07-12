<template>
  <main class="bg-slate-2">
    <section
      v-if="page"
      class="
        grid-cols-12
        gap-8
        px-4
        pt-12
        mx-auto
        max-w-5xl
        sm:grid sm:px-6
        lg:px-8
      "
    >
      <article class="col-span-7 prismic-text">
        <prismic-rich-text class="my-8" :field="page.title" />
        <prismic-rich-text class="my-8" :field="page.text" />
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $prismic } = useContext()
    const route = useRoute()

    const page = ref<null | any>(null)

    const { fetch: fetchPage } = useFetch(async () => {
      const response = await $prismic.api.getByUID(
        'default_page',
        route.value.params.uid
      )
      console.log(response)
      page.value = response.data
    })

    fetchPage()

    return { page }
  },
})
</script>

<style lang="scss">
.prismic-text {
  h1 {
    @apply text-slate-12 font-bold text-5xl mb-3 mt-12;
  }
  h3 {
    @apply text-slate-12 font-semibold text-2xl mb-3 mt-12;
  }
  p {
    @apply text-slate-11 leading-relaxed;
  }
  a {
    @apply text-slate-8 underline hover:text-slate-5 leading-relaxed font-mono;
  }
}
</style>
