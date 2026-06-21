import { useState, useEffect } from "react";
import type { Pokemon } from "../../core/entities/Pokemon";
import { LocalStorageFavoritesRepository } from "../../infrastructure/storage/LocalStorageFavoritesRepository";

const repository = new LocalStorageFavoritesRepository();

export function useFavoritesList() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFavorites(repository.getAll());
  }, []);

  return { favorites };
}