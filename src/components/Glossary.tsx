import { useMemo, useState } from 'react'
import { GLOSSARY } from '../data/glossary'
import { Card, PageHeader } from './ui'

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function Glossary() {
  const [term, setTerm] = useState('')
  const entries = useMemo(() => {
    const t = normalize(term.trim())
    return [...GLOSSARY]
      .sort((a, b) => a.term.localeCompare(b.term, 'fr'))
      .filter((e) => !t || normalize(`${e.term} ${e.expansion} ${e.definition}`).includes(t))
  }, [term])

  return (
    <div>
      <PageHeader title="Glossaire" subtitle="Les acronymes que le jury s’attend à vous entendre maîtriser sans hésiter." />
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Rechercher un sigle ou une notion…"
        className="mb-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <Card key={e.term} className="p-4">
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{e.term}</p>
            <p className="mt-0.5 text-sm font-medium">{e.expansion}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{e.definition}</p>
          </Card>
        ))}
      </div>
      {entries.length === 0 && <p className="text-center text-slate-500">Aucun résultat.</p>}
    </div>
  )
}
