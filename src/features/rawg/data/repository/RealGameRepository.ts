import type { GameRepository } from "../../domain/repository/GameRepository";
import type { GameListItem } from "../../domain/model/GameListItem";
import type { GameDetail } from "../../domain/model/GameDetail";
import { mapToGameListItem } from "../mappers/GameListItemMapper";
import { mapToGameDetail } from "../mappers/GameDetailMapper";

export class RealGameRepository implements GameRepository {
  private readonly baseUrl = "https://api.rawg.io/api";

  private get apiKey(): string {
    const key = import.meta.env.VITE_RAWG_API_KEY;
    if (!key) throw new Error("API ключ RAWG не найден в .env");
    return key;
  }

  async getGamesList(page: number = 1): Promise<GameListItem[]> {
    const response = await fetch(
      `${this.baseUrl}/games?key=${this.apiKey}&ordering=-added&page_size=20&page=${page}`,
    );

    if (!response.ok) throw new Error("Не удалось загрузить список игр");

    const data = await response.json();
    return data.results.map(mapToGameListItem);
  }

  async getGameDetails(id: string | number): Promise<GameDetail> {
    const response = await fetch(
      `${this.baseUrl}/games/${id}?key=${this.apiKey}`,
    );

    if (!response.ok) throw new Error("Не удалось загрузить детали игры");

    const data = await response.json();
    return mapToGameDetail(data);
  }
}

export const gameRepository = new RealGameRepository();
