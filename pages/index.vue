<template>
  <main>
    <section class="px-4 pt-12 lg:px-8">
      <ul class="mx-auto space-y-12 max-w-5xl">
        <li v-for="post in posts" :key="post.id">
          <AppArticlePreview :post="post" />
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $prismic } = useContext()

    const { title } = useMeta()
    title.value = 'Blog'

    // fetch all posts
    const posts = ref<any>(null)
    const { fetch: fetchPosts } = useFetch(async () => {
      const response = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog-post'),
        {
          orderings: '[document.first_publication_date desc]',
        }
      )
      posts.value = response.results
    })
    fetchPosts()

    return { posts }
  },
  head: {},
})
</script>
