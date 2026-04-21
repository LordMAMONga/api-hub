import { useEffect, useRef } from "react"; 
import "./cat.css"; 
import { useCats } from '../hooks/useCats';

export const CatsPage = () => {
  const { cats, isLoading, loadCats } = useCats();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadCats();
        }
      },
      { threshold: 0.1 } // Срабатывает чуть раньше, чтобы юзер не ждал
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [isLoading, loadCats]);

  return (
    <div className="cats-container">
      {/* Шапка без кнопки */}
      <div className="cats-header">
        <h1 className="cats-title">
          Мяу <span className="pink-text">База</span> ✨
        </h1>
        <p className="cats-subtitle">
          Твой персональный склад пушистости
        </p>
      </div>

      {/* Основная сетка */}
      <div className="grid-cats">
        {cats.map((cat, index) => (
          <div key={`${cat.id}-${index}`} className="cat-card">
            <div className="cat-image-wrapper">
              <img src={cat.imageUrl} alt="Кот" loading="lazy" />
            </div>
            <div className="cat-info">
              <div className="cat-id">#{cat.id}</div>
            </div>
          </div>
        ))}
        
        {/* Маяк для бесконечного скролла */}
        <div ref={observerTarget} className="scroll-anchor"></div>
      </div>

      {/* Индикатор загрузки внизу */}
      {isLoading && (
        <div className="loader-text">Синхронизация пушистых данных...</div>
      )}
    </div>
  );
};