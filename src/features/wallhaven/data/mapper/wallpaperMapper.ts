import type { Wallpaper } from "../../domain/model/Wallpaper";
import type { WallpaperDto } from "../model/WallpaperDto";

export const mapToWallpaper = (dto: WallpaperDto): Wallpaper => ({
  id: dto.id,
  fullImageUrl: dto.path,
  thumbnailUrl: dto.thumbs.large,
  resolution: dto.resolution,
  category: dto.category,
});
