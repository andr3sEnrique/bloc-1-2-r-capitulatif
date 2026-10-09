import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { QUIZZES } from '../../data/games'
import type { QuizQuestion } from '../../data/games/types'
import { DIFFICULTY_LABELS, type BlockId } from '../../data/types'
import type { GameStatsApi } from '../../lib/gameStats'
import { sameOrder, sameSet } from '../../lib/grading'
import { newSeed, shuffle } from '../../lib/shuffle'
import { BlockSelector } from '../BlockSelector'
import { Badge, Card, DifficultyBadge, ProgressBar } from '../ui'
import { OpenAnswer, OptionButton, OrderList } from './shared'

const TIME_LIMIT = 30
const TYPE_LABELS: Record<QuizQuestion['type'], string> = {
  single: 'QCM',
  multi: 'Plusieurs réponses',
  truefalse: 'Vrai ou faux',
  order: 'Remettre dans l’ordre',
  open: 'Question ouverte',
}

interface Result {
  question: QuizQuestion
  correct: boolean
  points: number
}

type Phase = 'setup' | 'play' | 'end'

export function Quiz({ block, onBlockChange, stats, onExit }: { block: BlockId; onBlockChange: (b: BlockId) => void; stats: GameStatsApi; onExit: () => void }) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [size, setSize] = useState(15)
  const [survival, setSurvival] = useState(false)
  const [chrono, setChrono] = useState(true)
  const [deck, setDeck] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [streak, setStreak] = useState(0)
  const [lives, setLives] = useState(3)
  const [answered, setAnswered] = useState<Result | null>(null)

  const pool = QUIZZES[block]
  const score = results.reduce((s, r) => s + r.points, 0)
  const gameId = `quiz-${block}`

  const start = () => {
    const picked = shuffle(pool, newSeed()).slice(0, Math.min(size, pool.length))
    setDeck(picked.sort((a, b) => a.difficulty - b.difficulty))
    setIndex(0)
    setResults([])
    setStreak(0)
    setLives(3)
    setAnswered(null)
    setPhase('play')
  }

  const finish = (all: Result[]) => {
    stats.record(gameId, all.reduce((s, r) => s + r.points, 0))
    setPhase('end')
  }

  /** ratio : part de la bonne réponse (1 = parfait) ; speed : part du temps restant (0 à 1) */
  const answer = (q: QuizQuestion, correct: boolean, ratio: number, speed: number) => {
    const base = 100 * q.difficulty
    const nextStreak = correct ? streak + 1 : 0
    const combo = nextStreak >= 5 ? 2 : nextStreak >= 3 ? 1.5 : 1
    const bonus = correct && chrono && q.type !== 'open' ? Math.round(base * 0.5 * speed) : 0
    const points = Math.round(base * Math.max(0, ratio) * combo) + bonus
    const r = { question: q, correct, points: correct || q.type === 'multi' ? points : 0 }
    setStreak(nextStreak)
    if (!correct && survival) setLives((l) => l - 1)
    setAnswered(r)
    setResults((rs) => [...rs, r])
  }

  /** Réponse ouverte jugée juste par l’utilisateur malgré des mots-clés manquants */
  const overrideLast = (q: QuizQuestion) => {
    const points = 100 * q.difficulty
    setStreak((s) => s + 1)
    if (survival) setLives((l) => l + 1)
    setAnswered({ question: q, correct: true, points })
    setResults((rs) => [...rs.slice(0, -1), { question: q, correct: true, points }])
  }

  const next = () => {
    const outOfLives = survival && lives <= 0
    if (outOfLives || index >= deck.length - 1) return finish(results)
    setIndex(index + 1)
    setAnswered(null)
  }

  if (phase === 'setup') {
    return (
      <div className="space-y-5">
        <BackLink onClick={onExit} />
        <div>
          <h1 className="text-2xl font-bold">Quiz-jeu</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            QCM, vrai/faux, remise en ordre et questions ouvertes corrigées automatiquement. Enchaînez les bonnes réponses pour
            déclencher le combo ×1,5 puis ×2.
          </p>
        </div>
        <BlockSelector value={block} onChange={onBlockChange} />
        <Card className="space-y-5 p-5">
          <Setting label="Nombre de questions">
            {[10, 15, 25, pool.length].map((n) => (
              <Pill key={n} active={size === n} onClick={() => setSize(n)}>
                {n === pool.length ? `Toutes (${n})` : n}
              </Pill>
            ))}
          </Setting>
          <Setting label="Options">
            <Pill active={chrono} onClick={() => setChrono(!chrono)}>
              ⏱ Chrono {TIME_LIMIT} s (bonus de vitesse)
            </Pill>
            <Pill active={survival} onClick={() => setSurvival(!survival)}>
              ♥ Mode survie (3 vies)
            </Pill>
          </Setting>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={start} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500">
              Lancer la partie
            </button>
            {stats.records[gameId] && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Record : <strong>{stats.records[gameId].best}</strong> pts · {stats.records[gameId].plays} partie(s)
              </span>
            )}
          </div>
        </Card>
      </div>
    )
  }

  if (phase === 'end') {
    const correct = results.filter((r) => r.correct).length
    const pct = results.length ? Math.round((correct / results.length) * 100) : 0
    const best = stats.records[gameId]?.best ?? 0
    const maxStreak = results.reduce(
      (acc, r) => {
        const cur = r.correct ? acc.cur + 1 : 0
        return { cur, max: Math.max(acc.max, cur) }
      },
      { cur: 0, max: 0 },
    ).max
    const missed = results.filter((r) => !r.correct)
    return (
      <div className="space-y-5">
        <BackLink onClick={onExit} />
        <Card className="p-6 text-center">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Partie terminée</p>
          <p className="mt-2 text-5xl font-bold text-indigo-600 tabular-nums dark:text-indigo-400">{score}</p>
          <p className="text-sm text-slate-500">points {score >= best && score > 0 ? '· 🏆 nouveau record !' : `· record ${best}`}</p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <Stat label="Réussite" value={`${pct} %`} />
            <Stat label="Bonnes réponses" value={`${correct}/${results.length}`} />
            <Stat label="Meilleure série" value={`${maxStreak}`} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={start} className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white dark:bg-indigo-500">
              Rejouer
            </button>
            <button type="button" onClick={() => setPhase('setup')} className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold dark:border-slate-700">
              Changer les réglages
            </button>
          </div>
        </Card>
        {missed.length > 0 && (
          <Card className="p-5">
            <h2 className="font-semibold">À retravailler ({missed.length})</h2>
            <ul className="mt-3 space-y-3">
              {missed.map((r) => (
                <li key={r.question.id} className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-amber-500/10">
                  <p className="font-medium">{r.question.prompt}</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{r.question.explanation}</p>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    )
  }

  const q = deck[index]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => finish(results)} className="text-sm font-medium text-slate-500 hover:underline dark:text-slate-400">
          ✕ Arrêter
        </button>
        <div className="flex items-center gap-3 text-sm font-semibold tabular-nums">
          {survival && <span className="text-rose-500" aria-label={`${lives} vies`}>{'♥'.repeat(Math.max(lives, 0))}<span className="text-slate-300 dark:text-slate-700">{'♥'.repeat(3 - Math.max(lives, 0))}</span></span>}
          {streak >= 3 && <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300">🔥 Combo ×{streak >= 5 ? 2 : 1.5}</Badge>}
          <span>{score} pts</span>
        </div>
      </div>
      <ProgressBar value={index + (answered ? 1 : 0)} max={deck.length} />
      <QuestionView key={q.id} q={q} index={index} total={deck.length} chrono={chrono} answered={answered} onAnswer={answer} onOverride={overrideLast} onNext={next} lastLife={survival && lives <= 0} />
    </div>
  )
}

function QuestionView({
  q,
  index,
  total,
  chrono,
  answered,
  onAnswer,
  onOverride,
  onNext,
  lastLife,
}: {
  q: QuizQuestion
  index: number
  total: number
  chrono: boolean
  answered: Result | null
  onAnswer: (q: QuizQuestion, correct: boolean, ratio: number, speed: number) => void
  onOverride: (q: QuizQuestion) => void
  onNext: () => void
  lastLife: boolean
}) {
  const timed = chrono && q.type !== 'open'
  const [left, setLeft] = useState(TIME_LIMIT)
  const [selected, setSelected] = useState<number[]>([])
  const [tf, setTf] = useState<boolean | null>(null)
  const shuffledOrder = useMemo(() => (q.type === 'order' ? shuffle(q.items, newSeed()) : []), [q])
  const [order, setOrder] = useState<string[]>(shuffledOrder)
  const done = answered !== null

  useEffect(() => {
    if (!timed || done) return
    const t = window.setInterval(() => setLeft((l) => l - 1), 1000)
    return () => window.clearInterval(t)
  }, [timed, done])

  useEffect(() => {
    if (timed && left <= 0 && !done) onAnswer(q, false, 0, 0)
  }, [left, timed, done, q, onAnswer])

  const speed = timed ? Math.max(left, 0) / TIME_LIMIT : 0

  const submitSingle = (i: number) => {
    if (done || q.type !== 'single') return
    setSelected([i])
    onAnswer(q, i === q.answer, i === q.answer ? 1 : 0, speed)
  }
  const submitMulti = () => {
    if (q.type !== 'multi') return
    const hits = selected.filter((i) => q.answers.includes(i)).length
    const wrong = selected.length - hits
    const exact = sameSet(selected, q.answers)
    onAnswer(q, exact, exact ? 1 : Math.max(0, (hits - wrong) / q.answers.length) * 0.5, speed)
  }
  const submitTf = (v: boolean) => {
    if (done || q.type !== 'truefalse') return
    setTf(v)
    onAnswer(q, v === q.answer, v === q.answer ? 1 : 0, speed)
  }
  const submitOrder = () => {
    if (q.type !== 'order') return
    const ok = sameOrder(order, q.items)
    onAnswer(q, ok, ok ? 1 : 0, speed)
  }

  const optionState = (i: number, correctIdx: number[]) => {
    if (!done) return undefined
    if (correctIdx.includes(i)) return selected.includes(i) || q.type === 'single' ? 'correct' : 'missed'
    return selected.includes(i) ? 'wrong' : undefined
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-500 tabular-nums">
          {index + 1}/{total}
        </span>
        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">{TYPE_LABELS[q.type]}</Badge>
        <DifficultyBadge level={q.difficulty} />
        {q.criteria.map((c) => (
          <Badge key={c} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {c}
          </Badge>
        ))}
        {timed && !done && (
          <span className={`ml-auto font-mono text-sm font-bold tabular-nums ${left <= 10 ? 'text-rose-500' : 'text-slate-500'}`}>⏱ {Math.max(left, 0)} s</span>
        )}
      </div>
      {timed && !done && <div className="mt-2 h-1 overflow-hidden rounded bg-slate-200 dark:bg-slate-800"><div className="h-full bg-indigo-500 transition-all duration-1000 ease-linear" style={{ width: `${(Math.max(left, 0) / TIME_LIMIT) * 100}%` }} /></div>}

      <h2 className="mt-4 text-lg leading-snug font-semibold">{q.prompt}</h2>

      <div className="mt-4">
        {q.type === 'single' && (
          <div className="grid gap-2">
            {q.options.map((o, i) => (
              <OptionButton key={o} onClick={() => submitSingle(i)} disabled={done} state={optionState(i, [q.answer])}>
                <Letter i={i} />
                {o}
              </OptionButton>
            ))}
          </div>
        )}

        {q.type === 'multi' && (
          <div className="grid gap-2">
            <p className="text-xs text-slate-500">Plusieurs réponses possibles.</p>
            {q.options.map((o, i) => (
              <OptionButton
                key={o}
                selected={selected.includes(i)}
                disabled={done}
                state={optionState(i, q.answers)}
                onClick={() => setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}
              >
                <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border-2 text-xs ${selected.includes(i) ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-400'}`}>
                  {selected.includes(i) ? '✓' : ''}
                </span>
                {o}
              </OptionButton>
            ))}
            {!done && (
              <SubmitButton disabled={selected.length === 0} onClick={submitMulti}>
                Valider
              </SubmitButton>
            )}
          </div>
        )}

        {q.type === 'truefalse' && (
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((v) => (
              <OptionButton
                key={String(v)}
                onClick={() => submitTf(v)}
                disabled={done}
                state={done ? (v === q.answer ? 'correct' : tf === v ? 'wrong' : undefined) : undefined}
              >
                <span className="w-full py-2 text-center text-base font-bold">{v ? 'Vrai' : 'Faux'}</span>
              </OptionButton>
            ))}
          </div>
        )}

        {q.type === 'order' && (
          <div className="space-y-3">
            <OrderList items={order} onChange={setOrder} locked={done} expected={q.items} />
            {!done && <SubmitButton onClick={submitOrder}>Valider l’ordre</SubmitButton>}
            {done && !answered?.correct && (
              <div className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                <p className="font-semibold">Ordre attendu</p>
                <ol className="mt-1 list-decimal pl-5">
                  {q.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {q.type === 'open' && <OpenAnswer spec={q.open} onGraded={(g, overridden) => (overridden ? onOverride(q) : onAnswer(q, g.passed, g.ratio, 0))} />}
      </div>

      {answered && (
        <div className="mt-5 space-y-3">
          <div className={`rounded-xl p-4 text-sm ${answered.correct ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
            <p className="font-semibold">
              {answered.correct ? `✓ Bonne réponse · +${answered.points} pts` : answered.points > 0 ? `≈ Partiellement juste · +${answered.points} pts` : '✗ Raté'}
              {timed && left <= 0 && ' (temps écoulé)'}
            </p>
            <p className="mt-1 leading-relaxed">{q.explanation}</p>
          </div>
          <button type="button" onClick={onNext} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white sm:w-auto dark:bg-white dark:text-slate-900">
            {lastLife ? 'Plus de vies… voir le bilan' : index >= total - 1 ? 'Voir le bilan' : 'Question suivante →'}
          </button>
        </div>
      )}
      <p className="sr-only">Difficulté : {DIFFICULTY_LABELS[q.difficulty]}</p>
    </Card>
  )
}

const Letter = ({ i }: { i: number }) => (
  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-xs font-bold dark:bg-slate-800">{String.fromCharCode(65 + i)}</span>
)

function SubmitButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="mt-1 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-indigo-500">
      {children}
    </button>
  )
}

export function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
      ← Retour aux jeux
    </button>
  )
}

function Setting({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
        active ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500' : 'border-slate-300 dark:border-slate-700'
      }`}
    >
      {children}
    </button>
  )
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}
