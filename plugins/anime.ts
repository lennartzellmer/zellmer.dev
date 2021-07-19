import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import anime from 'animejs'

export default defineNuxtPlugin((ctx, inject) => {
  inject('anime', anime)
  ctx.$anime = anime
})
