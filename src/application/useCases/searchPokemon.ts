import {Pokemon} from "../../core/entities/Pokemon";

export function searchPokemon(pokemonList: Pokemon[], searchTerm: string, ): Pokemon[] {
const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
if (!normalizedSearchTerm ){
    return pokemonList;
}
    return pokemonList.filter(
        (pokemon) =>
            pokemon.name.includes(normalizedSearchTerm) ||
            pokemon.types.some((type) => type.startsWith(normalizedSearchTerm)),    )


            
}