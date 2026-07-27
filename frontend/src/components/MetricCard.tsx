import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  detail: string
  icon: LucideIcon
  tone: 'violet' | 'emerald' | 'cyan' | 'amber'
}

const toneStyles: Record<MetricCardProps['tone'], string> = {
  violet: 'from-violet-500/20 via-violet-500/10 to-slate-950/60 border-violet-400/20 text-violet-200',
  emerald: 'from-emerald-500/20 via-emerald-500/10 to-slate-950/60 border-emerald-400/20 text-emerald-200',
  cyan: 'from-cyan-500/20 via-cyan-500/10 to-slate-950/60 border-cyan-400/20 text-cyan-200',
  amber: 'from-amber-500/20 via-amber-500/10 to-slate-950/60 border-amber-400/20 text-amber-200',
}

export function MetricCard({ title, value, detail, icon: Icon, tone }: MetricCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border bg-gradient-to-br ${toneStyles[tone]} p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.65)]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">{detail}</p>
    </motion.article>
  )
}
