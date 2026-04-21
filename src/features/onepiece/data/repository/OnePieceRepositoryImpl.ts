import { apiClient } from "../../../../core/api/apiClient";
import type { CharacterDto } from "../model/CharacterDto";
import { mapCharacterDtoToDomain } from "../mappers/characterMapper";
import type { IOnePieceRepository } from "../../domain/repository/IOnePieceRepository";
import type { Character } from "../../domain/model/Character";

export class OnePieceRepositoryImpl implements IOnePieceRepository {
  async getCharacters(): Promise<Character[]> {
    const response = await apiClient.get<CharacterDto[]>(
      "https://api.api-onepiece.com/v2/characters/en",
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Неверный формат данных");
    }

    return response.data.map(mapCharacterDtoToDomain);
  }
}
