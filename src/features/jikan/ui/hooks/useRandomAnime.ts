import { useState } from "react";
import type { AnimeListItem } from "../../domain/model/AnimeListItem";

export const useRandomAnime = () => {
  const [anime, setAnime] = useState<AnimeListItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rollRandom = async () => {
    setIsLoading(true);
    setError(null);
    setAnime(null);

    try {
      const response = await fetch("https://api.jikan.moe/v4/random/anime");
      if (!response.ok) throw new Error("Ошибка сети");
      const { data } = await response.json();

      const mappedAnime: AnimeListItem = {
        id: data.mal_id,
        title: data.title_russian || data.title,
        imageUrl:
          data.images.webp.large_image_url || data.images.jpg.large_image_url,
        score: data.score,
        status: data.status,
        year: data.year,
        genres: data.genres ? data.genres.map((g: any) => g.name) : [],
      };

      setAnime(mappedAnime);
    } catch (err) {
      setError(
        "Не удалось вытянуть аниме. API Jikan иногда капризничает, попробуй еще раз!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { anime, isLoading, error, rollRandom };
};
