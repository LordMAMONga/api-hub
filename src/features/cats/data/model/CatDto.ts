export interface CatBreedDto {
  id: string;
  name: string;
  temperament: string;
}

export interface CatDto {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: CatBreedDto[];
}   