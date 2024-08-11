/* eslint-disable react/prop-types */
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { addBookmark, deleteBookmark } from "../../utils/api";
import { endpoints } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmarkToSlice,
  removeBookmarkFromSlice,
} from "../../features/bookmark/bookmarkSlice";

function Bookmark({ className, data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmarks.data);

  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks?.some((bookmark) => bookmark.id === data.id) || false,
  );

  useEffect(() => {
    const isAlreadyBookmarked = bookmarks.some(
      (bookmark) => bookmark.id === data.id,
    );
    setIsBookmarked(isAlreadyBookmarked);
  }, [bookmarks, data.id]);

  async function handleClick() {
    try {
      if (isBookmarked) {
        // Logic to remove bookmark
        dispatch(removeBookmarkFromSlice(data.id));
        const bookmark = bookmarks.find((bookmark) => bookmark.id === data.id);
        await deleteBookmark(
          endpoints.bookmark,
          { mediaId: bookmark._id },
          "DELETE",
        );

        setIsBookmarked(false);
      } else {
        const res = await addBookmark(endpoints.bookmark, data, "POST");
        if (res.status === 401) {
          toast.error("Please login first to add bookmark");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return;
        }
        setIsBookmarked(true);
        toast("adding bookmark", { autoClose: 500 });

        // Add bookmark to Redux state
        dispatch(addBookmarkToSlice(data));
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating bookmark status.");
    }
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
