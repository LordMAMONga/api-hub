import { useState, useEffect } from "react";
import { useTitle } from "../../../core/hooks/useTitle";
import { AnimeTabs } from "./components/AnimeTabs/AnimeTabs";
import { AnimeListScreen } from "./screens/AnimeListScreen/AnimeListScreen";
import type { AnimeCategory } from "./hooks/useAnimeList";
import { AnimeRandomScreen } from "./screens/AnimeRandomScreen/AnimeRandomScreen";

export const AnimePage = () => {
  useTitle("Anime Database");
  const [activeTab, setActiveTab] = useState<AnimeCategory | "random">(
    "ongoing",
  );

  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0d0d12";

    const animeRoot = document.getElementById("anime-feature-root");
    const parentContainer = animeRoot?.parentElement;

    let originalPadding = "";
    let originalBg = "";

    if (parentContainer) {
      originalPadding = parentContainer.style.padding;
      originalBg = parentContainer.style.backgroundColor;

      parentContainer.style.padding = "0";
      parentContainer.style.backgroundColor = "#0d0d12";
    }

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      if (parentContainer) {
        parentContainer.style.padding = originalPadding;
        parentContainer.style.backgroundColor = originalBg;
      }
    };
  }, []);

  return (
    <div
      id="anime-feature-root"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d12",
        backgroundImage:
          "radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), linear-gradient(180deg, #0d0d12 0%, #1c1c21 100%)",
        color: "white",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <AnimeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <main>
          {activeTab === "ongoing" && <AnimeListScreen category="ongoing" />}
          {activeTab === "top" && <AnimeListScreen category="top" />}
          {activeTab === "catalog" && <AnimeListScreen category="catalog" />}

          {activeTab === "random" && <AnimeRandomScreen />}
        </main>
      </div>
    </div>
  );
};
