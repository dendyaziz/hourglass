<script setup lang="ts">
import { useConfetti } from "~/composables/useConfetti";

const confetti = useConfetti()
let timeElement: Element | null = null
let timeInterval: NodeJS.Timeout | null = null

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

// Difference to the next second
const getDiffToNextSecond = () => {
  const now = new Date();
  const milliseconds = now.getMilliseconds();
  return 1000 - milliseconds;
};

function setTime() {
  if (!timeElement)
    return

  timeElement.innerHTML = getCurrentTime()
}

function startCountDown() {
  // Clear time interval if any
  if (timeInterval)
    clearInterval(timeInterval)

  timeInterval = setInterval(setTime)
}

onMounted(() => {
  timeElement = document.getElementById('time')

  // Set initial time text
  setTime()

  // Wait until the next second to start
  setTimeout(startCountDown, getDiffToNextSecond())
})
</script>

<template>
<div class="h-dvh content-center">
  <div class="relative aspect-[16/9] mx-auto max-h-dvh flex flex-col justify-center items-center h-full bg-base-content/10">
    <div class="font-mono font-semibold text-[8vh]">
      Dzuhur: 00:45:24
    </div>
    <div id="time" class="font-mono font-bold text-[28vh]">
      00:00:00
    </div>
  </div>
</div>
</template>

<style scoped>

</style>