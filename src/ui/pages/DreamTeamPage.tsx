import { useFavoritesList } from "../hooks/useFavoritesList";
import { PokemonTypeIcon } from "../components/atoms/PokemonTypeIcon";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";

export function DreamTeamPage() {
  const { favorites } = useFavoritesList();

  return (
    <div className="layout">
      <Header />
      <main className="container">
        <div className="dream-team">
          <div className="dream-team__card">
            <span className="dream-team__title">Dream team</span>

            <div className="dream-team__pokemons">
              {favorites.map((pokemon) => (
                <img
                  key={pokemon.id}
                  className="dream-team__pokemon-img"
                  src={pokemon.artworkUrl}
                  alt={pokemon.name}
                />
              ))}
            </div>

            <div className="dream-team__types">
              {favorites.map((pokemon) => (
                <PokemonTypeIcon
                  key={pokemon.id}
                  type={pokemon.types[0]}
                  label={`${pokemon.name} type`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}