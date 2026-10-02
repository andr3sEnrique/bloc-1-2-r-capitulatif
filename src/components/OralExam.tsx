import { useEffect, useState } from 'react'
import { getBlock } from '../data/blocks'
import { QUESTIONS } from '../data/questions'
import type { BlockId, Difficulty, Question } from '../data/types'
import type { CardStatus, ProgressApi } from '../lib/progress'
import { shuffle } from '../lib/shuffle'
import { BlockSelector } from './BlockSelector'
import { Flashcard } from './Flashcard'
import { Card, PageHeader, ProgressBar } from './ui'

const SIZES = [5, 8, 12] as const
const DURATION_MIN = 10

/** Tirage façon jury : une question officielle, une montée en difficulté, un piège de culture générale. */
function drawExam(block: BlockId, size: number): Question[] {
  const pool = shuffle(QUESTIONS.filter((q) => q.scope === block))
  const tricks = shuffle(QUESTIONS.filter((q) => q.scope === 0 && q.isTrick))
  const picked: Question[] = []
  const take = (pred: (q: Question) => boolean) => {
    const q = pool.find((x) => pred(x) && !picked.includes(x))
    if (q) picked.push(q)
  }

  take((q) => !!q.official)
  const ladder: Difficulty[] = [2, 3, 4, 2, 3, 4, 3, 1, 4, 2, 3]
  for (const d of ladder) {
    if (picked.length >= size - 1) break
    take((q) => q.difficulty === d)
  }
  while (picked.length < size - 1 && picked.length < pool.length) take(() => true)

  const ordered = picked.sort((a, b) => a.difficulty - b.difficulty)
  if (tricks[0]) ordered.splice(Math.floor(ordered.length / 2), 0, tricks[0])
  return ordered.slice(0, size)
}

type Phase = 'setup' | 'running' | 'done'

export function OralExam({
  block,
  onBlockChange,
  progress,
}: {
  block: BlockId
  onBlockChange: (b: BlockId) => void
  progress: ProgressApi
}) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [size, setSize] = useState<number>(8)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, CardStatus>>({})
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [remaining, setRemaining] = useState(DURATION_MIN * 60)

  useEffect(() => {
    if (phase !== 'running') return
    const t = window.setInterval(() => setRemaining((r) => r - 1), 1000)
    return () => window.clearInterval(t)
  }, [phase])

  const start = () => {
    setQuestions(drawExam(block, size))
    setAnswers({})
    setIndex(0)
    setRevealed(false)
    setRemaining(DURATION_MIN * 60)
    setPhase('running')
  }

  const answer = (s: CardStatus) => {
    const q = questions[index]
    setAnswers((a) => ({ ...a, [q.id]: s }))
    progress.mark(q.id, s)
    if (index < questions.length - 1) {
      setIndex(index + 1)
      setRevealed(false)
    } else {
      setPhase('done')
    }
  }

  const data = getBlock(block)

  if (phase === 'setup') {
    return (
      <div>
        <PageHeader
          title="Oral blanc"
          subtitle={`Simulez les ${DURATION_MIN} minutes de questions du jury : tirage aléatoire, difficulté croissante, une question piège glissée au milieu.`}
        />
        <BlockSelector value={block} onChange={onBlockChange} />
        <Card className="mt-5 p-5">
          <h2 className="font-semibold">Mise en situation</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Vous venez de terminer vos 20 minutes de présentation sur le cas <strong>{data.scenario.name}</strong>. Le jury
            vous interroge. Répondez à voix haute, en 1 à 2 minutes par question, avant de révéler les clés.
          </p>
          <fieldset className="mt-5">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Nombre de questions
            </legend>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    size === s
                      ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={start}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 sm:w-auto dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Commencer l’oral ({DURATION_MIN} min)
          </button>
        </Card>
      </div>
    )
  }

  if (phase === 'done') {
    const known = questions.filter((q) => answers[q.id] === 'known')
    const review = questions.filter((q) => answers[q.id] !== 'known')
    const score = Math.round((known.length / questions.length) * 20)
    return (
      <div>
        <PageHeader title="Bilan de l’oral blanc" subtitle={`${data.code} · ${data.scenario.name}`} />
        <Card className="p-5">
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Auto-évaluation</p>
              <p className="text-4xl font-bold">
                {score}
                <span className="text-xl text-slate-400">/20</span>
              </p>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {known.length} maîtrisée{known.length > 1 ? 's' : ''} sur {questions.length} ·{' '}
              {remaining >= 0 ? `terminé avec ${formatTime(remaining)} d’avance` : `dépassement de ${formatTime(-remaining)}`}
            </div>
          </div>
          {review.length > 0 && (
            <>
              <h2 className="mt-6 font-semibold">À retravailler</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {review.map((q) => (
                  <li key={q.id} className="rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
                    {q.question}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={start} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white dark:bg-indigo-500">
              Nouveau tirage
            </button>
            <button type="button" onClick={() => setPhase('setup')} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold dark:border-slate-700">
              Changer de bloc
            </button>
          </div>
        </Card>
      </div>
    )
  }

  const q = questions[index]
  const overtime = remaining < 0
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Oral blanc · {data.code}
          </p>
          <p className="font-medium">
            Question {index + 1} / {questions.length}
          </p>
        </div>
        <div
          className={`rounded-xl px-3 py-2 font-mono text-lg font-semibold tabular-nums ${
            overtime
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
              : remaining < 120
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'
                : 'bg-slate-100 dark:bg-slate-800'
          }`}
          aria-live="off"
        >
          {overtime ? '+' : ''}
          {formatTime(Math.abs(remaining))}
        </div>
      </div>
      <ProgressBar value={index} max={questions.length} className="mb-4" />
      <Flashcard key={q.id} question={q} revealed={revealed} onReveal={() => setRevealed(true)} onMark={answer} />
      <button
        type="button"
        onClick={() => setPhase('done')}
        className="mt-4 text-sm font-medium text-slate-500 hover:underline dark:text-slate-400"
      >
        Terminer maintenant
      </button>
    </div>
  )
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
