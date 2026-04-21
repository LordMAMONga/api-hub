import { useState, useEffect, useCallback } from "react";
import type { GameListItem } from "../../domain/model/GameListItem";
import { gameRepository } from "../../data/repository/RealGameRepository";

export const useGamesList = () => {
  const [games, setGames] = useState<GameListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = useCallback(async (pageNumber: number) => {
    try {
      if (pageNumber === 1) setIsLoading(true);
      else setIsFetchingNext(true);
      setError(null);

      const newGames = await gameRepository.getGamesList(pageNumber);

      if (newGames.length === 0) {
        setHasMore(false);
      } else {
        setGames((prevGames) =>
          pageNumber === 1 ? newGames : [...prevGames, ...newGames],
        );
      }
    } catch (err: any) {
      setError(err.message || "Не удалось загрузить игры");
    } finally {
      setIsLoading(false);
      setIsFetchingNext(false);
    }
  }, []);

  useEffect(() => {
    fetchGames(1);
  }, [fetchGames]);

  const loadMore = () => {
    if (!isLoading && !isFetchingNext && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage);
    }
  };

  return { games, isLoading, isFetchingNext, error, hasMore, loadMore };
};
