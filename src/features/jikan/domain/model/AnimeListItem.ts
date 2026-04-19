export interface AnimeListItem {
  id: number;
  title: string;
  imageUrl: string;
  score: number | null;
  genres: string[];
  status: string;
  year: number | null;
}
