import type { MaxDriver } from '../../domain/model/MaxDriver';

export const DriverMapper = {
  toDomain(dto: any): MaxDriver {
    return {
      id: String(dto.id),
      name: dto.name,
      logo: dto.image || 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
      year: `Species: ${dto.species}`,
      stadium: dto.status 
    };
  }
};