export default function Button({ as: As = 'button', className = '', variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm',
    subtle: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm',
  }

  return <As className={[base, variants[variant] ?? variants.primary, className].join(' ')} {...props} />
}
