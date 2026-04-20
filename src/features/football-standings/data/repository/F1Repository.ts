import { apiClient } from '../../../../core/api/apiClient';

export const F1Repository = {
  async fetchDrivers(page: number = 1) {
    const response = await apiClient.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    return response.data;
  },
  async fetchCharacterById(id: string) {
    const response = await apiClient.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
  }
};