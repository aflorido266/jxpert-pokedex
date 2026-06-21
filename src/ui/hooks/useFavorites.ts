import { useState, useCallback } from "react";
import type { Pokemon } from "../../core/entities/Pokemon";
import { LocalStorageFavoritesRepository } from "../../infrastructure/storage/LocalStorageFavoritesRepository";

const repository = new LocalStorageFavoritesRepository();

export function useFavorites(pokemon: Pokemon) {
  const [isFav, setIsFav] = useState(() => repository.isFavorite(pokemon.id));

  const toggle = useCallback(() => {
    if (isFav) {
      repository.remove(pokemon.id);
    } else {
      repository.add(pokemon);
    }
    setIsFav(!isFav);
  }, [isFav, pokemon]);

  return { isFav, toggle };
}