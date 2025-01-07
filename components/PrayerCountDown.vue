<script setup lang="ts">
import { getDiffToNextSecond, getTime } from '~/helper'
import prayerTime from '~/assets/json/prayer-time.json'

let countDownElement: Element | null = null
let countDownInterval: NodeJS.Timeout | null = null

function getCurrentTime() {
  return getTime(new Date())
}

function checkPrayerTime() {
  if (!countDownElement)
    return

  countDownElement.innerHTML = getCurrentTime()
}

function startCountDown() {
  // Clear count down interval if any
  if (countDownInterval)
    clearInterval(countDownInterval)

  countDownInterval = setInterval(checkPrayerTime, 1000)
}

onMounted(() => {
  countDownElement = document.getElementById('count-down')

  console.log(prayerTime)

  const diffToNextSecond = getDiffToNextSecond()
  // Wait until the next second to start
  setTimeout(startCountDown, diffToNextSecond)
})
</script>

<template>
  <span><span>Memuat...</span><span id="count-down" /></span>
</template>

<style scoped>

</style>
