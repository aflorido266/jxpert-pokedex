import type { Pokemon } from "../core/entities/Pokemon";
import type { PokemonRepository } from "../core/repositories/PokemonRepository";

export function getPokemonByRegion(
  pokemonRepository: PokemonRepository,
  regionName: string,
): Promise<Pokemon[]> {
  return pokemonRepository.getByRegion(regionName);
}