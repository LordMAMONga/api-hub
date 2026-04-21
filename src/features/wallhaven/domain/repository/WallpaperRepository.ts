import type { Wallpaper } from "../model/Wallpaper";
import type { WallpaperFilters } from "../model/WallpaperFilters";

export interface WallpaperRepository {
  searchWallpapers(
    filters: WallpaperFilters,
    page?: number,
  ): Promise<Wallpaper[]>;
}
