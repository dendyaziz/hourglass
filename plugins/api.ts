// plugins/api.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: import.meta.server ? config.apiBaseUrl : config.public.apiBaseUrl,
  })

  return {
    provide: {
      api,
    },
  }
})
