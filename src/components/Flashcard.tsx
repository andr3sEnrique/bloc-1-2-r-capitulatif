import type { Question } from '../data/types'
import type { CardStatus } from '../lib/progress'
import { Badge, DifficultyBadge, ScopeBadge } from './ui'

export function Flashcard({
  question,
  revealed,
  onReveal,
  status,
  onMark,
}: {
  question: Question
  revealed: boolean
  onReveal: () => void
  status?: CardStatus
  onMark: (s: CardStatus) => void
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-1.5">
          <ScopeBadge scope={question.scope} />
          <DifficultyBadge level={question.difficulty} />
          {question.criteria.map((c) => (
            <Badge key={c} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {c}
            </Badge>
          ))}
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{question.topic}</Badge>
          {question.official && (
            <Badge className="bg-indigo-600 text-white dark:bg-indigo-500">Banque officielle</Badge>
          )}
          {question.isTrick && (
            <Badge className="bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">Question piège</Badge>
          )}
          {status && (
            <Badge
              className={
                status === 'known'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'
              }
            >
              {status === 'known' ? '✓ Maîtrisée' : '↻ À revoir'}
            </Badge>
          )}
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Le jury demande</p>
        <h2 className="mt-1 text-lg leading-snug font-semibold sm:text-xl">« {question.question} »</h2>

        {!revealed ? (
          <div className="mt-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Formulez votre réponse à voix haute (structure, arguments, exemple du cas), puis révélez les clés.
            </p>
            <button
              type="button"
              onClick={onReveal}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Révéler les clés de la réponse
              <kbd className="ml-2 hidden rounded bg-white/20 px-1.5 py-0.5 text-xs font-normal sm:inline">Espace</kbd>
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <section className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
              <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Clés de la réponse attendue</h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                {question.keyPoints.map((k) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden>
                      ✔
                    </span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </section>

            {question.trap && (
              <section className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-500/10">
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">⚠ Piège / nuance d’expert</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{question.trap}</p>
              </section>
            )}

            {question.followUp && (
              <section className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-500/10">
                <h3 className="text-sm font-semibold text-sky-800 dark:text-sky-300">Relance probable du jury</h3>
                <p className="mt-1.5 text-sm italic">« {question.followUp} »</p>
              </section>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onMark('review')}
                className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300"
              >
                ↻ À revoir <kbd className="ml-1 hidden text-xs font-normal opacity-70 sm:inline">1</kbd>
              </button>
              <button
                type="button"
                onClick={() => onMark('known')}
                className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                ✓ Je maîtrise <kbd className="ml-1 hidden text-xs font-normal opacity-70 sm:inline">2</kbd>
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
