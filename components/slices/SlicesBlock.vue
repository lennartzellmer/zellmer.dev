<template>
  <article>
    <template v-for="(slice, index) in slices">
      <template v-if="slice.slice_type === 'text'">
        <TextSlice
          :key="'slice-' + index"
          class="max-w-none prose prose-lg"
          :slice="slice"
        />
      </template>
      <template v-if="slice.slice_type === 'image'">
        <ImageSlice :key="'slice-' + index" :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'code'">
        <CodeSlice :key="'slice-' + index" :slice="slice" />
      </template>
    </template>
  </article>
</template>

<script lang="ts">
import TextSlice from '@/components/slices/TextSlice.vue'
import ImageSlice from '@/components/slices/ImageSlice.vue'
import CodeSlice from '@/components/slices/CodeSlice.vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SlicesBlock',
  components: { TextSlice, ImageSlice, CodeSlice },
  props: {
    slices: {
      required: true,
      type: Object,
    },
  },
})
</script>
