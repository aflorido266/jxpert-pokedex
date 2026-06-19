import type { Pokemon } from "../../../core/entities/Pokemon";
import { PokemonCard } from "../molecules/PokemonCard";

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  return (
    <ul className="grid">
      {pokemonList.map((pokemon) => (
        <li key={`pokemon-card-${pokemon.id}`}>
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}