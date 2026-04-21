import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: FC = () => {
  return (
    <div className="layout-wrapper">
      <header className="hub-header">
        <div className="header-left">
          {}
          <h2 className="hub-logo">
            <span className="logo-icon">🌐</span> API <span className="logo-highlight">Hub</span>
          </h2>
          
          {}
          <nav className="hub-nav">
            <Link to="/" className="nav-link">
              Меню фич
            </Link>
          </nav>
        </div>

        <div className="header-right">
          {}
          <div className="team-badge">
            <span className="pulse-dot"></span>
            Команда из 5 человек
          </div>
        </div>
      </header>

      {}
      <main className="hub-main">
        <Outlet />
      </main>
    </div>
  );
};