import { usePokemonList } from './ui/hooks/usePokemonList'
import { REGIONS } from './infrastructure/api/regions'
import { PokemonGrid } from './ui/components/organisms/PokemonGrid'
import { Footer } from './ui/components/organisms/Footer'
import { Header } from './ui/components/organisms/Header'
import { SearchBar } from './ui/components/organisms/SearchBar'

const regs = REGIONS.map((r) => r.name)

export const App = () => {
  const {
    ldr,
    fltr,
    finalResult,
    busqueda,
    setBusqueda,
    reg,
    setreg,
    showregs,
    setShowregs,
    showSort,
    setShowSort,
    sorting,
    setSort,
  } = usePokemonList()

  return (
    <div className="layout">
      <Header />
      <main className="container">
        <SearchBar
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          reg={reg}
          setreg={setreg}
          showregs={showregs}
          setShowregs={setShowregs}
          showSort={showSort} // ← faltaba
          setShowSort={setShowSort} // ← faltaba
          sorting={sorting} // ← faltaba
          setSort={setSort} // ← faltaba
        />
        <section>
          {(ldr || fltr) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => (
                <article
                  key={`placeholder-card-${index}`}
                  className="card card-placeholder"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12,2C17.52,2 22,6.48 22,12..." />
                  </svg>
                </article>
              ))}
            </div>
          )}
          {!fltr && !ldr && finalResult.length > 0 && (
            <PokemonGrid pokemonList={finalResult} />
          )}
        </section>
        {!ldr && finalResult.length === 0 && (
          <p className="noresults">No results for "{busqueda}"</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
