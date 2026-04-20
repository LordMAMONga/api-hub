import type { WallpaperRepository } from "../../domain/repository/WallpaperRepository";
import type { Wallpaper } from "../../domain/model/Wallpaper";
import type { WallpaperFilters } from "../../domain/model/WallpaperFilters";
import { mapToWallpaper } from "../mapper/wallpaperMapper";

export class WallhavenRepository implements WallpaperRepository {
  private readonly baseUrl = "https://wallhaven.cc/api/v1";

  async searchWallpapers(
    filters: WallpaperFilters,
    page: number = 1,
  ): Promise<Wallpaper[]> {
    const url = new URL(`${this.baseUrl}/search`);

    if (filters.query) url.searchParams.append("q", filters.query);
    url.searchParams.append("categories", filters.category);

    if (filters.resolution)
      url.searchParams.append("resolutions", filters.resolution);

    url.searchParams.append("sorting", filters.sorting);
    url.searchParams.append("purity", "100");
    url.searchParams.append("page", page.toString());

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url.toString())}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Не удалось загрузить обои");

    const data = await response.json();
    return data.data.map(mapToWallpaper);
  }
}

export const wallpaperRepository = new WallhavenRepository();
