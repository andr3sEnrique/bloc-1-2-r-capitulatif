import type { CriterionTheory, Question, TheoryModule } from '../types'

// Un fichier par critère : cours + questions de théorie pure.
const modules = import.meta.glob<TheoryModule>('./c*.ts', { eager: true, import: 'default' })

const ORDER = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11']
const sorted = Object.values(modules).sort((a, b) => ORDER.indexOf(a.theory.code) - ORDER.indexOf(b.theory.code))

export const THEORY: CriterionTheory[] = sorted.map((m) => m.theory)
export const THEORY_QUESTIONS: Question[] = sorted.flatMap((m) => m.questions)
