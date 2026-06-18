export type PokemonTypeName =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";


export interface PokemonStats {
hp: number;
attack: number;
defense:number;
specialAttack:number;
specialDefense:number;
speed: number;
}

export interface Pokemon {
id: number;
name: string;
// img: image;??
types: PokemonTypeName[];
stats: PokemonStats;
artworkUrl: string;
}
