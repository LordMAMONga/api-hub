import { useRef, useCallback, useEffect } from "react";
import { useTitle } from "../../../../core/hooks/useTitle";
import { FactLoader } from "../../../../core/components/FactLoader";
import { Spinner } from "../../../../core/components/Spinner";
import { usePokemonList } from "../hooks/usePokemonList";
import "./PokemonList.css";
import { useNavigate } from "react-router-dom";

const POKEMON_FACTS = [
  "А вы знали? Изначально главным маскотом покемонов должен был стать Клефейри, а не Пикачу.",
  "Настраиваем связь с серверами профессора Оука...",
  "Мьюту был искусственно создан из ДНК покемона Мью.",
  "Загружаем характеристики и скрытые способности...",
  "Слоупоку может потребоваться до 5 секунд, чтобы почувствовать боль от укуса в хвост.",
  "Раскладываем покеболы по полочкам...",
];

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

export const PokemonListScreen = () => {
  useTitle("Pokedex");
  const navigate = useNavigate();

  const {
    pokemons,
    isInitialLoading,
    isLoadingMore,
    error,
    hasMore,
    loadNextPage,
    saveScrollPosition,
    restoreScrollPosition,
  } = usePokemonList();

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoadingMore, hasMore, loadNextPage],
  );

  if (isInitialLoading) {
    return <FactLoader facts={POKEMON_FACTS} />;
  }

  if (error && pokemons.length === 0) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="pokedex-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Pokedex</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {pokemons.map((pokemon, index) => {
          const isLastElement = pokemons.length === index + 1;
          const bgColor = BG_COLORS[pokemon.types[0]] || "#B5B9C4";

          return (
            <div
              key={pokemon.id}
              ref={isLastElement ? lastPokemonRef : null}
              onClick={() => {
                saveScrollPosition();
                navigate(`/pokemon/${pokemon.name.toLowerCase()}`);
              }}
              style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: bgColor,
                borderRadius: "24px",
                padding: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "white",
                boxShadow: `0 10px 20px ${bgColor}50`,
                cursor: "pointer",
                opacity: 0,
                animation:
                  "slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                animationDelay: `${(index % 20) * 0.05}s`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 15px 30px ${bgColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = `0 10px 20px ${bgColor}50`;
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "-25px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  zIndex: 0,
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{ fontSize: "14px", fontWeight: "bold", opacity: 0.8 }}
                >
                  #{String(pokemon.id).padStart(3, "0")}
                </span>

                <h3
                  style={{
                    margin: "5px 0 15px 0",
                    fontSize: "22px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                  }}
                >
                  {pokemon.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        color: "#ffffff",
                        padding: "4px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        display: "inline-block",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  loading="lazy"
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.4))",
                    transform: "translate(10px, 10px)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {isLoadingMore && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "30px" }}
        >
          <Spinner />
        </div>
      )}

      {!hasMore && (
        <div style={{ textAlign: "center", padding: "30px", color: "#7f8c8d" }}>
          Вы поймали их всех! 🏆
        </div>
      )}
    </div>
  );
};
