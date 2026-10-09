import type { OpenAnswerSpec } from '../data/games/types'

/** Minuscules, sans accents, espaces normalisés : « Requêtes paramétrées » → « requetes parametrees ». */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export interface OpenGrade {
  /** Part des groupes de mots-clés trouvés (0 à 1) */
  ratio: number
  passed: boolean
  found: string[]
  missing: string[]
}

export function gradeOpen(answer: string, spec: OpenAnswerSpec): OpenGrade {
  const text = normalize(answer)
  const found: string[] = []
  const missing: string[] = []
  for (const group of spec.keywords) {
    const hit = group.any.some((k) => text.includes(normalize(k)))
    ;(hit ? found : missing).push(group.label)
  }
  const ratio = spec.keywords.length ? found.length / spec.keywords.length : 0
  return { ratio, passed: ratio >= (spec.threshold ?? 0.6), found, missing }
}

/** Compare une saisie libre à une liste de réponses acceptées (casse, accents et espaces ignorés). */
export const matchesCode = (input: string, accept: string[]) => {
  const v = normalize(input).replace(/\s/g, '')
  return accept.some((a) => normalize(a).replace(/\s/g, '') === v)
}

export const sameOrder = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i])

export const sameSet = (a: number[], b: number[]) => {
  const sa = [...a].sort((x, y) => x - y)
  const sb = [...b].sort((x, y) => x - y)
  return sa.length === sb.length && sa.every((x, i) => x === sb[i])
}
