<template>
  <transition name="modal">
    <div
      class="
        absolute
        inset-0
        flex flex-col
        items-center
        px-0
        sm:px-8
        sm:py-8
        justify-center
        fixed
        z-[9998]
      "
      @click="close"
    >
      <span
        class="
          inset-0
          absolute
          bg-gray-900 bg-opacity-95
          z-[997]
          gallery__background
        "
      />
      <button
        type="button"
        class="
          text-white
          absolute
          w-12
          h-12
          top-4
          right-4
          bg-gray-800
          rounded-full
          p-2
          z-[999]
          focus:outline-none
        "
        @click="close"
      >
        <svg class="w-full" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M17.25 6.75L6.75 17.25"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6.75 6.75L17.25 17.25"
          />
        </svg>
      </button>
      <button
        v-if="isMultiple"
        type="button"
        class="
          absolute
          bottom-4
          sm:bottom-1/2
          transform
          sm:translate-y-1/2
          w-12
          h-12
          bg-gray-800
          rounded-full
          p-2
          left-4
          z-[999]
          cursor-pointer
          text-white
          focus:outline-none
        "
        @click.stop="onPrev"
      >
        <svg class="w-full" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10.25 6.75L4.75 12L10.25 17.25"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19.25 12H5"
          />
        </svg>
      </button>
      <div
        v-if="images"
        class="
          w-full
          h-full
          sm:h-2/3
          md:max-w-7xl
          max-w-full
          bg-black
          sm:rounded-lg
          z-[998]
          overflow-x-hidden
          gallery__image_container
        "
        @click.stop="onNext"
      >
        <NuxtImg
          class="w-full h-full object-contain"
          width="2300"
          :src="imageUrl"
          :alt="alt"
          @click.stop="onNext"
        />
      </div>
      <button
        v-if="isMultiple"
        type="button"
        class="
          absolute
          bottom-4
          sm:bottom-1/2
          transform
          sm:translate-y-1/2
          w-12
          h-12
          bg-gray-800
          rounded-full
          p-2
          right-4
          z-[999]
          cursor-pointer
          text-white
          focus:outline-none
        "
        @click.stop="onNext"
      >
        <svg class="w-full" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13.75 6.75L19.25 12L13.75 17.25"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 12H4.75"
          />
        </svg>
      </button>
      <div
        v-if="isMultiple"
        ref="gallery"
        class="
          hidden
          sm:justify-center
          sm:flex sm:flex-col
          max-w-7xl
          w-full
          mt-4
          z-[999]
          whitespace-nowrap
        "
      >
        <div v-if="images" class="text-white mb-1">
          {{ imgIndex + 1 }} / {{ images.length }}
        </div>
        <div v-if="images" class="flex justify-start items-stretch space-x-4">
          <button
            v-for="(img, i) in images"
            :key="i"
            class="
              focus:outline-none
              flex-shrink flex-grow-0
              navigation__image__container
              rounded-md
              overflow-hidden
              cursor-pointer
              opacity-60
              hover:opacity-100
            "
            :class="{ 'ring ring-green-400 opacity-100': i === imgIndex }"
            @click.stop="onClickThumb(img, i)"
          >
            <NuxtImg
              class="h-20 md:h-40 w-20 md:w-40 object-cover"
              width="300"
              :src="typeof img === 'string' ? img : img.url"
              :alt="typeof img === 'string' ? '' : img.alt"
            />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      imgIndex: this.index,
      image: null,
    }
  },
  computed: {
    imageUrl() {
      const img = this.images[this.imgIndex]
      if (typeof img === 'string') {
        return img
      }
      return img.url
    },
    alt() {
      const img = this.images[this.imgIndex]
      if (typeof img === 'object') {
        return img.alt
      }

      return ''
    },
    isMultiple() {
      return this.images.length > 1
    },
  },
  watch: {
    index(val, prev) {
      this.imgIndex = val
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        this.onPrev()
      } else if (e.keyCode === 39) {
        this.onNext()
      } else if (e.keyCode === 27) {
        this.close()
      }
    })

    this.animate()
  },
  methods: {
    animate() {
      const anime = this.$anime

      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1200,
      })

      tl.add({
        targets: '.gallery__background',
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'easeOutQuad',
      })

      tl.add({
        targets: '.gallery__image_container',
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'easeOutQuad',
      })

      tl.add({
        targets: '.navigation__image__container',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'easeOutQuad',
      })
    },
    close() {
      const eventData = {
        imgIndex: this.imgIndex,
      }
      this.imgIndex = null
      this.$emit('close', eventData)
    },
    onPrev() {
      if (this.imgIndex === null) return
      if (this.imgIndex > 0) {
        this.imgIndex--
      } else {
        this.imgIndex = this.images.length - 1
      }
    },
    onNext() {
      if (this.imgIndex === null) return
      if (this.imgIndex < this.images.length - 1) {
        this.imgIndex++
      } else {
        this.imgIndex = 0
      }
    },
    onClickThumb(image, index) {
      this.imgIndex = index
    },
  },
}
</script>
