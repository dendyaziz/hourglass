<script setup lang="ts">
import { useConfetti } from '~/composables/useConfetti'
import { getDiffToNextSecond, getTimeString } from '~/helper'

const confetti = useConfetti()
let timeElement: Element | null = null
let timeInterval: NodeJS.Timeout | null = null
let eventObserverInterval: NodeJS.Timeout | null = null

function getCurrentTimeString() {
  return getTimeString(new Date())
}

function displayTime() {
  if (!timeElement)
    return

  timeElement.innerHTML = getCurrentTimeString()
}

function checkEvent() {
}

function startClock() {
  // Clear time interval if any
  if (timeInterval)
    clearInterval(timeInterval)

  timeInterval = setInterval(displayTime, 1000)
}

function startEventChecker() {
  // Clear event listener interval if any
  if (eventObserverInterval)
    clearInterval(eventObserverInterval)

  eventObserverInterval = setInterval(checkEvent, 1000)
}

// Set initial displayed time
const initialTimeString = getCurrentTimeString()

onMounted(() => {
  timeElement = document.getElementById('time')

  const diffToNextSecond = getDiffToNextSecond()

  // Wait until the next second to start
  setTimeout(startClock, diffToNextSecond)

  // Wait until the next second to start
  setTimeout(startEventChecker, diffToNextSecond)
})
</script>

<template>
  <div class="h-dvh content-center">
    <div class="relative aspect-[16/9] mx-auto max-h-dvh flex flex-col justify-center items-center h-full bg-base-content/10">
      <div class="font-mono font-semibold text-[8vh]">
        <PrayerCountDown />
      </div>
      <div
        id="time"
        class="font-mono font-bold text-[28vh]"
      >
        {{ initialTimeString }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
