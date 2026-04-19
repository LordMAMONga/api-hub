export interface PokemonDetailsDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Array<{ is_hidden: boolean; ability: { name: string } }>;
  cries: { latest: string };
  moves: Array<{ move: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  types: Array<{ type: { name: string } }>;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
