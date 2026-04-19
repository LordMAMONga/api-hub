export interface GameListItem {
  id: number;
  name: string;
  imageUrl: string;
  metacritic: number | null;
  released: string;
  genres: string[];
  platforms: string[];
}
