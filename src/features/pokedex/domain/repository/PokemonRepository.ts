import type { PokemonListItem, PokemonDetails } from "../model/PokemonModel";

export interface PokemonRepository {
  getPokemonList(limit: number, offset: number): Promise<PokemonListItem[]>;

  getPokemonByName(name: string): Promise<PokemonDetails>;
}
