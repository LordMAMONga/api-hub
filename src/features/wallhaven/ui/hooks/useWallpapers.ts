import { useState, useEffect, useCallback } from "react";
import type { Wallpaper } from "../../domain/model/Wallpaper";
import { type WallpaperFilters } from "../../domain/model/WallpaperFilters";
import { wallpaperRepository } from "../../data/repository/RealWallpaperRepository";

export const useWallpapers = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<WallpaperFilters>({
    query: "",
    category: "111",
    sorting: "toplist",
    resolution: "",
  });

  const fetchWallpapers = useCallback(
    async (targetPage: number, isNewSearch: boolean = false) => {
      try {
        if (isNewSearch) {
          setIsLoading(true);
        } else {
          setIsFetchingNext(true);
        }
        setError(null);

        const data = await wallpaperRepository.searchWallpapers(
          filters,
          targetPage,
        );

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setWallpapers((prev) => (isNewSearch ? data : [...prev, ...data]));
        }

        setPage(targetPage);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки");
      } finally {
        setIsLoading(false);
        setIsFetchingNext(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchWallpapers(1, true);
  }, []);

  const executeSearch = () => fetchWallpapers(1, true);

  const loadMore = () => {
    if (!isLoading && !isFetchingNext && hasMore) {
      fetchWallpapers(page + 1, false);
    }
  };

  return {
    wallpapers,
    isLoading,
    isFetchingNext,
    error,
    hasMore,
    filters,
    setFilters,
    executeSearch,
    loadMore,
  };
};
