import type { AnimeListItem } from "./AnimeListItem";

export interface AnimeDetail extends AnimeListItem {
  synopsis: string;
  episodes: number | null;
  rating: string;
  studios: string[];
  trailerUrl: string | null;
}
