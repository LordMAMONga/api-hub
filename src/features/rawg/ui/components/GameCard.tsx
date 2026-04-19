import type { GameListItem } from "../../domain/model/GameListItem";

interface GameCardProps {
  game: GameListItem;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div
      style={{
        background: "#1a1b23",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={game.imageUrl}
        alt={game.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <div
        style={{
          padding: "16px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "#8b8b9a" }}>
            {game.released}
          </span>
          {game.metacritic && (
            <span
              style={{
                background: "rgba(99,255,100,0.1)",
                color: "#4ade80",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                border: "1px solid rgba(99,255,100,0.2)",
              }}
            >
              {game.metacritic}
            </span>
          )}
        </div>
        <h3
          style={{ margin: "0 0 12px 0", fontSize: "18px", lineHeight: "1.2" }}
        >
          {game.name}
        </h3>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          {game.platforms.slice(0, 3).map((platform) => (
            <span
              key={platform}
              style={{
                fontSize: "10px",
                background: "#2d2e3b",
                padding: "4px 8px",
                borderRadius: "8px",
                color: "#a1a1aa",
              }}
            >
              {platform}
            </span>
          ))}
          {game.platforms.length > 3 && (
            <span
              style={{ fontSize: "10px", color: "#8b8b9a", padding: "4px" }}
            >
              +{game.platforms.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
