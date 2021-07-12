<template>
  <nuxt-link :to="$prismic.asLink(link.link)">
    {{ link.label[0].text }}
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

interface FooterLink {
  label: [
    {
      type: string
      text: string
      spans: any[]
    }
  ]
  link: {
    id: string
    type: string
    tags: string[]
    slug: string
    lang: string
    uid: string
    // eslint-disable-next-line camelcase
    link_type: string
    isBroken: boolean
  }
}

export default defineComponent({
  props: {
    link: {
      type: Object as PropType<FooterLink>,
      required: true,
    },
  },
})
</script>
