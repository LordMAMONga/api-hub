import { useQuotes } from "../hooks/useQuotes";
import { QuoteCard } from "../components/QuoteCard/QuoteCard";
import { Loader } from "../components/Loader/Loader";
import "./QuotesPage.css";

export const QuotesPage = () => {
  const { quote, loading, error, fetchQuote } = useQuotes();

  return (
    <div className="quotes-layout">
      <div className="quotes-shell">
        <header className="quotes-header">
          <h1 className="quotes-heading">Anime Wisdom</h1>
          <div className="header-line"></div>
        </header>

        <main className="quotes-main">
          {error && <div className="quotes-error-box">{error}</div>}

          {loading ? <Loader /> : quote && <QuoteCard quote={quote} />}
        </main>

        <footer className="quotes-footer">
          <button
            className="refresh-button"
            onClick={fetchQuote}
            disabled={loading}
          >
            {loading ? "Призываем..." : "Следующая цитата"}
          </button>
        </footer>
      </div>
    </div>
  );
};
