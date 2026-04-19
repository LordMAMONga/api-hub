import type { GameListItemDto } from "./GameListItemDto";

export interface GameDetailDto extends GameListItemDto {
  description_raw: string;
  developers: Array<{ name: string }>;
  publishers: Array<{ name: string }>;
  esrb_rating: { name: string } | null;
  website: string;
}
