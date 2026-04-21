import { useState, useEffect } from "react";
import type { JjkCharacter } from "../../domain/model/JjkCharacter";
import { jjkRepository } from "../../data/repository/RealJjkRepository";

export const useJjkCharacters = () => {
  const [allCharacters, setAllCharacters] = useState<JjkCharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchChars = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await jjkRepository.getCharacters();
        setAllCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchChars();
  }, []);

  const filteredCharacters = allCharacters.filter((char) => {
    if (activeFilter === "All") {
      return true;
    }
    return char.grade === activeFilter;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const currentCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    characters: currentCharacters,
    loading,
    error,
    activeFilter,
    setActiveFilter,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};
