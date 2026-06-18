import type { Pokemon, PokemonStats } from "../../core/entities/Pokemon";
export type PokemonSortOption = keyof PokemonStats | "default";


export function sortPokemon(
  pokemonList: Pokemon[],
  sortOption: PokemonSortOption,
): Pokemon[] {
  const sortedPokemon = [...pokemonList];

  if (sortOption === "default") {
    return sortedPokemon.sort((a, b) => a.id - b.id);
  }

  return sortedPokemon.sort(
    (a, b) => b.stats[sortOption] - a.stats[sortOption],
  );
}


