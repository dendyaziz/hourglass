// composables/useAPI.ts
import type { UseFetchOptions } from 'nuxt/app'

export function useRequest<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const token = useCookie('access_token')

  return useFetch(url, {
    ...options,
    headers: { Authorization: token.value ? `Bearer ${token.value}` : '' },
    $fetch: useNuxtApp().$api,
  })
}
