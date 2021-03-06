<template>
  <div>
    <div class="flex col-span-12 px-4 mx-auto w-full max-w-6xl h-96 md:px-6">
      <NuxtPicture
        v-if="state.post"
        class="overflow-hidden rounded-lg BlogPost__picture"
        :src="state.post.thumbnail.url"
        alt="article illustration"
        width="1200"
        height="800"
        fit="crop"
        sizes="xs:400px sm:600px md:1200px lg:1200px xl:1200px xxl:1200px 2xl:1200px"
      />
    </div>
    <main v-if="state.post" class="bg-slate-2">
      <section
        class="
          gap-8
          px-4
          pb-12
          mx-auto
          w-full
          max-w-6xl
          md:grid md:grid-cols-12 md:auto-rows-max md:px-6
        "
      >
        <h1
          class="
            col-span-12
            pt-16
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  useFetch,
  useMeta,
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

    const { title, meta } = useMeta()

    useFetch(async () => {
      const response = await $prismic.api.getByUID(
        'blog-post',
        route.value.params.uid
      )

      state.post = response.data

      title.value = $prismic.asText(response.data.headline)

      const socialGeneralCard = response.data.social.find((e: any) => {
        return e.slice_type === 'general_card'
      })?.primary

      if (socialGeneralCard) {
        meta.value = [
          {
            hid: 'description',
            name: 'description',
            content: `${
              socialGeneralCard.description
                ? $prismic.asText(response.data.social[0].primary.description)
                : ''
            }`,
          },
          {
            property: 'og:title',
            content: `${
              socialGeneralCard.title
                ? $prismic.asText(socialGeneralCard.title)
                : ''
            }`,
            hid: 'og:title',
          },
          {
            property: 'og:image',
            content: `${
              socialGeneralCard.image ? socialGeneralCard.image.url : ''
            }`,
            hid: 'og:image',
          },
          {
            property: 'og:description',
            content: `${
              response.data.social[0]?.primary?.description
                ? $prismic.asText(response.data.social[0].primary.description)
                : ''
            }`,
            hid: 'og:description',
          },
        ]
      }

      if (!state.post) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    })

    return { state }
  },
  head: {},
})
</script>

<style lang="scss">
.BlogPost__picture {
  width: 100%;
  height: 100%;
  display: flex;
  img {
    object-fit: cover;
    height: auto;
    width: 100%;
  }
}
</style>
