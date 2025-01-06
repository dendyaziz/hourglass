<script setup lang="ts">
import {useConfetti} from "~/composables/useConfetti";

const confetti = useConfetti()

onMounted(() => {
  // confetti.startFirework()
})
</script>

<template>
<div class="h-dvh content-center">
  <div class="aspect-[16/9] mx-auto max-h-dvh bg-base-content/10">
    12:00:00
  </div>
</div>
</template>

<style scoped>

</style>