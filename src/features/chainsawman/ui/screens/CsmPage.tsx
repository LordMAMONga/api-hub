import { useCsmCharacters } from "../hooks/useCsmCharacters";
import { CharacterCard } from "../components/CharacterCard/CharacterCard";
import "./CsmPage.css";

export const CsmPage = () => {
  const {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useCsmCharacters();

  return (
    <div className="csm-layout">
      <div className="noise-overlay"></div>

      <div className="csm-container">
        <header className="csm-header">
          <h1 className="csm-title">DEVIL HUNTERS</h1>
          <p className="csm-subtitle">
            Public Safety Database // Restricted Access
          </p>
          <div className="csm-warning-bar"></div>
        </header>

        {error && <div className="csm-error">ERROR: {error}</div>}

        {loading ? (
          <div className="csm-loader">
            <span className="loader-text">ESTABLISHING CONTRACT...</span>
          </div>
        ) : (
          <>
            <div className="csm-grid">
              {characters.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="csm-pagination">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="csm-btn"
                >
                  &lt; НАЗАД
                </button>

                <span className="csm-page-info">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="csm-btn"
                >
                  ВПЕРЕД &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
