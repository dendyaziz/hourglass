import { useNuxtApp } from '#app'
import type { Device } from '~/types/device'

export function useDevice(): Device {
  return useNuxtApp().$device
}
