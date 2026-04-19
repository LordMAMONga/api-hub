import type { AnimeDetail } from "../model/AnimeDetail";
import type { AnimePage } from "../model/AnimePage";

export interface AnimeRepository {
  getAnimeCatalog(page: number): Promise<AnimePage>;
  getTopAnime(page: number): Promise<AnimePage>;
  getOngoingAnime(page: number): Promise<AnimePage>;
  getAnimeById(id: number): Promise<AnimeDetail>;
  getRandomAnime(): Promise<AnimeDetail>;
}
