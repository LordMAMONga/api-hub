import type { JjkCharacter } from "../../../domain/model/JjkCharacter";
import "./JjkCard.css";

interface Props {
  character: JjkCharacter;
}

export const JjkCard = ({ character }: Props) => {
  const getGlowColorClass = (grade: string) => {
    switch (grade) {
      case "Special Grade":
        return "special-glow";
      case "Grade 1":
        return "grade1-glow";
      case "Grade 2":
        return "grade2-glow";
      default:
        return "default-glow";
    }
  };

  return (
    <div className={`jjk-card ${getGlowColorClass(character.grade)}`}>
      <div className="jjk-image-container">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="jjk-info">
        <h3 className="jjk-name">{character.name}</h3>
        <span className="jjk-grade">{character.grade}</span>
      </div>
    </div>
  );
};
