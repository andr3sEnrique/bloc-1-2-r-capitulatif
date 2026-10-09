import type { BlockId, Difficulty } from '../types'

/**
 * Groupe de mots-clés pour corriger une réponse ouverte : le groupe est validé
 * si la réponse contient au moins une des variantes (comparaison sans accents ni casse).
 */
export interface KeywordGroup {
  /** Libellé affiché dans la correction (ex. « Requêtes paramétrées ») */
  label: string
  /** Variantes acceptées, en minuscules (ex. ['parametr', 'prepar', 'prepared']) */
  any: string[]
}

export interface OpenAnswerSpec {
  keywords: KeywordGroup[]
  /** Part minimale de groupes trouvés pour considérer la réponse juste (0 à 1). Défaut : 0.6 */
  threshold?: number
  /** Réponse modèle affichée après correction */
  model: string
}

interface QuizBase {
  id: string
  block: BlockId
  criteria: string[]
  difficulty: Difficulty
  prompt: string
  /** Explication affichée après la réponse */
  explanation: string
}

/** QCM à une seule bonne réponse */
export interface SingleQuestion extends QuizBase {
  type: 'single'
  options: string[]
  answer: number
}

/** QCM à plusieurs bonnes réponses */
export interface MultiQuestion extends QuizBase {
  type: 'multi'
  options: string[]
  answers: number[]
}

/** Question fermée vrai / faux */
export interface TrueFalseQuestion extends QuizBase {
  type: 'truefalse'
  answer: boolean
}

/** Remettre des éléments dans le bon ordre (items donnés dans l’ordre correct, mélangés à l’affichage) */
export interface OrderQuestion extends QuizBase {
  type: 'order'
  items: string[]
}

/** Question ouverte corrigée par mots-clés */
export interface OpenQuestion extends QuizBase {
  type: 'open'
  open: OpenAnswerSpec
}

export type QuizQuestion = SingleQuestion | MultiQuestion | TrueFalseQuestion | OrderQuestion | OpenQuestion

// ───────────── Mission (cas pratique à embranchements) ─────────────

export type MissionStage = 'actifs' | 'risques' | 'mesures' | 'jury'

export const STAGE_LABELS: Record<MissionStage, string> = {
  actifs: 'Actifs & menaces',
  risques: 'Vulnérabilités & risques',
  mesures: 'Mesures de sécurité',
  jury: 'Face au jury',
}

/** Pièce du dossier : extrait de journal, mail, tableau, code… */
export interface Evidence {
  label: string
  /** Texte brut ; affiché en police monospace si `mono` */
  content: string
  mono?: boolean
}

export interface MissionChoice {
  label: string
  /** Conséquence racontée après le choix */
  feedback: string
  /** Points gagnés (peut être négatif) */
  points: number
  /** Nœud suivant */
  next: string
  /** Choix jugé optimal (pour le bilan) */
  best?: boolean
}

export interface BudgetOption {
  id: string
  label: string
  cost: number
  /** Points apportés si l’option est retenue (négatif si contre-productive) */
  points: number
  /** Commentaire affiché au bilan de l’étape */
  comment: string
}

interface MissionNodeBase {
  id: string
  stage: MissionStage
  title: string
  narrative: string[]
  evidence?: Evidence[]
}

export interface ChoiceNode extends MissionNodeBase {
  kind: 'choice'
  question: string
  choices: MissionChoice[]
}

/** Sélection multiple : chaque option correcte rapporte, chaque option fausse coûte */
export interface MultiNode extends MissionNodeBase {
  kind: 'multi'
  question: string
  options: { label: string; correct: boolean; why: string }[]
  pointsPerOption: number
  next: string
}

/** Classer des éléments par priorité */
export interface OrderNode extends MissionNodeBase {
  kind: 'order'
  question: string
  /** Ordre attendu */
  items: string[]
  why: string
  points: number
  next: string
}

/** Arbitrage budgétaire : la suite dépend des options retenues */
export interface BudgetNode extends MissionNodeBase {
  kind: 'budget'
  question: string
  budget: number
  unit: string
  options: BudgetOption[]
  /** Premier embranchement dont toutes les options `requires` sont retenues ; sinon `fallback` */
  branches: { requires: string[]; next: string }[]
  fallback: string
}

/** Justification libre corrigée par mots-clés */
export interface OpenNode extends MissionNodeBase {
  kind: 'open'
  question: string
  open: OpenAnswerSpec
  /** Points si la réponse atteint le seuil (au prorata sinon) */
  points: number
  next: string
}

/** Fin de mission */
export interface EndNode extends MissionNodeBase {
  kind: 'end'
}

export type MissionNode = ChoiceNode | MultiNode | OrderNode | BudgetNode | OpenNode | EndNode

export interface Mission {
  id: string
  block: BlockId
  title: string
  company: string
  pitch: string
  role: string
  start: string
  nodes: MissionNode[]
}

// ───────────── Escape room ─────────────

export type EscapePuzzle =
  | { kind: 'code'; prompt: string; accept: string[]; placeholder?: string }
  | { kind: 'single'; prompt: string; options: string[]; answer: number }
  | { kind: 'multi'; prompt: string; options: string[]; answers: number[] }
  | { kind: 'order'; prompt: string; items: string[] }

export interface EscapeRoomStage {
  id: string
  title: string
  narrative: string[]
  evidence: Evidence[]
  puzzle: EscapePuzzle
  hints: string[]
  /** Texte affiché à l’ouverture de la porte */
  success: string
  /** Fragment du code final révélé par cette salle */
  fragment: string
}

export interface EscapeGame {
  id: string
  block: BlockId
  title: string
  company: string
  pitch: string
  stages: EscapeRoomStage[]
  /** Énigme finale : saisir le code assemblé à partir des fragments */
  vault: { prompt: string; code: string; debrief: string[] }
}
