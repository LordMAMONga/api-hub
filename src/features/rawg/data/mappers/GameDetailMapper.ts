import type { GameDetail } from "../../domain/model/GameDetail";
import type { GameDetailDto } from "../model/GameDetailDto";
import { mapToGameListItem } from "./GameListItemMapper";

export const mapToGameDetail = (dto: GameDetailDto): GameDetail => {
  return {
    ...mapToGameListItem(dto),
    description: dto.description_raw || "Описание отсутствует.",
    developers: dto.developers ? dto.developers.map((d) => d.name) : [],
    publishers: dto.publishers ? dto.publishers.map((p) => p.name) : [],
    esrbRating: dto.esrb_rating ? dto.esrb_rating.name : null,
    website: dto.website || null,
  };
};
