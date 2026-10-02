import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { BLOCKS } from '../data/blocks'
import { QUESTIONS } from '../data/questions'
import { DIFFICULTY_LABELS, SCOPE_LABELS, type Difficulty, type QuestionScope } from '../data/types'
import { DEFAULT_FILTERS, type JuryFilters } from '../lib/filters'
import type { CardStatus, ProgressApi } from '../lib/progress'
import { newSeed, shuffle } from '../lib/shuffle'
import { Flashcard } from './Flashcard'
import { Chip, PageHeader, ProgressBar } from './ui'

const ALL_CRITERIA = BLOCKS.flatMap((b) => b.criteria.map((c) => ({ code: c.code, title: c.title, block: b.id })))

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function JurySimulator({
  filters,
  onFiltersChange,
  progress,
}: {
  filters: JuryFilters
  onFiltersChange: (f: JuryFilters) => void
  progress: ProgressApi
}) {
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(newSeed)
  // Instantané de la progression au moment du filtrage : marquer une carte ne la retire pas du paquet en cours.
  const [snapshot, setSnapshot] = useState(progress.progress)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    const term = normalize(filters.search.trim())
    return QUESTIONS.filter((q) => {
      if (!filters.scopes.includes(q.scope)) return false
      if (!filters.difficulties.includes(q.difficulty)) return false
      if (filters.criterion && !q.criteria.includes(filters.criterion)) return false
      if (filters.onlyTricks && !q.isTrick && !q.trap) return false
      if (filters.onlyOfficial && !q.official) return false
      const st = snapshot[q.id]
      if (filters.status === 'new' && st) return false
      if (filters.status === 'review' && st !== 'review') return false
      if (filters.status === 'known' && st !== 'known') return false
      if (term) {
        const hay = normalize([q.question, q.topic, ...q.keyPoints, q.trap ?? ''].join(' '))
        if (!hay.includes(term)) return false
      }
      return true
    })
  }, [filters, snapshot])

  const deck = useMemo(() => (shuffled ? shuffle(filtered, seed) : filtered), [filtered, shuffled, seed])

  /** Toute modification du paquet repart de la première carte. */
  const restart = () => {
    setIndex(0)
    setRevealed(false)
  }

  const current = deck[index]
  const done = deck.filter((q) => progress.progress[q.id]).length
  const known = deck.filter((q) => progress.progress[q.id] === 'known').length

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(Math.max(i + delta, 0), Math.max(deck.length - 1, 0)))
      setRevealed(false)
    },
    [deck.length],
  )

  const mark = useCallback(
    (s: CardStatus) => {
      if (!current) return
      progress.mark(current.id, s)
      if (index < deck.length - 1) go(1)
    },
    [current, deck.length, go, index, progress],
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

  const applyFilters = (f: JuryFilters) => {
    setSnapshot(progress.progress)
    onFiltersChange(f)
    restart()
  }
  const set = (patch: Partial<JuryFilters>) => applyFilters({ ...filters, ...patch })
  const criteriaOptions = ALL_CRITERIA.filter((c) => filters.scopes.includes(c.block))
  const activeFilterCount =
    (filters.scopes.length !== 3 ? 1 : 0) +
    (filters.difficulties.length !== 4 ? 1 : 0) +
    (filters.criterion ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.onlyTricks ? 1 : 0) +
    (filters.onlyOfficial ? 1 : 0) +
    (filters.search ? 1 : 0)

  return (
    <div>
      <PageHeader
        title="Simulateur de jury"
        subtitle="Questions incisives issues des sujets blancs, du référentiel et de la culture sécurité attendue à ce niveau."
      />

      <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
        {/* Filtres */}
        <aside>
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium lg:hidden dark:border-slate-700 dark:bg-slate-900"
          >
            Filtres {activeFilterCount > 0 && `(${activeFilterCount} actif${activeFilterCount > 1 ? 's' : ''})`}
            <span aria-hidden>{showFilters ? '▲' : '▼'}</span>
          </button>

          <div className={`${showFilters ? 'mt-3 block' : 'hidden'} space-y-5 rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-20 lg:block dark:border-slate-800 dark:bg-slate-900`}>
            <FilterGroup label="Rechercher">
              <input
                type="search"
                value={filters.search}
                onChange={(e) => set({ search: e.target.value })}
                placeholder="JWT, EBIOS, IDOR…"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
              />
            </FilterGroup>

            <FilterGroup label="Périmètre">
              {([1, 2, 0] as QuestionScope[]).map((s) => (
                <Chip key={s} active={filters.scopes.includes(s)} onClick={() => set({ scopes: toggle(filters.scopes, s), criterion: '' })}>
                  {SCOPE_LABELS[s]}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Difficulté">
              {([1, 2, 3, 4] as Difficulty[]).map((d) => (
                <Chip key={d} active={filters.difficulties.includes(d)} onClick={() => set({ difficulties: toggle(filters.difficulties, d) })}>
                  {DIFFICULTY_LABELS[d]}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Critère">
              <select
                value={filters.criterion}
                onChange={(e) => set({ criterion: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">Tous les critères</option>
                {criteriaOptions.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} · {c.title}
                  </option>
                ))}
              </select>
            </FilterGroup>

            <FilterGroup label="Progression">
              {(
                [
                  ['all', 'Toutes'],
                  ['new', 'Jamais vues'],
                  ['review', 'À revoir'],
                  ['known', 'Maîtrisées'],
                ] as const
              ).map(([v, l]) => (
                <Chip key={v} active={filters.status === v} onClick={() => set({ status: v })}>
                  {l}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Spécial">
              <Chip active={filters.onlyOfficial} onClick={() => set({ onlyOfficial: !filters.onlyOfficial })}>
                Banque officielle
              </Chip>
              <Chip active={filters.onlyTricks} onClick={() => set({ onlyTricks: !filters.onlyTricks })}>
                Pièges & nuances
              </Chip>
            </FilterGroup>

            <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => applyFilters(DEFAULT_FILTERS)}
                className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Réinitialiser les filtres
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Effacer la progression des questions affichées ?')) {
                    progress.reset(deck.map((q) => q.id))
                    setSnapshot({})
                    restart()
                  }
                }}
                className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
              >
                Effacer la progression
              </button>
            </div>
          </div>
        </aside>

        {/* Paquet */}
        <section className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-medium">
              {deck.length === 0 ? 'Aucune question' : `Question ${index + 1} / ${deck.length}`}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {known} maîtrisée{known > 1 ? 's' : ''} · {done - known} à revoir
            </span>
            <label className="ml-auto flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={shuffled}
                onChange={(e) => {
                  setShuffled(e.target.checked)
                  setSeed(newSeed())
                  restart()
                }}
                className="h-4 w-4 accent-indigo-600"
              />
              Ordre aléatoire
            </label>
            {shuffled && (
              <button
                type="button"
                onClick={() => {
                  setSeed(newSeed())
                  restart()
                }}
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                Remélanger
              </button>
            )}
          </div>
          <ProgressBar value={done} max={deck.length} className="mb-4" />

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
                <NavButton onClick={() => go(1)} disabled={index >= deck.length - 1}>
                  Suivante →
                </NavButton>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Aucune question ne correspond à ces filtres.
              <button type="button" onClick={() => applyFilters(DEFAULT_FILTERS)} className="mt-3 block w-full font-medium text-indigo-600 dark:text-indigo-400">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</legend>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
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
