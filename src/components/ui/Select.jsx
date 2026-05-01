export default function Select({ className = '', children, ...props }) {
  return (
    <select
      className={[
        'h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white',
        'outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </select>
  )
}

