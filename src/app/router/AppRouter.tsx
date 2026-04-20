import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";

// --- ИМПОРТЫ ЭКРАНОВ ИЗ ИЗОЛИРОВАННЫХ ФИЧ (FEATURES) ---

// 1. Pokedex (Разработчик 1)
import { PokemonListScreen } from "../../features/pokedex/ui/screens/PokemonListScreen";
import { PokemonDetailScreen } from "../../features/pokedex/ui/screens/PokemonDetailScreen";

// 2. Anime Database (Т)
import { AnimePage } from "../../features/jikan/ui/AnimePage";
import { AnimeDetailScreen } from "../../features/jikan/ui/screens/AnimeDetailScreen/AnimeDetailScreen";

// 3. anime cast — Используем ваши текущие файлы
import { MaxDriverPage } from "../../features/football-standings/ui/screens/MaxDriverPage";
import { DriverDetailScreen } from "../../features/football-standings/ui/screens/DriverDetailScreen";

// --- ГЛАВНОЕ МЕНЮ (HUB) ---
const HomePage = () => (
  <div style={{ padding: "40px", color: "white", background: "#111", minHeight: "100vh" }}>
    <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>API Hub 🌐</h1>
    <p style={{ opacity: 0.7, fontSize: "1.2rem", marginBottom: "30px" }}>
      Выберите проект команды (строгая изоляция FSD):
    </p>
    
    <ul style={{ fontSize: "20px", lineHeight: "2.5", listStyle: "none", padding: 0 }}>
      <li>
        <Link to="/pokemon" style={{ color: "#ffcb05", textDecoration: "none" }}>
          📁 1. Pokedex (Разработчик 1)
        </Link>
      </li>
      <li>
        <Link to="/anime" style={{ color: "#ff99cc", textDecoration: "none" }}>
          📁 2. Anime Database (Т)
        </Link>
      </li>
      <li>
        {/* ЗАМЕНЕНО: Теперь ведет на футбол */}
        <Link to="/rick" style={{ color: "#00ff00", textDecoration: "none", fontWeight: "bold" }}>
          ⚽ 3. rick and morty (Адилет)
        </Link>
      </li>
      {/* Ссылка на новый проект */}
      <li>
        <Link to="/spacex" style={{ color: "#005288", textDecoration: "none" }}>
          🚀 4. SpaceX Missions (Новый проект)
        </Link>
      </li>
    </ul>
  </div>
);


// --- ГЛОБАЛЬНЫЙ МАРШРУТИЗАТОР ---
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        {/* --- РОУТЫ POKEMON --- */}
        <Route path="pokemon">
          <Route index element={<PokemonListScreen />} />
          <Route path=":name" element={<PokemonDetailScreen />} />
        </Route>

        {/* --- РОУТЫ ANIME --- */}
        <Route path="anime">
          <Route index element={<AnimePage />} />
          <Route path=":id" element={<AnimeDetailScreen />} />
        </Route>

        {/* --- РОУТЫ FOOTBALL (ЗАМЕНЕНО ИЗ F1) --- */}
        <Route path="football">
          <Route index element={<MaxDriverPage />} />
          {/* Используем :id для перехода к деталям команды */}
          <Route path=":id" element={<DriverDetailScreen />} />
        </Route>

      </Route>
    </Routes>
  );
};