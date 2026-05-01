import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import { useProducts } from '../store/products/useProducts.js'

export default function EditProductScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)
  const { state, categories, updateCategory } = useProducts()

  const product = useMemo(() => state.present.productsById[productId] ?? null, [state, productId])
  const [nextCategory, setNextCategory] = useState('')
  const [message, setMessage] = useState(null)

  if (state.present.status !== 'ready') {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center">
        <p className="text-sm text-slate-200">Loading…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center">
        <p className="text-sm text-slate-200">Product not found.</p>
        <div className="mt-4">
          <Link to="/" className="text-sm font-medium text-cyan-200 hover:text-cyan-100">
            Go back
          </Link>
        </div>
      </div>
    )
  }

  const currentCategory = product.category
  const pending = Boolean(product.__meta?.pending)
  const lastError = product.__meta?.lastError

  async function onSave() {
    const trimmed = nextCategory.trim()
    if (!trimmed) return setMessage({ type: 'error', text: 'Enter a category.' })
    setMessage(null)
    const result = await updateCategory(productId, trimmed)
    if (result.ok) setMessage({ type: 'ok', text: 'Category updated.' })
    else if (!result.aborted) setMessage({ type: 'error', text: result.error?.message ?? 'Update failed.' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Edit</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">Update category</h2>
        </div>
        <Button variant="subtle" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex gap-4">
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white p-3">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-snug">{product.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-200/90">{product.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="rounded-full bg-white/10 px-2 py-0.5">Price ${Number(product.price ?? 0).toFixed(2)}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">
                    Rating {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">Current: {currentCategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <label className="mb-1 block text-xs font-medium text-slate-200">New category</label>
            <Input
              value={nextCategory}
              onChange={(e) => setNextCategory(e.target.value)}
              placeholder="e.g. electronics"
              disabled={pending}
            />
            <p className="mt-2 text-xs text-slate-300">Suggestions: {categories.slice(0, 4).join(', ')}</p>

            <div className="mt-4 flex gap-2">
              <Button onClick={onSave} disabled={pending}>
                {pending ? 'Saving…' : 'Save'}
              </Button>
              <Button
                variant="subtle"
                onClick={() => {
                  setNextCategory(currentCategory)
                  setMessage(null)
                }}
                disabled={pending}
              >
                Use current
              </Button>
              <Button variant="subtle" onClick={() => navigate('/')} disabled={pending}>
                Home
              </Button>
            </div>

            {message ? (
              <div
                className={[
                  'mt-4 rounded-2xl border px-3 py-2 text-sm',
                  message.type === 'ok'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
                    : 'border-rose-500/20 bg-rose-500/10 text-rose-100',
                ].join(' ')}
              >
                {message.text}
              </div>
            ) : null}

            {lastError ? <div className="mt-3 text-xs text-rose-200">Last error: {lastError}</div> : null}
          </div>
        </div>
      </section>
    </div>
  )
}
