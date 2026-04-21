import { useTitle } from '../../../../core/hooks/useTitle';
import { useOnePiece } from '../hooks/useOnePiece';
import { CharacterCard } from '../components/CharacterCard';
import styles from './OnePiecePage.module.css';

export const OnePiecePage = () => {
  useTitle('One Piece — Персонажи');
  const { characters, total, hasMore, loading, error, loadMore } = useOnePiece();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>☠️ One Piece</h1>
        <p className={styles.subtitle}>
          {loading ? 'Загрузка...' : `Показано ${characters.length} из ${total} персонажей`}
        </p>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className={styles.grid}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
        {/* Скелетоны пока грузится */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
      </div>

      {hasMore && !loading && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreBtn} onClick={loadMore}>
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
};