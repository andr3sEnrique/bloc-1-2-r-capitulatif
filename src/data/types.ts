export type BlockId = 1 | 2

/**
 * 1 / 2 = questions de jury contextualisées par le sujet blanc du bloc
 * 3 = théorie pure d’un critère, sans contexte d’entreprise
 * 0 = culture générale / pièges (transverses)
 */
export type QuestionScope = BlockId | 3 | 0

export type Difficulty = 1 | 2 | 3 | 4

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Fondamental',
  2: 'Intermédiaire',
  3: 'Avancé',
  4: 'Expert',
}

export const SCOPE_LABELS: Record<QuestionScope, string> = {
  1: 'Bloc 1 · CHU',
  2: 'Bloc 2 · OuiOuiGo',
  3: 'Théorie pure',
  0: 'Culture générale',
}

export interface Criterion {
  code: string
  title: string
  /** Énoncé officiel résumé du critère */
  summary: string
  /** Ce que le jury attend concrètement dans la restitution */
  juryExpects: string[]
  /** Erreurs fréquentes qui pénalisent */
  pitfalls: string[]
}

export interface Annex {
  title: string
  items: string[]
}

export interface Scenario {
  name: string
  role: string
  summary: string
  /** Risques / vulnérabilités clés du cas */
  keyRisks: string[]
  annexes: Annex[]
  /** Parties obligatoires du livrable demandé par le sujet */
  deliverable: Annex[]
}

export interface ExamContext {
  preparation: string
  oral: string
  mission: string
  /** Proposition de découpage des 4 h de préparation */
  timePlan: string[]
  /** Trame suggérée pour les 20 min de présentation */
  pitchPlan: string[]
}

export interface Block {
  id: BlockId
  code: string
  title: string
  shortTitle: string
  exam: ExamContext
  criteria: Criterion[]
  scenario: Scenario
}

export interface Question {
  id: string
  scope: QuestionScope
  /** Critères évalués (C1…C11). Vide pour les questions générales. */
  criteria: string[]
  difficulty: Difficulty
  /** Thème court, ex. « Impact », « Remédiation », « Crypto » */
  topic: string
  question: string
  /** Clés de la réponse attendue */
  keyPoints: string[]
  /** Piège / nuance que le jury attend que vous releviez */
  trap?: string
  /** Relance probable du jury */
  followUp?: string
  /** Question issue de la banque officielle fournie */
  official?: boolean
  /** Question piège « censée être acquise » */
  isTrick?: boolean
}

export interface TheorySection {
  title: string
  points: string[]
}

export interface Source {
  label: string
  url: string
}

/** Cours théorique d’un critère, indépendant de tout sujet blanc. */
export interface CriterionTheory {
  code: string
  /** Résumé en deux ou trois phrases */
  intro: string
  sections: TheorySection[]
  /** Points à connaître par cœur */
  takeaways: string[]
  sources: Source[]
}

/** Un critère en théorie pure : cours + questions d’entraînement (scope 3). */
export interface TheoryModule {
  theory: CriterionTheory
  questions: Question[]
}

export interface GlossaryEntry {
  term: string
  expansion: string
  definition: string
}
