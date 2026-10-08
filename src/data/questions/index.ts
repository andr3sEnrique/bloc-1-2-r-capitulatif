import type { Question } from '../types'
import { BLOC1_QUESTIONS } from './bloc1'
import { BLOC2_QUESTIONS } from './bloc2'
import { GENERAL_QUESTIONS } from './general'
import { THEORY_QUESTIONS } from '../theory'

export const QUESTIONS: Question[] = [
  ...BLOC1_QUESTIONS,
  ...BLOC2_QUESTIONS,
  ...THEORY_QUESTIONS,
  ...GENERAL_QUESTIONS,
]

/** Questions de théorie pure d’un critère, par difficulté croissante. */
export const theoryQuestionsFor = (code: string) =>
  QUESTIONS.filter((q) => q.scope === 3 && q.criteria.includes(code)).sort((a, b) => a.difficulty - b.difficulty)
