import { apiClient } from "../../../../core/api/apiClient";
import type { PokemonRepository } from "../../domain/repository/PokemonRepository";
import type {
  PokemonListItem,
  PokemonDetails,
} from "../../domain/model/PokemonModel";
import { mapPokemonDetailsToDomain } from "../mappers/PokemonMapper";
import type { PokemonListResponseDto } from "../model/PokemonDto";
import type { PokemonDetailsDto } from "../model/PokemonDetailsDto";
import type { PokemonSpeciesDto } from "../model/PokemonSpeciesDto";

export class RealPokemonRepository implements PokemonRepository {
  private readonly URL = "https://pokeapi.co/api/v2";

  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListItem[]> {
    const res = await apiClient.get<PokemonListResponseDto>(
      `${this.URL}/pokemon?limit=${limit}&offset=${offset}`,
    );

    const promises = res.data.results.map(async (shortPokemon) => {
      const detailRes = await apiClient.get<PokemonDetailsDto>(
        `${this.URL}/pokemon/${shortPokemon.name}`,
      );

      return {
        id: detailRes.data.id,
        name:
          detailRes.data.name.charAt(0).toUpperCase() +
          detailRes.data.name.slice(1),
        imageUrl:
          detailRes.data.sprites.other["official-artwork"].front_default ||
          detailRes.data.sprites.front_default,
        types: detailRes.data.types.map((t) => t.type.name),
      };
    });

    return Promise.all(promises);
  }

  async getPokemonByName(name: string): Promise<PokemonDetails> {
    const [detailsRes, speciesRes] = await Promise.all([
      apiClient.get<PokemonDetailsDto>(
        `${this.URL}/pokemon/${name.toLowerCase()}`,
      ),
      apiClient.get<PokemonSpeciesDto>(
        `${this.URL}/pokemon-species/${name.toLowerCase()}`,
      ),
    ]);

    return mapPokemonDetailsToDomain(detailsRes.data, speciesRes.data);
  }
}

export const pokemonRepository = new RealPokemonRepository();
