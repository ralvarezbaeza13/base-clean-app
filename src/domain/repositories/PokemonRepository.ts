import { Pokemon } from '../entities/Pokemon';

export interface PokemonRepository {
  fetchPokemon(): Promise<Pokemon[]>;
}