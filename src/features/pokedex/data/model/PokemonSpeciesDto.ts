export interface PokemonSpeciesDto {
  is_legendary: boolean;
  is_mythical: boolean;
  capture_rate: number;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
  }>;
}
