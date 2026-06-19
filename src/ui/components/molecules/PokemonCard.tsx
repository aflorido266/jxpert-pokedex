import type { CSSProperties } from "react";
import type { Pokemon } from "../../../core/entities/Pokemon";
import { PokemonTypeIcon } from "../atoms/PokemonTypeIcon";
import { PokemonStat } from "../atoms/PokemonStat";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const customStyles = {
    "--color-type": `var(--color-${pokemon.types[0]})`,
  } as CSSProperties;

  return (
    <article className="card" style={customStyles}>
      <header className="card__head">
        <div className="card__tag">
          <p>#{pokemon.id.toString().padStart(3, "0")}</p>
        </div>

        <div className="card__tag">
          <PokemonTypeIcon
            type={pokemon.types[0]}
            label={`${pokemon.types[0]} primary type`}
          />

          {pokemon.types[1] && (
            <PokemonTypeIcon
              type={pokemon.types[1]}
              label={`${pokemon.types[1]} secondary type`}
            />
          )}
        </div>
      </header>

      <img
        className="card__avatar"
        src={pokemon.artworkUrl}
        loading="lazy"
        alt={`${pokemon.name} artwork`}
      />

      <section className="card__content">
        <h3 className="card__title">{pokemon.name}</h3>

        <ul aria-description="Stats resume">
          <PokemonStat label="Health points" shortLabel="Hp" value={pokemon.stats.hp} />
          <PokemonStat label="Attack" shortLabel="At" value={pokemon.stats.attack} />
          <PokemonStat label="Defense" shortLabel="Df" value={pokemon.stats.defense} />
          <PokemonStat
            label="Special attack"
            shortLabel="SpA"
            value={pokemon.stats.specialAttack}
          />
          <PokemonStat
            label="Special defense"
            shortLabel="SpD"
            value={pokemon.stats.specialDefense}
          />
          <PokemonStat label="Speed" shortLabel="Spd" value={pokemon.stats.speed} />
        </ul>
      </section>
    </article>
  );
}