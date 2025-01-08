<script setup lang="ts">
import { getDiffToNextSecond, getNow, getTimeDiffString } from '~/helper'
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

interface PrayerDelays {
  [key: string]: {
    adzan: number | null
    iqomah: number | null
  }
}

const prayerDelays: PrayerDelays = {
  imsak: { adzan: null, iqomah: null },
  subuh: { adzan: 180, iqomah: 600 },
  terbit: { adzan: null, iqomah: null },
  dhuha: { adzan: null, iqomah: null },
  dzuhur: { adzan: 180, iqomah: 420 },
  ashar: { adzan: 180, iqomah: 420 },
  maghrib: { adzan: 180, iqomah: 600 },
  isya: { adzan: 180, iqomah: 600 },
}

const prayerTimesData: PrayerTimes = prayerTimes
let nameElement: Element | null = null
let countDownElement: Element | null = null
let countDownInterval: NodeJS.Timeout | null = null
let nextEventTimeout: NodeJS.Timeout | null = null
let nextEventDate: Date | null = null

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

        const adzanSecondsDelay = prayerDelays[prayer]?.adzan || 0
        const iqomahSecondsDelay = prayerDelays[prayer]?.iqomah || 0

        const actualPrayerTime = new Date(prayerTime.getTime())
        actualPrayerTime.setSeconds(actualPrayerTime.getSeconds() + adzanSecondsDelay + iqomahSecondsDelay)

        if (actualPrayerTime > date) {
          nextPrayerList.push({ prayer, time: prayerTime })
        }
      }
    }
  }

  if (nextPrayerList.length > 0) {
    return nextPrayerList.sort((a, b) => a.time.getTime() - b.time.getTime())[0]
  }

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

function scheduleEvent(date: Date, prayer: string, adzanDelay: number | null, iqomahDelay: number | null) {
  if (!nameElement || !countDownElement)
    return

  const now = getNow()

  if (date <= now) {
    if (adzanDelay !== null && now < new Date(date.getTime() + adzanDelay * 1000)) {
      const adzanEnd = new Date(date.getTime() + adzanDelay * 1000)
      nextEventDate = adzanEnd
      nameElement.innerHTML = `Adzan ${prayer}: `
      countDownElement.innerHTML = getTimeDiffString(adzanEnd)

      nextEventTimeout = setTimeout(() => {
        scheduleEvent(adzanEnd, prayer, null, iqomahDelay)
      }, adzanEnd.getTime() - now.getTime())
    }
    else if (adzanDelay !== null && iqomahDelay !== null && now < new Date(date.getTime() + (adzanDelay * 1000) + (iqomahDelay * 1000))) {
      const iqomahEnd = new Date(date.getTime() + (adzanDelay * 1000) + (iqomahDelay * 1000))
      nextEventDate = iqomahEnd
      nameElement.innerHTML = `Iqomah ${prayer}: `
      countDownElement.innerHTML = getTimeDiffString(iqomahEnd)

      nextEventTimeout = setTimeout(() => {
        const nextPrayerTime = getNextPrayerTime(iqomahEnd)
        if (nextPrayerTime) {
          scheduleEvent(nextPrayerTime.time, nextPrayerTime.prayer, prayerDelays[nextPrayerTime.prayer]?.adzan ?? null, prayerDelays[nextPrayerTime.prayer]?.iqomah ?? null)
        }
      }, iqomahEnd.getTime() - now.getTime())
    }
    else {
      const nextPrayerTime = getNextPrayerTime(now)
      if (nextPrayerTime) {
        scheduleEvent(nextPrayerTime.time, nextPrayerTime.prayer, prayerDelays[nextPrayerTime.prayer]?.adzan ?? null, prayerDelays[nextPrayerTime.prayer]?.iqomah ?? null)
      }
    }
  }
  else {
    nameElement.innerHTML = `${prayer}: `
    nextEventDate = date
    countDownElement.innerHTML = getTimeDiffString(date)

    nextEventTimeout = setTimeout(() => {
      scheduleEvent(date, prayer, adzanDelay, iqomahDelay)
    }, date.getTime() - now.getTime())
  }
}

function displayCountDown() {
  if (!countDownElement || !nextEventDate)
    return

  countDownElement.innerHTML = getTimeDiffString(nextEventDate)
}

function startCountDown() {
  // Clear count down interval if any
  if (countDownInterval)
    clearInterval(countDownInterval)

  countDownInterval = setInterval(displayCountDown, 1000)
}

onMounted(() => {
  nameElement = document.getElementById('prayer-name')
  countDownElement = document.getElementById('prayer-count-down')

  const now = getNow()
  const nextPrayerTime = getNextPrayerTime(now)

  if (nextPrayerTime) {
    scheduleEvent(nextPrayerTime.time, nextPrayerTime.prayer, prayerDelays[nextPrayerTime.prayer]?.adzan ?? null, prayerDelays[nextPrayerTime.prayer]?.iqomah ?? null)
  }

  const diffToNextSecond = getDiffToNextSecond()

  // Wait until the next second to start
  setTimeout(startCountDown, diffToNextSecond)
})

// Inside your script
onUnmounted(() => {
  if (nextEventTimeout) {
    clearTimeout(nextEventTimeout)
    nextEventTimeout = null
  }
})
</script>

<template>
  <span><span
    id="prayer-name"
    class="capitalize"
  >Loading...</span><span id="prayer-count-down" /></span>
</template>

<style scoped>
</style>
