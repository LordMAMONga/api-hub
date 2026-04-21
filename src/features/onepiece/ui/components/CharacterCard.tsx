import type { Character } from "../../domain/model/Character";
import styles from "./CharacterCard.module.css";

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <h3 className={styles.name}>{character.name}</h3>
        </div>

        <span
          className={`${styles.badge} ${
            character.status === "Alive" ? styles.alive : styles.deceased
          }`}
        >
          {character.status}
        </span>
      </div>

      <div className={styles.meta}>
        <span>💰 {character.bounty}</span>
        <span>🎂 {character.age ?? "—"}</span>
      </div>
    </article>
  );
};
