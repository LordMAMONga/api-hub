import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";

import { PokemonListScreen } from "../../features/pokedex/ui/screens/PokemonListScreen";
import { PokemonDetailScreen } from "../../features/pokedex/ui/screens/PokemonDetailScreen";
import { OnePiecePage } from "../../features/onepiece/ui/screens/OnePiecePage";
import { AnimePage } from "../../features/jikan/ui/AnimePage";
import { AnimeDetailScreen } from "../../features/jikan/ui/screens/AnimeDetailScreen/AnimeDetailScreen";

import { GamesPage } from "../../features/rawg/ui/screen/GamesPage";
import { GameDetailScreen } from "../../features/rawg/ui/screen/GameDetailScreen";

import { CatsPage } from "../../features/cats/ui/screens/CatsPage";

import { WallpapersPage } from "../../features/wallhaven/ui/screens/WallpapersPage";

import { MaxDriverPage } from "../../features/football-standings/ui/screens/MaxDriverPage";
import { DriverDetailScreen } from "../../features/football-standings/ui/screens/DriverDetailScreen";

import { QuotesPage } from "../../features/quotes/ui/screens/QuotesPage";

import { CsmPage } from "../../features/chainsawman/ui/screens/CsmPage";

import "./HomePage.css";

const projects = [
  {
    id: 1,
    title: "Pokedex",
    author: "Разработчик 1",
    path: "/pokemon",
    icon: "🐾",
    color: "#ef4444",
  },
  {
    id: 2,
    title: "Anime Database",
    author: "Т",
    path: "/anime",
    icon: "⛩️",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "One Piece Wiki",
    author: "Разработчик 2",
    path: "/onepiece",
    icon: "🏴‍☠️",
    color: "#0ea5e9",
  },
  {
    id: 4,
    title: "Video Games Database",
    author: "RAWG",
    path: "/games",
    icon: "🎮",
    color: "#10b981",
  },
  {
    id: 5,
    title: "Desktop Customizer",
    author: "Wallhaven",
    path: "/wallpaper",
    icon: "🎨",
    color: "#ec4899",
  },
  {
    id: 6,
    title: "Cats Universe",
    author: "Разработчик 3",
    path: "/cats",
    icon: "🐱",
    color: "#f59e0b",
  },
  {
    id: 7,
    title: "Rick and Morty",
    author: "Т",
    path: "/rick",
    icon: "🧪",
    color: "#22c55e",
  },
  {
    id: 8,
    title: "Anime Quote",
    author: "Т",
    path: "/quote",
    icon: "🧪",
    color: "#22c55e",
  },
  {
    id: 9,
    title: "Cats Universe",
    author: "Разработчик 3",
    path: "/chainsawman",
    icon: "🐱",
    color: "#f59e0b",
  },
];

const HomePage = () => (
  <div className="hub-dashboard">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Добро пожаловать в API Hub</h1>
      <p className="dashboard-subtitle">Выберите проект для запуска:</p>
    </div>

    <div className="projects-grid">
      {projects.map((project) => (
        <Link
          to={project.path}
          key={project.id}
          className="project-card"
          style={{ "--hover-color": project.color } as React.CSSProperties}
        >
          <div
            className="project-icon-wrapper"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
            }}
          >
            {project.icon}
          </div>
          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-author">Код: {project.author}</p>
          </div>
          <div className="project-arrow" style={{ color: project.color }}>
            →
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="pokemon" element={<PokemonListScreen />} />
        <Route path="pokemon/:name" element={<PokemonDetailScreen />} />

        <Route path="anime">
          <Route index element={<AnimePage />} />
          <Route path=":id" element={<AnimeDetailScreen />} />
        </Route>

        <Route path="onepiece" element={<OnePiecePage />} />

        <Route path="cats" element={<CatsPage />} />

        <Route path="games">
          <Route index element={<GamesPage />} />
          <Route path=":id" element={<GameDetailScreen />} />
        </Route>

        <Route path="wallpaper">
          <Route index element={<WallpapersPage />} />
        </Route>

        <Route path="rick">
          <Route index element={<MaxDriverPage />} />
          <Route path=":id" element={<DriverDetailScreen />} />
        </Route>

        <Route path="quote">
          <Route index element={<QuotesPage />} />
        </Route>

        <Route path="chainsawman">
          <Route index element={<CsmPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
