import { useEffect, useState } from 'react'
import { CriteriaView } from './components/CriteriaView'
import { Glossary } from './components/Glossary'
import { Home } from './components/Home'
import { JurySimulator } from './components/JurySimulator'
import { Navigation } from './components/Navigation'
import { OralExam } from './components/OralExam'
import { TheoryView } from './components/TheoryView'
import type { BlockId } from './data/types'
import { DEFAULT_FILTERS, type JuryFilters } from './lib/filters'
import { useProgress } from './lib/progress'
import { useHashRoute } from './lib/route'
import { readJSON, writeJSON } from './lib/storage'

const BLOCK_KEY = 'rncp7.block'
const CRITERION_KEY = 'rncp7.theory.criterion'

export default function App() {
  const { route, navigate } = useHashRoute()
  const progress = useProgress()
  const [block, setBlock] = useState<BlockId>(() => (readJSON<number>(BLOCK_KEY, 1) === 2 ? 2 : 1))
  const [filters, setFilters] = useState<JuryFilters>(DEFAULT_FILTERS)

  const [theoryCriterion, setTheoryCriterion] = useState<string>(() => readJSON<string>(CRITERION_KEY, 'C1'))

  useEffect(() => writeJSON(BLOCK_KEY, block), [block])
  useEffect(() => writeJSON(CRITERION_KEY, theoryCriterion), [theoryCriterion])

  const openTheory = (criterion: string) => {
    setTheoryCriterion(criterion)
    navigate('theorie')
  }

  const trainCriterion = (criterion: string) => {
    setFilters({ ...DEFAULT_FILTERS, scopes: [block], criterion })
    navigate('jury')
  }

  return (
    <div className="min-h-dvh">
      <Navigation route={route} onNavigate={navigate} />
      <main className="pb-safe mx-auto max-w-6xl px-4 pt-6">
        {route === 'accueil' && (
          <Home
            progress={progress.progress}
            onNavigate={navigate}
            onPickBlock={(b) => {
              setBlock(b)
              navigate('criteres')
            }}
            onTrainScope={(s) => {
              setFilters({ ...DEFAULT_FILTERS, scopes: [s] })
              navigate('jury')
            }}
          />
        )}
        {route === 'criteres' && <CriteriaView block={block} onBlockChange={setBlock} onTrain={trainCriterion} onTheory={openTheory} />}
        {route === 'theorie' && (
          <TheoryView criterion={theoryCriterion} onCriterionChange={setTheoryCriterion} progress={progress} />
        )}
        {route === 'jury' && <JurySimulator filters={filters} onFiltersChange={setFilters} progress={progress} />}
        {route === 'oral' && <OralExam block={block} onBlockChange={setBlock} progress={progress} />}
        {route === 'glossaire' && <Glossary />}
      </main>
    </div>
  )
}
