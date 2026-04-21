import { useEffect, useState } from "react";
import type { Character } from "../../domain/model/Character";
import { OnePieceRepositoryImpl } from "../../data/repository/OnePieceRepositoryImpl";

const repository = new OnePieceRepositoryImpl();
const PAGE_SIZE = 25;

export const useOnePiece = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    repository
      .getCharacters()
      .then(setAllCharacters)
      .catch(() => setError("Ошибка загрузки персонажей"))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return {
    characters: allCharacters.slice(0, visibleCount),
    total: allCharacters.length,
    hasMore: visibleCount < allCharacters.length,
    loading,
    error,
    loadMore,
  };
};
