import { useEffect, useId, useMemo, useRef, useState } from 'react'

export default function DropdownSelect({
  value,
  options,
  onChange,
  placeholder = 'Select…',
  className = '',
  buttonClassName = '',
  align = 'left', // left | right
}) {
  const id = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value])
  const label = selected?.label ?? placeholder

  useEffect(() => {
    function onDocMouseDown(e) {
      const el = rootRef.current
      if (!el) return
      if (!el.contains(e.target)) setOpen(false)
    }
    function onDocKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onDocKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onDocKeyDown)
    }
  }, [])

  return (
    <div ref={rootRef} className={['relative', className].join(' ')}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 text-left text-sm text-slate-900 shadow-sm',
          'hover:bg-slate-50',
          'outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20',
          buttonClassName,
        ].join(' ')}
      >
        <span className={['truncate', selected ? '' : 'text-slate-400'].join(' ')}>{label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={['shrink-0 transition', open ? 'rotate-180 text-indigo-600' : 'text-slate-500'].join(' ')}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div
          className={[
            'absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur',
            'shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_30px_100px_-45px_rgba(15,23,42,0.25)]',
            'origin-top animate-[sp_dropdown_120ms_ease-out]',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          <ul id={`${id}-listbox`} role="listbox" className="sp-scroll max-h-64 overflow-auto p-1">
            {options.map((opt) => {
              const active = opt.value === value
              return (
                <li key={opt.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                    }}
                    className={[
                      'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30',
                      active
                        ? 'bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <span className="truncate">{opt.label}</span>
                    {active ? (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-indigo-600">
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.24a1 1 0 0 1-1.414.004L3.29 9.14a1 1 0 1 1 1.414-1.414l4.1 4.1 6.49-6.53a1 1 0 0 1 1.41-.006Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
