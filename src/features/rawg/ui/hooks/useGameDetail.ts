import { useState, useEffect } from "react";
import type { GameDetail } from "../../domain/model/GameDetail";
import { gameRepository } from "../../data/repository/RealGameRepository";

export const useGameDetail = (id: string | undefined) => {
  const [game, setGame] = useState<GameDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await gameRepository.getGameDetails(id);
        setGame(data);
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить данные об игре");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { game, isLoading, error };
};
