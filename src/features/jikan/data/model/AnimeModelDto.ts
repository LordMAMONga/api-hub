export interface AnimeModelDto {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    webp?: { large_image_url: string };
    jpg?: { large_image_url: string };
  };
  score?: number;
  genres?: { name: string }[];
  status?: string;
  year?: number;
  synopsis?: string;
  episodes?: number;
  rating?: string;
  studios?: { name: string }[];
  trailer?: { url: string };
}
