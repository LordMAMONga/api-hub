import type{ Cat } from '../model/Cat';

export interface ICatsRepository {
  fetchRandomCats(limit: number): Promise<Cat[]>;
}