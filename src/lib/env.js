export const env = {
  apiBaseUrl: import.meta.env?.VITE_API_BASE_URL ?? 'https://fakestoreapi.com',
  updateDelayMinMs: Number(import.meta.env?.VITE_UPDATE_DELAY_MIN_MS ?? 500),
  updateDelayMaxMs: Number(import.meta.env?.VITE_UPDATE_DELAY_MAX_MS ?? 1400),
  updateFailureRate: Number(import.meta.env?.VITE_UPDATE_FAILURE_RATE ?? 0.22),
  pollingIntervalMs: Number(import.meta.env?.VITE_POLLING_INTERVAL_MS ?? 6000),
}
