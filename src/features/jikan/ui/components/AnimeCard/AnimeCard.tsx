import { forwardRef } from "react";
import type { AnimeListItem } from "../../../domain/model/AnimeListItem";
import "./AnimeCard.css";

interface AnimeCardProps {
  anime: AnimeListItem;
  onClick: () => void;
}

export const AnimeCard = forwardRef<HTMLDivElement, AnimeCardProps>(
  ({ anime, onClick }, ref) => {
    return (
      <div ref={ref} className="anime-card" onClick={onClick}>
        <div className="anime-card-poster-wrapper">
          <img
            src={anime.imageUrl}
            alt={anime.title}
            className="anime-card-poster"
            loading="lazy"
          />
          <div className="anime-card-overlay" />

          <div className="anime-card-badges">
            <span className="badge status">
              {anime.status === "Currently Airing" ? "🔥 Онгоинг" : "📺 TV"}
            </span>
            {anime.score && (
              <span className="badge score">⭐ {anime.score}</span>
            )}
          </div>
        </div>

        <div className="anime-card-content">
          <h3 className="anime-card-title">{anime.title}</h3>

          <div className="anime-card-meta">
            {anime.year && <span>{anime.year} г.</span>}
            <span>MAL</span>
          </div>

          <div className="anime-card-genres">
            {anime.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="genre-pill">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

AnimeCard.displayName = "AnimeCard";
