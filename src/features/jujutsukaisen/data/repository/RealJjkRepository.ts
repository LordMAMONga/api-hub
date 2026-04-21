import type { JjkRepository } from "../../domain/repository/JjkRepository";
import type { JjkCharacter } from "../../domain/model/JjkCharacter";
import type { JikanJjkDto } from "../model/JjkCharacterDto";
import { mapJjkDtoToDomain } from "../mappers/JjkMapper";

interface JikanResponse {
  data: JikanJjkDto[];
}

export class RealJjkRepository implements JjkRepository {
  async getCharacters(): Promise<JjkCharacter[]> {
    const response = await fetch(
      "https://api.jikan.moe/v4/manga/113138/characters",
    );

    if (!response.ok) {
      throw new Error("Барьер не пропущен. Ошибка API Токийского Техникума.");
    }

    const json: JikanResponse = await response.json();

    return json.data.map(mapJjkDtoToDomain);
  }
}

export const jjkRepository = new RealJjkRepository();
