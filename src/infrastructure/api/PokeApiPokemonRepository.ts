import type {Pokemon} from "../../core/entities/Pokemon";
import { getRegionRange } from "./regions";
import type { PokemonRepository } from "../../core/repositories/PokemonRepository";
import { toPokemon } from "./pokemonMapper";

interface PokemonListResponse {
    results: Array<{
        url:string;
    }>;
}

export class PokeApiPokemonRepository implements PokemonRepository{
    

    async getByRegion(regionName: string): Promise<Pokemon[]> {
        const region = getRegionRange(regionName);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${region.offset}&limit=${region.limit}`,
        );
        const data = (await response.json()) as PokemonListResponse;
        const rawPokemonList = await Promise.all (
            data.results.map(async({url})=> {
                const response = await fetch(url);
                return response.json();
            })
        ) 
return rawPokemonList.map(toPokemon)        
    }
}




