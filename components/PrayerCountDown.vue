<script setup lang="ts">
import { getDiffToNextSecond, getTimeDiffString } from '~/helper'
import prayerTimes from '~/assets/json/prayer-time.json'

interface PrayerTimes {
  [date: string]: {
    tanggal: string
    imsak: string
    subuh: string
    terbit: string
    dhuha: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
  }
}

let nameElement: Element | null = null
let countDownElement: Element | null = null
let countDownInterval: NodeJS.Timeout | null = null
const prayerTimesData: PrayerTimes = prayerTimes

function getNextPrayerTime(date: Date): { prayer: string, time: Date } | null {
  const todayDate = date.toISOString().split('T')[0]
  const timesToday = prayerTimesData[todayDate]
  const nextPrayerList: { prayer: string, time: Date }[] = []

  if (timesToday) {
    for (const [prayer, time] of Object.entries(timesToday)) {
      if (prayer !== 'tanggal') {
        const [hour, minute] = time.split(':').map(Number)
        const prayerTime = new Date(date)
        prayerTime.setHours(hour, minute, 0, 0)

        if (prayerTime > date) {
          nextPrayerList.push({ prayer, time: prayerTime })
        }
      }
    }
  }

  if (nextPrayerList.length > 0) {
    return nextPrayerList.sort((a, b) => a.time.getTime() - b.time.getTime())[0]
  }

  // If no prayers remain for today, check the next day
  const tomorrowDate = new Date(date)
  tomorrowDate.setDate(date.getDate() + 1)
  const nextDayDate = tomorrowDate.toISOString().split('T')[0]
  const timesTomorrow = prayerTimesData[nextDayDate]

  if (timesTomorrow) {
    const [firstPrayer, firstTime] = Object.entries(timesTomorrow).find(([key]) => key !== 'tanggal') || []
    if (firstPrayer && firstTime) {
      const [hour, minute] = firstTime.split(':').map(Number)
      const prayerTime = new Date(tomorrowDate)
      prayerTime.setHours(hour, minute, 0, 0)

      return { prayer: firstPrayer, time: prayerTime }
    }
  }

  return null
}

function checkPrayerTime() {
  if (!nameElement || !countDownElement)
    return

  const currentTime = new Date()

  const nextPrayerTime = getNextPrayerTime(currentTime)

  if (!nextPrayerTime)
    return

  nameElement.innerHTML = `${nextPrayerTime.prayer}: `
  countDownElement.innerHTML = getTimeDiffString(currentTime, nextPrayerTime.time)
}

function startCountDown() {
  // Clear count down interval if any
  if (countDownInterval)
    clearInterval(countDownInterval)

  countDownInterval = setInterval(checkPrayerTime, 1000)
}

onMounted(() => {
  nameElement = document.getElementById('prayer-name')
  countDownElement = document.getElementById('prayer-count-down')

  const diffToNextSecond = getDiffToNextSecond()

  // Wait until the next second to start
  setTimeout(startCountDown, diffToNextSecond)
})
</script>

<template>
  <span><span
    id="prayer-name"
    class="capitalize"
  >Good Morning!</span><span id="prayer-count-down" /></span>
</template>

<style scoped>

</style>
