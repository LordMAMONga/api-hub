import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";

import { PokemonListScreen } from "../../features/pokedex/ui/screens/PokemonListScreen";
import { PokemonDetailScreen } from "../../features/pokedex/ui/screens/PokemonDetailScreen";

import { AnimePage } from "../../features/jikan/ui/AnimePage";
import { AnimeDetailScreen } from "../../features/jikan/ui/screens/AnimeDetailScreen/AnimeDetailScreen";

import { GamesPage } from "../../features/rawg/ui/screen/GamesPage";
import { GameDetailScreen } from "../../features/rawg/ui/screen/GameDetailScreen";

import { CatsPage } from "../../features/cats/ui/screens/CatsPage";

const HomePage = () => (
  <div style={{ padding: "20px" }}>
    <h1>API Hub</h1>
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
      <li>
        <Link to="/games">5. Video Games Database (RAWG)</Link>
      </li>
    </ul>
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

        <Route path="cats" element={<CatsPage />} />

        <Route path="games">
          <Route index element={<GamesPage />} />
          <Route path=":id" element={<GameDetailScreen />} />
        </Route>
      </Route>
    </Routes>
  );
};
