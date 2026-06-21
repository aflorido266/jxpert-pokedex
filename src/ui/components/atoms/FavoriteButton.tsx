import { useFavorites } from "../../hooks/useFavorites";
import type { Pokemon } from "../../../core/entities/Pokemon";

interface FavoriteButtonProps {
  pokemon: Pokemon;
}

export function FavoriteButton({ pokemon }: FavoriteButtonProps) {
  const { isFav, toggle } = useFavorites(pokemon);

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      className={`favorite-btn ${isFav ? "active" : ""}`}
    >
      {isFav ? "★" : "☆"}
    </button>
  );
}