import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={i}>
            {filled ? (
              <Star size={size} fill="#F59E0B" color="#F59E0B" />
            ) : half ? (
              <StarHalf size={size} fill="#F59E0B" color="#F59E0B" />
            ) : (
              <Star size={size} color="#D1D5DB" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;