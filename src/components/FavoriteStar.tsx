
import { Star } from "lucide-react";

interface FavoriteStarProps {
  isActive: boolean;
  onClick: () => void;
}

export const FavoriteStar = ({ isActive, onClick }: FavoriteStarProps) => (
  <button
    type="button"
    aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
    onClick={onClick}
    className={`mr-3 ${isActive ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500`}
    tabIndex={0}
  >
    <Star
      className={`h-5 w-5 transition-colors duration-150 ${
        isActive ? "fill-yellow-400 stroke-yellow-600" : "stroke-gray-400"
      }`}
      fill={isActive ? "#FACC15" : "none"}
    />
  </button>
);
