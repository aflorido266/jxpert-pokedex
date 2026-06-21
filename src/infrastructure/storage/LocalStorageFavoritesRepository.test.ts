import { describe, it, expect, beforeEach } from "vitest";
import { LocalStorageFavoritesRepository } from "./LocalStorageFavoritesRepository";
import type { Pokemon } from "../../core/entities/Pokemon";

const makePokemon = (id: number, name: string): Pokemon => ({
  id,
  name,
  types: ["fire"],
  stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
  artworkUrl: `https://example.com/${id}.png`,
});

describe("LocalStorageFavoritesRepository", () => {
  let repo: LocalStorageFavoritesRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageFavoritesRepository();
  });

  it("empieza vacío", () => {
    expect(repo.getAll()).toHaveLength(0);
  });

  it("añade un Pokémon correctamente", () => {
    repo.add(makePokemon(1, "bulbasaur"));
    expect(repo.getAll()).toHaveLength(1);
    expect(repo.getAll()[0].name).toBe("bulbasaur");
  });

  it("no añade duplicados", () => {
    repo.add(makePokemon(1, "bulbasaur"));
    repo.add(makePokemon(1, "bulbasaur"));
    expect(repo.getAll()).toHaveLength(1);
  });

  it("elimina un Pokémon correctamente", () => {
    repo.add(makePokemon(1, "bulbasaur"));
    repo.remove(1);
    expect(repo.getAll()).toHaveLength(0);
  });

  it("isFavorite devuelve true si está guardado", () => {
    repo.add(makePokemon(25, "pikachu"));
    expect(repo.isFavorite(25)).toBe(true);
  });

  it("isFavorite devuelve false si no está guardado", () => {
    expect(repo.isFavorite(25)).toBe(false);
  });

  it("mantiene solo los últimos 6 al añadir el séptimo", () => {
    repo.add(makePokemon(1, "bulbasaur"));
    repo.add(makePokemon(2, "ivysaur"));
    repo.add(makePokemon(3, "venusaur"));
    repo.add(makePokemon(4, "charmander"));
    repo.add(makePokemon(5, "charmeleon"));
    repo.add(makePokemon(6, "charizard"));
    repo.add(makePokemon(7, "squirtle")); // ← el séptimo

    const all = repo.getAll();
    expect(all).toHaveLength(6);
    expect(all[0].name).toBe("ivysaur");       // bulbasaur salió
    expect(all[5].name).toBe("squirtle");       // squirtle entró
  });

  it("el primero sale cuando se añade el séptimo", () => {
    for (let i = 1; i <= 7; i++) {
      repo.add(makePokemon(i, `pokemon-${i}`));
    }
    expect(repo.isFavorite(1)).toBe(false); // el primero ya no está
    expect(repo.isFavorite(7)).toBe(true);  // el séptimo sí está
  });
});
