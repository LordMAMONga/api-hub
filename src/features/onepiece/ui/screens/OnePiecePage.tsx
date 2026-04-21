import { useTitle } from "../../../../core/hooks/useTitle";
import { useOnePiece } from "../hooks/useOnePiece";
import { CharacterCard } from "../components/CharacterCard";
import styles from "./OnePiecePage.module.css";

export const OnePiecePage = () => {
  useTitle("One Piece — Characters");

  const { characters, total, hasMore, loading, error, loadMore } =
    useOnePiece();

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>One Piece Characters</h1>
        <p className={styles.subtitle}>
          {loading
            ? "Загрузка..."
            : `Показано ${characters.length} из ${total} персонажей`}
        </p>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.list}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {hasMore && !loading && (
        <div className={styles.actions}>
          <button className={styles.button} onClick={loadMore}>
            Показать ещё
          </button>
        </div>
      )}
    </section>
  );
};
