import type { CharacterDto } from "../model/CharacterDto";
import type { Character } from "../../domain/model/Character";

const normalizeStatus = (status: string | null): string => {
  if (!status) return "Unknown";
  const s = status.toLowerCase();
  if (s === "vivant" || s === "living" || s === "alive") return "Alive";
  if (s === "mort" || s === "dead" || s === "deceased") return "Deceased";
  return status;
};

export const mapCharacterDtoToDomain = (dto: CharacterDto): Character => ({
  id: dto.id,
  name: dto.name ?? "Unknown",
  status: normalizeStatus(dto.status),
  age: dto.age ? dto.age.replace(" ans", "").trim() : null,
  size: dto.size ?? null,
  bounty: dto.bounty || "—",
  job: dto.job ?? null,
  crewName: dto.crew?.roman_name ?? dto.crew?.name ?? null,
  fruitName: dto.fruit?.name ?? null,
});
