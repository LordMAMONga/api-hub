import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../core/hooks/useTitle";
import { useDrivers } from "../hooks/useDrivers";

export const MaxDriverPage = () => {
  useTitle("Portal Hub");

  const { teams, loading, loadingMore, hasMore, loadMore } = useDrivers();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loadingMore) {
          loadMore();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore, loadMore]);

  if (loading && teams.length === 0) {
    return (
      <div
        style={{
          color: "#97ce4c",
          textAlign: "center",
          padding: "100px",
          background: "#202329",
          minHeight: "100vh",
        }}
      >
        <h2>OPENING PORTAL...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#202329",
        minHeight: "100vh",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          color: "#97ce4c",
          fontSize: "2.5rem",
          marginBottom: "30px",
          fontFamily: "monospace",
        }}
      >
        MULTIVERSE DIRECTORY
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {teams.map((char) => (
          <Link
            to={`/rick/${char.id}`}
            key={char.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#3c3e44",
                borderRadius: "10px",
                overflow: "hidden",
                borderBottom: "4px solid #97ce4c",
              }}
            >
              <img
                src={char.logo}
                alt={char.name}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{char.name}</h3>
                <p
                  style={{
                    color: char.stadium === "Alive" ? "#55cc44" : "#d63d2e",
                    margin: 0,
                  }}
                >
                  ● {char.stadium}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loadingMore && (
        <div
          style={{
            textAlign: "center",
            color: "#97ce4c",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h3>Загружаем еще...</h3>
        </div>
      )}
    </div>
  );
};
