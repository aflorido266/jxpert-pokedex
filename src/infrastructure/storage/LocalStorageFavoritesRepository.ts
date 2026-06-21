import { Pokemon } from '../../core/entities/Pokemon'
import { FavoritesRepository } from '../../core/repositories/FavoritesRepository'

const KEY = 'pokedex:favorites'
const MAX_FAVORITES = 6

export class LocalStorageFavoritesRepository implements FavoritesRepository {
  getAll(): Pokemon[] {
    const data = localStorage.getItem(KEY)
    return JSON.parse(data ?? '[]')
  }

  add(pokemon: Pokemon): void {
    const current = this.getAll()
    const sinDuplicado = current.filter((p) => pokemon.id != pokemon.id)
    const nuevos = [...sinDuplicado, pokemon].slice(-MAX_FAVORITES)
    localStorage.setItem(KEY, JSON.stringify(nuevos))
 }

  remove(id: number): void {
    const current = this.getAll();
    const nuevos = current.filter((p) => p.id !== id);
    localStorage.setItem(KEY, JSON.stringify(nuevos));
  }

  isFavorite(id: number): boolean {
    return this.getAll().some((p) => p.id === id);
  }

}
