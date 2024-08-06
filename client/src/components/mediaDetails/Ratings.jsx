/* eslint-disable react/prop-types */
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function Ratings({ rating }) {
  const ratingOutOfFive = (rating / 2).toFixed(1);
  const fullStars = Math.floor(ratingOutOfFive);
  const halfStar = ratingOutOfFive % 1 > 0 ? 1 : 0;
  const emptyStars = 5 - Math.ceil(ratingOutOfFive);

  return (
    <div className="flex items-center gap-3">
      <h2>{ratingOutOfFive}</h2>
      <span className="flex text-xs">
        {[...Array(fullStars)].map((_, idx) => (
          <FaStar key={idx} />
        ))}
        {halfStar ? <FaRegStarHalfStroke /> : ""}
        {[...Array(emptyStars)].map((_, idx) => (
          <FaRegStar key={idx} />
        ))}
      </span>
    </div>
  );
}

export default Ratings;
