import { describe, it, expect } from "vitest";
import { searchPokemon } from "./searchPokemon";
import type { Pokemon } from "../../core/entities/Pokemon";

const makePokemon = (id: number, name: string, type: string): Pokemon => ({
  id,
  name,
  types: [type as any],
  stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
  artworkUrl: `https://example.com/${id}.png`,
});

const pokemons = [
  makePokemon(1, "bulbasaur", "grass"),
  makePokemon(4, "charmander", "fire"),
  makePokemon(7, "squirtle", "water"),
  makePokemon(25, "pikachu", "electric"),
];

describe("searchPokemon", () => {
  it("devuelve todos si la búsqueda está vacía", () => {
    expect(searchPokemon(pokemons, "")).toHaveLength(4);
  });

  it("filtra por nombre exacto", () => {
    const result = searchPokemon(pokemons, "pikachu");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("pikachu");
  });

  it("filtra por nombre parcial", () => {
    const result = searchPokemon(pokemons, "char");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("charmander");
  });

  it("filtra por tipo", () => {
    const result = searchPokemon(pokemons, "fire");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("charmander");
  });

  it("no distingue mayúsculas de minúsculas", () => {
    const result = searchPokemon(pokemons, "PIKACHU");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("pikachu");
  });

  it("devuelve array vacío si no hay coincidencias", () => {
    const result = searchPokemon(pokemons, "mewtwo");
    expect(result).toHaveLength(0);
  });
});