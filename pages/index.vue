<template>
  <main>
    <section
      class="grid-cols-12 gap-8 px-4 mx-auto max-w-5xl sm:grid sm:px-6 lg:px-8"
    >
      <ul class="col-span-12 mt-24 mb-12 space-y-12">
        <li v-for="post in posts" :key="post.id">
          <AppArticlePreview :post="post" />
        </li>
      </ul>
    </section>

    <svg
      class="w-full h-auto text-slate-12"
      viewBox="0 0 1440 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1440 166.709C883.5 150 262.088 58.4152 0 0V166.709H1440Z"
        fill="currentColor"
      />
    </svg>
    <section class="pb-24 bg-slate-12">
      <div v-if="bio" class="grid grid-cols-12 gap-8 mx-auto max-w-5xl">
        <nuxt-img
          v-if="bio"
          class="
            object-contain
            overflow-hidden
            col-span-5
            h-auto
            bg-black
            opacity-100
            mix-blend-lighten
            filter
            brightness-105
          "
          :src="bio.data.profile_image.url"
          alt="article illustration"
          width="800"
          height="800"
          fit="crop"
        />

        <div class="flex col-span-7 items-center">
          <div class="prismic-text">
            <prismic-rich-text class="p-8" :field="bio.data.bio_text" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
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
  @apply rounded-lg overflow-hidden;
  h3 {
    @apply text-slate-6 font-bold text-3xl mb-3;
  }
  p {
    @apply text-slate-10 leading-relaxed;
  }
  a {
    @apply text-slate-8 underline hover:text-slate-5 leading-relaxed;
  }
}
</style>
