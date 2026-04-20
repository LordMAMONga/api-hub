export interface WallpaperDto {
  id: string;
  path: string;
  resolution: string;
  category: string;
  thumbs: {
    large: string;
    original: string;
    small: string;
  };
}
