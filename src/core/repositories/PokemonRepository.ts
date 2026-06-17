import type { Pokemon } from "../entities/Pokemon";


export interface  PokemonRepository{
    getByRegion (regionName:string) : Promise<Pokemon[]>;
}
