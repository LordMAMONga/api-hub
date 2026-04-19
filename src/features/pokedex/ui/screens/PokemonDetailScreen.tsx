import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { FactLoader } from "../../../../core/components/FactLoader";
import "./PokemonDetail.css";

const BG_COLORS: Record<string, string> = {
  grass: "#48D0B0",
  fire: "#FB6C6C",
  water: "#76BDFE",
  electric: "#FFCE4B",
  normal: "#B5B9C4",
  poison: "#9F5BBA",
  bug: "#8BD674",
  ground: "#D78555",
  fairy: "#EBA8C3",
  fighting: "#EB4971",
  psychic: "#FF6568",
  rock: "#D4C294",
  ghost: "#8571BE",
  ice: "#91D9E5",
  dragon: "#7383B9",
  dark: "#6F6E78",
  steel: "#4C91B2",
  flying: "#83A2E3",
};

export const PokemonDetailScreen = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, isLoading, error } = usePokemonDetail(name);

  if (isLoading) return <FactLoader facts={["Собираем Бенто-бокс..."]} />;
  if (error || !pokemon)
    return (
      <div className="detail-page-wrapper">
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>{error}</h1>
      </div>
    );

  const mainColor = BG_COLORS[pokemon.types[0]] || "#777";

  const playCry = () => {
    if (pokemon.soundUrl) {
      const audio = new Audio(pokemon.soundUrl);
      audio.volume = 0.5;
      audio.play();
    }
  };

  return (
    <div className="detail-page-wrapper">
      <div className="bento-container">
        <header className="bento-header">
          <button onClick={() => navigate(-1)} className="bento-back-btn">
            ← Назад
          </button>
          <h1 className="bento-title">
            <span style={{ opacity: 0.3, marginRight: "10px" }}>
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            {pokemon.name}
          </h1>
        </header>

        <div className="bento-grid">
          <div className="bento-box bento-image-card">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "200px",
                height: "200px",
                background: mainColor,
                filter: "blur(80px)",
                opacity: 0.5,
                zIndex: 1,
              }}
            />
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="bento-image"
            />
            <button
              onClick={playCry}
              style={{
                marginTop: "30px",
                padding: "12px 30px",
                borderRadius: "16px",
                border: "none",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                zIndex: 2,
                backdropFilter: "blur(10px)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
            >
              Прослушать крик 🔊
            </button>
          </div>

          <div className="bento-right-col">
            <div className="bento-box">
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
              >
                {pokemon.types.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: BG_COLORS[t] || "#777",
                      color: "white",
                      padding: "6px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Рост</span>
                  <span className="info-value">{pokemon.height / 10} m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Вес</span>
                  <span className="info-value">{pokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>

            <div className="bento-box">
              <span className="info-label" style={{ marginBottom: "10px" }}>
                Запись в Покедексе
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#d1d1d6",
                }}
              >
                {pokemon.description}
              </p>
            </div>

            <div className="bento-box">
              <span className="info-label" style={{ marginBottom: "15px" }}>
                Базовые Характеристики
              </span>
              {Object.entries(pokemon.stats).map(([label, value]) => (
                <div key={label} className="stat-row">
                  <span className="stat-label">
                    {label.replace("special", "Sp. ")}
                  </span>
                  <span
                    style={{
                      width: "30px",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {value}
                  </span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${Math.min((value / 255) * 100, 100)}%`,
                        backgroundColor: mainColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
