import { useMemo, useState } from 'react'
import { MISSIONS } from '../../data/games'
import { STAGE_LABELS, type BudgetNode, type Mission, type MissionNode, type MissionStage } from '../../data/games/types'
import type { GameStatsApi } from '../../lib/gameStats'
import { sameOrder } from '../../lib/grading'
import { newSeed, shuffle } from '../../lib/shuffle'
import { Badge, Card } from '../ui'
import { BackLink, Stat } from './Quiz'
import { EvidencePanel, OpenAnswer, OptionButton, OrderList } from './shared'

const STAGES: MissionStage[] = ['actifs', 'risques', 'mesures', 'jury']

interface Step {
  node: MissionNode
  points: number
  max: number
  summary: string
}

/** Meilleur total atteignable dans le budget (combinaisons exhaustives, ≤ 12 options). */
function bestBudget(node: BudgetNode) {
  let best = 0
  const n = node.options.length
  for (let mask = 0; mask < 1 << n; mask++) {
    let cost = 0
    let pts = 0
    node.options.forEach((o, i) => {
      if (mask & (1 << i)) {
        cost += o.cost
        pts += o.points
      }
    })
    if (cost <= node.budget) best = Math.max(best, pts)
  }
  return best
}

function maxFor(node: MissionNode) {
  switch (node.kind) {
    case 'choice':
      return Math.max(...node.choices.map((c) => c.points))
    case 'multi':
      return node.options.filter((o) => o.correct).length * node.pointsPerOption
    case 'order':
    case 'open':
      return node.points
    case 'budget':
      return bestBudget(node)
    default:
      return 0
  }
}

const rankOf = (pct: number) =>
  pct >= 90 ? { r: 'S', t: 'Prêt pour le jury' } : pct >= 75 ? { r: 'A', t: 'Très solide' } : pct >= 55 ? { r: 'B', t: 'Correct, à consolider' } : { r: 'C', t: 'À retravailler' }

export function MissionPlayer({ stats, onExit }: { stats: GameStatsApi; onExit: () => void }) {
  const [mission, setMission] = useState<Mission | null>(null)

  if (!mission) {
    return (
      <div className="space-y-5">
        <BackLink onClick={onExit} />
        <div>
          <h1 className="text-2xl font-bold">Missions – cas pratiques interactifs</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Une situation, des décisions. Chaque choix modifie la suite du scénario. Quatre étapes : actifs et menaces, vulnérabilités et
            risques, mesures, puis justification devant le jury.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {MISSIONS.map((m) => {
            const rec = stats.records[`mission-${m.id}`]
            return (
              <Card key={m.id} className="flex flex-col p-5">
                <Badge className="w-fit bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">Bloc {m.block}</Badge>
                <h2 className="mt-2 text-lg font-semibold">{m.title}</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{m.company}</p>
                <p className="mt-2 text-sm leading-relaxed">{m.pitch}</p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <button type="button" onClick={() => setMission(m)} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white dark:bg-indigo-500">
                    Commencer la mission
                  </button>
                  {rec && <span className="text-xs text-slate-500">Meilleur : {rec.best} %</span>}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return <MissionRun key={mission.id} mission={mission} stats={stats} onQuit={() => setMission(null)} />
}

function MissionRun({ mission, stats, onQuit }: { mission: Mission; stats: GameStatsApi; onQuit: () => void }) {
  const byId = useMemo(() => new Map(mission.nodes.map((n) => [n.id, n])), [mission])
  const [nodeId, setNodeId] = useState(mission.start)
  const [steps, setSteps] = useState<Step[]>([])
  const [pending, setPending] = useState<{ points: number; summary: string; next: string } | null>(null)
  const node = byId.get(nodeId)!

  const total = steps.reduce((s, x) => s + x.points, 0)
  const max = steps.reduce((s, x) => s + x.max, 0)

  const resolve = (points: number, summary: string, next: string) => setPending({ points, summary, next })

  const advance = () => {
    if (!pending) return
    const newSteps = [...steps, { node, points: pending.points, max: maxFor(node), summary: pending.summary }]
    setSteps(newSteps)
    const nextNode = byId.get(pending.next)!
    if (nextNode.kind === 'end') {
      const t = newSteps.reduce((s, x) => s + x.points, 0)
      const m = newSteps.reduce((s, x) => s + x.max, 0)
      stats.record(`mission-${mission.id}`, m ? Math.round((Math.max(t, 0) / m) * 100) : 0)
    }
    setPending(null)
    setNodeId(pending.next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stageIndex = STAGES.indexOf(node.stage)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onQuit} className="text-sm font-medium text-slate-500 hover:underline dark:text-slate-400">
          ✕ Quitter la mission
        </button>
        <span className="text-sm font-semibold tabular-nums">{total} pts</span>
      </div>

      {/* Étapes */}
      <ol className="grid grid-cols-4 gap-1.5">
        {STAGES.map((s, i) => (
          <li key={s} className="min-w-0">
            <div className={`h-1.5 rounded-full ${i < stageIndex || node.kind === 'end' ? 'bg-emerald-500' : i === stageIndex ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <p className={`mt-1 truncate text-[11px] font-semibold sm:text-xs ${i === stageIndex && node.kind !== 'end' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
              {i + 1}. {STAGE_LABELS[s]}
            </p>
          </li>
        ))}
      </ol>

      {node.kind === 'end' ? (
        <Debrief mission={mission} node={node} steps={steps} total={total} max={max} onRestart={onQuit} />
      ) : (
        <Card className="p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            {mission.company} · {STAGE_LABELS[node.stage]}
          </p>
          <h2 className="mt-1 text-xl font-bold">{node.title}</h2>
          <div className="mt-3 space-y-2 text-[15px] leading-relaxed">
            {node.narrative.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {node.evidence && (
            <div className="mt-4">
              <EvidencePanel evidence={node.evidence} />
            </div>
          )}
          <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
            <NodeInteraction key={node.id} node={node} locked={pending !== null} onResolve={resolve} />
          </div>
          {pending && (
            <button type="button" onClick={advance} className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white dark:bg-white dark:text-slate-900">
              Continuer →
            </button>
          )}
        </Card>
      )}
    </div>
  )
}

function NodeInteraction({ node, locked, onResolve }: { node: Exclude<MissionNode, { kind: 'end' }>; locked: boolean; onResolve: (points: number, summary: string, next: string) => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [selected, setSelected] = useState<number[]>([])
  const [order, setOrder] = useState<string[]>(() => (node.kind === 'order' ? shuffle(node.items, newSeed()) : []))
  const [chosen, setChosen] = useState<string[]>([])
  const [budgetDone, setBudgetDone] = useState(false)

  const pts = (p: number) => (
    <span className={`font-bold tabular-nums ${p > 0 ? 'text-emerald-600 dark:text-emerald-400' : p < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}>
      {p > 0 ? `+${p}` : p} pts
    </span>
  )

  if (node.kind === 'choice') {
    const choice = picked !== null ? node.choices[picked] : null
    return (
      <div className="space-y-3">
        <p className="font-semibold">{node.question}</p>
        <div className="grid gap-2">
          {node.choices.map((c, i) => (
            <OptionButton
              key={c.label}
              disabled={locked}
              selected={picked === i}
              state={picked === null ? undefined : picked === i ? (c.best ? 'correct' : c.points > 0 ? undefined : 'wrong') : undefined}
              onClick={() => {
                setPicked(i)
                onResolve(c.points, c.label, c.next)
              }}
            >
              {c.label}
            </OptionButton>
          ))}
        </div>
        {choice && (
          <div className={`rounded-xl p-4 text-sm leading-relaxed ${choice.best ? 'bg-emerald-50 dark:bg-emerald-500/10' : choice.points > 0 ? 'bg-sky-50 dark:bg-sky-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
            <p className="mb-1">{pts(choice.points)}</p>
            {choice.feedback}
          </div>
        )}
      </div>
    )
  }

  if (node.kind === 'multi') {
    const done = locked
    return (
      <div className="space-y-3">
        <p className="font-semibold">{node.question}</p>
        <div className="grid gap-2">
          {node.options.map((o, i) => (
            <div key={o.label}>
              <OptionButton
                disabled={done}
                selected={selected.includes(i)}
                state={done ? (o.correct ? (selected.includes(i) ? 'correct' : 'missed') : selected.includes(i) ? 'wrong' : undefined) : undefined}
                onClick={() => setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}
              >
                <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border-2 text-xs ${selected.includes(i) ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-400'}`}>{selected.includes(i) ? '✓' : ''}</span>
                {o.label}
              </OptionButton>
              {done && (selected.includes(i) || o.correct) && <p className="mt-1 ml-2 text-xs text-slate-600 dark:text-slate-400">{o.why}</p>}
            </div>
          ))}
        </div>
        {!done && (
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => {
              const good = selected.filter((i) => node.options[i].correct).length
              const bad = selected.length - good
              const p = Math.max(0, (good - bad) * node.pointsPerOption)
              onResolve(p, `${good} bonne(s), ${bad} erreur(s)`, node.next)
            }}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-indigo-500"
          >
            Valider ma sélection
          </button>
        )}
      </div>
    )
  }

  if (node.kind === 'order') {
    const correctPositions = order.filter((it, i) => node.items[i] === it).length
    return (
      <div className="space-y-3">
        <p className="font-semibold">{node.question}</p>
        <OrderList items={order} onChange={setOrder} locked={locked} expected={node.items} />
        {!locked ? (
          <button
            type="button"
            onClick={() => {
              const exact = sameOrder(order, node.items)
              const p = exact ? node.points : Math.round((node.points * correctPositions) / node.items.length / 2)
              onResolve(p, exact ? 'Ordre exact' : `${correctPositions}/${node.items.length} bien placés`, node.next)
            }}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white dark:bg-indigo-500"
          >
            Valider la priorisation
          </button>
        ) : (
          <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
            <p className="font-semibold">Ordre attendu</p>
            <ol className="mt-1 list-decimal pl-5">
              {node.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ol>
            <p className="mt-2 leading-relaxed">{node.why}</p>
          </div>
        )}
      </div>
    )
  }

  if (node.kind === 'budget') {
    const spent = node.options.filter((o) => chosen.includes(o.id)).reduce((s, o) => s + o.cost, 0)
    const pct = Math.min(100, (spent / node.budget) * 100)
    return (
      <div className="space-y-3">
        <p className="font-semibold">{node.question}</p>
        <div className="sticky top-16 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
          <div className="flex justify-between text-sm font-semibold tabular-nums">
            <span>Budget engagé</span>
            <span className={spent > node.budget ? 'text-rose-600' : ''}>
              {spent} / {node.budget} {node.unit}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="grid gap-2">
          {node.options.map((o) => {
            const on = chosen.includes(o.id)
            const tooExpensive = !on && spent + o.cost > node.budget
            return (
              <div key={o.id}>
                <OptionButton
                  disabled={budgetDone || tooExpensive}
                  selected={on}
                  state={budgetDone && on ? (o.points > 0 ? 'correct' : 'wrong') : undefined}
                  onClick={() => setChosen((c) => (on ? c.filter((x) => x !== o.id) : [...c, o.id]))}
                >
                  <span className="min-w-0 flex-1">{o.label}</span>
                  <span className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold tabular-nums ${tooExpensive ? 'bg-slate-100 text-slate-400 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {o.cost} {node.unit}
                  </span>
                </OptionButton>
                {budgetDone && (on || o.points >= 15) && (
                  <p className="mt-1 ml-2 text-xs text-slate-600 dark:text-slate-400">
                    {on ? '' : 'Non retenue · '}
                    {o.comment}
                  </p>
                )}
              </div>
            )
          })}
        </div>
        {!budgetDone && (
          <button
            type="button"
            disabled={chosen.length === 0}
            onClick={() => {
              setBudgetDone(true)
              const p = node.options.filter((o) => chosen.includes(o.id)).reduce((s, o) => s + o.points, 0)
              const branch = node.branches.find((b) => b.requires.every((r) => chosen.includes(r)))
              onResolve(p, `${chosen.length} mesure(s) pour ${spent} ${node.unit}`, branch?.next ?? node.fallback)
            }}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-indigo-500"
          >
            Arrêter mon plan
          </button>
        )}
      </div>
    )
  }

  // open
  return (
    <div className="space-y-3">
      <p className="font-semibold">{node.question}</p>
      <OpenAnswer
        spec={node.open}
        placeholder="Répondez comme devant le jury : constat, impact, décision, justification…"
        onGraded={(g, overridden) => {
          const p = overridden || g.passed ? node.points : Math.round(node.points * g.ratio)
          onResolve(p, `${Math.round(g.ratio * 100)} % des notions clés${overridden ? ' (validée par vous)' : ''}`, node.next)
        }}
      />
    </div>
  )
}

function Debrief({ mission, node, steps, total, max, onRestart }: { mission: Mission; node: MissionNode; steps: Step[]; total: number; max: number; onRestart: () => void }) {
  const pct = max ? Math.round((Math.max(total, 0) / max) * 100) : 0
  const rank = rankOf(pct)
  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">{mission.title}</p>
        <p className="mt-3 inline-grid h-20 w-20 place-items-center rounded-2xl bg-indigo-600 text-4xl font-black text-white dark:bg-indigo-500">{rank.r}</p>
        <p className="mt-2 font-semibold">{rank.t}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <Stat label="Score" value={`${total} pts`} />
          <Stat label="Maximum atteignable" value={`${max} pts`} />
          <Stat label="Efficacité" value={`${pct} %`} />
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="font-semibold">{node.title}</h2>
        <div className="mt-2 space-y-2 text-sm leading-relaxed">
          {node.narrative.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="font-semibold">Votre parcours</h2>
        <ol className="mt-3 space-y-2">
          {steps.map((s, i) => (
            <li key={`${s.node.id}-${i}`} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-800">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{s.node.title}</p>
                <p className="text-slate-500 dark:text-slate-400">{s.summary}</p>
              </div>
              <span className={`shrink-0 font-semibold tabular-nums ${s.points >= s.max ? 'text-emerald-600' : s.points <= 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                {s.points}/{s.max}
              </span>
            </li>
          ))}
        </ol>
      </Card>
      <button type="button" onClick={onRestart} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white dark:bg-indigo-500">
        Retour aux missions
      </button>
    </div>
  )
}
