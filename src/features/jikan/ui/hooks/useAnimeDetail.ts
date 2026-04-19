import { useState, useEffect } from "react";
import { animeRepository } from "../../data/repository/RealAnimeRepository";
import type { AnimeDetail } from "../../domain/model/AnimeDetail";

export const useAnimeDetail = (id: string | undefined) => {
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID аниме не найден");
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await animeRepository.getAnimeById(Number(id));
        setAnime(data);
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить информацию об аниме");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { anime, isLoading, error };
};
