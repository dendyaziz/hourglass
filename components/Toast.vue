<script setup lang="ts">
import { useToastStore } from '~/store/toast'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast toast-top toast-center z-[997]">
    <div
      v-for="item in toastStore.toasts"
      :key="item.id"
      class="alert bg-gray-800 text-white border-0 transition-all w-fit mx-auto duration-200 gap-0"
      :class="{ 'opacity-0 -mt-[48px]': item.isClosing }"
    >
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
