import { useRef, useCallback } from "react";
import { useGamesList } from "../hooks/useGamesList";
import { GameCard } from "../components/GameCard";
import { Spinner } from "../../../../core/components/Spinner";
import { useNavigate } from "react-router-dom";

export const GamesPage = () => {
  const navigate = useNavigate();
  const { games, isLoading, isFetchingNext, error, hasMore, loadMore } =
    useGamesList();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastGameElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNext) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNext, hasMore, loadMore],
  );

  return (
    <>
      <style>
        {`
          body { background-color: #0f1014 !important; }
          *:has(> #games-root), *:has(> * > #games-root) {
            background-color: #0f1014 !important; padding: 0 !important; margin: 0 !important;
          }
          .game-card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        `}
      </style>

      <div
        id="games-root"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f1014",
          color: "white",
          padding: "30px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{ fontSize: "36px", marginBottom: "10px", fontWeight: 800 }}
          >
            🎮 Video Games
          </h1>
          <p style={{ color: "#8b8b9a", marginBottom: "30px" }}>
            Powered by RAWG API
          </p>

          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "100px",
              }}
            >
              <Spinner />
            </div>
          )}
          {error && (
            <div
              style={{ color: "#fb6c6c", textAlign: "center", padding: "40px" }}
            >
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "24px",
              }}
            >
              {games.map((game, index) => {
                if (games.length === index + 1) {
                  return (
                    <div
                      ref={lastGameElementRef}
                      key={game.id}
                      className="game-card-hover"
                      onClick={() => navigate(`/games/${game.id}`)}
                    >
                      <GameCard game={game} />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={game.id}
                      className="game-card-hover"
                      onClick={() => navigate(`/games/${game.id}`)}
                    >
                      <GameCard game={game} />
                    </div>
                  );
                }
              })}
            </div>
          )}

          {isFetchingNext && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px 0",
              }}
            >
              <Spinner />
            </div>
          )}

          {!hasMore && !isLoading && (
            <div
              style={{
                textAlign: "center",
                color: "#8b8b9a",
                padding: "40px 0",
              }}
            >
              Вы просмотрели все игры!
            </div>
          )}
        </div>
      </div>
    </>
  );
};
