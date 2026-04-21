import type { Quote } from "../../../domain/model/Quote";
import "./QuoteCard.css";

interface QuoteCardProps {
  quote: Quote | null;
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
  if (!quote) return null;

  return (
    <div className="quote-card">
      <div className="quote-mark">"</div>
      <p className="quote-text">{quote.text}</p>
      <div className="quote-author">
        <span className="character">— {quote.character}</span>
        <span className="anime-name">{quote.anime}</span>
      </div>
    </div>
  );
};
