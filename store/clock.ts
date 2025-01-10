import { defineStore } from 'pinia'

export const useClockStore = defineStore('useClockStore', {
  state: () => ({
    clockInterval: 1000 as number,
    adjustedSeconds: 0 as number,
    fastenClockInterval: null as NodeJS.Timeout | null,
  }),
  actions: {
    fastenClock() {
      const clockStore = useClockStore()
      clockStore.clockInterval = 1

      clockStore.fastenClockInterval = setInterval(() => {
        clockStore.adjustedSeconds += 10
      }, 10)
    },
    stopFastenClock() {
      const clockStore = useClockStore()
      clockStore.clockInterval = 1000

      if (clockStore.fastenClockInterval)
        clearInterval(clockStore.fastenClockInterval)

      clockStore.fastenClockInterval = null
    },
  },
})
