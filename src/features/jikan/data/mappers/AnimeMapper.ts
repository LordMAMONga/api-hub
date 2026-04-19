import type { AnimeListItem } from "../../domain/model/AnimeListItem";
import type { AnimeDetail } from "../../domain/model/AnimeDetail";
import type { AnimeModelDto } from "../model/AnimeModelDto";

export class AnimeMapper {
  static toListItem(dto: AnimeModelDto): AnimeListItem {
    return {
      id: dto.mal_id,
      title: dto.title_english || dto.title || "Unknown Title",
      imageUrl:
        dto.images?.webp?.large_image_url ||
        dto.images?.jpg?.large_image_url ||
        "",
      score: dto.score ?? null,
      genres: dto.genres?.map((g) => g.name) || [],
      status: dto.status || "Unknown",
      year: dto.year ?? null,
    };
  }

  static toDetail(dto: AnimeModelDto): AnimeDetail {
    return {
      ...this.toListItem(dto),
      synopsis: dto.synopsis || "Описание отсутствует.",
      episodes: dto.episodes ?? null,
      rating: dto.rating || "N/A",
      studios: dto.studios?.map((s) => s.name) || [],
      trailerUrl: dto.trailer?.url || null,
    };
  }
}
