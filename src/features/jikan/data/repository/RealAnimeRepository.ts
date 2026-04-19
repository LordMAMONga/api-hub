import type { AnimePage } from "../../domain/model/AnimePage";
import type { AnimeDetail } from "../../domain/model/AnimeDetail";
import type { AnimeRepository } from "../../domain/repository/AnimeRepository";
import { AnimeMapper } from "../mappers/AnimeMapper";
import type { AnimeModelDto } from "../model/AnimeModelDto";

const BASE_URL = "https://api.jikan.moe/v4";

export class JikanAnimeRepository implements AnimeRepository {
  private async fetchApi(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Слишком много запросов секунду");
      }
      throw new Error(`Network error: ${response.status}`);
    }

    return response.json();
  }

  async getAnimeCatalog(page: number = 1): Promise<AnimePage> {
    const json = await this.fetchApi(`/anime?page=${page}&limit=24`);
    return {
      data: json.data.map((item: AnimeModelDto) =>
        AnimeMapper.toListItem(item),
      ),
      hasNextPage: json.pagination.has_next_page,
    };
  }

  async getTopAnime(page: number = 1): Promise<AnimePage> {
    const json = await this.fetchApi(`/top/anime?page=${page}&limit=24`);
    return {
      data: json.data.map((item: AnimeModelDto) =>
        AnimeMapper.toListItem(item),
      ),
      hasNextPage: json.pagination.has_next_page,
    };
  }

  async getOngoingAnime(page: number = 1): Promise<AnimePage> {
    const json = await this.fetchApi(`/seasons/now?page=${page}&limit=24`);
    return {
      data: json.data.map((item: AnimeModelDto) =>
        AnimeMapper.toListItem(item),
      ),
      hasNextPage: json.pagination.has_next_page,
    };
  }

  async getAnimeById(id: number): Promise<AnimeDetail> {
    const json = await this.fetchApi(`/anime/${id}/full`);
    return AnimeMapper.toDetail(json.data);
  }

  async getRandomAnime(): Promise<AnimeDetail> {
    const json = await this.fetchApi(`/random/anime`);
    return AnimeMapper.toDetail(json.data);
  }
}

export const animeRepository = new JikanAnimeRepository();
