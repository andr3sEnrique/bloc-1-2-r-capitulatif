import { useState, type ReactNode } from 'react'
import type { Evidence, OpenAnswerSpec } from '../../data/games/types'
import { gradeOpen, type OpenGrade } from '../../lib/grading'

/** Liste réordonnable avec boutons ↑ ↓ (utilisable au doigt et au clavier). */
export function OrderList({
  items,
  onChange,
  locked,
  expected,
}: {
  items: string[]
  onChange: (items: string[]) => void
  locked: boolean
  /** Ordre attendu : une fois verrouillée, chaque ligne est colorée selon sa position */
  expected?: string[]
}) {
  const move = (i: number, delta: number) => {
    const j = i + delta
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <ol className="space-y-2">
      {items.map((item, i) => {
        const ok = locked && expected ? expected[i] === item : undefined
        return (
          <li
            key={item}
            className={`flex items-center gap-2 rounded-xl border p-2.5 text-sm transition ${
              ok === undefined
                ? 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
                : ok
                  ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10'
                  : 'border-rose-400 bg-rose-50 dark:border-rose-500/50 dark:bg-rose-500/10'
            }`}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold tabular-nums dark:bg-slate-800">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">{item}</span>
            {!locked && (
              <span className="flex shrink-0 gap-1">
                <IconButton label="Monter" disabled={i === 0} onClick={() => move(i, -1)}>
                  ↑
                </IconButton>
                <IconButton label="Descendre" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                  ↓
                </IconButton>
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function IconButton({ children, label, onClick, disabled }: { children: ReactNode; label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 font-bold hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  )
}

/**
 * Réponse ouverte : saisie, correction par mots-clés, réponse modèle,
 * et possibilité de se déclarer juste si la formulation diffère.
 */
export function OpenAnswer({
  spec,
  onGraded,
  placeholder = 'Rédigez votre réponse comme à l’oral : idée principale, arguments, exemple…',
}: {
  spec: OpenAnswerSpec
  /** Appelé une fois à la correction, puis éventuellement si l’utilisateur se déclare juste */
  onGraded: (grade: OpenGrade, overridden: boolean) => void
  placeholder?: string
}) {
  const [text, setText] = useState('')
  const [grade, setGrade] = useState<OpenGrade | null>(null)
  const [overridden, setOverridden] = useState(false)

  if (!grade) {
    return (
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">{text.trim().split(/\s+/).filter(Boolean).length} mots</span>
          <button
            type="button"
            disabled={text.trim().length < 10}
            onClick={() => {
              const g = gradeOpen(text, spec)
              setGrade(g)
              onGraded(g, false)
            }}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-indigo-500"
          >
            Faire corriger
          </button>
        </div>
      </div>
    )
  }

  const pct = Math.round(grade.ratio * 100)
  const passed = grade.passed || overridden
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-slate-50 p-3 text-sm whitespace-pre-wrap dark:bg-slate-800/60">{text}</div>
      <div
        className={`rounded-xl p-3 text-sm ${
          passed ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-amber-50 dark:bg-amber-500/10'
        }`}
      >
        <p className="font-semibold">
          {passed ? '✓ Réponse validée' : '↻ Réponse incomplète'} · {pct} % des notions clés
          {overridden && ' (validée par vous)'}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {grade.found.map((f) => (
            <span key={f} className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
              ✓ {f}
            </span>
          ))}
          {grade.missing.map((m) => (
            <span key={m} className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-500/20 dark:text-rose-300">
              ✗ {m}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm dark:border-sky-500/30 dark:bg-sky-500/10">
        <p className="font-semibold text-sky-900 dark:text-sky-200">Réponse modèle</p>
        <p className="mt-1 leading-relaxed">{spec.model}</p>
      </div>
      {!passed && (
        <button
          type="button"
          onClick={() => {
            setOverridden(true)
            onGraded(grade, true)
          }}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Ma réponse disait la même chose avec d’autres mots → la valider
        </button>
      )}
    </div>
  )
}

/** Pièces du dossier : journaux, mails, tableaux… */
export function EvidencePanel({ evidence }: { evidence: Evidence[] }) {
  return (
    <div className="space-y-3">
      {evidence.map((e) => (
        <figure key={e.label} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <figcaption className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <span aria-hidden>📄</span>
            {e.label}
          </figcaption>
          <pre
            className={`overflow-x-auto bg-white p-3 text-[13px] leading-relaxed whitespace-pre-wrap dark:bg-slate-950 ${
              e.mono ? 'font-mono' : 'font-sans'
            }`}
          >
            {e.content}
          </pre>
        </figure>
      ))}
    </div>
  )
}

/** Bouton d’option pour les choix (QCM, décisions…) avec état après réponse. */
export function OptionButton({
  children,
  onClick,
  state,
  disabled,
  selected,
}: {
  children: ReactNode
  onClick: () => void
  /** Après validation : correct, wrong (choisi à tort), missed (bonne réponse non choisie) */
  state?: 'correct' | 'wrong' | 'missed'
  disabled?: boolean
  selected?: boolean
}) {
  const styles =
    state === 'correct'
      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
      : state === 'wrong'
        ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10'
        : state === 'missed'
          ? 'border-emerald-500 border-dashed bg-white dark:bg-slate-900'
          : selected
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15'
            : 'border-slate-300 bg-white hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition disabled:cursor-default ${styles}`}
    >
      {children}
    </button>
  )
}
