export default function Input({ className = '', ...props }) {
  return (
    <input
      className={[
        'h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm',
        'outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
