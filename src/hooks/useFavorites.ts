
import { useState, useEffect } from "react";

export function useFavorites(key: string): [Set<string>, (id: string) => void] {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const favString = localStorage.getItem(key);
    if (favString) setFavorites(new Set(JSON.parse(favString)));
  }, [key]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(key, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  return [favorites, toggleFavorite];
}
