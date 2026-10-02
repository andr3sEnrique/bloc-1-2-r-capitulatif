import { BLOCKS } from '../data/blocks'
import type { BlockId } from '../data/types'

export function BlockSelector({ value, onChange }: { value: BlockId; onChange: (b: BlockId) => void }) {
  return (
    <div role="tablist" aria-label="Choix du bloc" className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/70 p-1 dark:bg-slate-800/70">
      {BLOCKS.map((b) => {
        const active = b.id === value
        return (
          <button
            key={b.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(b.id)}
            className={`rounded-xl px-3 py-2.5 text-left transition ${
              active ? 'bg-white shadow-sm dark:bg-slate-900' : 'text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-slate-900/40'
            }`}
          >
            <span className={`block text-xs font-semibold uppercase tracking-wide ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
              {b.code}
            </span>
            <span className="block text-sm leading-snug font-medium">{b.title}</span>
          </button>
        )
      })}
    </div>
  )
}
