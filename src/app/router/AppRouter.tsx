import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "../../core/components/Layout";
import { PokemonListScreen } from "../../features/pokedex/ui/screens/PokemonListScreen";
import { PokemonDetailScreen } from "../../features/pokedex/ui/screens/PokemonDetailScreen";

const HomePage = () => (
  <div style={{ padding: "20px" }}>
    <h1>API Hub </h1>
    <p>Выберите проект:</p>
    <ul style={{ fontSize: "20px", lineHeight: "1.8" }}>
      <li>
        <Link to="/pokemon">1. Pokedex (Разработчик 1)</Link>
      </li>
      <li>
        <Link to="/weather">2. Weather Tracker (Разработчик 2)</Link>
      </li>
      <li>
        <Link to="/crypto">3. Crypto Dashboard (Разработчик 3)</Link>
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
        <Route path="/pokemon/:name" element={<PokemonDetailScreen />} />
      </Route>
    </Routes>
  );
};
