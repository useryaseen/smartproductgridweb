import { Link } from 'react-router-dom'

function clamp2(n) {
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(5, Math.round(n * 10) / 10))
}

export default function ProductCard({ product }) {
  const rating = clamp2(product.rating?.rate ?? 0)
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-white/15 hover:bg-white/7">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition group-hover:scale-[1.03]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight">{product.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full bg-white/10 px-2 py-0.5">{product.category}</span>
            <span className="text-slate-500">•</span>
            <span>
              Rating <span className="font-semibold text-white">{rating}</span> ({product.rating?.count ?? 0})
            </span>
          </p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-lg font-semibold tracking-tight">${Number(product.price ?? 0).toFixed(2)}</p>
            <Link
              to={`/edit/${product.id}`}
              className="rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              Edit category
            </Link>
          </div>
        </div>
      </div>
      {product.__meta?.pending ? (
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-3">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[11px] font-semibold text-cyan-200">
            Updating…
          </span>
        </div>
      ) : null}
    </article>
  )
}

