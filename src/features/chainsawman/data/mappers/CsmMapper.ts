import type { CharacterDto } from "../model/CharacterDto";
import type { Character } from "../../domain/model/Character";

export const mapJikanDtoToDomain = (dto: CharacterDto): Character => {
  const squads = [
    "Special Division 4",
    "Tokyo Headquarters",
    "Public Safety",
    "Private Sector",
  ];
  const randomSquad = squads[Math.floor(Math.random() * squads.length)];

  return {
    id: dto.character.mal_id,
    name: dto.character.name,
    species: dto.role === "Main" ? "THREAT LEVEL: HIGH" : "THREAT LEVEL: LOW",
    image: dto.character.images.jpg.image_url,
    affiliation: randomSquad,
  };
};
