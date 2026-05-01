export default function Banner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_80px_-30px_rgba(79,70,229,0.65)] sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200/90">Live, sortable, editable</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Smart Product Grid</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200/90">
            Search, filter, sort, and edit product categories with undo/redo. Simulated API latency/failures and periodic data
            updates included.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
            <span className="font-semibold text-white">Tip:</span> Try rapid edits, then undo/redo.
          </div>
        </div>
      </div>
    </section>
  )
}

