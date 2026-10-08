import { useMemo, useState, type ReactNode } from 'react'
import { BLOCKS } from '../data/blocks'
import { QUESTIONS } from '../data/questions'
import { DIFFICULTY_LABELS, SCOPE_LABELS, type Difficulty, type QuestionScope } from '../data/types'
import { DEFAULT_FILTERS, type JuryFilters } from '../lib/filters'
import type { ProgressApi } from '../lib/progress'
import { newSeed, shuffle } from '../lib/shuffle'
import { DeckPlayer, ShuffleControls } from './DeckPlayer'
import { Chip, PageHeader } from './ui'

const ALL_CRITERIA = BLOCKS.flatMap((b) => b.criteria.map((c) => ({ code: c.code, title: c.title, block: b.id })))
const SCOPES: QuestionScope[] = [1, 2, 3, 0]

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
  // Incrémenté à chaque changement du paquet : remonte le DeckPlayer sur la première carte.
  const [deckVersion, setDeckVersion] = useState(0)
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
  const restart = () => setDeckVersion((v) => v + 1)

  const applyFilters = (f: JuryFilters) => {
    setSnapshot(progress.progress)
    onFiltersChange(f)
    restart()
  }
  const set = (patch: Partial<JuryFilters>) => applyFilters({ ...filters, ...patch })
  const criteriaOptions = ALL_CRITERIA.filter((c) => filters.scopes.includes(c.block) || filters.scopes.includes(3))
  const activeFilterCount =
    (filters.scopes.length !== SCOPES.length ? 1 : 0) +
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
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
              {SCOPES.map((s) => (
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
          <DeckPlayer
            key={deckVersion}
            questions={deck}
            progress={progress}
            toolbar={
              <ShuffleControls
                shuffled={shuffled}
                onToggle={(v) => {
                  setShuffled(v)
                  setSeed(newSeed())
                  restart()
                }}
                onReshuffle={() => {
                  setSeed(newSeed())
                  restart()
                }}
              />
            }
            empty={
              <>
                Aucune question ne correspond à ces filtres.
                <button type="button" onClick={() => applyFilters(DEFAULT_FILTERS)} className="mt-3 block w-full font-medium text-indigo-600 dark:text-indigo-400">
                  Réinitialiser les filtres
                </button>
              </>
            }
          />
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
