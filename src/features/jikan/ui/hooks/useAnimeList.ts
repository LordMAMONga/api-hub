import { useState, useEffect, useCallback, useRef } from "react";
import { animeRepository } from "../../data/repository/RealAnimeRepository";
import type { AnimeListItem } from "../../domain/model/AnimeListItem";

export type AnimeCategory = "catalog" | "top" | "ongoing";

const cache: Record<
  AnimeCategory,
  { items: AnimeListItem[]; page: number; hasMore: boolean; scroll: number }
> = {
  catalog: { items: [], page: 1, hasMore: true, scroll: 0 },
  top: { items: [], page: 1, hasMore: true, scroll: 0 },
  ongoing: { items: [], page: 1, hasMore: true, scroll: 0 },
};

export const useAnimeList = (category: AnimeCategory) => {
  const [animeList, setAnimeList] = useState<AnimeListItem[]>(
    cache[category].items,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(
    cache[category].items.length === 0,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(cache[category].hasMore);

  const pageRef = useRef(cache[category].page);

  const fetchAnime = useCallback(
    async (page: number, isInitial: boolean) => {
      try {
        if (isInitial) setIsInitialLoading(true);
        else setIsLoadingMore(true);

        let response;
        switch (category) {
          case "top":
            response = await animeRepository.getTopAnime(page);
            break;
          case "ongoing":
            response = await animeRepository.getOngoingAnime(page);
            break;
          case "catalog":
          default:
            response = await animeRepository.getAnimeCatalog(page);
            break;
        }

        setHasMore(response.hasNextPage);
        cache[category].hasMore = response.hasNextPage;

        setAnimeList((prev) => {
          const uniqueNew = response.data.filter(
            (newItem) => !prev.some((existing) => existing.id === newItem.id),
          );
          const updatedList = isInitial
            ? response.data
            : [...prev, ...uniqueNew];

          cache[category].items = updatedList;
          cache[category].page = page;
          pageRef.current = page;

          return updatedList;
        });

        setError(null);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки аниме");
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [category],
  );

  useEffect(() => {
    if (cache[category].items.length === 0) {
      fetchAnime(1, true);
    } else {
      setAnimeList(cache[category].items);
      setHasMore(cache[category].hasMore);
      pageRef.current = cache[category].page;
    }
  }, [category, fetchAnime]);

  const loadNextPage = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextPage = pageRef.current + 1;
      fetchAnime(nextPage, false);
    }
  }, [isLoadingMore, hasMore, fetchAnime]);

  const saveScrollPosition = () => {
    cache[category].scroll = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (cache[category].scroll > 0) {
      setTimeout(
        () =>
          window.scrollTo({ top: cache[category].scroll, behavior: "instant" }),
        0,
      );
    }
  };

  return {
    animeList,
    isInitialLoading,
    isLoadingMore,
    error,
    hasMore,
    loadNextPage,
    saveScrollPosition,
    restoreScrollPosition,
  };
};
