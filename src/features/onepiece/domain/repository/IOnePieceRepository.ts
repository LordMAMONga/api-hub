import type { Character } from "../model/Character";

export interface IOnePieceRepository {
  getCharacters(): Promise<Character[]>;
}
