import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <header
        style={{
          padding: "15px 30px",
          backgroundColor: "#20232a",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          position: "relative",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h2 style={{ margin: 0 }}>🌐 API Hub</h2>
          <nav style={{ display: "flex", gap: "15px" }}>
            <Link
              to="/"
              style={{
                color: "#61dafb",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Меню фич
            </Link>
          </nav>
        </div>
        <div style={{ fontSize: "14px", opacity: 0.7 }}>
          Команда из 5 человек
        </div>
      </header>

      <main style={{ flex: 1, padding: "30px", backgroundColor: "#f5f6fa" }}>
        <Outlet />
      </main>
    </div>
  );
};
