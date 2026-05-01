import { useMemo, useState } from 'react'
import Banner from '../components/ui/Banner.jsx'
import ProductGrid from '../components/products/ProductGrid.jsx'
import ProductToolbar from '../components/products/ProductToolbar.jsx'
import { useProducts } from '../store/products/useProducts.js'

function normalize(s) {
  return String(s ?? '').toLowerCase().trim()
}

function sortProducts(list, sortKey) {
  const copy = [...list]
  switch (sortKey) {
    case 'price_desc':
      copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      break
    case 'rating_desc':
      copy.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
      break
    case 'rating_asc':
      copy.sort((a, b) => (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0))
      break
    case 'price_asc':
    default:
      copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      break
  }
  return copy
}

export default function HomeScreen() {
  const { state, products, categories, canUndo, canRedo, dispatch } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('price_asc')

  const view = useMemo(() => {
    const q = normalize(search)
    let list = products
    if (q) list = list.filter((p) => normalize(p.title).includes(q))
    if (category) list = list.filter((p) => p.category === category)
    return sortProducts(list, sort)
  }, [products, search, category, sort])

  return (
    <div className="space-y-6">
      <Banner />
      <ProductToolbar
        search={search}
        onSearch={setSearch}
        category={category}
        categories={categories}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => dispatch({ type: 'UNDO' })}
        onRedo={() => dispatch({ type: 'REDO' })}
      />

      {state.present.status === 'loading' ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-600">Loading products…</p>
        </div>
      ) : null}

      {state.present.status === 'error' ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-rose-700">Failed to load: {state.present.error}</p>
        </div>
      ) : null}

      {state.present.status === 'ready' ? <ProductGrid products={view} /> : null}
    </div>
  )
}
