import { BLOCKS } from '../data/blocks'
import { QUESTIONS } from '../data/questions'
import { SCOPE_LABELS, type BlockId, type QuestionScope } from '../data/types'
import type { ProgressMap } from '../lib/progress'
import type { Route } from '../lib/route'
import { Card, ProgressBar } from './ui'

function stats(scope: QuestionScope, progress: ProgressMap) {
  const qs = QUESTIONS.filter((q) => q.scope === scope)
  return {
    total: qs.length,
    known: qs.filter((q) => progress[q.id] === 'known').length,
    review: qs.filter((q) => progress[q.id] === 'review').length,
  }
}

export function Home({
  progress,
  onNavigate,
  onPickBlock,
  onTrainScope,
}: {
  progress: ProgressMap
  onNavigate: (r: Route) => void
  onPickBlock: (b: BlockId) => void
  onTrainScope: (s: QuestionScope) => void
}) {
  const tricks = QUESTIONS.filter((q) => q.isTrick || q.trap).length

  return (
    <div>
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-indigo-100 uppercase">Titre RNCP niveau 7</p>
        <h1 className="mt-1 text-2xl leading-tight font-bold sm:text-3xl">Expert en sécurité des développements informatiques</h1>
        <p className="mt-3 max-w-2xl text-indigo-100">
          Révisez les critères officiels des Blocs 1 et 2, travaillez les sujets blancs et entraînez-vous face à un jury
          exigeant : {QUESTIONS.length} questions, du fondamental à l’expert, dont {tricks} pièges et nuances.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate('jury')}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50"
          >
            Lancer le simulateur de jury
          </button>
          <button
            type="button"
            onClick={() => onNavigate('oral')}
            className="rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/25"
          >
            Oral blanc chronométré
          </button>
        </div>
      </section>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Votre progression</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {([1, 2, 0] as QuestionScope[]).map((scope) => {
          const s = stats(scope, progress)
          return (
            <Card key={scope} className="p-5">
              <p className="text-sm font-semibold">{SCOPE_LABELS[scope]}</p>
              <p className="mt-2 text-3xl font-bold">
                {s.known}
                <span className="text-base font-medium text-slate-400"> / {s.total}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                maîtrisées · {s.review} à revoir
              </p>
              <ProgressBar value={s.known} max={s.total} className="mt-3" />
              <button
                type="button"
                onClick={() => onTrainScope(scope)}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                S’entraîner →
              </button>
            </Card>
          )
        })}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Les deux blocs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {BLOCKS.map((b) => (
          <Card key={b.id} className="flex flex-col p-5">
            <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">{b.code}</p>
            <h3 className="mt-1 font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{b.exam.mission}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {b.exam.preparation} · {b.exam.oral}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {b.criteria.map((c) => (
                <span key={c.code} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium dark:bg-slate-800">
                  {c.code}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm">
              Sujet blanc : <strong>{b.scenario.name}</strong>
            </p>
            <button
              type="button"
              onClick={() => onPickBlock(b.id)}
              className="mt-auto self-start pt-4 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Voir les critères et le sujet →
            </button>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-5">
        <h2 className="font-semibold">Méthode conseillée</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
          <li>Lisez les critères et le sujet blanc de chaque bloc : la forme de l’épreuve réelle sera identique.</li>
          <li>Passez les questions par difficulté croissante, en répondant à voix haute avant de révéler les clés.</li>
          <li>Marquez honnêtement « À revoir » et repassez ce paquet chaque jour (filtre Progression).</li>
          <li>Terminez par des oraux blancs chronométrés de 10 minutes pour travailler la concision.</li>
        </ol>
      </Card>
    </div>
  )
}
