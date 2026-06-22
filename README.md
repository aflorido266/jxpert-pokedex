# 🎮 jxpert-pokedex

Pokédex interactiva construida con React + TypeScript, aplicando **arquitectura hexagonal**, principios **SOLID** y metodología **XP**.

Proyecto de prácticas desarrollado por **Ada**, fork del repositorio original de [biko2](https://github.com/biko2/jxpert-pokedex).

---

## ✨ Funcionalidades

- 📋 Listado de Pokémon por región (9 regiones: Kanto → Paldea)
- 🔍 Búsqueda en tiempo real por nombre y tipo
- ↕️ Ordenación por 6 estadísticas (HP, Attack, Defense, SpA, SpD, Speed)
- ⭐ Favoritos con persistencia en localStorage (máximo 6, siempre los últimos)
- 📄 Página `/favorites` con los 6 Pokémon favoritos
- 🌟 Página `/dream-team` con diseño especial del equipo favorito
- 💀 Skeleton loading mientras cargan los datos

---

## 🏗️ Arquitectura Hexagonal

El proyecto sigue una arquitectura hexagonal (ports & adapters) con 4 capas bien separadas:

```
src/
├── core/                          ← Dominio (sin dependencias externas)
│   ├── entities/
│   │   └── Pokemon.ts             ← Entidad central con tipado limpio
│   └── repositories/
│       ├── PokemonRepository.ts   ← Puerto de Pokémon
│       └── FavoritesRepository.ts ← Puerto de favoritos
│
├── application/                   ← Casos de uso (lógica de negocio)
│   ├── getPokemonByRegion.ts
│   └── useCases/
│       ├── searchPokemon.ts       ← Filtrado por nombre y tipo
│       └── sortPokemon.ts         ← Ordenación por estadística
│
├── infrastructure/                ← Adaptadores (detalles técnicos)
│   ├── api/
│   │   ├── PokeApiPokemonRepository.ts  ← Único sitio que hace fetch()
│   │   ├── pokemonMapper.ts             ← Convierte JSON crudo → entidad
│   │   └── regions.ts                  ← Tabla de regiones (elimina 9 if/else)
│   └── storage/
│       └── LocalStorageFavoritesRepository.ts ← Único sitio que toca localStorage
│
└── ui/                            ← Presentación (React)
    ├── components/
    │   ├── atoms/
    │   │   ├── PokemonStat.tsx
    │   │   ├── PokemonTypeIcon.tsx
    │   │   └── FavoriteButton.tsx
    │   ├── molecules/
    │   │   └── PokemonCard.tsx
    │   └── organisms/
    │       ├── Header.tsx
    │       ├── Footer.tsx
    │       ├── PokemonGrid.tsx
    │       └── SearchBar.tsx
    ├── hooks/
    │   ├── usePokemonList.ts      ← Lógica de carga, filtrado y ordenación
    │   ├── useFavorites.ts        ← Toggle de favorito por Pokémon
    │   └── useFavoritesList.ts    ← Lista de favoritos para las páginas
    └── pages/
        ├── FavoritesPage.tsx
        └── DreamTeamPage.tsx
```

### La regla de oro de las capas

> **El dominio no importa nada de fuera.** La infraestructura implementa los puertos. La presentación solo llama a hooks.

---

## 🧱 Principios aplicados

### SOLID

| Principio | Dónde se aplica |
|-----------|----------------|
| **S** — Single Responsibility | Cada archivo tiene una sola razón de cambio. `pokemonMapper` solo transforma datos. `SearchBar` solo pinta el buscador. |
| **O** — Open/Closed | `REGIONS` es una tabla de datos — añadir una región nueva no requiere tocar ningún `if`. `PokemonTypeName` como union type. |
| **D** — Dependency Inversion | Los casos de uso dependen de interfaces (`PokemonRepository`), no de implementaciones concretas (`PokeApiPokemonRepository`). |

### Otros principios XP

- **YAGNI** — No se construyó nada que no fuera necesario en el momento
- **Baby steps** — Cada cambio fue incremental, compilando y funcionando en cada paso
- **Single Source of Truth** — `REGIONS` como única fuente de verdad para los nombres de región

---

## 🔄 Flujo de datos

```
Usuario selecciona región
        ↓
usePokemonList (hook)
        ↓
getPokemonByRegion (caso de uso)
        ↓
PokeApiPokemonRepository (infraestructura) → fetch() a PokeAPI
        ↓
pokemonMapper → JSON crudo → Pokemon (entidad limpia)
        ↓
searchPokemon + sortPokemon (casos de uso)
        ↓
PokemonGrid → PokemonCard (componentes)
```

---

## ⭐ Favoritos

La funcionalidad de favoritos sigue el mismo patrón de capas:

- **Puerto**: `FavoritesRepository` en `core/` — define `getAll`, `add`, `remove`, `isFavorite`
- **Adaptador**: `LocalStorageFavoritesRepository` en `infrastructure/` — único sitio que toca `localStorage`
- **Hook**: `useFavorites` — gestiona el toggle ★/☆ con estado local
- **Regla de negocio**: máximo 6 favoritos, siempre los últimos 6 añadidos (`.slice(-6)`)

---

## 🧪 Tests

23 tests implementados con **Vitest** + **jsdom**:

```bash
npx vitest run
```

| Archivo | Tests | Qué verifica |
|---------|-------|-------------|
| `regions.test.ts` | 5 | Offsets correctos por región, fallback a Kanto |
| `LocalStorageFavoritesRepository.test.ts` | 8 | add, remove, isFavorite, regla de los últimos 6 |
| `searchPokemon.test.ts` | 6 | Búsqueda por nombre, tipo, mayúsculas, vacía |
| `sortPokemon.test.ts` | 4 | Orden por hp, speed, default, inmutabilidad |

Los tests se ejecutan automáticamente antes de cada commit gracias a **Husky** — si algún test falla, el commit se bloquea.

---

## 🚀 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/jxpert-pokedex

# Instalar dependencias
pnpm install

# Iniciar en desarrollo
pnpm dev

# Ejecutar tests
npx vitest run
```

---

## 🛠️ Stack técnico

| Tecnología | Uso |
|------------|-----|
| React 18 | UI y gestión de estado |
| TypeScript | Tipado estático |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación entre páginas |
| PokeAPI | Fuente de datos |
| localStorage | Persistencia de favoritos |
| Vitest + jsdom | Tests unitarios |
| Husky | Pre-commit hooks |

---

## 📚 Lo que aprendí

Este proyecto me permitió aplicar por primera vez en un proyecto real:

- **Arquitectura hexagonal**: separar el dominio de los detalles técnicos hace el código más fácil de cambiar y testear
- **TypeScript avanzado**: union types, interfaces, import type — el sistema de tipos previene errores antes de ejecutar
- **Hooks personalizados**: extraer lógica de los componentes hace el JSX más limpio y la lógica más testeable
- **Tests unitarios**: las funciones puras son las más fáciles de testear, y la arquitectura hexagonal hace que casi todo sea testeable sin red ni DOM
- **YAGNI y baby steps**: avanzar poco a poco, compilando en cada paso, es mucho más efectivo que planificar todo por adelantado

---

*Datos obtenidos de [PokéAPI](https://pokeapi.co/) — ©2024 Pokémon. ©1995-2024 Nintendo/Creatures Inc./GAME FREAK inc.*