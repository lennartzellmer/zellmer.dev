<template>
  <prismic-rich-text class="my-8" :field="slice.primary.text" />
</template>

<script>
export default {
  name: 'TextSlice',
  props: ['slice'],
}
</script>
