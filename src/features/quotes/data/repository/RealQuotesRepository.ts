import type { QuotesRepository } from "../../domain/repository/QuotesRepository";
import type { Quote } from "../../domain/model/Quote";
import type { QuoteDto } from "../model/QuoteDto";
import { mapQuoteDtoToDomain } from "../mappers/QuoteMapper";

export class RealQuotesRepository implements QuotesRepository {
  async getRandomQuote(): Promise<Quote> {
    const response = await fetch("https://api.animechan.io/v1/quotes/random");

    if (!response.ok) {
      throw new Error("Не удалось загрузить цитату с сервера");
    }

    const dto: QuoteDto = await response.json();
    return mapQuoteDtoToDomain(dto);
  }
}

export const quotesRepository = new RealQuotesRepository();
