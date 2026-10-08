import { useMemo, useState } from 'react'
import { BLOCKS } from '../data/blocks'
import { theoryQuestionsFor } from '../data/questions'
import { THEORY } from '../data/theory'
import type { CriterionTheory } from '../data/types'
import type { ProgressApi } from '../lib/progress'
import { newSeed, shuffle } from '../lib/shuffle'
import { DeckPlayer, ShuffleControls } from './DeckPlayer'
import { Card, PageHeader, ProgressBar } from './ui'

type Tab = 'cours' | 'entrainement'

const ALL_CRITERIA = BLOCKS.flatMap((b) => b.criteria.map((c) => ({ ...c, blockCode: b.code, blockTitle: b.shortTitle })))

export function TheoryView({
  criterion,
  onCriterionChange,
  progress,
}: {
  criterion: string
  onCriterionChange: (code: string) => void
  progress: ProgressApi
}) {
  const [tab, setTab] = useState<Tab>('cours')
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(newSeed)
  const [deckVersion, setDeckVersion] = useState(0)

  const meta = ALL_CRITERIA.find((c) => c.code === criterion) ?? ALL_CRITERIA[0]
  const theory = THEORY.find((t) => t.code === meta.code)
  const questions = useMemo(() => theoryQuestionsFor(meta.code), [meta.code])
  const deck = useMemo(() => (shuffled ? shuffle(questions, seed) : questions), [questions, shuffled, seed])
  const known = questions.filter((q) => progress.progress[q.id] === 'known').length

  const select = (code: string) => {
    onCriterionChange(code)
    setTab('cours')
    window.scrollTo({ top: 0 })
  }

  return (
    <div>
      <PageHeader
        title="Théorie par critère"
        subtitle="Cours et entraînement « pur » : aucune entreprise, aucun sujet blanc, seulement les connaissances attendues pour chaque critère."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <CriterionPicker current={meta.code} onSelect={select} progress={progress} />

        <section className="min-w-0">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white dark:bg-teal-500">
                {meta.code}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg leading-snug font-semibold">{meta.title}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{meta.summary}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <ProgressBar value={known} max={questions.length} className="flex-1" />
              <span className="whitespace-nowrap">
                {known} / {questions.length} maîtrisées
              </span>
            </div>
          </Card>

          <div className="mt-4 grid grid-cols-2 gap-1 rounded-2xl bg-slate-200/70 p-1 dark:bg-slate-800/70" role="tablist">
            {(
              [
                ['cours', 'Cours'],
                ['entrainement', `S’entraîner (${questions.length})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  tab === id ? 'bg-white shadow-sm dark:bg-slate-900' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tab === 'cours' ? (
              theory ? (
                <Course theory={theory} onTrain={() => setTab('entrainement')} />
              ) : (
                <p className="text-slate-500">Cours en préparation.</p>
              )
            ) : (
              <DeckPlayer
                key={`${meta.code}-${deckVersion}`}
                questions={deck}
                progress={progress}
                toolbar={
                  <ShuffleControls
                    shuffled={shuffled}
                    onToggle={(v) => {
                      setShuffled(v)
                      setSeed(newSeed())
                      setDeckVersion((x) => x + 1)
                    }}
                    onReshuffle={() => {
                      setSeed(newSeed())
                      setDeckVersion((x) => x + 1)
                    }}
                  />
                }
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function CriterionPicker({
  current,
  onSelect,
  progress,
}: {
  current: string
  onSelect: (code: string) => void
  progress: ProgressApi
}) {
  return (
    <nav aria-label="Critères" className="min-w-0">
      {/* Mobile : défilement horizontal */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
        {ALL_CRITERIA.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => onSelect(c.code)}
            aria-current={c.code === current ? 'true' : undefined}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
              c.code === current
                ? 'border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500'
                : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      {/* Desktop : liste avec intitulés */}
      <div className="hidden space-y-4 lg:sticky lg:top-20 lg:block">
        {BLOCKS.map((b) => (
          <div key={b.id}>
            <p className="mb-1.5 px-2 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
              {b.code} · {b.shortTitle}
            </p>
            <ul className="space-y-0.5">
              {b.criteria.map((c) => {
                const qs = theoryQuestionsFor(c.code)
                const known = qs.filter((q) => progress.progress[q.id] === 'known').length
                const active = c.code === current
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => onSelect(c.code)}
                      aria-current={active ? 'true' : undefined}
                      className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                        active
                          ? 'bg-teal-50 text-teal-900 dark:bg-teal-500/15 dark:text-teal-200'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-8 shrink-0 font-semibold">{c.code}</span>
                      <span className="min-w-0 flex-1 leading-snug">{c.title}</span>
                      <span className="shrink-0 text-xs text-slate-400 tabular-nums">
                        {known}/{qs.length}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}

function Course({ theory, onTrain }: { theory: CriterionTheory; onTrain: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-[15px] leading-relaxed">{theory.intro}</p>

      {theory.sections.map((s, i) => (
        <Card key={s.title} className="p-5">
          <h3 className="flex items-baseline gap-2 font-semibold">
            <span className="text-sm text-teal-600 tabular-nums dark:text-teal-400">{i + 1}.</span>
            {s.title}
          </h3>
          <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed">
            {s.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5 dark:border-teal-500/30 dark:bg-teal-500/10">
        <h3 className="font-semibold text-teal-900 dark:text-teal-200">À retenir par cœur</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {theory.takeaways.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-teal-600 dark:text-teal-400" aria-hidden>
                ★
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <Card className="p-5">
        <h3 className="text-sm font-semibold">Sources</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {theory.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <button
        type="button"
        onClick={() => {
          onTrain()
          window.scrollTo({ top: 0 })
        }}
        className="w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700 sm:w-auto dark:bg-teal-500 dark:hover:bg-teal-400"
      >
        S’entraîner sur ce critère →
      </button>
    </div>
  )
}
