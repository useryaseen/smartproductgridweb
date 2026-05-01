import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { fetchProducts } from '../../lib/fakeStoreApi.js'
import { env } from '../../lib/env.js'
import { updateProductCategorySimulated } from '../../lib/simulatedUpdateApi.js'
import { initialState, productsReducer, selectCategories, selectProductById, selectProducts } from './reducer.js'
import { ProductsContext } from './productsContext.js'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function buildRemotePatch(products) {
  const ids = products.map((p) => p.id)
  if (!ids.length) return []

  const patchSize = Math.max(1, Math.min(4, Math.floor(ids.length / 6)))
  const patch = []

  for (let i = 0; i < patchSize; i++) {
    const id = ids[Math.floor(Math.random() * ids.length)]
    const product = products.find((p) => p.id === id)
    if (!product) continue

    const price = Math.max(1, Number(product.price ?? 1) * randomBetween(0.97, 1.03))
    const rate = Math.max(0, Math.min(5, (product.rating?.rate ?? 0) + randomBetween(-0.2, 0.2)))
    patch.push({
      id,
      price: Math.round(price * 100) / 100,
      rating: { rate: Math.round(rate * 10) / 10 },
    })
  }

  return patch
}

export default function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const pendingControllersRef = useRef(new Map())

  const products = useMemo(() => selectProducts(state), [state])
  const categories = useMemo(() => selectCategories(state), [state])

  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'LOAD_START' })
    fetchProducts({ signal: controller.signal })
      .then((list) => dispatch({ type: 'LOAD_SUCCESS', products: list }))
      .catch((err) => {
        if (err?.name === 'AbortError') return
        dispatch({ type: 'LOAD_ERROR', error: err?.message ?? String(err) })
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (state.present.status !== 'ready') return
    const interval = setInterval(() => {
      const patch = buildRemotePatch(products)
      if (patch.length) dispatch({ type: 'REMOTE_TICK_APPLY', patch })
    }, env.pollingIntervalMs)
    return () => clearInterval(interval)
  }, [products, state.present.status])

  const updateCategory = useCallback(
    async (id, nextCategory) => {
      const product = selectProductById(state, id)
      if (!product) return { ok: false, error: new Error('Product not found') }

      const prevCtl = pendingControllersRef.current.get(id)
      if (prevCtl) prevCtl.abort()

      const requestId = `${Date.now()}_${Math.random().toString(16).slice(2)}`
      const controller = new AbortController()
      pendingControllersRef.current.set(id, controller)

      dispatch({ type: 'EDIT_CATEGORY_OPTIMISTIC', id, nextCategory, requestId })

      try {
        await updateProductCategorySimulated(id, nextCategory, { signal: controller.signal })
        dispatch({ type: 'EDIT_CATEGORY_COMMIT', id, requestId })
        return { ok: true }
      } catch (error) {
        if (error?.name === 'AbortError') return { ok: false, aborted: true }
        dispatch({ type: 'EDIT_CATEGORY_ROLLBACK', id, requestId, prevCategory: product.category, error })
        return { ok: false, error }
      } finally {
        const currentCtl = pendingControllersRef.current.get(id)
        if (currentCtl === controller) pendingControllersRef.current.delete(id)
      }
    },
    [state],
  )

  const value = useMemo(
    () => ({
      state,
      dispatch,
      products,
      categories,
      updateCategory,
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
    }),
    [state, products, categories, updateCategory],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

