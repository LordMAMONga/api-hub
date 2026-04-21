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

import { JjkPage } from "../../features/jujutsukaisen/ui/screens/JjkPage";

import "./HomePage.css";

import {
  Smartphone, // Для Покедекса
  Library, // Для базы Аниме
  Anchor, // Для Ван Пис
  Gamepad2, // Для Игр
  Monitor, // Для Обоев
  Cat, // Для Котов
  FlaskConical, // Для Рика и Морти
  MessageSquareQuote, // Для Цитат
  Axe, // Для Бензопилы
  Zap, // Для Магички
} from "lucide-react";

import "./HomePage.css";

const projects = [
  {
    id: 1,
    title: "Pokedex",
    author: "Dermisell",
    path: "/pokemon",
    icon: <Smartphone size={28} strokeWidth={1.5} />,
    color: "#ef4444",
    docUrl: "https://pokeapi.co/docs/v2",
  },
  {
    id: 2,
    title: "Anime Database",
    author: "MAMON",
    path: "/anime",
    icon: <Library size={28} strokeWidth={1.5} />,
    color: "#8b5cf6",
    docUrl: "https://docs.api.jikan.moe/",
  },
  {
    id: 3,
    title: "One Piece Wiki",
    author: "mexqut",
    path: "/onepiece",
    icon: <Anchor size={28} strokeWidth={1.5} />,
    color: "#0ea5e9",
    docUrl: "https://api-onepiece.com/en/documentation",
  },
  {
    id: 4,
    title: "Video Games",
    author: "MAMON",
    path: "/games",
    icon: <Gamepad2 size={28} strokeWidth={1.5} />,
    color: "#10b981",
    docUrl: "https://api.rawg.io/docs/",
  },
  {
    id: 5,
    title: "Desktop Customizer",
    author: "MAMON",
    path: "/wallpaper",
    icon: <Monitor size={28} strokeWidth={1.5} />,
    color: "#ec4899",
    docUrl: "https://wallhaven.cc/help/api",
  },
  {
    id: 6,
    title: "Cats Universe",
    author: "Emir",
    path: "/cats",
    icon: <Cat size={28} strokeWidth={1.5} />,
    color: "#f59e0b",
    docUrl: "https://thecatapi.com/",
  },
  {
    id: 7,
    title: "Rick and Morty",
    author: "Adik.aep",
    path: "/rick",
    icon: <FlaskConical size={28} strokeWidth={1.5} />,
    color: "#22c55e",
    docUrl: "https://rickandmortyapi.com/",
  },
  {
    id: 8,
    title: "Anime Quotes",
    author: "MAMON",
    path: "/quote",
    icon: <MessageSquareQuote size={28} strokeWidth={1.5} />,
    color: "#a855f7",
    docUrl: "https://animechan.io/docs",
  },
  {
    id: 9,
    title: "Chainsaw Man",
    author: "MAMON",
    path: "/chainsawman",
    icon: <Axe size={28} strokeWidth={1.5} />,
    color: "#dc2626",
    docUrl: "https://docs.api.jikan.moe/",
  },
  {
    id: 10,
    title: "Jujutsu Kaisen",
    author: "MAMON",
    path: "/jujutsukaisen",
    icon: <Zap size={28} strokeWidth={1.5} />,
    color: "#3b82f6",
    docUrl: "https://docs.api.jikan.moe/",
  },
];

const HomePage = () => (
  <div className="hub-dashboard">
    <div className="dashboard-header">
      <h1 className="dashboard-title">API Hub</h1>
      <p className="dashboard-subtitle">
        Коллекция интеграций REST API и сложных интерфейсов
      </p>
    </div>

    <div className="projects-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          style={{ "--project-color": project.color } as React.CSSProperties}
        >
          <div className="project-card-header">
            <div
              className="project-icon-wrapper"
              style={{
                backgroundColor: `${project.color}15`,
                color: project.color,
                boxShadow: `0 0 20px ${project.color}20`,
              }}
            >
              {project.icon}
            </div>
            <a
              href={project.docUrl}
              target="_blank"
              rel="noreferrer"
              className="doc-badge"
              title="Открыть документацию API"
            >
              API Docs ↗
            </a>
          </div>

          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-author-box">
              <span className="author-label">Developer:</span>
              <span className="author-name">{project.author}</span>
            </div>
          </div>

          <Link to={project.path} className="project-launch-btn">
            Запустить
            <span className="launch-arrow">→</span>
          </Link>
        </div>
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

        <Route path="jujutsukaisen">
          <Route index element={<JjkPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
