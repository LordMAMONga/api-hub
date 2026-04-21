import type { CsmRepository } from "../../domain/repository/CsmRepository";
import type { Character } from "../../domain/model/Character";
import type { CharacterResponse } from "../model/CharacterDto";
import { mapJikanDtoToDomain } from "../mappers/CsmMapper";

export class RealCsmRepository implements CsmRepository {
  async getCharacters(): Promise<Character[]> {
    const response = await fetch(
      "https://api.jikan.moe/v4/manga/116778/characters",
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные");
    }

    const json: CharacterResponse = await response.json();

    return json.data.map(mapJikanDtoToDomain);
  }
}

export const csmRepository = new RealCsmRepository();
