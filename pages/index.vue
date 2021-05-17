<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8">
    <ol class="col-span-12 sm:col-span-9 sm:col-start-2 mt-12 space-y-8 mb-12">
      <li v-for="post in posts" :key="post.id">
        <AppArticlePreview :post="post" />
      </li>
    </ol>
  </main>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $prismic } = useContext()

    const posts = ref(null)
    const { fetch, fetchState } = useFetch(async () => {
      const response = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog-post')
      )
      posts.value = response.results
    })

    fetch()

    return { posts, fetchState }
  },
})
</script>
