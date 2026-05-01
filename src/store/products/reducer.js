function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function upsertMetaById(productsById, id, patch) {
  const prev = productsById[id]
  if (!prev) return productsById
  return {
    ...productsById,
    [id]: {
      ...prev,
      __meta: { ...(prev.__meta ?? {}), ...patch },
    },
  }
}

function applyCategory(productsById, id, category, metaPatch = {}) {
  const prev = productsById[id]
  if (!prev) return productsById
  return {
    ...productsById,
    [id]: {
      ...prev,
      category,
      __meta: { ...(prev.__meta ?? {}), ...metaPatch },
    },
  }
}

function applyRemotePatch(productsById, patch) {
  // Incoming updates are price/rating only; keep local category edits authoritative.
  const next = { ...productsById }
  for (const { id, price, rating } of patch) {
    const prev = next[id]
    if (!prev) continue
    next[id] = {
      ...prev,
      price: typeof price === 'number' ? price : prev.price,
      rating: rating ? { ...prev.rating, ...rating } : prev.rating,
    }
  }
  return next
}

function toById(list) {
  const byId = {}
  for (const p of list) byId[p.id] = { ...p, __meta: { pending: false, lastError: null, lastRequestId: null } }
  return byId
}

function toList(byId) {
  return Object.values(byId).sort((a, b) => a.id - b.id)
}

const initialPresent = {
  status: 'idle', // idle | loading | ready | error
  error: null,
  productsById: {},
  lastRemoteTickAt: 0,
}

export const initialState = {
  past: [],
  present: initialPresent,
  future: [],
}

export function productsReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START': {
      return {
        ...state,
        present: { ...state.present, status: 'loading', error: null },
      }
    }
    case 'LOAD_SUCCESS': {
      const byId = toById(action.products)
      return {
        past: [],
        present: { ...initialPresent, status: 'ready', productsById: byId },
        future: [],
      }
    }
    case 'LOAD_ERROR': {
      return {
        ...state,
        present: { ...state.present, status: 'error', error: action.error ?? 'Failed to load products' },
      }
    }

    case 'EDIT_CATEGORY_OPTIMISTIC': {
      const { id, nextCategory, requestId } = action
      const prevCategory = state.present.productsById[id]?.category
      if (prevCategory == null) return state
      if (prevCategory === nextCategory) return state

      const nextPresent = {
        ...state.present,
        productsById: applyCategory(state.present.productsById, id, nextCategory, {
          pending: true,
          lastRequestId: requestId,
          lastError: null,
        }),
      }

      return {
        past: [...state.past, clone(state.present)],
        present: nextPresent,
        future: [],
      }
    }

    case 'EDIT_CATEGORY_COMMIT': {
      const { id, requestId } = action
      const current = state.present.productsById[id]
      if (!current) return state
      if (current.__meta?.lastRequestId !== requestId) return state // stale response
      return {
        ...state,
        present: {
          ...state.present,
          productsById: upsertMetaById(state.present.productsById, id, { pending: false, lastError: null }),
        },
      }
    }

    case 'EDIT_CATEGORY_ROLLBACK': {
      const { id, requestId, prevCategory, error } = action
      const current = state.present.productsById[id]
      if (!current) return state
      if (current.__meta?.lastRequestId !== requestId) return state // stale response

      return {
        ...state,
        present: {
          ...state.present,
          productsById: applyCategory(state.present.productsById, id, prevCategory, {
            pending: false,
            lastError: error?.message ?? 'Update failed',
          }),
        },
      }
    }

    case 'REMOTE_TICK_APPLY': {
      const now = Date.now()
      return {
        ...state,
        present: {
          ...state.present,
          lastRemoteTickAt: now,
          productsById: applyRemotePatch(state.present.productsById, action.patch),
        },
      }
    }

    case 'UNDO': {
      if (!state.past.length) return state
      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, -1)
      return { past: newPast, present: previous, future: [clone(state.present), ...state.future] }
    }
    case 'REDO': {
      if (!state.future.length) return state
      const next = state.future[0]
      const newFuture = state.future.slice(1)
      return { past: [...state.past, clone(state.present)], present: next, future: newFuture }
    }

    default:
      return state
  }
}

export function selectProducts(state) {
  return toList(state.present.productsById)
}

export function selectProductById(state, id) {
  return state.present.productsById[id] ?? null
}

export function selectCategories(state) {
  const set = new Set()
  for (const p of Object.values(state.present.productsById)) set.add(p.category)
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

