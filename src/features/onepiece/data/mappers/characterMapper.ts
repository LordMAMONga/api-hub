import type { CharacterDto } from '../model/CharacterDto';
import type { Character } from '../../domain/model/Character';

export const mapCharacterDtoToDomain = (
  dto: CharacterDto,
  imageUrl: string | null = null
): Character => ({
  id: dto.id,
  name: dto.name,
  size: dto.size,
  bounty: dto.bounty,
  crewName: dto.crew?.roman_name ?? 'Unknown',
  devilFruit: dto.devil_fruit?.roman_name ?? null,
  description: dto.description,
  imageUrl,
});