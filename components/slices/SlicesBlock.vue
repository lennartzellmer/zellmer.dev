<template>
  <article>
    <template v-for="(slice, index) in slices">
      <template v-if="slice.slice_type === 'text'">
        <TextSlice
          :key="'slice-' + index"
          class="prose prose-lg xl:prose-xl"
          :slice="slice"
        />
      </template>
      <template v-if="slice.slice_type === 'image'">
        <ImageSlice :key="'slice-' + index" :slice="slice" />
      </template>
    </template>
  </article>
</template>

<script>
import TextSlice from '@/components/slices/TextSlice.vue'
import ImageSlice from '@/components/slices/ImageSlice.vue'

export default {
  name: 'SlicesBlock',
  components: { TextSlice, ImageSlice },
  props: ['slices'],
}
</script>
