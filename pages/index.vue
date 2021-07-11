<template>
  <main>
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:grid grid-cols-12 gap-8"
    >
      <ul
        class="col-span-12 sm:col-span-9 sm:col-start-2 mt-24 space-y-12 mb-12"
      >
        <li v-for="post in posts" :key="post.id">
          <AppArticlePreview :post="post" />
        </li>
      </ul>
    </section>

    <div
      class="mt-24 min-h-screen overflow-hidden relative py-24 bg-primary-900"
    >
      <section
        v-if="bio"
        class="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          sm:grid
          grid-cols-12
          gap-8
        "
      >
        <div class="absolute rounded-xl z-0">
          <nuxt-img
            v-if="bio"
            class="object-cover h-full w-auto"
            :src="bio.data.profile_image.url"
            alt="article illustration"
            width="800"
            height="800"
            fit="crop"
          />
        </div>
        <div class="col-span-4 col-start-7 flex z-10">
          <div class="prismic-text">
            <prismic-rich-text class="p-8" :field="bio.data.bio_text" />
            <div class="flex flex-col space-y-3 bg-primary-800 p-8">
              <dl class="flex space-x-2 text-primary-500 uppercase">
                <dt>Heading for:</dt>
                <dd class="text-primary-300">Bonn</dd>
              </dl>
              <dl class="flex space-x-2 text-primary-500 uppercase">
                <dt>Currently learning:</dt>
                <dd class="text-primary-300">Stripe API and Custom Checkout</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
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
    const bio = ref(null)

    const { fetch: fetchPosts, fetchStatePosts } = useFetch(async () => {
      const response = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog-post')
      )
      posts.value = response.results
    })

    const { fetch: fetchBio, fetchStateBio } = useFetch(async () => {
      const response = await $prismic.api.getSingle('bio')
      bio.value = response
    })

    fetchPosts()
    fetchBio()

    return { posts, fetchStatePosts, bio, fetchStateBio }
  },
})
</script>

<style lang="scss">
.prismic-text {
  @apply bg-primary-900 rounded-lg overflow-hidden;
  h3 {
    @apply text-primary-300 font-semibold text-3xl mb-3;
  }
  p {
    @apply text-primary-500 text-lg leading-relaxed;
  }
}
</style>
