<template>
  <nuxt-link v-if="linkType === 'Document'" :to="destination">
    {{ text }}
  </nuxt-link>
  <a v-else :href="destination">
    {{ text }}
  </a>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'

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
  setup({ link }) {
    const { $prismic } = useContext()

    const linkType = computed(() => {
      if (link.link.link_type === 'Document') {
        return 'nuxt-link'
      }
      return 'a'
    })

    const destination = computed(() => {
      return $prismic.asLink(link.link)
    })

    const text = computed(() => {
      return link.label[0].text
    })

    return { linkType, destination, text }
  },
})
</script>
