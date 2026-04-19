import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";

import { AnimePage } from "../../features/jikan/ui/AnimePage";
import { AnimeDetailScreen } from "../../features/jikan/ui/screens/AnimeDetailScreen/AnimeDetailScreen";

const HomePage = () => (
  <div style={{ padding: "20px" }}>
    <h1>API Hub </h1>
    <p>Выберите проект:</p>
    <ul style={{ fontSize: "20px", lineHeight: "1.8" }}>
      <li>
        <Link to="/pokemon">1. Pokedex (Разработчик 1)</Link>
      </li>
      <li>
        <Link to="/anime">2. Anime Database (Т)</Link>
      </li>
      <li>
        <Link to="/weather">3. Weather Tracker (Разработчик 2)</Link>
      </li>
      <li>
        <Link to="/crypto">4. Crypto Dashboard (Разработчик 3)</Link>
      </li>
    </ul>
  </div>
);

const PokemonScreenPlaceholder = () => (
  <div style={{ padding: "20px" }}>
    <h2>Тут будет крутой экран с Покемонами</h2>
    <Link to="/">⬅ Назад в меню</Link>
  </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="pokemon" element={<PokemonScreenPlaceholder />} />

        <Route path="anime">
          <Route index element={<AnimePage />} />
          <Route path=":id" element={<AnimeDetailScreen />} />
        </Route>
      </Route>
    </Routes>
  );
};
