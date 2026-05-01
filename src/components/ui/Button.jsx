export default function Button({ as: As = 'button', className = '', variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-white text-slate-950 hover:bg-white/90',
    subtle: 'bg-white/10 text-white hover:bg-white/15',
    danger: 'bg-rose-500 text-white hover:bg-rose-500/90',
  }

  return <As className={[base, variants[variant] ?? variants.primary, className].join(' ')} {...props} />
}

