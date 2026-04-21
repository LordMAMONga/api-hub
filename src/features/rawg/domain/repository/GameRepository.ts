import type { GameListItem } from "../model/GameListItem";
import type { GameDetail } from "../model/GameDetail";

export interface GameRepository {
  getGamesList(page?: number): Promise<GameListItem[]>;
  getGameDetails(id: string | number): Promise<GameDetail>;
}
