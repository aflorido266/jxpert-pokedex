import { useEffect, useState } from "react";
import type { Pokemon } from "../../core/entities/Pokemon";
import type { PokemonSortOption } from "../application/useCases/sortPokemon";
import type { PokemonRegionName } from "../../infrastructure/api/regions";
import { PokeApiPokemonRepository } from "../../infrastructure/api/PokeApiPokemonRepository";
import { getPokemonByRegion } from "../../application/getPokemonByRegion";
import { searchPokemon } from "../../application/useCases/searchPokemon";
import { sortPokemon } from "../../application/useCases/sortPokemon";

const pokemonRepository = new PokeApiPokemonRepository();

export function usePokemonList() {
  const [ldr, setLdr] = useState(false);
  const [fltr, setFltr] = useState(false);
  const [result, setResult] = useState<Pokemon[]>([]);
  const [finalResult, setFinalResult] = useState<Pokemon[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [reg, setreg] = useState<PokemonRegionName>("kanto");
  const [showregs, setShowregs] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sorting, setSort] = useState<PokemonSortOption>("default");

  useEffect(() => {
    const getData = async () => {
      setLdr(true);
      setFltr(true);
      const pokemon = await getPokemonByRegion(pokemonRepository, reg);
      setResult(pokemon);
      setFinalResult(pokemon);
      setLdr(false);
      setFltr(false);
    };
    getData();
  }, [reg]);

  useEffect(() => {
    const filteredPokemon = searchPokemon(result, busqueda);
    const sortedPokemon = sortPokemon(filteredPokemon, sorting);
    setFinalResult(sortedPokemon);
    setFltr(false);
  }, [result, busqueda, sorting]);

  return {
    ldr, fltr,
    finalResult,
    busqueda, setBusqueda,
    reg, setreg,
    showregs, setShowregs,
    showSort, setShowSort,
    sorting, setSort,
  };
}