import { derived, writable } from 'svelte/store'

export default <T>(url: string) => {
  const loading = writable<boolean>(false)
  const error = writable<string>('')
  const data = writable<T | undefined>(undefined)

  async function exec() {
    loading.set(true)
    error.set('')
    try {
      const response = await fetch(url)
      data.set(await response.json())
    } catch (e) {
      error.set(e)
    }
    loading.set(false)
  }

  exec()

  return {
    data: derived(data, (value) => value),
    loading: derived(loading, (value) => value),
    error: derived(error, (value) => value),
    exec,
  }
}
