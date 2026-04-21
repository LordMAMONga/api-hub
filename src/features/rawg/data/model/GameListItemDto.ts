export interface GameListItemDto {
  id: number;
  name: string;
  background_image: string | null;
  metacritic: number | null;
  released: string | null;
  genres: Array<{ name: string }>;
  parent_platforms?: Array<{ platform: { name: string } }>;
}
