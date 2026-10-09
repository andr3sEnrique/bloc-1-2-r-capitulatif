import { useCallback, useState } from 'react'
import { readJSON, writeJSON } from './storage'

/** Meilleurs résultats par jeu (score le plus haut, ou temps le plus court pour l’escape room). */
export interface GameRecord {
  best: number
  plays: number
  /** Pour l’escape room, un score plus bas (temps) est meilleur */
  lowerIsBetter?: boolean
}

type Records = Record<string, GameRecord>

const KEY = 'rncp7.games.v1'

export function useGameStats() {
  const [records, setRecords] = useState<Records>(() => readJSON<Records>(KEY, {}))

  const record = useCallback((gameId: string, value: number, lowerIsBetter = false) => {
    setRecords((prev) => {
      const old = prev[gameId]
      const better = !old || (lowerIsBetter ? value < old.best : value > old.best)
      const next = {
        ...prev,
        [gameId]: { best: better ? value : old.best, plays: (old?.plays ?? 0) + 1, lowerIsBetter },
      }
      writeJSON(KEY, next)
      return next
    })
  }, [])

  return { records, record }
}

export type GameStatsApi = ReturnType<typeof useGameStats>

export const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
