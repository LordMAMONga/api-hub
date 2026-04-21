import type { JjkCharacter } from "../../domain/model/JjkCharacter";
import type { JikanJjkDto } from "../model/JjkCharacterDto";

export const mapJjkDtoToDomain = (dto: JikanJjkDto): JjkCharacter => {
  const name = dto.character.name;
  let assignedGrade = "Unknown";

  const specialGrades = [
    "Gojou, Satoru",
    "Getou, Suguru",
    "Okkotsu, Yuuta",
    "Tsukumo, Yuki",
    "Sukuna",
  ];
  const grade1 = [
    "Nanami, Kento",
    "Toudou, Aoi",
    "Zenin, Maki",
    "Fushiguro, Megumi",
  ];

  if (specialGrades.includes(name)) {
    assignedGrade = "Special Grade";
  } else if (grade1.includes(name)) {
    assignedGrade = "Grade 1";
  } else if (Math.random() > 0.5) {
    assignedGrade = "Grade 2";
  } else {
    assignedGrade = "Curse / Other";
  }

  return {
    id: dto.character.mal_id,
    name: name.replace(",", ""),
    image: dto.character.images.jpg.image_url,
    grade: assignedGrade,
  };
};
