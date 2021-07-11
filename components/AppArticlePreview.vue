<template>
  <NuxtLink
    class="
      flex flex-col
      sm:flex-row
      group
      rounded-lg
      overflow-hidden
      focus:outline-none
      cursor-pointer
    "
    :to="'/posts/' + post.uid"
  >
    <div
      class="
        flex-shrink-0
        w-full
        h-36
        sm:h-auto
        sm:w-48
        relative
        rounded-lg
        overflow-hidden
        bg-gray-400
        transition-all
        sm:group-hover:w-52 sm:group-focus:w-52
        z-20
      "
    >
      <nuxt-img
        class="inset-0 object-cover object-center h-full w-full absolute z-10"
        :src="post.data.thumbnail.url"
        alt="article illustration"
        width="800"
        height="800"
        fit="crop"
      />
    </div>
    <article
      class="
        mt-6
        sm:pl-8
        z-10
        sm:pr-10
        sm:group-hover:bg-gray-100
        sm:py-8
        sm:mt-3
        mb-3
        w-full
        rounded-r-lg
        transform
        transition-all
        sm:group-hover:pl-8
        sm:group-hover:pr-6
        sm:group-focus:pl-8
        sm:group-focus:pr-6
        sm:group-focus:bg-gray-100
      "
    >
      <span class="font-mono text-gray-400">
        {{ formatedDate }}
      </span>
      <h2 class="sm:text-3xl text-2xl font-bold text-gray-800 mb-3">
        {{ $prismic.asText(post.data.headline) }}
      </h2>
      <p
        class="
          text-base
          sm:text-lg
          leading-7
          text-gray-700
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
