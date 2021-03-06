<template>
  <NuxtLink
    class="
      group
      flex
      overflow-hidden
      flex-col
      rounded-lg
      focus:outline-none
      cursor-pointer
      sm:flex-row
    "
    :to="'/posts/' + post.uid"
  >
    <div
      class="
        flex
        overflow-hidden
        relative
        z-20
        shrink-0
        w-full
        h-36
        bg-gray-400
        rounded-lg
        transition-all
        sm:w-48 sm:group-hover:w-52 sm:group-focus:w-52 sm:h-auto
      "
    >
      <NuxtPicture
        class="AppArticlePreview__picture"
        :src="post.data.thumbnail.url"
        alt="article illustration"
        width="400"
        height="400"
        fit="crop"
        sizes="xs:400px sm:600px md:400px lg:400px xl:400px xxl:400px 2xl:400px"
      />
    </div>
    <article
      class="
        z-10
        mt-6
        mb-3
        w-full
        rounded-r-lg
        transition-all
        sm:py-8
        sm:pr-10
        sm:group-hover:pr-6
        sm:group-focus:pr-6
        sm:pl-8
        sm:group-hover:pl-8
        sm:group-focus:pl-8
        sm:mt-3
        sm:group-hover:bg-slate-3
        sm:group-focus:bg-gray-100
      "
    >
      <span class="font-mono text-sm text-slate-11">
        {{ formattedDate }}
      </span>
      <h2 class="mb-3 text-2xl font-bold text-slate-12 sm:text-2xl">
        {{ $prismic.asText(post.data.headline) }}
      </h2>
      <p
        class="overflow-hidden text-base leading-7 text-slate-11 text-ellipsis"
      >
        {{ $prismic.asText(post.data.description) }}
      </p>
    </article>
  </NuxtLink>
</template>

<script type="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup({ post }) {
    const formattedDate = new Date(
      post.first_publication_date
    ).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
    })
    return { formattedDate }
  },
})
</script>

<style lang="scss">
.AppArticlePreview__picture {
  @apply flex;
  img {
    @apply object-cover;
  }
}
</style>
