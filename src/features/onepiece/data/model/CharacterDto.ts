export interface CharacterDto {
  id: number;
  name: string;
  size: string | null;
  age: string | null;
  bounty: string | null;
  status: string | null;
  job: string | null;
  crew: {
    id: number;
    name: string;
    roman_name: string;
  } | null;
  fruit: {
    id: number;
    name: string;
    filename: string | null;
  } | null;
}
