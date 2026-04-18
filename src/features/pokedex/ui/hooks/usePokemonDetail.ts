import { useState, useEffect } from "react";
import { pokemonRepository } from "../../data/repository/RealPokemonRepository";
import type { PokemonDetails } from "../../domain/model/PokemonModel";

export const usePokemonDetail = (name: string | undefined) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await pokemonRepository.getPokemonByName(name);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError("Покемон потерялся в высокой траве...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  return { pokemon, isLoading, error };
};
