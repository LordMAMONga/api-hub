import { useState, useEffect } from "react";
import type { Character } from "../../domain/model/Character";
import { csmRepository } from "../../data/repository/RealCsmRepository";

export const useCsmCharacters = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchChars = async () => {
      try {
        setLoading(true);
        const data = await csmRepository.getCharacters();
        setAllCharacters(data);
      } catch (err) {
        setError("Связь с Бюро Общественной Безопасности потеряна.");
      } finally {
        setLoading(false);
      }
    };

    fetchChars();
  }, []);

  const totalPages = Math.ceil(allCharacters.length / itemsPerPage);

  const currentCharacters = allCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    characters: currentCharacters,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};
