import type { Route } from '../lib/route'

const ITEMS: { route: Route; label: string; short: string; icon: string }[] = [
  { route: 'accueil', label: 'Accueil', short: 'Accueil', icon: 'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z' },
  { route: 'criteres', label: 'Critères & sujets', short: 'Critères', icon: 'M9 5h11M9 12h11M9 19h11M4 5h.01M4 12h.01M4 19h.01' },
  { route: 'jury', label: 'Simulateur de jury', short: 'Jury', icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 4z' },
  { route: 'oral', label: 'Oral blanc', short: 'Oral', icon: 'M12 8v4l3 2M12 21a9 9 0 100-18 9 9 0 000 18z' },
  { route: 'glossaire', label: 'Glossaire', short: 'Glossaire', icon: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 5v16' },
]

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}

export function Navigation({ route, onNavigate }: { route: Route; onNavigate: (r: Route) => void }) {
  return (
    <>
      {/* Barre haute (tablette / desktop) */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <button type="button" onClick={() => onNavigate('accueil')} className="flex items-center gap-2 font-semibold">
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            <span className="leading-tight">
              RNCP 7 <span className="hidden text-slate-500 sm:inline dark:text-slate-400">· Sécurité des développements</span>
            </span>
          </button>
          <nav className="ml-auto hidden gap-1 md:flex" aria-label="Navigation principale">
            {ITEMS.map((it) => (
              <button
                key={it.route}
                type="button"
                onClick={() => onNavigate(it.route)}
                aria-current={route === it.route ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  route === it.route
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {it.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Barre basse (mobile) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Navigation principale"
      >
        <div className="grid grid-cols-5">
          {ITEMS.map((it) => (
            <button
              key={it.route}
              type="button"
              onClick={() => onNavigate(it.route)}
              aria-current={route === it.route ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                route === it.route ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon d={it.icon} />
              {it.short}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
