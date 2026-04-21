import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";

import { PokemonListScreen } from "../../features/pokedex/ui/screens/PokemonListScreen";
import { PokemonDetailScreen } from "../../features/pokedex/ui/screens/PokemonDetailScreen";
import { OnePiecePage } from "../../features/onepiece/ui/screens/OnePiecePage";
import { AnimePage } from "../../features/jikan/ui/AnimePage";
import { AnimeDetailScreen } from "../../features/jikan/ui/screens/AnimeDetailScreen/AnimeDetailScreen";

import { GamesPage } from "../../features/rawg/ui/screen/GamesPage";
import { GameDetailScreen } from "../../features/rawg/ui/screen/GameDetailScreen";

import { WallpapersPage } from "../../features/wallhaven/ui/screens/WallpapersPage";

import { CatsPage } from "../../features/cats/ui/screens/CatsPage";

import { DriverDetailScreen } from "../../features/football-standings/ui/screens/DriverDetailScreen";
import { MaxDriverPage } from "../../features/football-standings/ui/screens/MaxDriverPage";

const HomePage = () => (
  <div style={{ padding: "20px" }}>
    <h1>API Hub</h1>
    <p>Выберите проект:</p>
    <ul style={{ fontSize: "20px", lineHeight: "1.8" }}>
      <li>
        <Link to="/pokemon">1. Pokedex (Разработчик 1)</Link>
      </li>
      <li>
        <Link to="/anime">2. Anime Database (Разработчик 2)</Link>
      </li>
      <li>
        <Link to="/onepiece">3. One Piece (Разработчик 3)</Link>
      </li>
      <li>
        <Link to="/weather">4. Weather Tracker (Разработчик 4)</Link>
      </li>
      <li>
        <Link to="/crypto">5. Crypto Dashboard (Разработчик 5)</Link>
        <Link to="/cats">3. Cats</Link>
      </li>
      <li>
        <Link to="/rick">4. Rick and Morty</Link>
      </li>
      <li>
        <Link to="/games">5. Video Games Database (RAWG)</Link>
      </li>
      <li>
        <Link to="/wallpaper">3. Wallpapers</Link>
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
      </Route>
    </Routes>
  );
};