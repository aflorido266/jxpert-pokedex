import type {Pokemon} from "../entities/Pokemon"

export interface  FavoritesRepository {
getAll():Pokemon[];
add(pokemon:Pokemon):void ;
remove(id:number): void;
isFavorite(id:number):boolean;
}


