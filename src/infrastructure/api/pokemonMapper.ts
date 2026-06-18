interface RawStatEntry {
  base_stat: number;
  stat: { name: string };
}

interface RawTypeEntry {
  type: { name: string };
}

interface RawPokemon {
  id: number;
  name: string;
  types: RawTypeEntry[];
  stats: RawStatEntry[];
  sprites: {
    other: { "official-artwork": { front_default: string } };
  };
}

function findStat(stats: RawStatEntry[], statName: string): number {
  const found = stats.find((entry) => entry.stat.name === statName);
  return found?.base_stat ?? 0;
}

function toStats(rawStats: RawStatEntry[]): PokemonStats {
  return {
    hp: findStat(rawStats, "hp"),
    attack: findStat(rawStats, "attack"),
    defense: findStat(rawStats, "defense"),
    specialAttack: findStat(rawStats, "special-attack"),
    specialDefense: findStat(rawStats, "special-defense"),
    speed: findStat(rawStats, "speed"),
  };
}

function toTypes(rawTypes: RawTypeEntry[]): PokemonTypeName[] {
  return rawTypes.map((entry) => entry.type.name as PokemonTypeName);
}

export function toPokemon(raw: RawPokemon): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    types: toTypes(raw.types),
    stats: toStats(raw.stats),
    artworkUrl: raw.sprites.other["official-artwork"].front_default,
  };
}