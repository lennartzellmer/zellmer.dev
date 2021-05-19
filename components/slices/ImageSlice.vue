<template>
  <div
    class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-4 lg:gap-6 py-8"
  >
    <div
      v-for="(image, i) in images"
      :key="i"
      class="col-span-1 rounded-lg overflow-hidden"
      @click="index = i"
    >
      <NuxtPicture
        :src="image"
        sizes="sm:100px md:400px lg:800px"
        width="1000"
        height="1000"
        fit="crop"
      />
    </div>
    <client-only placeholder="Loading...">
      <AppGalery
        v-if="index !== null"
        :images="images"
        :index="index"
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
