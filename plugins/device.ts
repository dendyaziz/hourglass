import { reactive } from 'vue'
import { defineNuxtPlugin, useRequestHeaders } from '#app'
import generateFlags from '~/runtime/generateFlags'

export default defineNuxtPlugin((nuxtApp) => {
  const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36'
  const REFRESH_ON_RESIZE = true

  // Server Side
  if (nuxtApp.ssrContext) {
    const headers = useRequestHeaders()

    const userAgent = headers['user-agent'] || DEFAULT_USER_AGENT

    const flags = reactive(generateFlags(headers, userAgent))

    return {
      provide: {
        device: flags,
      },
    }
  }

  // Client Side
  const userAgent = navigator.userAgent || DEFAULT_USER_AGENT
  const flags = reactive(generateFlags({}, userAgent))

  if (REFRESH_ON_RESIZE) {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        const newFlags = generateFlags(
          {},
          navigator.userAgent || DEFAULT_USER_AGENT,
        )
        Object.entries(newFlags).forEach((entry: [string, any]) => {
          const [key, value] = entry
          flags[key] = value
        })
      }, 50)
    })
  }

  return {
    provide: {
      device: flags,
    },
  }
})
