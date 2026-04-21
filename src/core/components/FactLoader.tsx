import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import "./FactLoader.css"; 

interface FactLoaderProps {
  facts: string[];
}

export const FactLoader = ({ facts }: FactLoaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * facts.length),
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (facts.length === 0) return;

    const intervalId = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * facts.length);
          } while (nextIndex === prev && facts.length > 1);

          return nextIndex;
        });

        setIsVisible(true);
      }, 500); 
    }, 3000);

    return () => clearInterval(intervalId);
  }, [facts.length]);

  return (
    <div className="fact-loader-container">
      {}
      <div className="spinner-wrapper">
        <Spinner />
      </div>

      <p className={`fact-text ${isVisible ? "visible" : "hidden"}`}>
        {facts[currentIndex]}
      </p>
    </div>
  );
};