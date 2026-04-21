import type { GameListItem } from "./GameListItem";

export interface GameDetail extends GameListItem {
  description: string;
  developers: string[];
  publishers: string[];
  esrbRating: string | null;
  website: string | null;
}
