import type { Question } from '../types'
import { BLOC1_QUESTIONS } from './bloc1'
import { BLOC2_QUESTIONS } from './bloc2'
import { GENERAL_QUESTIONS } from './general'

export const QUESTIONS: Question[] = [...BLOC1_QUESTIONS, ...BLOC2_QUESTIONS, ...GENERAL_QUESTIONS]
