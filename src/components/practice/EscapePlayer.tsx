import { useEffect, useState } from 'react'
import { ESCAPES } from '../../data/games'
import type { EscapeGame, EscapeRoomStage } from '../../data/games/types'
import { formatDuration, type GameStatsApi } from '../../lib/gameStats'
import { matchesCode, sameOrder, sameSet } from '../../lib/grading'
import { newSeed, shuffle } from '../../lib/shuffle'
import { Badge, Card } from '../ui'
import { BackLink, Stat } from './Quiz'
import { EvidencePanel, OptionButton, OrderList } from './shared'

const HINT_PENALTY = 60
const WRONG_PENALTY = 30

export function EscapePlayer({ stats, onExit }: { stats: GameStatsApi; onExit: () => void }) {
  const [game, setGame] = useState<EscapeGame | null>(null)

  if (!game) {
    return (
      <div className="space-y-5">
        <BackLink onClick={onExit} />
        <div>
          <h1 className="text-2xl font-bold">Escape rooms cyber</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Un incident vient d’arriver. Chaque salle contient des indices : résolvez l’énigme pour déverrouiller la porte et récupérer un
            fragment du code du coffre. Chaque indice coûte {HINT_PENALTY} s, chaque erreur {WRONG_PENALTY} s.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {ESCAPES.map((g) => {
            const rec = stats.records[`escape-${g.id}`]
            return (
              <Card key={g.id} className="flex flex-col p-5">
                <Badge className="w-fit bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300">Bloc {g.block} · {g.stages.length} salles</Badge>
                <h2 className="mt-2 text-lg font-semibold">{g.title}</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{g.company}</p>
                <p className="mt-2 text-sm leading-relaxed">{g.pitch}</p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <button type="button" onClick={() => setGame(g)} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white">
                    Entrer
                  </button>
                  {rec && <span className="text-xs text-slate-500">Meilleur temps : {formatDuration(rec.best)}</span>}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return <EscapeRun key={game.id} game={game} stats={stats} onQuit={() => setGame(null)} />
}

function EscapeRun({ game, stats, onQuit }: { game: EscapeGame; stats: GameStatsApi; onQuit: () => void }) {
  const [stage, setStage] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [penalty, setPenalty] = useState(0)
  const [fragments, setFragments] = useState<string[]>([])
  const [opened, setOpened] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [errors, setErrors] = useState(0)

  useEffect(() => {
    if (finished) return
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => window.clearInterval(t)
  }, [finished])

  const time = elapsed + penalty
  const inVault = stage >= game.stages.length

  const onSolved = (room: EscapeRoomStage) => {
    setFragments((f) => [...f, room.fragment])
    setOpened(true)
  }

  const nextRoom = () => {
    setOpened(false)
    setStage((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const wrong = () => {
    setPenalty((p) => p + WRONG_PENALTY)
    setErrors((e) => e + 1)
  }
  const hint = () => {
    setPenalty((p) => p + HINT_PENALTY)
    setHintsUsed((h) => h + 1)
  }

  const finish = () => {
    setFinished(true)
    stats.record(`escape-${game.id}`, time, true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onQuit} className="text-sm font-medium text-slate-500 hover:underline dark:text-slate-400">
          ✕ Abandonner
        </button>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest text-slate-500" aria-label="Fragments du code">
            🔑 {game.vault.code.split('').map((_, i) => fragments[i] ?? '_').join(' ')}
          </span>
          <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-sm font-bold text-white tabular-nums dark:bg-white dark:text-slate-900">
            ⏱ {formatDuration(time)}
          </span>
        </div>
      </div>

      {/* Portes */}
      <ol className="flex gap-1.5">
        {[...game.stages, null].map((s, i) => {
          const state = i < stage || finished ? 'open' : i === stage ? 'current' : 'locked'
          return (
            <li
              key={s?.id ?? 'vault'}
              className={`grid h-10 flex-1 place-items-center rounded-lg text-sm ${
                state === 'open' ? 'bg-emerald-500 text-white' : state === 'current' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-slate-800'
              }`}
              title={s?.title ?? 'Coffre'}
            >
              {state === 'open' ? '🔓' : s ? (state === 'current' ? i + 1 : '🔒') : '🗄'}
            </li>
          )
        })}
      </ol>

      {finished ? (
        <Card className="p-6 text-center">
          <p className="text-5xl">🏆</p>
          <h2 className="mt-2 text-xl font-bold">Incident résolu !</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <Stat label="Temps total" value={formatDuration(time)} />
            <Stat label="Indices utilisés" value={`${hintsUsed}`} />
            <Stat label="Erreurs" value={`${errors}`} />
          </div>
          <div className="mt-5 space-y-2 text-left text-sm leading-relaxed">
            {game.vault.debrief.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <button type="button" onClick={onQuit} className="mt-6 rounded-xl bg-rose-600 px-5 py-2.5 font-semibold text-white">
            Retour aux escape rooms
          </button>
        </Card>
      ) : inVault ? (
        <Vault game={game} onWrong={wrong} onOpen={finish} />
      ) : (
        <Room key={game.stages[stage].id} room={game.stages[stage]} index={stage} opened={opened} onSolved={onSolved} onWrong={wrong} onHint={hint} onNext={nextRoom} last={stage === game.stages.length - 1} />
      )}
    </div>
  )
}

function Room({
  room,
  index,
  opened,
  onSolved,
  onWrong,
  onHint,
  onNext,
  last,
}: {
  room: EscapeRoomStage
  index: number
  opened: boolean
  onSolved: (r: EscapeRoomStage) => void
  onWrong: () => void
  onHint: () => void
  onNext: () => void
  last: boolean
}) {
  const [hints, setHints] = useState(0)
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [order, setOrder] = useState<string[]>(() => (room.puzzle.kind === 'order' ? shuffle(room.puzzle.items, newSeed()) : []))
  const [shake, setShake] = useState(false)
  const p = room.puzzle

  const fail = () => {
    onWrong()
    setShake(true)
    window.setTimeout(() => setShake(false), 500)
  }

  const check = () => {
    let ok = false
    if (p.kind === 'code') ok = matchesCode(input, p.accept)
    if (p.kind === 'single') ok = selected[0] === p.answer
    if (p.kind === 'multi') ok = sameSet(selected, p.answers)
    if (p.kind === 'order') ok = sameOrder(order, p.items)
    if (ok) onSolved(room)
    else fail()
  }

  return (
    <Card className={`p-5 sm:p-6 ${shake ? 'animate-[shake_0.4s]' : ''}`}>
      <p className="text-xs font-semibold tracking-wide text-rose-600 uppercase dark:text-rose-400">Salle {index + 1}</p>
      <h2 className="mt-1 text-xl font-bold">{room.title}</h2>
      <div className="mt-3 space-y-2 text-[15px] leading-relaxed">
        {room.narrative.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
      <div className="mt-4">
        <EvidencePanel evidence={room.evidence} />
      </div>

      <div className="mt-5 rounded-2xl border-2 border-dashed border-rose-300 p-4 dark:border-rose-500/40">
        <p className="font-semibold">🔐 {p.prompt}</p>
        <div className="mt-3">
          {p.kind === 'code' && (
            <input
              value={input}
              disabled={opened}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && !opened && check()}
              placeholder={p.placeholder ?? 'Votre réponse'}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          )}
          {(p.kind === 'single' || p.kind === 'multi') && (
            <div className="grid gap-2">
              {p.options.map((o, i) => (
                <OptionButton
                  key={o}
                  disabled={opened}
                  selected={selected.includes(i)}
                  onClick={() => setSelected((s) => (p.kind === 'single' ? [i] : s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}
                >
                  {o}
                </OptionButton>
              ))}
            </div>
          )}
          {p.kind === 'order' && <OrderList items={order} onChange={setOrder} locked={opened} expected={opened ? p.items : undefined} />}
        </div>

        {!opened && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={check}
              disabled={(p.kind === 'code' && !input.trim()) || ((p.kind === 'single' || p.kind === 'multi') && selected.length === 0)}
              className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Tenter d’ouvrir la porte
            </button>
            {hints < room.hints.length && (
              <button
                type="button"
                onClick={() => {
                  setHints((h) => h + 1)
                  onHint()
                }}
                className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-400"
              >
                💡 Indice ({hints + 1}/{room.hints.length}, +{HINT_PENALTY} s)
              </button>
            )}
          </div>
        )}
        {hints > 0 && (
          <ul className="mt-3 space-y-1.5">
            {room.hints.slice(0, hints).map((h) => (
              <li key={h} className="rounded-lg bg-amber-50 px-3 py-2 text-sm dark:bg-amber-500/10">
                💡 {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      {opened && (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed dark:bg-emerald-500/10">
            <p className="font-semibold">🔓 Porte ouverte · fragment récupéré : <span className="font-mono text-base">{room.fragment}</span></p>
            <p className="mt-1">{room.success}</p>
          </div>
          <button type="button" onClick={onNext} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white dark:bg-white dark:text-slate-900">
            {last ? 'Aller au coffre →' : 'Salle suivante →'}
          </button>
        </div>
      )}
    </Card>
  )
}

function Vault({ game, onWrong, onOpen }: { game: EscapeGame; onWrong: () => void; onOpen: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const check = () => {
    if (matchesCode(input, [game.vault.code])) onOpen()
    else {
      setError(true)
      onWrong()
    }
  }
  return (
    <Card className="p-6 text-center">
      <p className="text-5xl">🗄</p>
      <h2 className="mt-2 text-xl font-bold">Le coffre</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed">{game.vault.prompt}</p>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError(false)
        }}
        onKeyDown={(e) => e.key === 'Enter' && check()}
        maxLength={12}
        className={`mx-auto mt-4 block w-48 rounded-xl border-2 bg-white px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] outline-none dark:bg-slate-950 ${error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'}`}
      />
      {error && <p className="mt-2 text-sm text-rose-600">Code incorrect (+{WRONG_PENALTY} s)</p>}
      <button type="button" onClick={check} className="mt-4 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white">
        Ouvrir le coffre
      </button>
    </Card>
  )
}
