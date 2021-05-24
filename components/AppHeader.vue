<template>
  <header
    class="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      flex
      justify-between
      bg-white
      border-b border-gray-100
    "
  >
    <nuxt-link
      class="
        flex
        justify-center
        items-center
        focus:outline-none
        space-x-3
        text-2xl
        group
      "
      to="/"
      @click.native="animate"
    >
      <svg
        width="100"
        height="100"
        fill="none"
        viewBox="0 0 100 100"
        class="text-gray-900 w-16 h-auto overflow-visible"
      >
        <path
          id="blob"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="5"
          :d="svgPath.path"
        />
      </svg>
      <span class="font-semibold text-gray-900">zellmer / blog </span>
    </nuxt-link>
    <div class="py-9 flex items-center">
      <a
        class="
          p-3
          flex
          items-center
          hover:text-green-400
          focus:outline-none
          focus:bg-gray-100
          focus:rounded-full
          focus:ring-2
          ring-green-300
        "
        href=""
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-github w-7 h-auto"
        >
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          />
        </svg>
      </a>
      <a
        class="
          p-3
          h-full
          flex
          items-center
          hover:text-green-400
          focus:outline-none
          focus:bg-gray-100
          focus:rounded-full
          focus:ring-2
          ring-green-300
        "
        href=""
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-twitter w-7 h-auto"
        >
          <path
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          />
        </svg>
      </a>
    </div>
  </header>
</template>

<script type="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import generator from 'blobshape'
import dynamics from 'dynamics.js'

export default defineComponent({
  setup() {
    const svgPath = generator({ size: 100, growth: 5, edges: 10, seed: null })

    const animate = () => {
      const svgPath = generator({ size: 100, growth: 5, edges: 10, seed: null })
      const element = document.getElementById('blob')
      if (!element) return
      const config = {
        type: dynamics.spring,
        frequency: 200,
        friction: 200,
        duration: 700,
      }
      dynamics.animate(element, { d: svgPath.path }, config)
    }

    return { svgPath, animate }
  },
})
</script>
