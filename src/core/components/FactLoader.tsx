import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <Spinner />

      <p
        style={{
          marginTop: "20px",
          fontSize: "16px",
          color: "#7f8c8d",
          maxWidth: "400px",
          minHeight: "48px",
          transition: "opacity 0.5s ease-in-out",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {facts[currentIndex]}
      </p>
    </div>
  );
};
