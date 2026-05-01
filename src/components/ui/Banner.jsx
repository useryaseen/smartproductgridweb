export default function Banner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 px-6 py-8 shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_30px_90px_-45px_rgba(79,70,229,0.35)] sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700/90">Live, sortable, editable</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Smart Product Grid</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Search, filter, sort, and edit product categories with undo/redo. Simulated API latency/failures and periodic data
            updates included.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-700 shadow-sm">
            <span className="font-semibold text-slate-900">Tip:</span> Try rapid edits, then undo/redo.
          </div>
        </div>
      </div>
    </section>
  )
}
