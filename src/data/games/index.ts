import type { BlockId } from '../types'
import { ESCAPE_KODAMA, ESCAPE_LUMIO } from './escapes'
import { MISSION_BLOC1 } from './mission-bloc1'
import { MISSION_BLOC2 } from './mission-bloc2'
import { QUIZ_BLOC1 } from './quiz-bloc1'
import { QUIZ_BLOC2 } from './quiz-bloc2'
import type { EscapeGame, Mission, QuizQuestion } from './types'

export const QUIZZES: Record<BlockId, QuizQuestion[]> = { 1: QUIZ_BLOC1, 2: QUIZ_BLOC2 }
export const MISSIONS: Mission[] = [MISSION_BLOC1, MISSION_BLOC2]
export const ESCAPES: EscapeGame[] = [ESCAPE_LUMIO, ESCAPE_KODAMA]
