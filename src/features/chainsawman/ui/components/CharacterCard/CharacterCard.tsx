import type { Character } from "../../../domain/model/Character";
import "./CharacterCard.css";

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  return (
    <div className="csm-card">
      <div className="csm-image-container">
        <img src={character.image} alt={character.name} />
        <div className="csm-image-overlay"></div>
      </div>

      <div className="csm-info">
        <h2 className="csm-name">{character.name}</h2>

        <div className="csm-tags">
          <span className="csm-tag species">
            {character.species.toUpperCase()}
          </span>
          <span className="csm-tag affiliation">{character.affiliation}</span>
        </div>
      </div>

      <div className="csm-scratch"></div>
    </div>
  );
};
