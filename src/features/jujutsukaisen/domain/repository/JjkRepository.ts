import type { JjkCharacter } from "../model/JjkCharacter";

export interface JjkRepository {
  getCharacters(): Promise<JjkCharacter[]>;
}
