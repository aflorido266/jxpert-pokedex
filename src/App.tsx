import { useEffect, useState } from "react";
import bug from "./assets/bug.svg";
import dark from "./assets/dark.svg";
import dragon from "./assets/dragon.svg";
import electric from "./assets/electric.svg";
import fairy from "./assets/fairy.svg";
import fighting from "./assets/fighting.svg";
import fire from "./assets/fire.svg";
import flying from "./assets/flying.svg";
import ghost from "./assets/ghost.svg";
import grass from "./assets/grass.svg";
import ground from "./assets/ground.svg";
import ice from "./assets/ice.svg";
import normal from "./assets/normal.svg";
import poison from "./assets/poison.svg";
import psychic from "./assets/psychic.svg";
import rock from "./assets/rock.svg";
import steel from "./assets/steel.svg";
import water from "./assets/water.svg";
import pokeball from "./assets/pokeball.svg";
import { Pokemon } from "../src/core/entities/Pokemon"
import { PokeApiPokemonRepository } from "./infrastructure/api/PokeApiPokemonRepository";
import { searchPokemon } from "../src/application/useCases/searchPokemon";
import { sortPokemon,  type PokemonSortOption,} from "./application/useCases/sortPokemon";

/**
 *  Iconos de los tipos de Pokémon
 */
const icns: any = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const regs = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
];

const pokemonRepository = new PokeApiPokemonRepository();

export const App = () => {
  const [ldr, setLdr] = useState(false);
  const [fltr, setFltr] = useState(false);
  const [result, setResult] = useState<Pokemon[]>([]);
  const [finalResult, setFinalResult] = useState<Pokemon[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [reg, setreg] = useState<any>("kanto");
  const [showregs, setShowregs] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sorting, setSort] = useState<PokemonSortOption>("default");

  useEffect(() => {
    const getData = async () => {
      setLdr(true);
      setFltr(true);

      const pokemon = await pokemonRepository.getByRegion(reg);

      setResult(pokemon);
      setFinalResult(pokemon);
      setLdr(false);
      setFltr(false);
    };

    getData();
  }, [reg]);

  useEffect(() => {
    setFinalResult(searchPokemon(result, busqueda));
    setFltr(false);
  }, [result, busqueda]);

  useEffect(() => {
    setFinalResult((prev) => sortPokemon(prev, sorting));},
    [sorting]);

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={showregs}
              className={`dropdown__button ${showregs ? "active" : ""}`}
              onClick={() =>
                setShowregs((prev) => {
                  if (showSort) {
                    setShowSort(false);
                  }
                  return !prev;
                })
              }
            >
              {reg}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!showregs}
              className={`dropdown__list ${!showregs ? "hide" : ""}`}
            >
              {regs.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={reg === key}
                  tabIndex={0}
                  className={reg === key ? "active" : ""}
                  onClick={() => {
                    setreg(key);
                    setShowregs(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setreg(key);
                      setShowregs(false);
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={showSort}
            className="sort__button"
            onClick={() =>
              setShowSort((prev) => {
                if (showregs) setShowregs(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                showSort ? "var(--color-accent)" : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {showSort && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "default" ? "active" : ""
                  }`}
                  aria-checked={sorting === "default"}
                  onClick={() => {
                    setSort("default");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("default");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${sorting === "hp" ? "active" : ""}`}
                  aria-checked={sorting === "hp"}
                  onClick={() => {
                    setSort("hp");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("hp");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "attack" ? "active" : ""
                  }`}
                  aria-checked={sorting === "attack"}
                  onClick={() => {
                    setSort("attack");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("attack");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "defense" ? "active" : ""
                  }`}
                  aria-checked={sorting === "defense"}
                  onClick={() => {
                    setSort("defense");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("defense");
                      setShowSort(false);
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "specialAttack" ? "active" : ""
                  }`}
                  aria-checked={sorting === "specialAttack"}
                  onClick={() => {
                    setSort("specialAttack");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("specialAttack");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "specialDefense" ? "active" : ""
                  }`}
                  aria-checked={sorting === "specialDefense"}
                  onClick={() => {
                    setSort("specialDefense");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("specialDefense");
                      setShowSort(false);
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${
                    sorting === "speed" ? "active" : ""
                  }`}
                  aria-checked={sorting === "speed"}
                  onClick={() => {
                    setSort("speed");
                    setShowSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSort("speed");
                      setShowSort(false);
                    }
                  }}
                >
                  {" "}
                  Spd
                </span>
              </div>
            </article>
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          {(ldr || fltr) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
          )}
          {/* Prints cards */}
          {!fltr && !ldr && finalResult.length > 0 && (
            <ul className="grid">
              {finalResult.map((res) => {
                const customStyles: any = {
                  "--color-type": `var(--color-${res.types[0]}`,
                };

                return (
                  <li key={`pokemon-card-${res.id}`}>
                    <article className="card" style={customStyles}>
                      <header className="card__head">
                        <div className="card__tag">
                          <p>#{res.id.toString().padStart(3, "0")}</p>
                        </div>
                        <div className="card__tag">
                          <img
                            src={icns[res.types[0]]}
                            className="card__type"
                            alt={`${res.types[0]} primary type`}
                          />
                          {res.types[1] && (
                            <img
                              src={icns[res.types[1]]}
                              className="card__type"
                              alt={`${res.types[1]} secondary type`}
                            />
                          )}
                        </div>
                      </header>
                      <img
                        className="card__avatar"
                        src={res.artworkUrl}
                        loading="lazy"
                        alt={`${res.name} artwork`}
                      />
                      <section className="card__content">
                        <h3 className="card__title">{res.name}</h3>
                        <ul aria-description="Stats resume">
                          <li className="card__stat" aria-label="Health points">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Hp
                              </p>
                              <p>{res.stats.hp}</p>
                            </div>
                            <progress value={res.stats.hp} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Attack">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                At
                              </p>
                              <p>{res.stats.attack}</p>
                            </div>
                            <progress
                              value={res.stats.attack}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Defense">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Df
                              </p>
                              <p>{res.stats.defense}</p>
                            </div>
                            <progress
                              value={res.stats.defense}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special attack"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpA
                              </p>
                              <p>{res.stats.specialAttack}</p>
                            </div>
                            <progress
                              value={res.stats.specialAttack}
                              max="255"
                            ></progress>
                          </li>
                          <li
                            className="card__stat"
                            aria-label="Special defense"
                          >
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpD
                              </p>
                              <p>{res.stats.specialDefense}</p>
                            </div>
                            <progress
                              value={res.stats.specialDefense}
                              max="255"
                            ></progress>
                          </li>
                          <li className="card__stat" aria-label="Speed">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Spd
                              </p>
                              <p>{res.stats.speed}</p>
                            </div>
                            <progress
                              value={res.stats.speed}
                              max="255"
                            ></progress>
                          </li>
                        </ul>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!ldr && finalResult.length === 0 && (
          <p className="noresults">No results for "{busqueda}"</p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 -{" "}
          {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM,
          ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
