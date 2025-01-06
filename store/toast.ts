import { defineStore } from 'pinia'
import type { Toast } from '~/types/toast'

export const useToastStore = defineStore('useToastStore', {
  state: () => ({
    toasts: [] as Toast[],
  }),
})
