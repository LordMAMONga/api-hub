import { useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeList, type AnimeCategory } from "../../hooks/useAnimeList";
import { AnimeCard } from "../../components/AnimeCard/AnimeCard";
import { Spinner } from "../../../../../core/components/Spinner";
import "./AnimeListScreen.css";

interface Props {
  category: AnimeCategory;
}

export const AnimeListScreen = ({ category }: Props) => {
  const navigate = useNavigate();
  const {
    animeList,
    isInitialLoading,
    isLoadingMore,
    error,
    hasMore,
    loadNextPage,
    saveScrollPosition,
    restoreScrollPosition,
  } = useAnimeList(category);

  useEffect(() => {
    restoreScrollPosition();
  }, [category, restoreScrollPosition]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadNextPage();
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, hasMore, loadNextPage],
  );

  if (isInitialLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "100px" }}
      >
        <Spinner />
      </div>
    );
  }

  if (error && animeList.length === 0) {
    return (
      <div style={{ color: "#FB6C6C", textAlign: "center", padding: "50px" }}>
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="anime-grid-container">
        {animeList.map((anime, index) => {
          const isLastElement = animeList.length === index + 1;
          return (
            <AnimeCard
              key={anime.id}
              ref={isLastElement ? lastElementRef : null}
              anime={anime}
              onClick={() => {
                saveScrollPosition();
                navigate(`/anime/${anime.id}`);
              }}
            />
          );
        })}
      </div>

      {isLoadingMore && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "30px" }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
};
