import { apiClient } from '../../../../core/api/apiClient';
import type { CharacterDto } from '../model/CharacterDto';
import { mapCharacterDtoToDomain } from '../mappers/characterMapper';
import type { IOnePieceRepository } from '../../domain/repository/IOnePieceRepository';
import type { Character } from '../../domain/model/Character';

// Строим прямую ссылку на изображение через стандартный паттерн Fandom wiki
const getWikiImageUrl = (name: string): string => {
  const formatted = name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('_');
  return `https://static.wikia.nocookie.net/onepiece/images/thumb/${formatted}_Anime_Post_Timeskip_Portrait.png/200px-${formatted}_Anime_Post_Timeskip_Portrait.png`;
};

export class OnePieceRepositoryImpl implements IOnePieceRepository {
  async getCharacters(): Promise<Character[]> {
    const response = await apiClient.get<CharacterDto[]>(
      'https://api.api-onepiece.com/v2/characters/en'
    );
    return response.data.map((dto) => mapCharacterDtoToDomain(dto, null));
  }

  async loadImagesFor(
    characters: Character[],
    onImageLoaded: (id: number, url: string) => void
  ): Promise<void> {
    characters.forEach((char) => {
      const url = getWikiImageUrl(char.name);
      const img = new Image();
      img.onload = () => onImageLoaded(char.id, url);
      img.src = url;
    });
  }

  async getCharacterById(id: number): Promise<Character> {
    const response = await apiClient.get<CharacterDto>(
      `https://api.api-onepiece.com/v2/characters/en/${id}`
    );
    return mapCharacterDtoToDomain(response.data, null);
  }
}