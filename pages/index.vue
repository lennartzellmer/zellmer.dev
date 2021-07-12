<template>
  <main>
    <section class="px-4 pt-12 bg-slate-2 lg:px-8">
      <ul class="mx-auto space-y-12 max-w-5xl">
        <li v-for="post in posts" :key="post.id">
          <AppArticlePreview :post="post" />
        </li>
      </ul>
    </section>

    <svg
      class="w-full h-auto text-slate-12 bg-slate-2"
      viewBox="0 0 1440 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1440 166.709C883.5 150 262.088 58.4152 0 0V166.709H1440Z"
        fill="currentColor"
      />
    </svg>
    <section class="bg-slate-12 sm:pb-24">
      <div
        v-if="bio"
        class="mx-auto max-w-5xl sm:grid sm:grid-cols-12 sm:gap-8"
      >
        <div class="flex pr-8 pl-8 w-full sm:col-span-5 sm:pr-0">
          <nuxt-img
            class="
              object-contain
              w-full
              h-auto
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
        </div>

        <div class="flex col-span-7 items-center">
          <div class="prismic-text-dark">
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

    const posts = ref<any>(null)
    const bio = ref<any>(null)

    const { fetch: fetchPosts } = useFetch(async () => {
      const response = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog-post')
      )
      posts.value = response.results
    })

    const { fetch: fetchBio } = useFetch(async () => {
      const response = await $prismic.api.getSingle('bio')
      bio.value = response
    })

    fetchPosts()
    fetchBio()

    return { posts, bio }
  },
})
</script>

<style lang="scss">
.prismic-text-dark {
  h3 {
    @apply text-slate-6 font-bold text-3xl mb-3;
  }
  p {
    @apply text-slate-10 leading-relaxed;
  }
  a {
    @apply text-slate-8 underline hover:text-slate-5 leading-relaxed font-mono;
  }
}
</style>
