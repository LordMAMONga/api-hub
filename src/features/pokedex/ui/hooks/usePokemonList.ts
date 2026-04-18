import { useState, useEffect, useCallback } from "react";
import { pokemonRepository } from "../../data/repository/RealPokemonRepository";
import type { PokemonListItem } from "../../domain/model/PokemonModel";

const listCache = {
  pokemons: [] as PokemonListItem[],
  offset: 0,
  hasMore: true,
  scrollPosition: 0,
};

export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>(
    listCache.pokemons,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(
    listCache.pokemons.length === 0,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(listCache.offset);
  const [hasMore, setHasMore] = useState(listCache.hasMore);

  const limit = 20;

  const fetchPokemons = useCallback(
    async (currentOffset: number, isInitial: boolean) => {
      try {
        if (isInitial) setIsInitialLoading(true);
        else setIsLoadingMore(true);

        const newPokemons = await pokemonRepository.getPokemonList(
          limit,
          currentOffset,
        );

        if (newPokemons.length < limit) {
          setHasMore(false);
          listCache.hasMore = false;
        }

        setPokemons((prev) => {
          const uniqueNew = newPokemons.filter(
            (newPokemon) =>
              !prev.some((existing) => existing.id === newPokemon.id),
          );
          const updatedList = isInitial ? newPokemons : [...prev, ...uniqueNew];

          listCache.pokemons = updatedList;
          listCache.offset = currentOffset;

          return updatedList;
        });

        setError(null);
      } catch (err) {
        setError("Ошибка загрузки");
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (listCache.pokemons.length === 0) {
      fetchPokemons(0, true);
    }
  }, [fetchPokemons]);

  const loadNextPage = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextOffset = offset + limit;
      setOffset(nextOffset);
      fetchPokemons(nextOffset, false);
    }
  }, [isLoadingMore, hasMore, offset, fetchPokemons]);

  const saveScrollPosition = () => {
    listCache.scrollPosition = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (listCache.scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo({ top: listCache.scrollPosition, behavior: "instant" });
      }, 0);
    }
  };

  return {
    pokemons,
    isInitialLoading,
    isLoadingMore,
    error,
    hasMore,
    loadNextPage,
    saveScrollPosition,
    restoreScrollPosition,
  };
};
