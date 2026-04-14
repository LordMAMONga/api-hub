import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | API Hub`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
