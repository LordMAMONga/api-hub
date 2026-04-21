import type{ CatDto } from '../model/CatDto';
import type { Cat } from '../../domain/model/Cat';

export const mapCatDtoToDomain = (dto: CatDto): Cat => {
    return {
    id: dto.id,
    imageUrl: dto.url,
    breedName: dto.breeds && dto.breeds.length > 0 ? dto.breeds[0].name : 'Неизвестная порода',
    };
};