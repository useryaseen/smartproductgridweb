import { Link } from 'react-router-dom'

function clamp2(n) {
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(5, Math.round(n * 10) / 10))
}

export default function ProductCard({ product }) {
  const rating = clamp2(product.rating?.rate ?? 0)

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.03),0_18px_60px_-40px_rgba(15,23,42,0.35)] transition hover:border-slate-300 hover:shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_30px_90px_-55px_rgba(79,70,229,0.35)]">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition group-hover:scale-[1.03]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-slate-900">
            {product.title}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{product.category}</span>
            <span className="text-slate-300">•</span>
            <span>
              Rating <span className="font-semibold text-slate-900">{rating}</span> ({product.rating?.count ?? 0})
            </span>
          </p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-lg font-semibold tracking-tight text-slate-900">${Number(product.price ?? 0).toFixed(2)}</p>

            <Link
              to={`/edit/${product.id}`}
              className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              Edit category
            </Link>
          </div>
        </div>
      </div>

      {product.__meta?.pending ? (
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-3">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
            Updating…
          </span>
        </div>
      ) : null}
    </article>
  )
}

