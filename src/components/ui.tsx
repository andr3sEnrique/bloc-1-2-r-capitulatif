import type { ReactNode } from 'react'
import { DIFFICULTY_LABELS, SCOPE_LABELS, type Difficulty, type QuestionScope } from '../data/types'

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  )
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  1: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  2: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
  3: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  4: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <Badge className={DIFFICULTY_STYLES[level]}>
      <span aria-hidden>{'●'.repeat(level)}</span>
      {DIFFICULTY_LABELS[level]}
    </Badge>
  )
}

export function ScopeBadge({ scope }: { scope: QuestionScope }) {
  const styles: Record<QuestionScope, string> = {
    1: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300',
    2: 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
    0: 'bg-slate-200 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300',
  }
  return <Badge className={styles[scope]}>{SCOPE_LABELS[scope]}</Badge>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-slate-600 dark:text-slate-400">{subtitle}</p>}
    </header>
  )
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
          : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
      }`}
    >
      {children}
    </button>
  )
}

export function ProgressBar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-indigo-600 transition-all dark:bg-indigo-500" style={{ width: `${pct}%` }} />
    </div>
  )
}
