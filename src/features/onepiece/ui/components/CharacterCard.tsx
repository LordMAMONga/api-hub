import type { Character } from '../../domain/model/Character';
import styles from './CharacterCard.module.css';

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {character.imageUrl ? (
          <img src={character.imageUrl} alt={character.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>🏴‍☠️</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.detail}>🏴‍☠️ <span>{character.crewName}</span></p>
        <p className={styles.detail}>💰 <span>{character.bounty || '—'}</span></p>
        {character.devilFruit && (
          <p className={styles.detail}>🍎 <span>{character.devilFruit}</span></p>
        )}
      </div>
    </div>
  );
};