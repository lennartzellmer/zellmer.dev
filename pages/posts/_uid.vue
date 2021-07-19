<template>
  <main v-if="state.post" class="bg-slate-2">
    <section
      class="
        gap-8
        px-4
        pb-12
        mx-auto
        w-full
        max-w-6xl
        md:auto-rows-max md:grid-cols-12 md:grid md:px-6
      "
    >
      <h1
        class="
          col-span-12
          pt-10
          text-4xl
          font-bold
          leading-tight
          sm:text-6xl
          md:col-span-10
          lg:col-span-8
        "
      >
        {{ $prismic.asText(state.post.headline) }}
      </h1>
      <SlicesBlock
        class="col-span-12 md:col-span-10 lg:col-span-8"
        :slices="state.post.body"
      />
      <aside class="hidden col-span-3 col-start-10 pt-6 pl-6 space-y-4">
        <nav>
          <span class="text-base text-gray-600">Inhalt</span>
          <ol class="mt-4 space-y-2 text-gray-500">
            <li v-for="(headline, index) in []" :key="index" class="block">
              <a class="hover:text-green-400" :href="'#' + headline.id">
                <span class="font-mono text-2xl font-bold"
                  >0{{ index + 1 }}</span
                >
                {{ headline.text }}
              </a>
            </li>
          </ol>
        </nav>
      </aside>
    </section>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  useFetch,
  useRoute,
} from '@nuxtjs/composition-api'
import SlicesBlock from '@/components/slices/SlicesBlock.vue'

export default defineComponent({
  components: { SlicesBlock },
  setup() {
    const { error, $prismic } = useContext()
    const route = useRoute()

    const state = reactive<{ post: { headline: string; body: any } | null }>({
      post: null,
    })

    useFetch(async () => {
      const response = await $prismic.api.getByUID(
        'blog-post',
        route.value.params.uid
      )

      state.post = response.data

      if (!state.post) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    })

    return { state }
  },
})
</script>
