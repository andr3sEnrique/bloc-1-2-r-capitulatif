import { useState } from 'react'
import { ESCAPES, MISSIONS, QUIZZES } from '../../data/games'
import type { BlockId } from '../../data/types'
import { formatDuration, useGameStats } from '../../lib/gameStats'
import type { ProgressApi } from '../../lib/progress'
import { OralExam } from '../OralExam'
import { Card, PageHeader } from '../ui'
import { EscapePlayer } from './EscapePlayer'
import { MissionPlayer } from './MissionPlayer'
import { Quiz } from './Quiz'

type Game = 'hub' | 'quiz' | 'mission' | 'escape' | 'oral'

export function PracticeHub({ block, onBlockChange, progress }: { block: BlockId; onBlockChange: (b: BlockId) => void; progress: ProgressApi }) {
  const [game, setGame] = useState<Game>('hub')
  const stats = useGameStats()
  const back = () => {
    setGame('hub')
    window.scrollTo({ top: 0 })
  }

  if (game === 'quiz') return <Quiz block={block} onBlockChange={onBlockChange} stats={stats} onExit={back} />
  if (game === 'mission') return <MissionPlayer stats={stats} onExit={back} />
  if (game === 'escape') return <EscapePlayer stats={stats} onExit={back} />
  if (game === 'oral')
    return (
      <div className="space-y-4">
        <button type="button" onClick={back} className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          ← Retour aux jeux
        </button>
        <OralExam block={block} onBlockChange={onBlockChange} progress={progress} />
      </div>
    )

  const r = stats.records
  const quizBest = [1, 2].map((b) => r[`quiz-${b}`]?.best).filter((x) => x !== undefined)
  const missionBest = MISSIONS.map((m) => r[`mission-${m.id}`]?.best).filter((x) => x !== undefined)
  const escapeBest = ESCAPES.map((g) => r[`escape-${g.id}`]?.best).filter((x) => x !== undefined)

  const tiles: { id: Game; emoji: string; title: string; desc: string; meta: string; record?: string; color: string }[] = [
    {
      id: 'quiz',
      emoji: '🎯',
      title: 'Quiz-jeu',
      desc: 'QCM, vrai/faux, remise en ordre et questions ouvertes corrigées automatiquement. Combo, chrono et mode survie.',
      meta: `${QUIZZES[1].length + QUIZZES[2].length} questions · 2 blocs`,
      record: quizBest.length ? `Record : ${Math.max(...(quizBest as number[]))} pts` : undefined,
      color: 'from-indigo-500 to-violet-600',
    },
    {
      id: 'mission',
      emoji: '🧭',
      title: 'Missions (cas pratiques)',
      desc: 'Un scénario où chaque décision change la suite : actifs et menaces, vulnérabilités et risques, mesures, puis justification devant le jury.',
      meta: `${MISSIONS.length} missions · 4 étapes`,
      record: missionBest.length ? `Meilleur : ${Math.max(...(missionBest as number[]))} %` : undefined,
      color: 'from-teal-500 to-emerald-600',
    },
    {
      id: 'escape',
      emoji: '🔐',
      title: 'Escape rooms',
      desc: 'Résolvez un incident salle par salle pour récupérer les fragments du code du coffre. Indices et erreurs coûtent du temps.',
      meta: `${ESCAPES.length} incidents · ${ESCAPES.reduce((s, g) => s + g.stages.length, 0)} salles`,
      record: escapeBest.length ? `Meilleur temps : ${formatDuration(Math.min(...(escapeBest as number[])))}` : undefined,
      color: 'from-rose-500 to-orange-500',
    },
    {
      id: 'oral',
      emoji: '🎤',
      title: 'Oral blanc',
      desc: 'Dix minutes de questions du jury, à difficulté croissante, avec une question piège glissée au milieu.',
      meta: 'Chronométré · bilan sur 20',
      color: 'from-slate-600 to-slate-800',
    },
  ]

  return (
    <div>
      <PageHeader title="Pratique" subtitle="Appliquer plutôt que mémoriser : jouez, décidez, résolvez des incidents." />
      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((t) => (
          <button key={t.id} type="button" onClick={() => setGame(t.id)} className="group text-left">
            <Card className="h-full overflow-hidden transition group-hover:-translate-y-0.5 group-hover:shadow-md">
              <div className={`flex items-center gap-3 bg-gradient-to-r ${t.color} p-4 text-white`}>
                <span className="text-3xl" aria-hidden>
                  {t.emoji}
                </span>
                <div>
                  <h2 className="text-lg font-bold">{t.title}</h2>
                  <p className="text-xs text-white/80">{t.meta}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{t.desc}</p>
                {t.record && <p className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">🏆 {t.record}</p>}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
