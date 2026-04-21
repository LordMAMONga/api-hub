import type { WallpaperFilters } from "../../domain/model/WallpaperFilters";

interface FilterBarProps {
  filters: WallpaperFilters;
  onFilterChange: (newFilters: WallpaperFilters) => void;
  onSearch: () => void;
}

export const WallpaperFilterBar = ({
  filters,
  onFilterChange,
  onSearch,
}: FilterBarProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        background: "#1a1b23",
        padding: "20px",
        borderRadius: "16px",
        marginBottom: "30px",
      }}
    >
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="Поиск (Jujutsu, Cyberpunk...)"
        style={{
          flex: "1 1 200px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #2d2e3b",
          background: "#0f1014",
          color: "white",
        }}
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #2d2e3b",
          background: "#0f1014",
          color: "white",
        }}
      >
        <option value="111">Все категории</option>
        <option value="010">Только Аниме</option>
        <option value="100">Обычные (Фото)</option>
      </select>

      <select
        name="resolution"
        value={filters.resolution}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #2d2e3b",
          background: "#0f1014",
          color: "white",
        }}
      >
        <option value="">Любое разрешение</option>
        <option value="1920x1080">1920x1080 (FHD)</option>
        <option value="2560x1440">2560x1440 (2K)</option>
        <option value="3840x2160">3840x2160 (4K)</option>
      </select>

      <select
        name="sorting"
        value={filters.sorting}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #2d2e3b",
          background: "#0f1014",
          color: "white",
        }}
      >
        <option value="toplist">Популярные</option>
        <option value="hot">В тренде</option>
        <option value="date_added">Новые</option>
        <option value="random">Случайные</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "10px 24px",
          borderRadius: "8px",
          border: "none",
          background: "#6366f1",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Найти
      </button>
    </form>
  );
};
