import type { Character } from "../model/Character";

export interface CsmRepository {
  getCharacters(): Promise<Character[]>;
}
