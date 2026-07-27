import { motion } from 'framer-motion'
import { BarChart3, Bot, LayoutGrid, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  title: string
  description: string
  activeTab: 'dashboard' | 'chat' | 'insights'
  onTabChange: (tab: 'dashboard' | 'chat' | 'insights') => void
  children: ReactNode
}

interface NavItem {
  id: 'dashboard' | 'chat' | 'insights'
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutGrid },
  { id: 'chat', label: 'AI Business Analyst', icon: Bot },
  { id: 'insights', label: 'Insights Panel', icon: ShieldCheck },
]

export function DashboardLayout({ title, description, activeTab, onTabChange, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_35%),linear-gradient(135deg,_#030712_0%,_#090d1b_50%,_#050816_100%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:p-8">
        <aside className="w-full shrink-0 rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)] lg:w-72">
          <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-950/70 p-2">
                <BarChart3 className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Monday BI Agent</p>
                <p className="text-xs text-slate-400">Executive intelligence</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${isActive ? 'bg-violet-500/20 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1">
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Business intelligence</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">{description}</p>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                Live signal stream • 4 min ago
              </div>
            </div>
          </motion.header>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
