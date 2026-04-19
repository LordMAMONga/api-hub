import type { GameListItem } from "../../domain/model/GameListItem";
import type { GameListItemDto } from "../model/GameListItemDto";

export const mapToGameListItem = (dto: GameListItemDto): GameListItem => {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.background_image || "",
    metacritic: dto.metacritic,
    released: dto.released ? dto.released.substring(0, 4) : "N/A",
    genres: dto.genres ? dto.genres.map((g) => g.name) : [],
    platforms: dto.parent_platforms
      ? dto.parent_platforms.map((p) => p.platform.name)
      : [],
  };
};
