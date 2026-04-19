import { useNavigate } from "react-router-dom";
import { useRandomAnime } from "../../hooks/useRandomAnime";
import { AnimeCard } from "../../components/AnimeCard/AnimeCard";
import { Spinner } from "../../../../../core/components/Spinner";
import "./AnimeRandomScreen.css";

export const AnimeRandomScreen = () => {
  const { anime, isLoading, error, rollRandom } = useRandomAnime();
  const navigate = useNavigate();

  return (
    <div className="random-screen-container">
      <h2 className="random-title">Испытай удачу</h2>
      <p className="random-subtitle">
        Не знаешь, что посмотреть? Доверься рандому!
      </p>

      <button className="roll-btn" onClick={rollRandom} disabled={isLoading}>
        {isLoading ? "Крутим рулетку..." : "🎲 Выбить аниме"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {isLoading && (
        <div style={{ marginTop: "50px" }}>
          <Spinner />
        </div>
      )}

      {anime && !isLoading && (
        <div className="result-container">
          <AnimeCard
            anime={anime}
            onClick={() => navigate(`/anime/${anime.id}`)}
          />
        </div>
      )}
    </div>
  );
};
