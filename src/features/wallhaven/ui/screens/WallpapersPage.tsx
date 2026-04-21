import { useRef, useCallback } from "react";
import { useWallpapers } from "../hooks/useWallpapers";
import { WallpaperFilterBar } from "../components/WallpaperFilterBar";
import { downloadImageLocally } from "../utils/downloadImage";
import { Spinner } from "../../../../core/components/Spinner";

export const WallpapersPage = () => {
  const {
    wallpapers,
    isLoading,
    isFetchingNext,
    error,
    hasMore,
    filters,
    setFilters,
    executeSearch,
    loadMore,
  } = useWallpapers();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNext) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNext, hasMore, loadMore],
  );

  return (
    <>
      <style>
        {`
          body { background-color: #0f1014 !important; }
          *:has(> #wallpapers-root), *:has(> * > #wallpapers-root) {
            background-color: #0f1014 !important; padding: 0 !important; margin: 0 !important;
          }
          .masonry-grid { column-count: 3; column-gap: 20px; }
          @media (max-width: 900px) { .masonry-grid { column-count: 2; } }
          @media (max-width: 600px) { .masonry-grid { column-count: 1; } }
          
          .masonry-item { break-inside: avoid; margin-bottom: 20px; position: relative; border-radius: 12px; overflow: hidden; background: #1a1b23; }
          .masonry-item img { width: 100%; display: block; transition: transform 0.3s ease; }
          .masonry-item:hover img { transform: scale(1.05); }
          
          .download-overlay { position: absolute; bottom: -60px; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 20px; display: flex; justify-content: space-between; align-items: flex-end; transition: bottom 0.3s ease; }
          .masonry-item:hover .download-overlay { bottom: 0; }
          .download-btn { background: #4ade80; color: #000; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
          .download-btn:hover { background: #22c55e; }
        `}
      </style>

      <div
        id="wallpapers-root"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f1014",
          color: "white",
          padding: "30px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{ fontSize: "36px", marginBottom: "20px", fontWeight: 800 }}
          >
            🎨 Desktop Customizer
          </h1>

          <WallpaperFilterBar
            filters={filters}
            onFilterChange={setFilters}
            onSearch={executeSearch}
          />

          {error && (
            <p
              style={{
                color: "#fb6c6c",
                textAlign: "center",
                padding: "20px",
                background: "rgba(251,108,108,0.1)",
                borderRadius: "12px",
              }}
            >
              {error}
            </p>
          )}

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "100px",
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div className="masonry-grid">
              {wallpapers.map((wp, index) => {
                const isLast = wallpapers.length === index + 1;

                return (
                  <div
                    key={wp.id}
                    ref={isLast ? lastElementRef : null}
                    className="masonry-item"
                  >
                    <img src={wp.thumbnailUrl} alt="wallpaper" loading="lazy" />
                    <div className="download-overlay">
                      <span
                        style={{
                          color: "#d4d4d8",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: "rgba(0,0,0,0.5)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {wp.resolution}
                      </span>
                      <button
                        className="download-btn"
                        onClick={() =>
                          downloadImageLocally(
                            wp.fullImageUrl,
                            `wallpaper-${wp.id}.jpg`,
                          )
                        }
                      >
                        Скачать ⬇
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isFetchingNext && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px 0",
              }}
            >
              <Spinner />
            </div>
          )}

          {!isLoading && wallpapers.length === 0 && !error && (
            <p
              style={{
                textAlign: "center",
                color: "#8b8b9a",
                marginTop: "50px",
              }}
            >
              Ничего не найдено. Попробуйте изменить фильтры.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
