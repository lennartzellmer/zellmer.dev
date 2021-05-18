<template>
  <prismic-rich-text class="textslice" :field="slice.primary.text" />
</template>

<script>
export default {
  name: 'TextSlice',
  props: ['slice'],
}
</script>
