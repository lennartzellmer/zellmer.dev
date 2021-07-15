<template>
  <NuxtLink
    class="
      group
      overflow-hidden
      rounded-lg
      cursor-pointer
      focus:outline-none
      sm:flex-row
      flex flex-col
    "
    :to="'/posts/' + post.uid"
  >
    <div
      class="
        flex
        overflow-hidden
        relative
        z-20
        flex-shrink-0
        w-full
        h-36
        bg-gray-400
        rounded-lg
        transition-all
        sm:h-auto sm:w-48 sm:group-hover:w-52 sm:group-focus:w-52
      "
    >
      <NuxtPicture
        class="AppArticlePreview__picture"
        :src="post.data.thumbnail.url"
        alt="article illustration"
        width="400"
        height="400"
        fit="crop"
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
        transform
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
        {{ formatedDate }}
      </span>
      <h2 class="mb-3 text-2xl font-bold text-slate-12 sm:text-2xl">
        {{ $prismic.asText(post.data.headline) }}
      </h2>
      <p
        class="
          text-base
          leading-7
          text-slate-11
          overflow-ellipsis overflow-hidden
        "
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
    const formatedDate = new Date(
      post.first_publication_date
    ).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
    })
    return { formatedDate }
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
