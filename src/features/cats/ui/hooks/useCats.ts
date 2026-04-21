import { useState, useEffect, useCallback } from 'react';
import type{ Cat } from '../../domain/model/Cat';
import { catsRepositoryImpl } from '../../data/repository/CatsRepositoryImpl';

export const useCats = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadCats = useCallback(async () => {
    setIsLoading(true);
    try {
    const newCats = await catsRepositoryImpl.fetchRandomCats(10);
    setCats((prev) => {
        // Защита от дубликатов, если API выдаст одинаковых котов
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueCats = newCats.filter(c => !existingIds.has(c.id));
        return [...prev, ...uniqueCats];
    });
    } catch (error) {
    console.error('Ошибка загрузки котиков:', error);
    } finally {
    setIsLoading(false);
    }
}, []);

    useEffect(() => {
    loadCats();
    }, [loadCats]);

    return { cats, isLoading, loadCats };
};