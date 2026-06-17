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

// export type PokemontRegionName = 
//   "kanto"|
//   "johto"|
//   "hoenn"|
//   "sinnoh"|
//   "unova"|
//   "kalos"|
//   "alola"|
//   "galar"|
//   "paldea";

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
