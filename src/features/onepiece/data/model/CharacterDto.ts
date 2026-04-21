export interface CharacterDto {
  id: number;
  name: string;
  size: string;
  bounty: string;
  crew: {
    id: number;
    name: string;
    roman_name: string;
  };
  devil_fruit: {
    id: number;
    name: string;
    roman_name: string;
  } | null;
  description: string;
}

export interface CharactersResponseDto {
  characters: CharacterDto[];
}