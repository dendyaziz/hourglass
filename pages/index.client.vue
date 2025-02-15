<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useConfetti } from '~/composables/useConfetti'
import { getDiffToNextSecond, getNow, getTimeString } from '~/helper'
import { useClockStore } from '~/store/clock'

const confetti = useConfetti()
const clockStore = useClockStore()

const appVersion = __APP_VERSION__
const fontSize: number = 100

let containerElement: HTMLElement | null = null
let timeElement: HTMLElement | null = null
let timeInterval: NodeJS.Timeout | null = null

function getCurrentTimeString() {
  return getTimeString(getNow())
}

function displayTime() {
  if (!timeElement)
    return

  timeElement.innerHTML = getCurrentTimeString()
}

function startClock() {
  // Clear time interval if any
  if (timeInterval)
    clearInterval(timeInterval)

  timeInterval = setInterval(displayTime, clockStore.clockInterval)
}

function syncFontSize() {
  if (!containerElement)
    return

  const containerRect = containerElement.getBoundingClientRect()

  const { height } = containerRect

  containerElement.style.fontSize = `${height / 3.25}px`
}

function reload() {
  reloadNuxtApp()
}

let resizeObserver: ResizeObserver
const debouncedSyncFontSize = debounce(syncFontSize, 5)

// clockStore.fastenClock()

onMounted(() => {
  timeElement = document.getElementById('time')

  const diffToNextSecond = getDiffToNextSecond()

  // Wait until the next second to start
  setTimeout(startClock, diffToNextSecond)

  containerElement = document.getElementById('clock-container')

  if (containerElement) {
    resizeObserver = new ResizeObserver(debouncedSyncFontSize)
    resizeObserver.observe(containerElement)
  }
})

onBeforeUnmount(() => {
  // Disconnect the observer when the component is destroyed
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div class="h-dvh content-center bg-black">
    <div
      id="clock-container"
      class="relative aspect-[16/9] mx-auto max-h-dvh flex flex-col justify-center items-center text-[132px]"
      :style="{ fontSize: `${fontSize}px` }"
    >
      <div class="absolute left-1/2 top-[17%] -translate-x-1/2 -translate-y-1/2 font-mono font-semibold text-[0.35em] truncate max-w-full">
        <PrayerCountDown />
      </div>

      <div
        id="time"
        class="font-mono font-bold text-[1em] truncate max-w-full text-white flex items-center"
      >
        <span class="text-[0.7em]">Selamat Pagi</span>
      </div>

      <div
        class="absolute left-[5%] bottom-[10%] font-mono font-semibold text-[0.2em] truncate max-w-full opacity-25 h-[10%] flex items-center"
        @click="reload"
      >
        v{{ appVersion }}
      </div>

      <div
        class="absolute right-[5%] bottom-[10%] font-mono font-semibold text-[0.15em] truncate max-w-full opacity-75 h-[10%] flex items-center"
      >
        <BatteryInfo />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
