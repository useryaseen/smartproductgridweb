import { Link, NavLink } from 'react-router-dom'

export default function TopNav() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-bold text-slate-950">
            SP
          </span>
          <span className="text-sm font-semibold tracking-tight">Smart Product Grid</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                'rounded-lg px-3 py-1.5 transition',
                isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5',
              ].join(' ')
            }
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

