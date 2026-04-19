import { useParams, useNavigate } from "react-router-dom";
import { useAnimeDetail } from "../../hooks/useAnimeDetail";
import { Spinner } from "../../../../../core/components/Spinner";
import "./AnimeDetailScreen.css";

export const AnimeDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { anime, isLoading, error } = useAnimeDetail(id);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#0d0d12",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          color: "#FB6C6C",
          backgroundColor: "#0d0d12",
          height: "100vh",
        }}
      >
        <h2>Ошибка</h2>
        <p>{error || "Аниме не найдено"}</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          body { background-color: #0d0d12 !important; }
          
          *:has(> #anime-detail-root),
          *:has(> * > #anime-detail-root) {
            background-color: #0d0d12 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        `}
      </style>

      <div
        id="anime-detail-root"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0d0d12",
          backgroundImage:
            "radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), linear-gradient(180deg, #0d0d12 0%, #1c1c21 100%)",
          color: "white",
          padding: "30px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="anime-detail-container"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <header className="anime-detail-header">
            <button onClick={() => navigate(-1)} className="back-btn">
              ← Назад
            </button>
            <h1 className="anime-detail-title">{anime.title}</h1>
          </header>

          <div className="bento-grid">
            <div className="bento-box bento-poster-box">
              <img
                src={anime.imageUrl}
                alt={anime.title}
                className="bento-main-poster"
              />
              <div
                style={{
                  textAlign: "center",
                  color: "#8b8b9a",
                  fontWeight: "bold",
                }}
              >
                Статус: {anime.status}
              </div>
              {anime.trailerUrl && (
                <a
                  href={anime.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-trailer-btn"
                >
                  ▶ Смотреть трейлер
                </a>
              )}
            </div>

            <div className="bento-box bento-stats-box">
              <div className="stat-item">
                <span className="stat-label">Оценка MAL</span>
                <span className="stat-value score">
                  ⭐ {anime.score || "N/A"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Год</span>
                <span className="stat-value">{anime.year || "N/A"}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Эпизоды</span>
                <span className="stat-value">{anime.episodes || "?"}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Возраст</span>
                <span className="stat-value" style={{ fontSize: "18px" }}>
                  {anime.rating}
                </span>
              </div>
            </div>

            <div className="bento-box bento-genres-box">
              <span className="stat-label">
                Студия:{" "}
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {anime.studios.join(", ") || "Неизвестно"}
                </span>
              </span>
              <div className="bento-genres-list">
                {anime.genres.map((genre) => (
                  <span key={genre} className="bento-genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-box bento-synopsis-box">
              <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>
                Описание
              </h3>
              <p className="bento-synopsis-text">{anime.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
