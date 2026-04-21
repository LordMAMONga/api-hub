import { useParams, useNavigate } from "react-router-dom";
import { useGameDetail } from "../hooks/useGameDetail";
import { Spinner } from "../../../../core/components/Spinner";

export const GameDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { game, isLoading, error } = useGameDetail(id);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0f1014",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div
        style={{
          padding: "100px",
          textAlign: "center",
          color: "#fb6c6c",
          backgroundColor: "#0f1014",
          height: "100vh",
        }}
      >
        <h2>Ошибка</h2>
        <p>{error || "Игра не найдена"}</p>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          body { background-color: #0f1014 !important; }
          *:has(> #game-detail-root), *:has(> * > #game-detail-root) {
            background-color: #0f1014 !important; padding: 0 !important; margin: 0 !important;
          }
          .back-btn {
            background: rgba(255, 255, 255, 0.1); border: none; color: white;
            padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.2s;
            display: flex; align-items: center; gap: 8px; font-weight: bold;
          }
          .back-btn:hover { background: rgba(255, 255, 255, 0.2); }
        `}
      </style>

      <div
        id="game-detail-root"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f1014",
          color: "white",
          position: "relative",
        }}
      >
        {/* Эпичный задний фон с размытием */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "400px",
            backgroundImage: `url(${game.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.3)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "30px 20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            style={{ marginBottom: "30px" }}
          >
            ← Вернуться к списку
          </button>

          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {/* Левая колонка: Постер */}
            <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
              <img
                src={game.imageUrl}
                alt={game.name}
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                }}
              />
            </div>

            {/* Правая колонка: Инфа */}
            <div style={{ flex: "2 1 500px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#2d2e3b",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  📅 {game.released}
                </span>
                {game.metacritic && (
                  <span
                    style={{
                      background: "rgba(99,255,100,0.1)",
                      color: "#4ade80",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ Metacritic: {game.metacritic}
                  </span>
                )}
                {game.esrbRating && (
                  <span
                    style={{
                      border: "1px solid #8b8b9a",
                      color: "#8b8b9a",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {game.esrbRating}
                  </span>
                )}
              </div>

              <h1
                style={{
                  fontSize: "48px",
                  margin: "0 0 20px 0",
                  lineHeight: "1.1",
                  fontWeight: 800,
                }}
              >
                {game.name}
              </h1>

              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {game.genres.map((g) => (
                  <span
                    key={g}
                    style={{
                      background: "#6366f1",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div
                style={{
                  background: "#1a1b23",
                  padding: "20px",
                  borderRadius: "16px",
                  marginBottom: "30px",
                }}
              >
                <p style={{ margin: "0 0 10px 0", color: "#8b8b9a" }}>
                  <strong>Разработчик:</strong>{" "}
                  {game.developers.join(", ") || "Неизвестно"}
                </p>
                <p style={{ margin: 0, color: "#8b8b9a" }}>
                  <strong>Издатель:</strong>{" "}
                  {game.publishers.join(", ") || "Неизвестно"}
                </p>
              </div>

              <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>
                Об игре
              </h3>
              <div
                style={{
                  color: "#d4d4d8",
                  lineHeight: "1.8",
                  fontSize: "16px",
                }}
                dangerouslySetInnerHTML={{ __html: game.description }} // RAWG присылает текст с <p> и <br>, так мы их рендерим
              />

              {game.website && (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "30px",
                    padding: "12px 24px",
                    background: "white",
                    color: "black",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  🌐 Официальный сайт
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
