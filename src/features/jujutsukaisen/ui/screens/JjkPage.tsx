import { useJjkCharacters } from "../hooks/useJjkCharacters";
import { JjkCard } from "../componets/JjkCard/JjkCard";
import "./JjkPage.css";

export const JjkPage = () => {
  const {
    characters,
    loading,
    error,
    activeFilter,
    setActiveFilter,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useJjkCharacters();

  const filterOptions = [
    "All",
    "Special Grade",
    "Grade 1",
    "Grade 2",
    "Curse / Other",
  ];

  return (
    <div className="jjk-layout">
      <div className="jjk-container">
        <header className="jjk-header">
          <h1 className="jjk-title">JUJUTSU ARCHIVE</h1>
          <p className="jjk-subtitle">
            Tokyo Metropolitan Curse Technical College
          </p>
        </header>

        <div className="jjk-filters">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`jjk-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {error && (
          <div className="jjk-error">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="jjk-loader">
            <div className="jjk-spinner"></div>
            <p>SUMMONING...</p>
          </div>
        ) : (
          <>
            {characters.length === 0 && !error ? (
              <div className="jjk-empty">В этой категории нет данных.</div>
            ) : (
              <div className="jjk-grid">
                {characters.map((char) => (
                  <JjkCard key={char.id} character={char} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="jjk-pagination">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="jjk-page-btn"
                >
                  PREV
                </button>
                <span className="jjk-page-info">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="jjk-page-btn"
                >
                  NEXT
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
