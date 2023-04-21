<template>
  <component :is="layout"><RouterView></RouterView></component>
</template>

<script setup lang="ts">
import { ref, watch, markRaw } from "vue"
import { useRoute } from "vue-router"

import DefaultLayout from "@/layouts/DefaultLayout.vue"

const route = useRoute()
const layout = ref()

layout.value = route.meta?.layout || "DefaultLayout"

// source => https://stackoverflow.com/q/69048657/6277151
watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(/* @vite-ignore */ `@/layouts/${metaLayout}.vue`))
      layout.value = markRaw(component?.default || DefaultLayout)
    } catch (e) {
      layout.value = markRaw(DefaultLayout)
    }
  },
  { immediate: true }
)
</script>
