<template>
  <div
    class="grid grid-cols-2 gap-4 py-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
  >
    <button
      v-for="(image, i) in images"
      :key="i"
      class="
        overflow-hidden
        col-span-1
        rounded-lg
        focus:outline-none
        hover:ring-2
        focus:ring
        ring-slate-7
        transition
      "
      @click="index = i"
    >
      <NuxtPicture
        :src="image"
        sizes="sm:100px md:400px lg:800px"
        width="1000"
        height="1000"
        fit="crop"
      />
    </button>
    <client-only placeholder="Loading...">
      <AppGallery
        v-if="index !== null"
        :images="images"
        :index="index"
        @close="index = null"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ImageSlice',
  props: {
    slice: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      index: null,
    }
  },
  computed: {
    images() {
      const urls: string[] = []
      this.slice.items.forEach((item: any) => {
        urls.push(item.image.url)
      })
      return urls
    },
  },
})
</script>
