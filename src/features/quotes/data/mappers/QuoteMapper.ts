import type { QuoteDto } from "../model/QuoteDto";
import type { Quote } from "../../domain/model/Quote";

export const mapQuoteDtoToDomain = (dto: QuoteDto): Quote => {
  return {
    anime: dto.data.anime.name,
    character: dto.data.character.name,
    text: dto.data.content,
  };
};
