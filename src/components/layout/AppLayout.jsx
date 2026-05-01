import { Outlet } from 'react-router-dom'
import TopNav from './TopNav.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <TopNav />
      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
