import { describe, it, expect } from "vitest";
import { sortPokemon } from "./sortPokemon";
import type { Pokemon } from "../../core/entities/Pokemon";

const makePokemon = (id: number, name: string, hp: number, speed: number): Pokemon => ({
  id,
  name,
  types: ["fire" as any],
  stats: { hp, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed },
  artworkUrl: `https://example.com/${id}.png`,
});

const pokemons = [
  makePokemon(1, "bulbasaur", 45, 45),
  makePokemon(4, "charmander", 39, 65),
  makePokemon(7, "squirtle", 44, 43),
];

describe("sortPokemon", () => {
  it("default ordena por id ascendente", () => {
    const result = sortPokemon(pokemons, "default");
    expect(result[0].id).toBe(1);
    expect(result[2].id).toBe(7);
  });

  it("ordena por hp descendente", () => {
    const result = sortPokemon(pokemons, "hp");
    expect(result[0].name).toBe("bulbasaur"); // hp 45
    expect(result[2].name).toBe("charmander"); // hp 39
  });

  it("ordena por speed descendente", () => {
    const result = sortPokemon(pokemons, "speed");
    expect(result[0].name).toBe("charmander"); // speed 65
    expect(result[2].name).toBe("squirtle");   // speed 43
  });

  it("no modifica el array original", () => {
    const original = [...pokemons];
    sortPokemon(pokemons, "hp");
    expect(pokemons[0].name).toBe(original[0].name);
  });
});
