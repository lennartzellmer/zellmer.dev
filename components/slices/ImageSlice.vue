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
        hover:ring-2
        focus:ring
        ring-slate-7
        transition
        focus:outline-none
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
      <AppGalery
        v-if="index !== null"
        :images="images"
        :index="index"
        class="transform-gpu"
        @close="index = null"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ImageSlice',
  props: ['slice'],
  data() {
    return {
      index: null,
    }
  },
  computed: {
    images() {
      const urls = []
      this.slice.items.forEach((item) => {
        urls.push(item.image.url)
      })
      return urls
    },
  },
}
</script>

<style scoped></style>
