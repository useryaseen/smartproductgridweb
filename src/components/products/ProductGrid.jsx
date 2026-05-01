import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <p className="text-sm text-slate-600">No products match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
