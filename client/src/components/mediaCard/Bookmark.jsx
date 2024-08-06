/* eslint-disable react/prop-types */
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

function Bookmark({ className }) {
  let [isBookmarked, setIsBookmarked] = useState(false);

  function handleClick() {
    setIsBookmarked((marked) => !marked);
  }

  return (
    <div
      onClick={handleClick}
      className={`${className} absolute right-2 top-2 cursor-pointer rounded-full bg-gray-transparent p-1 text-blue-50 transition-all backdrop:blur-lg hover:bg-blue-50 hover:text-gray-transparent active:scale-[0.96] xs:right-3 xs:top-3 xs:p-2 sm:p-2`}
    >
      {isBookmarked ? (
        <FaBookmark className="h-2 w-3 xs:h-3" />
      ) : (
        <FaRegBookmark className="h-2 w-3 xs:h-3" />
      )}
    </div>
  );
}

export default Bookmark;
