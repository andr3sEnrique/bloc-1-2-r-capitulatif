import { useCallback, useEffect, useState } from 'react'
import { readJSON, writeJSON } from './storage'

export type CardStatus = 'known' | 'review'
export type ProgressMap = Record<string, CardStatus>

const KEY = 'rncp7.progress.v1'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => readJSON<ProgressMap>(KEY, {}))

  useEffect(() => writeJSON(KEY, progress), [progress])

  const mark = useCallback((id: string, status: CardStatus) => {
    setProgress((p) => ({ ...p, [id]: status }))
  }, [])

  const reset = useCallback((ids?: string[]) => {
    setProgress((p) => {
      if (!ids) return {}
      const next = { ...p }
      ids.forEach((id) => delete next[id])
      return next
    })
  }, [])

  return { progress, mark, reset }
}

export type ProgressApi = ReturnType<typeof useProgress>
