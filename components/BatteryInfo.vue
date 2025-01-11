<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// Reactive references for battery level and charging state
const isAccessible = ref(false)
const percentage = ref(0)
const isCharging = ref(false)

onMounted(async () => {
  if ('getBattery' in navigator) {
    try {
      const battery = await navigator.getBattery()

      isAccessible.value = true

      // Update the reactive references
      percentage.value = Math.round(battery.level * 100)
      isCharging.value = battery.charging

      // Event listeners to update on changes
      const updateBatteryInfo = () => {
        percentage.value = Math.round(battery.level * 100)
        isCharging.value = battery.charging
      }

      battery.addEventListener('levelchange', updateBatteryInfo)
      battery.addEventListener('chargingchange', updateBatteryInfo)

      // Clean up listeners on unmount
      onUnmounted(() => {
        battery.removeEventListener('levelchange', updateBatteryInfo)
        battery.removeEventListener('chargingchange', updateBatteryInfo)
      })
    }
    catch (error) {
      console.error('Error accessing the Battery Status API:', error)
      isAccessible.value = false
    }
  }
  else {
    console.warn('Battery Status API is not supported in this browser.')
    isAccessible.value = false
  }
})
</script>

<template>
  <div
    v-if="isAccessible && percentage !== null"
    class="flex items-center opacity-70 gap-[0.25em]"
  >
    <div class="relative">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="w-[1.75em] fill-current"
      >
        <rect
          x="2.70001"
          y="8.7"
          height="6.6"
          :class="{ 'fill-red-500': percentage <= 20 }"
          :style="{ width: `${(percentage / 100) * 16.8}px` }"
        />
        <path
          d="M1 7.9853C1 7.70081 1.09462 7.46552 1.28386 7.27943C1.4731 7.09314 1.70756 7 1.98725 7L20.2029 7C20.4826 7 20.7171 7.09406 20.9063 7.28217C21.0956 7.47028 21.1902 7.70334 21.1902 7.98135L21.1902 9.94405L22.0127 9.94405C22.2924 9.94405 22.5269 10.0381 22.7161 10.2262C22.9054 10.4141 23 10.6472 23 10.9254L23 13.0746C23 13.3528 22.9054 13.5859 22.7161 13.7738C22.5269 13.9619 22.2924 14.0559 22.0127 14.0559L21.1902 14.0559L21.1902 16.0235C21.1902 16.3021 21.0956 16.5345 20.9063 16.7206C20.7171 16.9069 20.4826 17 20.2029 17L1.98725 17C1.70756 17 1.4731 16.9059 1.28386 16.7178C1.09462 16.5297 1 16.2967 1 16.0186L1 7.9853ZM2.22222 8.21492L2.22222 15.7851L19.9915 15.7851L19.9915 8.21492L2.22222 8.21492Z"
        />
      </svg>

      <svg
        v-if="isCharging"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5em] fill-current drop-shadow-lg"
      ><path d="m366.15-124.62 40-275.38h-170l299.23-431.54h18.47L514.62-520h200l-330 395.38h-18.47Z" /></svg>

      <svg
        v-if="isCharging"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2em] fill-black"
      ><path d="m422-232 207-248H469l29-227-185 267h139l-30 208Zm-42 94 40-274H259l281-405-39 309h188L380-138Zm91-332Z" /></svg>
    </div>

    <div>
      {{ percentage }}%
    </div>
  </div>
</template>
