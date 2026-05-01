import { env } from './env.js'

export async function fetchProducts({ signal } = {}) {
  const res = await fetch(`${env.apiBaseUrl}/products`, { signal })
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`)
  return res.json()
}

