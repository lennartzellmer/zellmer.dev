<template>
  <main
    v-if="post"
    class="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      grid-cols-12 grid
      gap-8
      auto-rows-max
    "
  >
    <h1 class="col-span-12 md:col-span-8 pt-10 text-6xl font-semibold">
      {{ $prismic.asText(post.data.headline) }}
    </h1>
    <SlicesBlock class="col-span-12" :slices="post.data.body" />
    <pre class="col-span-8">
      {{ post }}
    </pre>
    <aside class="hidden col-span-3 col-start-10 space-y-4 border-l pl-6 pt-6">
      <nav>
        <span class="text-lg uppercase font-bold text-gray-400">Inhalt</span>
        <ol class="space-y-2 text-gray-500 mt-4">
          <li v-for="(headline, index) in []" :key="index" class="block">
            <a class="hover:text-green-400" :href="'#' + headline.id">
              <span class="font-mono text-2xl font-bold">0{{ index + 1 }}</span>
              {{ headline.text }}
            </a>
          </li>
        </ol>
      </nav>
    </aside>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SlicesBlock from '@/slices/SlicesBlock.vue'

export default defineComponent({
  components: { SlicesBlock },
  async asyncData({ $prismic, params, error }) {
    const post = await $prismic.api.getByUID('blog-post', params.uid)

    if (post) {
      return { post }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    resolveSlice({ sliceName }) {
      console.log(sliceName)
      return this.slices[sliceName]
    },
  },
})
</script>
