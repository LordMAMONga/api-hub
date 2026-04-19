export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonDetails extends PokemonListItem {
  height: number;
  weight: number;
  baseExperience: number;
  abilities: { name: string; isHidden: boolean }[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  soundUrl: string;
  moves: string[];
  description: string;
  isLegendary: boolean;
  captureRate: number;
}
