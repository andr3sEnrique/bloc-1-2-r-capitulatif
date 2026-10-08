import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { Question } from '../data/types'
import type { CardStatus, ProgressApi } from '../lib/progress'
import { Flashcard } from './Flashcard'
import { ProgressBar } from './ui'

/**
 * Lecteur de paquet de flashcards : navigation, raccourcis clavier et auto-évaluation.
 * Pour repartir de la première carte, le parent change la `key` du composant.
 */
export function DeckPlayer({
  questions,
  progress,
  toolbar,
  empty,
}: {
  questions: Question[]
  progress: ProgressApi
  /** Contrôles affichés à droite du compteur (ordre aléatoire…) */
  toolbar?: ReactNode
  /** Contenu affiché quand le paquet est vide */
  empty?: ReactNode
}) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const current = questions[index]
  const done = questions.filter((q) => progress.progress[q.id]).length
  const known = questions.filter((q) => progress.progress[q.id] === 'known').length

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(Math.max(i + delta, 0), Math.max(questions.length - 1, 0)))
      setRevealed(false)
    },
    [questions.length],
  )

  const mark = useCallback(
    (s: CardStatus) => {
      if (!current) return
      progress.mark(current.id, s)
      if (index < questions.length - 1) go(1)
    },
    [current, questions.length, go, index, progress],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      if (e.key === ' ' || e.key === 'Enter') {
        if (target.tagName === 'BUTTON') return
        e.preventDefault()
        setRevealed(true)
      } else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (revealed && e.key === '1') mark('review')
      else if (revealed && e.key === '2') mark('known')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, mark, revealed])

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="font-medium">
          {questions.length === 0 ? 'Aucune question' : `Question ${index + 1} / ${questions.length}`}
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          {known} maîtrisée{known > 1 ? 's' : ''} · {done - known} à revoir
        </span>
        {toolbar && <div className="ml-auto flex items-center gap-3">{toolbar}</div>}
      </div>
      <ProgressBar value={done} max={questions.length} className="mb-4" />

      {current ? (
        <>
          <Flashcard
            key={current.id}
            question={current}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
            status={progress.progress[current.id]}
            onMark={mark}
          />
          <div className="mt-4 flex items-center justify-between gap-2">
            <NavButton onClick={() => go(-1)} disabled={index === 0}>
              ← Précédente
            </NavButton>
            <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Raccourcis : Espace = révéler · ←/→ = naviguer · 1/2 = évaluer
            </span>
            <NavButton onClick={() => go(1)} disabled={index >= questions.length - 1}>
              Suivante →
            </NavButton>
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {empty ?? 'Aucune question.'}
        </div>
      )}
    </div>
  )
}

function NavButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  )
}

/** Case « Ordre aléatoire » + bouton « Remélanger », partagés par les écrans d’entraînement. */
export function ShuffleControls({
  shuffled,
  onToggle,
  onReshuffle,
}: {
  shuffled: boolean
  onToggle: (v: boolean) => void
  onReshuffle: () => void
}) {
  return (
    <>
      <label className="flex cursor-pointer items-center gap-2 select-none">
        <input
          type="checkbox"
          checked={shuffled}
          onChange={(e) => onToggle(e.target.checked)}
          className="h-4 w-4 accent-indigo-600"
        />
        Ordre aléatoire
      </label>
      {shuffled && (
        <button type="button" onClick={onReshuffle} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          Remélanger
        </button>
      )}
    </>
  )
}
