import { useState, useEffect } from "react";
import type { Quote } from "../../domain/model/Quote";
import { quotesRepository } from "../../data/repository/RealQuotesRepository";

export const useQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await quotesRepository.getRandomQuote();
      setQuote(newQuote);
    } catch (err) {
      setError("Не удалось получить мудрость аниме. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return { quote, loading, error, fetchQuote };
};
