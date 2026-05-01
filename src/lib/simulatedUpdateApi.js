import { env } from './env.js'

function sleep(ms, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    if (!signal) return
    const onAbort = () => {
      clearTimeout(t)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    if (signal.aborted) return onAbort()
    signal.addEventListener('abort', onAbort, { once: true })
  })
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function updateProductCategorySimulated(productId, nextCategory, { signal } = {}) {
  const delay = randomInt(env.updateDelayMinMs, env.updateDelayMaxMs)
  await sleep(delay, { signal })

  if (Math.random() < env.updateFailureRate) {
    const err = new Error('Simulated update failure. Please retry.')
    err.code = 'SIMULATED_FAILURE'
    throw err
  }

  return { id: productId, category: nextCategory }
}

