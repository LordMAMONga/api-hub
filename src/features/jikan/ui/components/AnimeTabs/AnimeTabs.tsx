import type { AnimeCategory } from "../../hooks/useAnimeList";
import "./AnimeTabs.css";

interface AnimeTabsProps {
  activeTab: AnimeCategory | "random";
  onTabChange: (tab: AnimeCategory | "random") => void;
}

export const AnimeTabs = ({ activeTab, onTabChange }: AnimeTabsProps) => {
  return (
    <div className="anime-feature-tabs">
      <button
        className={`anime-tab-btn ${activeTab === "ongoing" ? "active" : ""}`}
        onClick={() => onTabChange("ongoing")}
      >
        🔥 Онгоинги
      </button>
      <button
        className={`anime-tab-btn ${activeTab === "top" ? "active" : ""}`}
        onClick={() => onTabChange("top")}
      >
        🏆 Топ Аниме
      </button>
      <button
        className={`anime-tab-btn ${activeTab === "catalog" ? "active" : ""}`}
        onClick={() => onTabChange("catalog")}
      >
        📚 Каталог
      </button>
      <button
        className={`anime-tab-btn ${activeTab === "random" ? "active" : ""}`}
        onClick={() => onTabChange("random")}
      >
        🎲 Рандом
      </button>
    </div>
  );
};
