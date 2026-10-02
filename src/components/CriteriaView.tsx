import { useState } from 'react'
import { getBlock } from '../data/blocks'
import { QUESTIONS } from '../data/questions'
import type { Annex, BlockId, Criterion } from '../data/types'
import { BlockSelector } from './BlockSelector'
import { Badge, Card, PageHeader } from './ui'

type Tab = 'criteres' | 'examen' | 'sujet'

const TABS: { id: Tab; label: string }[] = [
  { id: 'criteres', label: 'Critères' },
  { id: 'examen', label: 'Format de l’épreuve' },
  { id: 'sujet', label: 'Sujet blanc' },
]

export function CriteriaView({
  block,
  onBlockChange,
  onTrain,
}: {
  block: BlockId
  onBlockChange: (b: BlockId) => void
  onTrain: (criterion: string) => void
}) {
  const [tab, setTab] = useState<Tab>('criteres')
  const data = getBlock(block)

  return (
    <div>
      <PageHeader title="Critères officiels & sujets" subtitle="Ce que le jury évalue, comment l’épreuve se déroule et le cas pratique type." />
      <BlockSelector value={block} onChange={onBlockChange} />

      <div className="mt-5 flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
              tab === t.id
                ? 'border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === 'criteres' && (
          <div className="grid gap-4 lg:grid-cols-2">
            {data.criteria.map((c) => (
              <CriterionCard key={c.code} criterion={c} onTrain={() => onTrain(c.code)} />
            ))}
          </div>
        )}

        {tab === 'examen' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-5 lg:col-span-2">
              <h2 className="text-lg font-semibold">Contexte de l’épreuve</h2>
              <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                <Info label="Préparation" value={data.exam.preparation} />
                <Info label="Oral" value={data.exam.oral} />
                <Info label="Mission" value={data.exam.mission} />
              </dl>
            </Card>
            <TimelineCard title="Découpage conseillé des 4 h" items={data.exam.timePlan} />
            <TimelineCard title="Trame des 20 min de présentation" items={data.exam.pitchPlan} />
          </div>
        )}

        {tab === 'sujet' && <CaseStudy block={block} />}
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  )
}

function TimelineCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ol className="mt-3 space-y-2">
        {items.map((it) => {
          const [time, ...rest] = it.split(' · ')
          return (
            <li key={it} className="flex gap-3 text-sm">
              <span className="w-24 shrink-0 font-mono text-xs leading-5 text-indigo-600 dark:text-indigo-400">{time}</span>
              <span>{rest.join(' · ')}</span>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}

function CriterionCard({ criterion, onTrain }: { criterion: Criterion; onTrain: () => void }) {
  const [open, setOpen] = useState(false)
  const count = QUESTIONS.filter((q) => q.criteria.includes(criterion.code)).length

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white dark:bg-indigo-500">
          {criterion.code}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold">{criterion.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{criterion.summary}</p>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">Ce que le jury attend</h4>
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              {criterion.juryExpects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-rose-700 dark:text-rose-400">Erreurs qui pénalisent</h4>
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              {criterion.pitfalls.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {open ? 'Masquer le détail' : 'Voir le détail'}
        </button>
        <button
          type="button"
          onClick={onTrain}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          S’entraîner ({count})
        </button>
      </div>
    </Card>
  )
}

function AnnexList({ annex }: { annex: Annex }) {
  return (
    <div>
      <h4 className="font-semibold">{annex.title}</h4>
      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {annex.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

function CaseStudy({ block }: { block: BlockId }) {
  const { scenario } = getBlock(block)
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="p-5 lg:col-span-3">
        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">Sujet blanc</Badge>
        <h2 className="mt-2 text-xl font-bold">{scenario.name}</h2>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{scenario.role}</p>
        <p className="mt-3 text-sm leading-relaxed">{scenario.summary}</p>

        <h3 className="mt-5 font-semibold">Risques et vulnérabilités clés</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {scenario.keyRisks.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-4">
          {scenario.annexes.map((a) => (
            <AnnexList key={a.title} annex={a} />
          ))}
        </div>
      </Card>

      <Card className="h-fit p-5 lg:col-span-2">
        <h3 className="text-lg font-semibold">Livrable attendu</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Le jour J, l’entreprise et les vulnérabilités changent, mais la structure reste identique.
        </p>
        <div className="mt-4 space-y-4">
          {scenario.deliverable.map((d) => (
            <AnnexList key={d.title} annex={d} />
          ))}
        </div>
      </Card>
    </div>
  )
}
