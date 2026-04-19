import type { AnimeListItem } from "./AnimeListItem";

export interface AnimePage {
  data: AnimeListItem[];
  hasNextPage: boolean;
}
