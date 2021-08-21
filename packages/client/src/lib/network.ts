import { derived, writable } from 'svelte/store'

export function fetchInStore<T>(url: string) {
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
    resetError: () => error.set(''),
    exec,
  }
}

export function fetchJson<T>(url: string, payload: Record<string, any>, method: 'POST' | 'PUT' | 'PATCH'): Promise<T> {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    method,
  }).then((res) => res.json())
}
