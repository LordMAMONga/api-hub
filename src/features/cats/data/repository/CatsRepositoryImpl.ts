import { apiClient } from '../../../../core/api/apiClient';
import type{ ICatsRepository } from '../../domain/repository/ICatsRepository';
import type{ Cat } from '../../domain/model/Cat';
import type{ CatDto } from '../model/CatDto';
import { mapCatDtoToDomain } from '../mapper/catMapper';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';

export const catsRepositoryImpl: ICatsRepository = {
  fetchRandomCats: async (limit: number): Promise<Cat[]> => {
    try {
      // Обычный запрос без жестких требований к ключу
      const response = await apiClient.get<CatDto[]>(`${CAT_API_URL}/images/search?limit=${limit}`);
      return response.data.map(mapCatDtoToDomain);
    } catch (error) {
      console.error("Бэкенд TheCatAPI ругается:", error);
      return []; // Возвращаем пустой массив, чтобы фронт не умирал
    }
  }
};