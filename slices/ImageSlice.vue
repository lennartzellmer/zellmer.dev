<template>
  <div class="grid-cols-12 grid gap-8 auto-rows-max">
    <div
      v-for="(item, index) in slice.items"
      :key="index"
      class="w-40 h-auto col-span-4"
    >
      <nuxt-img
        :src="item.image.url"
        :alt="item.image.url"
        width="800"
        height="800"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSlice',
  props: ['slice'],
}
</script>

<style scoped></style>
