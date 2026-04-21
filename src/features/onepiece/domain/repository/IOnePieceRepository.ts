import type { Character } from '../model/Character';

export interface IOnePieceRepository {
  getCharacters(): Promise<Character[]>;
  loadImagesFor(
    characters: Character[],
    onImageLoaded: (id: number, url: string) => void
  ): Promise<void>;
  getCharacterById(id: number): Promise<Character>;
}