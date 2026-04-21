import { useEffect, useState } from 'react';
import type { Character } from '../../domain/model/Character';
import { OnePieceRepositoryImpl } from '../../data/repository/OnePieceRepositoryImpl';

const repository = new OnePieceRepositoryImpl();
const PAGE_SIZE = 20;

export const useOnePiece = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    repository
      .getCharacters()
      .then((chars) => {
        setAllCharacters(chars);
        setLoading(false);
        repository.loadImagesFor(chars, (id: any, url: any) => {
          setImages((prev) => ({ ...prev, [id]: url }));
        });
      })
      .catch(() => {
        setError('Ошибка загрузки персонажей');
        setLoading(false);
      });
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  const characters = allCharacters.slice(0, visibleCount).map((c) => ({
    ...c,
    imageUrl: images[c.id] ?? null,
  }));

  return {
    characters,
    total: allCharacters.length,
    hasMore: visibleCount < allCharacters.length,
    loading,
    error,
    loadMore,
  };
};