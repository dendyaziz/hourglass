<script setup lang="ts">
import {useConfetti} from "~/composables/useConfetti";

const confetti = useConfetti()

onMounted(() => {
  confetti.startFirework()
})
</script>

<template>
<div class="container">
  <div>Hourglass</div>

  <button class="btn btn-primary">Button</button>
</div>
</template>

<style scoped>

</style>