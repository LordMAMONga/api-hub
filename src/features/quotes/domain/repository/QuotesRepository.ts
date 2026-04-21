import type { Quote } from "../model/Quote";

export interface QuotesRepository {
  getRandomQuote(): Promise<Quote>;
}
