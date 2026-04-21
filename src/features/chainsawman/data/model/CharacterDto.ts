export interface CharacterResponse {
  data: CharacterDto[];
}

export interface CharacterDto {
  character: {
    mal_id: number;
    name: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
  role: string;
}
