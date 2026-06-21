import { useFavoritesList } from '../hooks/useFavoritesList'
import { PokemonGrid } from '../components/organisms/PokemonGrid'
import { Header } from '../components/organisms/Header'
import { Footer } from '../components/organisms/footer'

export function FavoritesPage() {
  const { favorites } = useFavoritesList()

  return (
    <div className="layout">
      <Header />
      <main className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Mis favoritos
        </h2>

        {favorites.length === 0 ? (
          <p className="noresults">
            No tienes favoritos aún. ¡Pulsa ★ en cualquier Pokémon!
          </p>
        ) : (
          <PokemonGrid pokemonList={favorites} />
        )}
      </main>
      <Footer />
    </div>
  )
}
