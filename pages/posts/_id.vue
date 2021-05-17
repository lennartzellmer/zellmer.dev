<template>
  <main
    class="
      max-w-7xl
      mx-auto
      sm:px-6
      lg:px-8
      grid-cols-12 grid
      gap-8
      auto-rows-max
    "
  >
    <h1 class="col-span-8 py-12 text-6xl font-semibold">{{ page.title }}</h1>
    <article class="row-span-1 col-span-8 prose prose-lg xl:prose-xl -mt-5">
      <nuxt-content :document="page" />
    </article>
    <aside class="col-span-3 col-start-10 space-y-4 border-l pl-6 pt-6">
      <nav>
        <span class="text-lg uppercase font-bold text-gray-400">Inhalt</span>
        <ol class="space-y-2 text-gray-500 mt-4">
          <li v-for="(headline, index) in page.toc" :key="index" class="block">
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

export default defineComponent({
  async asyncData({ $content, params }) {
    const page = await $content('posts', params.id).fetch()

    return {
      page,
    }
  },
})
</script>
